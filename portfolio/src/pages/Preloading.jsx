import { useState, useEffect } from "react";
import Television from "@/components/ui/Television.jsx";
import FuzzyText from "@/components/Font/FuzzyText.jsx";

const injectStyles = () => {
  const id = "preloader-tv-styles";
  if (document.getElementById(id)) return;
  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
    @keyframes screenFadeInOut {
      0%   { opacity: 0.15; }
      50%  { opacity: 1; }
      100% { opacity: 0.15; }
    }
    @keyframes glowPulse {
      0%   { box-shadow: 0 0 18px 6px var(--glow-color-1, rgba(100,200,255,0.25)), inset 0 0 40px var(--glow-color-2, rgba(150,220,255,0.15)); }
      50%  { box-shadow: 0 0 80px 30px var(--glow-color-1, rgba(100,200,255,0.7)), inset 0 0 100px var(--glow-color-2, rgba(150,220,255,0.4)); }
      100% { box-shadow: 0 0 18px 6px var(--glow-color-1, rgba(100,200,255,0.25)), inset 0 0 40px var(--glow-color-2, rgba(150,220,255,0.15)); }
    }
    @keyframes scanline {
      0%   { top: -4px; }
      100% { top: 100%; }
    }
    @keyframes flicker {
      0%,89%,91%,93%,100% { opacity: 1; }
      90% { opacity: 0.7; }
      92% { opacity: 0.9; }
    }
    @keyframes textFadeIn {
      0%   { opacity: 0; transform: scale(0.94) translateY(6px); letter-spacing: 0.25em; }
      100% { opacity: 1; transform: scale(1) translateY(0); letter-spacing: 0.06em; }
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.2; }
    }
    @keyframes fadeInOverlay {
      0%   { opacity: 0; }
      100% { opacity: 1; }
    }
    .tv-screen-anim {
      animation: screenFadeInOut 3s ease-in-out infinite, glowPulse 3s ease-in-out infinite, flicker 9s infinite;
    }
    .tv-scanline {
      position: absolute;
      left: 0; right: 0;
      height: 2px;
      background: rgba(255,255,255,0.06);
      animation: scanline 2.8s linear infinite;
      pointer-events: none;
      z-index: 3;
    }
    .tv-text-anim {
      animation: textFadeIn 1.6s cubic-bezier(0.22,1,0.36,1) 1s both;
    }
  `;
  document.head.appendChild(style);
};

export default function Preloading({ onComplete }) {
  const [showText, setShowText] = useState(false);
  const [colorMode, setColorMode] = useState("cyan"); // "cyan", "amber", "green", "mono"
  const [isTvOn, setIsTvOn] = useState(true);
  const [knob1Rot, setKnob1Rot] = useState(0);
  const [knob2Rot, setKnob2Rot] = useState(0);
  const [isAntennaExtended, setIsAntennaExtended] = useState(true);
  const [isZooming, setIsZooming] = useState(false);
  const [tvScale, setTvScale] = useState(1);

  useEffect(() => {
    injectStyles();
    const t = setTimeout(() => setShowText(true), 800);

    const handleResize = () => {
      const width = window.innerWidth;
      const maxTvWidth = 560;
      const margin = 32; // 16px padding on left/right for mobile
      const availableWidth = width - margin;

      if (availableWidth < maxTvWidth) {
        setTvScale(availableWidth / maxTvWidth);
      } else {
        setTvScale(1);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const colorPalettes = {
    cyan: {
      screenBg: "#050505",
      glow1: "rgba(100,200,255,0.35)",
      glow2: "rgba(150,220,255,0.18)",
      subText: "rgba(100,200,255,0.7)",
      mainText: "#ffffff",
      lineBg: "rgba(100,200,255,0.3)",
      textShadow: "0 0 10px rgba(0,0,0,0.8)",
    },
    amber: {
      screenBg: "#050505",
      glow1: "rgba(255,180,100,0.4)",
      glow2: "rgba(255,210,150,0.2)",
      subText: "rgba(255,180,100,0.7)",
      mainText: "#ffffff",
      lineBg: "rgba(255,180,100,0.35)",
      textShadow: "0 0 10px rgba(0,0,0,0.8)",
    },
    green: {
      screenBg: "#050505",
      glow1: "rgba(120,255,100,0.35)",
      glow2: "rgba(180,255,150,0.18)",
      subText: "rgba(120,255,100,0.7)",
      mainText: "#ffffff",
      lineBg: "rgba(120,255,100,0.35)",
      textShadow: "0 0 10px rgba(0,0,0,0.8)",
    },
    mono: {
      screenBg: "#050505",
      glow1: "rgba(220,220,220,0.3)",
      glow2: "rgba(240,240,240,0.15)",
      subText: "rgba(200,200,200,0.7)",
      mainText: "#ffffff",
      lineBg: "rgba(150,150,150,0.35)",
      textShadow: "0 0 10px rgba(0,0,0,0.8)",
    }
  };

  const handleKnob1Click = () => {
    const modes = ["cyan", "amber", "green", "mono"];
    const nextIndex = (modes.indexOf(colorMode) + 1) % modes.length;
    setColorMode(modes[nextIndex]);
    setKnob1Rot(prev => prev + 90);
  };

  const handleKnob2Click = () => {
    setIsTvOn(prev => !prev);
    setKnob2Rot(prev => (prev === 0 ? 45 : 0));
  };

  const handleAntennaClick = () => {
    setIsAntennaExtended(prev => !prev);
  };

  const handleAntennaWheel = (e) => {
    if (e.deltaY < 0) {
      setIsAntennaExtended(true);
    } else {
      setIsAntennaExtended(false);
    }
  };

  const currentPalette = colorPalettes[colorMode];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(160deg, #0b2236 0%, #0d2a3a 40%, #071a28 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "120px", // Headroom for antennas
        boxSizing: "border-box",
        zIndex: 9999,
      }}
    >
      {/* Room ambient glow top */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "40%",
        background: "radial-gradient(ellipse at 60% 0%, rgba(0,80,120,0.3) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${560 * tvScale}px`,
        height: `${440 * tvScale}px`,
        overflow: "visible",
        transition: "width 0.2s ease, height 0.2s ease",
      }}>
        <div style={{
          transform: `scale(${tvScale})`,
          transformOrigin: "center center",
          flexShrink: 0,
          width: "560px",
          display: "flex",
          justifyContent: "center",
        }}>
          <Television
            colorMode={colorMode}
            isTvOn={isTvOn}
            isZooming={isZooming}
            isAntennaExtended={isAntennaExtended}
            knob1Rot={knob1Rot}
            knob2Rot={knob2Rot}
            handleKnob1Click={handleKnob1Click}
            handleKnob2Click={handleKnob2Click}
            handleAntennaClick={handleAntennaClick}
            handleAntennaWheel={handleAntennaWheel}
            handleScreenClick={() => {
              if (!isTvOn) {
                setIsTvOn(true);
                return;
              }
              setIsZooming(true);
              setTimeout(() => {
                if (onComplete) onComplete();
              }, 1200);
            }}
            currentPalette={currentPalette}
          >
            {/* Welcome text using FuzzyText */}
            {isTvOn && showText && (
              <div
                className="tv-text-anim"
                style={{
                  position: "absolute", inset: 0, zIndex: 4,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  gap: "0px",
                }}
              >
                <FuzzyText
                  fontSize="28px"
                  fontWeight={700}
                  fontFamily="'Creepster', system-ui, sans-serif"
                  color="#ffffff"
                  baseIntensity={0.2}
                  hoverIntensity={0.5}
                  enableHover={true}
                  fuzzRange={10}
                >
                  Welcome to my Portfolio
                </FuzzyText>
              </div>
            )}
          </Television>
        </div>
      </div>
    </div>
  );
}