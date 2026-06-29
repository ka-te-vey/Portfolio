import { useState, useEffect } from "react";
import { ShiningText } from "@/components/Font/shining-text.jsx";
import meImage from "@/assets/me.jpg";
import Television from "@/components/ui/Television.jsx";
import Navbar from "@/components/ui/Navbar.jsx";
import Skill from "./Skill.jsx";
import Projects from "./Projects.jsx";
import Contact from "./Contact.jsx";

const TERMINAL_CONTENT = {
  about: `> Fetching identity...
[SUCCESS] Data Retrieved.

Hi, my name is Hap SreyPich, and I'm a software engineering student with a passion for building things that live on the internet. I'm currently diving deep into the world of programming — learning everything from data structures and algorithms to web development and system design. I enjoy solving complex problems and turning ideas into real, functional applications. Outside of coursework, I love working on personal projects, exploring new technologies, and constantly pushing myself to grow as a developer.`,

  skills: `> Loading tech-stack...
[100%] Skills Initialized.

FRONTEND:
- JavaScript, React, Tailwind CSS
- HTML & CSS, Figma, Python

BACKEND & DATABASE:
- Node.js, FastAPI, SQL

VERSION CONTROL:
- Git, GitHub`,

  projects: `> Querying repositories...
[FOUND] 5 active projects:

1. Nike Clone
2. To-Do List
3. Weather App
4. Doc Genz
5. Wish For Fun`,

  contact: `> Initializing message gateway...
[READY] Secure Channel Established.

CONTACT PORTAL:
- EMAIL: oscar19092019@gmail.com
- GITHUB: github.com/ka-te-vey
- LINKEDIN: linkedin.com/in/hap-sreypich-b38852390/

Status: Awaiting transmission...`,
};

export default function About() {
  const [activeTab, setActiveTab] = useState("about"); // "about", "skills", "projects", "contact"
  const [tvActiveTab, setTvActiveTab] = useState("about"); // "about", "skills", "projects", "contact" for TV screen
  const [colorMode, setColorMode] = useState("green"); // "cyan", "amber", "green", "mono"
  const [isMonitorOn, setIsMonitorOn] = useState(false);
  const [terminalText, setTerminalText] = useState("");
  const [knob1Rot, setKnob1Rot] = useState(0);
  const [knob2Rot, setKnob2Rot] = useState(0);
  const [isAntennaExtended, setIsAntennaExtended] = useState(true);
  const [tvScale, setTvScale] = useState(1);

  useEffect(() => {
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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleKnob1Click = () => {
    const modes = ["green", "cyan", "amber", "mono"];
    const nextIndex = (modes.indexOf(colorMode) + 1) % modes.length;
    setColorMode(modes[nextIndex]);
    setKnob1Rot((prev) => prev + 90);
  };

  const handleKnob2Click = () => {
    setIsMonitorOn((prev) => !prev);
    setKnob2Rot((prev) => (prev === 0 ? 45 : 0));
  };

  const handleAntennaClick = () => {
    setIsAntennaExtended((prev) => !prev);
  };

  const handleAntennaWheel = (e) => {
    if (e.deltaY < 0) {
      setIsAntennaExtended(true);
    } else {
      setIsAntennaExtended(false);
    }
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setTvActiveTab(tab);
    if (!isMonitorOn) {
      setIsMonitorOn(true);
    }
    if (tab === "about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (tab === "skills") {
      document.getElementById("skills-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (tab === "projects") {
      document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (tab === "contact") {
      document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;
      if (isAtBottom) {
        setActiveTab("contact");
        setTvActiveTab("contact");
        return;
      }

      const sections = [
        { id: "about", el: document.getElementById("about-section") },
        { id: "skills", el: document.getElementById("skills-section") },
        { id: "projects", el: document.getElementById("projects-section") },
        { id: "contact", el: document.getElementById("contact-section") },
      ];

      let currentSection = "about";
      let minDistance = Infinity;

      sections.forEach((sec) => {
        if (sec.el) {
          const rect = sec.el.getBoundingClientRect();
          const distance = Math.abs(rect.top - 150);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = sec.id;
          }
        }
      });

      setActiveTab(currentSection);
      setTvActiveTab(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  const colorPalettes = {
    cyan: {
      accent: "rgba(6,182,212,1)", // Tailwind cyan-500
      accentBg: "rgba(6,182,212,0.1)",
      text: "#b6e3f4",
      screenBg: "#061521",
      glow: "0 0 20px rgba(6,182,212,0.45)",
      glow1: "rgba(6,182,212,0.35)",
      glow2: "rgba(6,182,212,0.18)",
      panelBorder: "rgba(6,182,212,0.3)",
    },
    amber: {
      accent: "rgba(245,158,11,1)", // Tailwind amber-500
      accentBg: "rgba(245,158,11,0.1)",
      text: "#fde68a",
      screenBg: "#1a1202",
      glow: "0 0 20px rgba(245,158,11,0.45)",
      glow1: "rgba(245,158,11,0.35)",
      glow2: "rgba(245,158,11,0.18)",
      panelBorder: "rgba(245,158,11,0.3)",
    },
    green: {
      accent: "rgba(34,197,94,1)", // Tailwind green-500
      accentBg: "rgba(34,197,94,0.1)",
      text: "#bbf7d0",
      screenBg: "#05180c",
      glow: "0 0 20px rgba(34,197,94,0.45)",
      glow1: "rgba(34,197,94,0.35)",
      glow2: "rgba(34,197,94,0.18)",
      panelBorder: "rgba(34,197,94,0.3)",
    },
    mono: {
      accent: "rgba(226,232,240,1)", // Tailwind slate-200
      accentBg: "rgba(226,232,240,0.1)",
      text: "#f1f5f9",
      screenBg: "#0f172a",
      glow: "0 0 20px rgba(226,232,240,0.3)",
      glow1: "rgba(226,232,240,0.3)",
      glow2: "rgba(226,232,240,0.15)",
      panelBorder: "rgba(226,232,240,0.2)",
    },
  };

  const currentTheme = colorPalettes[colorMode];

  // Simulates terminal typing effect
  useEffect(() => {
    if (!isMonitorOn) return;
    let index = 0;
    const fullText = TERMINAL_CONTENT[tvActiveTab];

    const interval = setInterval(() => {
      if (index === 0) {
        setTerminalText(fullText[0]);
      } else {
        setTerminalText((prev) => prev + fullText[index]);
      }
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 12);

    return () => clearInterval(interval);
  }, [tvActiveTab, isMonitorOn]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0b2236 0%, #0d2a3a 40%, #071a28 100%)",
        backgroundAttachment: "fixed",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Responsive Styles for Sidebar */}
      <style>{`
        @media (max-width: 1024px) {
          .glass-sidebar {
            position: fixed !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            top: auto !important;
            width: 100% !important;
            height: 64px !important;
            transform: none !important;
            flex-direction: row !important;
            justify-content: center !important;
            gap: 40px !important;
            padding: 0 !important;
            border-radius: 0 !important;
            border-top: 1.5px solid var(--panel-border) !important;
            border-left: none !important;
            border-right: none !important;
            border-bottom: none !important;
            opacity: 1 !important;
            pointer-events: auto !important;
            box-shadow: none !important;
          }
          .glass-sidebar button {
            position: static !important;
            transform: none !important;
            width: auto !important;
            height: 100% !important;
            padding: 0 16px !important;
            border: none !important;
            box-shadow: none !important;
          }
          .glass-sidebar-glow {
            display: none !important;
          }
        }
        @media (min-width: 1025px) {
          .main-content-wrapper {
            padding-right: 0px !important;
            padding-left: 0px !important;
          }
        }
      `}</style>

      <Navbar
        activeTab={activeTab}
        colorMode={colorMode}
        handleNavClick={handleNavClick}
      />

      {/* Background Grid Pattern overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          id="about-section"
          className="main-content-wrapper section-container"
          style={{
            width: "100%",
            minHeight: "750px",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden",
          }}
        >

      {/* Hero Content Wrapper */}
      <div
        style={{
          display: "flex",
          maxWidth: "1100px",
          width: "100%",
          gap: "40px",
          zIndex: 1,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        
        {/* ── LEFT COLUMN: COPY & BUTTONS ── */}
        <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Heading using Bitcount Grid Double & ShiningText */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <h1
              className="silkscreen-text"
              style={{
                fontSize: "clamp(36px, 8vw, 64px)",
                lineHeight: "1",
                margin: 0,
                color: "#ffffff",
                letterSpacing: "0.05em",
                textShadow: "0 0 15px rgba(255,255,255,0.2)",
              }}
            >
              <ShiningText className="silkscreen-text">Hap SreyPich</ShiningText>
            </h1>
            <p
              style={{
                fontSize: "clamp(15px, 2vw, 18px)",
                margin: 0,
                color: "rgba(255,255,255,0.7)",
                fontFamily: "sans-serif",
                letterSpacing: "0.05em",
                lineHeight: "1.4",
              }}
            >
              Hi, my name is Hap SreyPich, and I'm a software engineering student with a passion for building things that live on the internet. 
              I'm currently diving deep into the world of programming — learning everything from data structures and algorithms to web development and system design. 
              I enjoy solving complex problems and turning ideas into real, functional applications. Outside of coursework, I love working on personal projects, exploring new technologies, and constantly pushing myself to grow as a developer. 
            </p>
          </div>

          {/* Call to Actions */}
          <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>

            <button
              style={{
                background: "transparent",
                border: `2px solid ${currentTheme.accent}`,
                borderRadius: "8px",
                padding: "10px 22px",
                color: currentTheme.accent,
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                cursor: "pointer",
                boxShadow: `inset 0 0 8px ${currentTheme.accentBg}`,
                transition: "transform 0.2s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.03)";
                e.currentTarget.style.background = currentTheme.accentBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Download CV
            </button>
          </div>

          {/* Bottom dials / configuration buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "16px" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              {["green", "cyan", "amber", "mono"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setColorMode(mode)}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    border: colorMode === mode ? "2px solid #fff" : "1.5px solid rgba(255,255,255,0.25)",
                    background:
                      mode === "green"
                        ? "#22c55e"
                        : mode === "cyan"
                        ? "#06b6d4"
                        : mode === "amber"
                        ? "#f59e0b"
                        : "#94a3b8",
                    cursor: "pointer",
                    boxShadow: colorMode === mode ? "0 0 8px rgba(255,255,255,0.6)" : "none",
                    transition: "transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: CRT TERMINAL MONITOR ── */}
        <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "28px" }}>
          
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
                isTvOn={isMonitorOn}
                isZooming={false}
                isAntennaExtended={isAntennaExtended}
                knob1Rot={knob1Rot}
                knob2Rot={knob2Rot}
                handleKnob1Click={handleKnob1Click}
                handleKnob2Click={handleKnob2Click}
                handleAntennaClick={handleAntennaClick}
                handleAntennaWheel={handleAntennaWheel}
                handleScreenClick={() => {
                  if (!isMonitorOn) {
                    setIsMonitorOn(true);
                  }
                }}
                currentPalette={{
                  glow1: currentTheme.glow1,
                  glow2: currentTheme.glow2,
                  screenBg: currentTheme.screenBg,
                }}
              >
                {/* Vintage Snow Static Noise */}
                {isMonitorOn && <div className="tv-static-noise" style={{ opacity: 0.1 }} />}


                {/* Screen Interactive Terminal Logs */}
                {isMonitorOn ? (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      padding: "16px",
                      boxSizing: "border-box",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      fontFamily: "monospace",
                      fontSize: "12px",
                      lineHeight: "1.45",
                      color: currentTheme.text,
                      whiteSpace: "pre-wrap",
                      overflowY: "auto",
                    }}
                  >
                    {terminalText}
                    {/* Blinking Cursor */}
                    <span
                      style={{
                        display: "inline-block",
                        width: "8px",
                        height: "12px",
                        background: currentTheme.text,
                        marginLeft: "4px",
                        animation: "blink-anim 0.8s infinite steps(2)",
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${meImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        opacity: 0.95,
                        filter: "brightness(95%) contrast(100%)",
                        transition: "opacity 0.5s ease",
                      }}
                    />
                    {/* Screen OFF pattern (faint phosphor dot in center) */}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.05)",
                        boxShadow: "0 0 10px rgba(255,255,255,0.05)",
                        zIndex: 1,
                      }}
                    />
                  </>
                )}
              </Television>
            </div>
          </div>

          {/* Selector Tabs (Integrated under the TV) */}
          {isMonitorOn && (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
              {["about", "skills", "projects", "contact"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setTvActiveTab(tab);
                  }}
                  style={{
                    background: tvActiveTab === tab ? currentTheme.accent : "#1e2630",
                    border: "1px solid #0d1217",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    color: tvActiveTab === tab ? (colorMode === "mono" ? "#0f172a" : "#000") : "rgba(255,255,255,0.5)",
                    fontSize: "12px",
                    fontWeight: 700,
                    fontFamily: "monospace",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    boxShadow: tvActiveTab === tab ? "0 0 6px rgba(255,255,255,0.15)" : "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (tvActiveTab !== tab) e.currentTarget.style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    if (tvActiveTab !== tab) e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  }}
                >
                  {tab === "contact" ? "contact me" : tab}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
        </div>
        <Skill colorMode={colorMode} />
        <Projects colorMode={colorMode} />
        <Contact colorMode={colorMode} />
      </div>
    </div>
  );
}
