import { useState, useEffect } from "react";
import { ShiningText } from "@/components/ui/shining-text.jsx";
import meImage from "@/assets/me.jpg";
import { User, Cpu, Terminal } from "lucide-react";

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
};

import Skill from "./Skill.jsx";
import Projects from "./Projects.jsx";

export default function About() {
  const [activeTab, setActiveTab] = useState("about"); // "about", "skills", "projects"
  const [colorMode, setColorMode] = useState("green"); // "cyan", "amber", "green", "mono"
  const [isMonitorOn, setIsMonitorOn] = useState(false);
  const [terminalText, setTerminalText] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    if (!isMonitorOn) {
      setIsMonitorOn(true);
    }
    if (tab === "about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (tab === "skills") {
      document.getElementById("skills-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (tab === "projects") {
      document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const colorPalettes = {
    cyan: {
      accent: "rgba(6,182,212,1)", // Tailwind cyan-500
      accentBg: "rgba(6,182,212,0.1)",
      text: "#b6e3f4",
      screenBg: "#061521",
      glow: "0 0 20px rgba(6,182,212,0.45)",
      terminalHeader: "Cyan Terminal v4.1",
    },
    amber: {
      accent: "rgba(245,158,11,1)", // Tailwind amber-500
      accentBg: "rgba(245,158,11,0.1)",
      text: "#fde68a",
      screenBg: "#1a1202",
      glow: "0 0 20px rgba(245,158,11,0.45)",
      terminalHeader: "Amber Terminal v4.1",
    },
    green: {
      accent: "rgba(34,197,94,1)", // Tailwind green-500
      accentBg: "rgba(34,197,94,0.1)",
      text: "#bbf7d0",
      screenBg: "#05180c",
      glow: "0 0 20px rgba(34,197,94,0.45)",
      terminalHeader: "Green Matrix Terminal v4.1",
    },
    mono: {
      accent: "rgba(226,232,240,1)", // Tailwind slate-200
      accentBg: "rgba(226,232,240,0.1)",
      text: "#f1f5f9",
      screenBg: "#0f172a",
      glow: "0 0 20px rgba(226,232,240,0.3)",
      terminalHeader: "Monochrome Terminal v4.1",
    },
  };

  const currentTheme = colorPalettes[colorMode];

  // Simulates terminal typing effect
  useEffect(() => {
    if (!isMonitorOn) return;
    let index = 0;
    const fullText = TERMINAL_CONTENT[activeTab];

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
  }, [activeTab, isMonitorOn]);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0b2236 0%, #0d2a3a 40%, #071a28 100%)",
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
            padding-right: 130px !important;
            padding-left: 0px !important;
          }
        }
      `}</style>

      {/* Sticky Glassmorphic Sidebar */}
      <aside
        className="glass-sidebar"
        style={{
          position: "fixed",
          left: "auto",
          right: "24px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "108px",
          height: "440px",
          background: "rgba(45, 55, 72, 0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: `1.5px solid ${currentTheme.panelBorder}`,
          borderRadius: "28px",
          boxSizing: "border-box",
          zIndex: 1000,
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 20px 40px rgba(0, 0, 0, 0.6)",
          "--panel-border": currentTheme.panelBorder,
        }}
      >
        {/* Glow indicator */}
        <div
          className="glass-sidebar-glow"
          style={{
            position: "absolute",
            left: "48px",
            top: "28px",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: currentTheme.accent,
            boxShadow: currentTheme.glow,
            opacity: 1,
          }}
        />

        {/* Navigation Items stacked vertically */}
        {["about", "skills", "projects"].map((tab, idx) => {
          const isActive = activeTab === tab;
          
          // Select appropriate icon
          let IconComponent = User;
          if (tab === "skills") IconComponent = Cpu;
          if (tab === "projects") IconComponent = Terminal;

          return (
            <button
              key={tab}
              onClick={() => handleNavClick(tab)}
              title={tab.toUpperCase()}
              style={{
                position: "absolute",
                left: "18px",
                top: `${76 + idx * 112}px`, // Stacked: 76px, 188px, 300px
                transform: "none",
                background: isActive ? currentTheme.accentBg : "transparent",
                border: isActive ? `2px solid ${currentTheme.accent}` : "2px solid transparent",
                color: isActive ? currentTheme.accent : "rgba(255, 255, 255, 0.5)",
                width: "72px",
                height: "72px",
                borderRadius: "16px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                transition: "all 0.2s ease",
                boxShadow: isActive ? `inset 0 0 6px ${currentTheme.accentBg}` : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              <IconComponent size={26} style={{ filter: isActive ? `drop-shadow(0 0 4px ${currentTheme.accent})` : "none" }} />
              <span style={{ fontSize: "11px", fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {tab.substring(0, 5)}
              </span>
            </button>
          );
        })}
      </aside>

      {/* Background Grid Pattern overlay */}
      <div
        style={{
          position: "absolute",
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
          className="main-content-wrapper"
          style={{
            width: "100%",
            minHeight: "750px",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 40px",
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
        <div style={{ flex: "1 1 500px", display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Heading using Bitcount Grid Double & ShiningText */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <h1
              className="bitcount-text"
              style={{
                fontSize: "64px",
                lineHeight: "1",
                margin: 0,
                color: "#ffffff",
                letterSpacing: "0.05em",
                textShadow: "0 0 15px rgba(255,255,255,0.2)",
              }}
            >
              <ShiningText className="bitcount-text">Hap SreyPich</ShiningText>
            </h1>
            <p
              style={{
                fontSize: "18px",
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
            <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", fontFamily: "monospace", letterSpacing: "0.1em" }}>
              CHANGE TERMINAL PALETTE:
            </div>
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
        <div style={{ flex: "1 1 450px", display: "flex", justifyContent: "center" }}>
          
          {/* Outer monitor cabinet frame */}
          <div
            style={{
              width: "100%",
              maxWidth: "480px",
              background: "linear-gradient(135deg, #2e3a47 0%, #1e2630 60%, #121820 100%)",
              borderRadius: "16px",
              padding: "16px 16px 24px 16px",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8), inset 0 2px 2px rgba(255,255,255,0.1)",
              border: "1.5px solid #0d1217",
              position: "relative",
            }}
          >
            {/* Monitor Brand Label */}
            <div
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.2)",
                fontFamily: "monospace",
                textAlign: "center",
                marginBottom: "10px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              HEXTA MONITOR // MODEL C-88
            </div>

            {/* Inner Monitor Bezel */}
            <div
              style={{
                background: "#0c1117",
                borderRadius: "10px",
                padding: "8px",
                boxShadow: "inset 0 4px 12px rgba(0,0,0,0.9)",
              }}
            >
              {/* Screen Area Container */}
              <div
                className={isMonitorOn ? "tv-bad-signal" : ""}
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "4 / 3",
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: isMonitorOn ? currentTheme.screenBg : "#030406",
                  transition: "background 0.3s ease",
                  boxShadow: isMonitorOn ? undefined : "inset 0 0 20px rgba(0,0,0,0.95)",
                }}
              >
                {/* Vintage Snow Static Noise */}
                {isMonitorOn && <div className="tv-static-noise" style={{ opacity: 0.1 }} />}

                {/* Scanline pattern overlay */}
                {isMonitorOn && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                      backgroundSize: "100% 3px, 6px 100%",
                      pointerEvents: "none",
                      zIndex: 3,
                    }}
                  />
                )}

                {/* CRT corner vignette */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(0,0,0,0.4) 100%)",
                    pointerEvents: "none",
                    zIndex: 3,
                  }}
                />

                {/* Terminal Header Info */}
                {isMonitorOn && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      background: "rgba(0,0,0,0.3)",
                      padding: "6px 12px",
                      borderBottom: `1px solid ${currentTheme.accentBg}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      zIndex: 2,
                      fontFamily: "monospace",
                      fontSize: "9px",
                      color: currentTheme.accent,
                    }}
                  >
                    <span>{currentTheme.terminalHeader}</span>
                    <span style={{ opacity: 0.7 }}>Baud: 9600</span>
                  </div>
                )}

                {/* Screen Interactive Terminal Logs */}
                {isMonitorOn ? (
                  <div
                    style={{
                      padding: "36px 16px 16px 16px",
                      height: "100%",
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
              </div>
            </div>

            {/* Monitor Control Bar (Power light, Power Button, Dials) */}
            <div
              style={{
                display: "flex",
                marginTop: "16px",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 8px",
              }}
            >
              {/* Power LED & Dial controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Glowing LED Power Light */}
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: isMonitorOn ? "#39ff14" : "#ff073a",
                    boxShadow: isMonitorOn ? "0 0 8px #39ff14" : "0 0 8px #ff073a",
                    transition: "background 0.3s ease, box-shadow 0.3s ease",
                  }}
                />

                {/* Subtitle / Mode label */}
                <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", letterSpacing: "0.1em" }}>
                  POWER {isMonitorOn ? "ON" : "OFF"}
                </span>
              </div>

              {/* Selector Tabs (Integrated in monitor control dial style) */}
              {isMonitorOn && (
                <div style={{ display: "flex", gap: "6px" }}>
                  {["about", "skills", "projects"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        if (tab === "skills") {
                          document.getElementById("skills-section")?.scrollIntoView({ behavior: "smooth" });
                        } else if (tab === "projects") {
                          document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth" });
                        } else if (tab === "about") {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      style={{
                        background: activeTab === tab ? currentTheme.accent : "#1e2630",
                        border: "1px solid #0d1217",
                        borderRadius: "4px",
                        padding: "4px 8px",
                        color: activeTab === tab ? (colorMode === "mono" ? "#0f172a" : "#000") : "rgba(255,255,255,0.5)",
                        fontSize: "9px",
                        fontWeight: 700,
                        fontFamily: "monospace",
                        cursor: "pointer",
                        textTransform: "uppercase",
                        boxShadow: activeTab === tab ? "0 0 6px rgba(255,255,255,0.15)" : "none",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (activeTab !== tab) e.currentTarget.style.color = "#ffffff";
                      }}
                      onMouseLeave={(e) => {
                        if (activeTab !== tab) e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              )}

              {/* Monitor Power Button */}
              <button
                onClick={() => setIsMonitorOn((prev) => !prev)}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: isMonitorOn
                    ? "radial-gradient(circle at 35% 35%, #2a3543 0%, #171d24 100%)"
                    : "radial-gradient(circle at 35% 35%, #46556b 0%, #222b37 100%)",
                  border: "1.5px solid #0c1117",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  outline: "none",
                  transition: "transform 0.1s ease",
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {/* Power Icon glyph */}
                <span
                  style={{
                    fontSize: "8px",
                    color: isMonitorOn ? "rgba(255,255,255,0.3)" : "#ffffff",
                    fontFamily: "monospace",
                    fontWeight: 900,
                  }}
                >
                  ⏽
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
        </div>
        <Skill colorMode={colorMode} />
        <Projects colorMode={colorMode} />
      </div>
    </div>
  );
}
