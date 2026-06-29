import { useEffect, useRef } from "react";
import Card from "@/components/ui/Card.jsx";
import Shuffle from "@/components/Font/Shuffle.jsx";
import { 
  Monitor, Cpu, Terminal, Code2, GitBranch, 
  Atom, Palette, Code, PenTool, FileCode, 
  Server, Zap, Database, GitFork 
} from "lucide-react";

export default function Skill({ colorMode = "green" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const cards = containerRef.current?.querySelectorAll(".reveal-card");
    cards?.forEach((card) => observer.observe(card));

    return () => {
      cards?.forEach((card) => observer.unobserve(card));
    };
  }, []);
  const colorPalettes = {
    cyan: {
      accent: "rgba(6,182,212,1)",
      accentBg: "rgba(6,182,212,0.1)",
      text: "#b6e3f4",
      screenBg: "#061521",
      glow: "0 0 20px rgba(6,182,212,0.45)",
      panelBorder: "rgba(6,182,212,0.3)",
    },
    amber: {
      accent: "rgba(245,158,11,1)",
      accentBg: "rgba(245,158,11,0.1)",
      text: "#fde68a",
      screenBg: "#1a1202",
      glow: "0 0 20px rgba(245,158,11,0.45)",
      panelBorder: "rgba(245,158,11,0.3)",
    },
    green: {
      accent: "rgba(34,197,94,1)",
      accentBg: "rgba(34,197,94,0.1)",
      text: "#bbf7d0",
      screenBg: "#05180c",
      glow: "0 0 20px rgba(34,197,94,0.45)",
      panelBorder: "rgba(34,197,94,0.3)",
    },
    mono: {
      accent: "rgba(226,232,240,1)",
      accentBg: "rgba(226,232,240,0.1)",
      text: "#f1f5f9",
      screenBg: "#0f172a",
      glow: "0 0 20px rgba(226,232,240,0.3)",
      panelBorder: "rgba(226,232,240,0.2)",
    },
  };

  const currentTheme = colorPalettes[colorMode];

  const skillCategories = [
    {
      title: "Frontend Systems",
      subtitle: "UI & Client-Side Modules",
      icon: Monitor,
      skills: [
        { name: "JavaScript", desc: "Interactive scripting & ES6+", icon: Code2 },
        { name: "React", desc: "Component architecture & hooks", icon: Atom },
        { name: "Tailwind CSS", desc: "Utility-first modern styling", icon: Palette },
        { name: "HTML & CSS", desc: "Semantic layouts & responsive design", icon: Code },
        { name: "Figma", desc: "UI/UX wireframing & prototyping", icon: PenTool },
        { name: "Python", desc: "Logic design & scripting", icon: FileCode },
      ],
    },
    {
      title: "Backend Core",
      subtitle: "Server Logic & Data Pipelines",
      icon: Cpu,
      skills: [
        { name: "Node.js", desc: "Scalable event-driven backends", icon: Server },
        { name: "FastAPI", desc: "High-performance Python APIs", icon: Zap },
        { name: "SQL", desc: "Relational database management", icon: Database },
      ],
    },
    {
      title: "Control Deck",
      subtitle: "Version Control",
      icon: Terminal,
      skills: [
        { name: "Git", desc: "Distributed version control", icon: GitBranch },
        { name: "GitHub", desc: "Collaboration & workflow deployment", icon: GitFork },
      ],
    },
  ];

  return (
    <div
      id="skills-section"
      className="section-container"
      style={{
        width: "100%",
        minHeight: "800px",
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        scrollMarginTop: "80px",
      }}
    >

      {/* Title Header */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
          marginBottom: "60px",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: currentTheme.accent,
              boxShadow: currentTheme.glow,
            }}
          />
          <span
            style={{
              fontSize: "11px",
              color: currentTheme.accent,
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontFamily: "monospace",
            }}
          >
            System Diagnostics // Skill Matrix
          </span>
        </div>

        <Shuffle
          text="Capabilities Deck"
          tag="h2"
          className="silkscreen-text"
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            lineHeight: "1.2",
            margin: 0,
            color: "#ffffff",
            letterSpacing: "0.05em",
            textShadow: "0 0 15px rgba(255,255,255,0.15)",
          }}
          shuffleDirection="right"
          duration={0.5}
          stagger={0.03}
          scrambleCharset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%#$@*"
        />
        <p
          style={{
            fontSize: "14px",
            color: "rgba(255,255,255,0.5)",
            fontFamily: "monospace",
            maxWidth: "500px",
            margin: 0,
            lineHeight: "1.5",
            fontWeight: 500,
          }}
        >
          Analyzing engineering profile and tech-stack proficiencies. All systems optimized.
        </p>
      </div>

      {/* Main Grid Wrapper */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          maxWidth: "1100px",
          width: "100%",
          gap: "30px",
          zIndex: 1,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {skillCategories.map((cat, idx) => (
          <div
            key={idx}
            className="reveal-card skill-card-wrapper"
            style={{
              transitionDelay: `${idx * 0.15}s`,
            }}
          >
            <Card
              title={cat.title}
              subtitle={cat.subtitle}
              colorMode={colorMode}
              icon={cat.icon}
            >
              {/* Skills List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative", marginTop: "10px" }}>
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                      <span style={{ fontSize: "13px", fontWeight: 600, color: "#ffffff", letterSpacing: "0.02em", display: "flex", alignItems: "center", gap: "6px" }}>
                        {skill.icon && <skill.icon size={14} style={{ color: currentTheme.accent }} />}
                        {skill.name}
                      </span>
                    </div>

                    {/* Subtext description */}
                    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", fontFamily: "sans-serif" }}>
                      {skill.desc}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
