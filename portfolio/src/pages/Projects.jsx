import { useEffect, useRef } from "react";
import Card from "@/components/ui/Card.jsx";
import CircularGallary from "@/components/Effect/CircularGallary.jsx";
import Shuffle from "@/components/Font/Shuffle.jsx";

export default function Projects({ colorMode = "green" }) {
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

  const projectList = [
    {
      title: "Nike Clone",
      subtitle: "E-Commerce Showcase",
      description: "A high-fidelity responsive replication of the Nike storefront layout, featuring dynamic product catalogs, category filter shelves, and modern typography.",
      tech: ["React 19", "Vite", "Tailwind CSS v4", "Lucide Icons"],
      status: "READY",
      version: "v1.0.0",
      consoleMock: "> git clone nike-clone-anb\nClone complete (14.2 MB)\n> npm run dev\n[Vite] Server running on port 5173",
      repoUrl: "https://github.com/ka-te-vey/Nike-Clone-ANB",
      launchUrl: "https://nike-clone3.vercel.app/",
      launchBtnText: "Nike",
    },
    {
      title: "To-Do List",
      subtitle: "Task Operations Deck",
      description: "A responsive task management application utilizing React state hooks and localStorage persistence. Includes clean filter tabs, task creation/removal cues, and state metrics.",
      tech: ["React 18", "Vite", "CSS Modules", "Lucide Icons"],
      status: "READY",
      version: "v1.0.0",
      consoleMock: "> git clone to-do-list-anb\n> npm install && npm run dev\n[Vite] Server running on port 5173\n[To-Do] LocalStorage loaded: 5 tasks active",
      repoUrl: "https://github.com/ka-te-vey/To-Do-List-ANB.git",
      launchUrl: "https://to-do-list-anb.vercel.app/",
      launchBtnText: "To-Do-List",
    },
    {
      title: "Weather App",
      subtitle: "Atmospheric Diagnostics",
      description: "A responsive weather dashboard featuring real-time weather querying via Axios. Visualizes wind speeds, humidity, and temperatures with custom weather layout states.",
      tech: ["React 19", "Vite", "Tailwind CSS v4", "Axios"],
      status: "READY",
      version: "v1.0.0",
      consoleMock: "> git clone weather-app-anb\n> npm run dev\n[Vite] Server running on port 5173\n[Weather] Query: London - 200 OK",
      repoUrl: "https://github.com/ka-te-vey/Weather-App-ANB.git",
      launchUrl: "https://weather-app-anb.vercel.app/",
      launchBtnText: "Weather-App",
    },
    {
      title: "Doc Gen",
      subtitle: "PDF Document Generator",
      description: "A full-stack document generator featuring markdown compilation, real-time previewing, and PDF conversion using jspdf and html2canvas with a dual-prefix dev layout.",
      tech: ["React 19", "jspdf", "html2canvas", "NodeJS"],
      status: "READY",
      version: "v1.0.0",
      consoleMock: "> npm run dev\n[Back] Node server running on port 5000\n[Front] Vite dev server running on port 5173\n[Doc] PDF generated: doc_v1.0.pdf - 200 OK",
      repoUrl: "https://github.com/ka-te-vey/Doc_Gen.git",
      launchUrl: "https://doc-genz.vercel.app/",
      launchBtnText: "Doc-Gen",
    },
    {
      title: "Wish For Fun",
      subtitle: "Manage & Share Wishes",
      description: "A full-stack birthday wish curator featuring an Express REST API, Sequelize ORM database backend, PostgreSQL storage, and a responsive React client interface.",
      tech: ["React 19", "Tailwind CSS", "NodeJS", "PostgreSQL"],
      status: "READY",
      version: "v1.0.0",
      consoleMock: "> node server.js\n[Back] Server running on port 3000\n[Back] PostgreSQL connected via Sequelize\n[Front] Vite dev server running on port 5173",
      repoUrl: "https://github.com/ka-te-vey/Birthday.git",
      launchUrl: "https://wishforfun.vercel.app/",
      launchBtnText: "Wish",
    },
  ];
  return (
    <div
      id="projects-section"
      className="section-container"
      style={{
        width: "100%",
        minHeight: "850px",
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

      {/* Header */}
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
            Terminal Manifest // Archives
          </span>
        </div>

        <Shuffle
          text="Projects Library"
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
          Accessing active deployment pipelines. High priority targets rendered below.
        </p>
      </div>

      {/* Projects Circular Gallery */}
      <div
        style={{
          maxWidth: "1100px",
          width: "100%",
          height: "600px",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <CircularGallary
          bend={3}
          scrollSpeed={1.5}
          scrollEase={0.08}
        >
          {projectList.map((proj, idx) => (
            <Card
              key={idx}
              colorMode={colorMode}
              {...proj}
            />
          ))}
        </CircularGallary>
      </div>

      {/* Scroll Hint (visible on mobile/tablet, hidden on desktop) */}
      <div
        className="projects-scroll-hint"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          marginTop: "16px",
          color: currentTheme.accent,
          fontFamily: "monospace",
          fontSize: "12px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          opacity: 0.75,
          zIndex: 2,
        }}
      >
        <span className="hint-arrow-left">←</span>
        <span>Swipe left / right to view projects</span>
        <span className="hint-arrow-right">→</span>
      </div>
    </div>
  );
}
