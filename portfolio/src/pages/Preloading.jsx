import { useState, useEffect } from "react";
import FuzzyText from "./FuzzyText";

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

export default function Preloading() {
  const [showText, setShowText] = useState(false);
  const [colorMode, setColorMode] = useState("cyan"); // "cyan", "amber", "green", "mono"
  const [isTvOn, setIsTvOn] = useState(true);
  const [knob1Rot, setKnob1Rot] = useState(0);
  const [knob2Rot, setKnob2Rot] = useState(0);

  useEffect(() => {
    injectStyles();
    const t = setTimeout(() => setShowText(true), 800);
    return () => clearTimeout(t);
  }, []);

  const colorPalettes = {
    cyan: {
      screenBg: "radial-gradient(ellipse at 45% 42%, #ffffff 0%, #dceeff 35%, #b8d8f8 65%, #9ac4ef 100%)",
      glow1: "rgba(100,200,255,0.3)",
      glow2: "rgba(150,220,255,0.15)",
      subText: "rgba(20,50,110,0.55)",
      mainText: "rgba(10,30,90,0.82)",
      lineBg: "rgba(20,50,110,0.25)",
      textShadow: "0 0 30px rgba(80,150,255,0.35), 0 2px 0 rgba(255,255,255,0.5)",
    },
    amber: {
      screenBg: "radial-gradient(ellipse at 45% 42%, #ffffff 0%, #ffecca 35%, #ffd29c 65%, #ffb770 100%)",
      glow1: "rgba(255,180,100,0.35)",
      glow2: "rgba(255,210,150,0.18)",
      subText: "rgba(110,60,20,0.6)",
      mainText: "rgba(90,40,10,0.85)",
      lineBg: "rgba(110,60,20,0.3)",
      textShadow: "0 0 30px rgba(255,150,80,0.35), 0 2px 0 rgba(255,255,255,0.5)",
    },
    green: {
      screenBg: "radial-gradient(ellipse at 45% 42%, #ffffff 0%, #e8ffd9 35%, #c2ffa8 65%, #9eff7a 100%)",
      glow1: "rgba(120,255,100,0.3)",
      glow2: "rgba(180,255,150,0.15)",
      subText: "rgba(20,90,20,0.6)",
      mainText: "rgba(10,70,10,0.85)",
      lineBg: "rgba(20,90,20,0.3)",
      textShadow: "0 0 30px rgba(100,255,100,0.35), 0 2px 0 rgba(255,255,255,0.5)",
    },
    mono: {
      screenBg: "radial-gradient(ellipse at 45% 42%, #ffffff 0%, #f2f2f2 35%, #d5d5d5 65%, #a8a8a8 100%)",
      glow1: "rgba(220,220,220,0.25)",
      glow2: "rgba(240,240,240,0.12)",
      subText: "rgba(60,60,60,0.6)",
      mainText: "rgba(30,30,30,0.85)",
      lineBg: "rgba(60,60,60,0.3)",
      textShadow: "0 0 30px rgba(200,200,200,0.35), 0 2px 0 rgba(255,255,255,0.5)",
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
    setKnob2Rot(prev => prev + 45);
  };

  const currentPalette = colorPalettes[colorMode];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0b2236 0%, #0d2a3a 40%, #071a28 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "120px", // Headroom for antennas
        boxSizing: "border-box",
      }}
    >
      {/* Room ambient glow top */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0,
        height: "40%",
        background: "radial-gradient(ellipse at 60% 0%, rgba(0,80,120,0.3) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* TV wrapper */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>

        {/* ── TV BODY ── */}
        <div style={{
          position: "relative",
          width: "560px",
          background: "linear-gradient(160deg, #1e3a52 0%, #162e42 50%, #0f2233 100%)",
          borderRadius: "20px 20px 16px 16px",
          padding: "28px 28px 36px 28px",
          boxShadow: `
            0 0 0 2px #0d2030,
            0 20px 60px rgba(0,0,0,0.8),
            0 4px 0 #0a1a26,
            inset 0 1px 0 rgba(120,180,220,0.12)
          `,
        }}>
          {/* Telescopic Rabbit Ear Antennas sitting on top-center of the TV Cabinet (2 rods) */}
          <div style={{
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "12px",
            zIndex: 10,
            pointerEvents: "none",
          }}>
            {/* Antenna Swivel Base */}
            <div style={{
              width: "36px",
              height: "10px",
              background: "linear-gradient(135deg, #182f42 0%, #0c1824 100%)",
              border: "1.5px solid rgba(80,120,150,0.25)",
              borderRadius: "6px 6px 0 0",
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              boxShadow: "0 -2px 5px rgba(0,0,0,0.5)",
            }} />
            
            {/* Left Antenna Rod */}
            <div style={{
              position: "absolute",
              bottom: "8px",
              right: "50%",
              width: "3px",
              height: "140px",
              background: "linear-gradient(to top, #34526d, #88a7c4)",
              boxShadow: "0 0 3px rgba(0,0,0,0.4)",
              transformOrigin: "bottom right",
              transform: "rotate(-38deg) translate(-2px, 0)",
            }}>
              {/* Metallic Tip Ball */}
              <div style={{
                position: "absolute",
                top: "-6px",
                left: "-2px",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #a5c2dd 60%, #527594 100%)",
                boxShadow: "0 0 4px rgba(100,200,255,0.3)",
              }} />
            </div>

            {/* Right Antenna Rod */}
            <div style={{
              position: "absolute",
              bottom: "8px",
              left: "50%",
              width: "3px",
              height: "160px",
              background: "linear-gradient(to top, #34526d, #88a7c4)",
              boxShadow: "0 0 3px rgba(0,0,0,0.4)",
              transformOrigin: "bottom left",
              transform: "rotate(32deg) translate(2px, 0)",
            }}>
              {/* Metallic Tip Ball */}
              <div style={{
                position: "absolute",
                top: "-6px",
                left: "-2px",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #a5c2dd 60%, #527594 100%)",
                boxShadow: "0 0 4px rgba(100,200,255,0.3)",
              }} />
            </div>
          </div>

          {/* top tiny camera dot */}
          <div style={{
            position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)",
            width: "8px", height: "8px", borderRadius: "50%",
            background: "#0a1e2e",
            border: "1px solid rgba(100,160,200,0.15)",
          }} />

          {/* main content row */}
          <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>

            {/* ── SCREEN AREA ── */}
            <div style={{ flex: 1 }}>
              {/* outer bezel ring — thick, layered */}
              <div style={{
                background: "linear-gradient(145deg, #24425e 0%, #162e42 60%, #0f2233 100%)",
                borderRadius: "14px",
                padding: "14px",
                boxShadow: `
                  inset 0 3px 10px rgba(0,0,0,0.7),
                  inset 0 -1px 4px rgba(100,180,220,0.08),
                  0 0 0 1px rgba(80,140,180,0.15)
                `,
              }}>
                {/* inner bezel */}
                <div style={{
                  background: "linear-gradient(145deg, #1a3a52 0%, #0d2538 100%)",
                  borderRadius: "10px",
                  padding: "8px",
                  boxShadow: `
                    0 0 20px 4px ${isTvOn ? currentPalette.glow1 : "transparent"},
                    inset 0 0 12px ${isTvOn ? currentPalette.glow2 : "transparent"}
                  `,
                }}>
                  {/* screen itself */}
                  <div
                    className={isTvOn ? "tv-screen-anim" : ""}
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "4 / 3",
                      borderRadius: "12px",
                      overflow: "hidden",
                      background: isTvOn ? currentPalette.screenBg : "#070a0e",
                      transition: "background 0.4s ease, box-shadow 0.4s ease",
                      boxShadow: isTvOn ? undefined : "inset 0 0 30px rgba(0,0,0,0.95)",
                      "--glow-color-1": isTvOn ? currentPalette.glow1 : "transparent",
                      "--glow-color-2": isTvOn ? currentPalette.glow2 : "transparent",
                    }}
                  >
                    {/* scanline */}
                    {isTvOn && <div className="tv-scanline" />}

                    {/* CRT corner vignette */}
                    <div style={{
                      position: "absolute", inset: 0, borderRadius: "12px",
                      background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,10,30,0.35) 100%)",
                      pointerEvents: "none", zIndex: 2,
                    }} />

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
                        <div style={{
                          fontSize: "11px",
                          color: currentPalette.subText,
                          letterSpacing: "0.3em",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          fontFamily: "monospace",
                          marginBottom: "4px",
                        }}>
                          ◆ NOW BROADCASTING ◆
                        </div>
                        
                        <FuzzyText
                          fontSize={28}
                          fontWeight={800}
                          color={currentPalette.mainText}
                          fontFamily="Georgia, 'Times New Roman', serif"
                          baseIntensity={0.16}
                          hoverIntensity={0.4}
                          enableHover={true}
                          glitchMode={true}
                          glitchInterval={1800}
                          glitchDuration={180}
                        >
                          Welcome to
                        </FuzzyText>
                        
                        <FuzzyText
                          fontSize={28}
                          fontWeight={800}
                          color={currentPalette.mainText}
                          fontFamily="Georgia, 'Times New Roman', serif"
                          baseIntensity={0.16}
                          hoverIntensity={0.4}
                          enableHover={true}
                          glitchMode={true}
                          glitchInterval={1800}
                          glitchDuration={180}
                        >
                          Portfolio
                        </FuzzyText>

                        <div style={{
                          width: "50px", height: "1.5px",
                          background: currentPalette.lineBg,
                          marginTop: "8px",
                        }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Brand label — AMIGA style at bottom center */}
              <div style={{
                textAlign: "center", marginTop: "10px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              }}>
                <span style={{ fontSize: "9px", color: "rgba(120,170,210,0.4)", letterSpacing: "0.05em" }}>✦</span>
                <span style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "rgba(120,170,210,0.5)",
                  letterSpacing: "0.18em",
                  fontFamily: "sans-serif",
                  textTransform: "uppercase",
                }}>Sony</span>
                <span style={{ fontSize: "9px", color: "rgba(120,170,210,0.4)" }}>™</span>
              </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div style={{
              width: "72px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              paddingTop: "8px",
            }}>
              {/* Knob 1 — larger (Click to change color mode) */}
              <TVKnob size={52} rotation={knob1Rot} onClick={handleKnob1Click} />
              
              {/* Knob 2 — slightly smaller (Click to toggle power) */}
              <TVKnob size={46} rotation={knob2Rot} onClick={handleKnob2Click} />

              {/* small button below knobs */}
              <div style={{
                width: "22px", height: "22px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 40% 35%, #1e3a52, #0a1e30)",
                border: "1.5px solid rgba(80,130,170,0.25)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
                marginTop: "4px",
              }} />

              {/* Speaker grille — vertical ridges */}
              <div style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                marginTop: "8px",
                padding: "0 4px",
              }}>
                {Array.from({ length: 14 }).map((_, i) => (
                  <div key={i} style={{
                    height: "2.5px",
                    borderRadius: "2px",
                    background: "rgba(60,100,140,0.35)",
                    boxShadow: "inset 0 1px 0 rgba(0,0,0,0.3)",
                  }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TVKnob({ size = 48, rotation = 0, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: `radial-gradient(circle at 38% 32%, #2a4a66, #0d1e30)`,
        border: "2px solid rgba(60,100,140,0.4)",
        boxShadow: `
          0 4px 10px rgba(0,0,0,0.6),
          inset 0 1px 0 rgba(120,180,220,0.12),
          inset 0 -2px 4px rgba(0,0,0,0.4)
        `,
        position: "relative",
        flexShrink: 0,
        cursor: "pointer",
        padding: 0,
        outline: "none",
        transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {/* center dot */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        width: "8px", height: "8px",
        borderRadius: "50%",
        border: "1px solid rgba(100,160,210,0.15)",
        transform: "translate(-50%, -50%)",
      }} />
      {/* indicator line */}
      <div style={{
        position: "absolute",
        top: "20%", left: "50%",
        width: "2px", height: "28%",
        background: "rgba(120,180,220,0.25)",
        borderRadius: "1px",
        transform: "translateX(-50%)",
      }} />
    </button>
  );
}