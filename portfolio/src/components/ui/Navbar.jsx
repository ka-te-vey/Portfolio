import { useState, useEffect, useRef } from "react";
import { User, Cpu, Terminal, Mail, Menu, X } from "lucide-react";

export default function Navbar({
  activeTab = "about",
  colorMode = "green",
  handleNavClick,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll detection to hide navbar while scrolling
  useEffect(() => {
    const handleScrollStatus = () => {
      setIsScrolling(true);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 300); // 300ms delay to declare scrolling has stopped
    };

    window.addEventListener("scroll", handleScrollStatus);
    return () => {
      window.removeEventListener("scroll", handleScrollStatus);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Color themes for active states and highlights
  const themeColors = {
    green: {
      accent: "#22c55e",
      bg: "rgba(34, 197, 94, 0.15)",
      glow: "0 0 12px rgba(34, 197, 94, 0.5)",
      border: "rgba(34, 197, 94, 0.3)",
    },
    cyan: {
      accent: "#06b6d4",
      bg: "rgba(6, 182, 212, 0.15)",
      glow: "0 0 12px rgba(6, 182, 212, 0.5)",
      border: "rgba(6, 182, 212, 0.3)",
    },
    amber: {
      accent: "#f59e0b",
      bg: "rgba(245, 158, 11, 0.15)",
      glow: "0 0 12px rgba(245, 158, 11, 0.5)",
      border: "rgba(245, 158, 11, 0.3)",
    },
    mono: {
      accent: "#e2e8f0",
      bg: "rgba(226, 232, 240, 0.15)",
      glow: "0 0 10px rgba(226, 232, 240, 0.3)",
      border: "rgba(226, 232, 240, 0.2)",
    },
  };

  const currentTheme = themeColors[colorMode] || themeColors.green;

  const menuItems = [
    { icon: User, label: "about" },
    { icon: Cpu, label: "skills" },
    { icon: Terminal, label: "projects" },
    { icon: Mail, label: "contact", text: "contact me" },
  ];

  return (
    <>
      {/* ── FULL SCREEN BACKDROP BLUR OVERLAY ── */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          background: "rgba(5, 12, 22, 0.45)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
        onClick={() => setIsOpen(false)}
      />

      <div
        ref={containerRef}
        className={`fixed top-6 right-6 z-50 select-none transition-all duration-300 pointer-events-none flex flex-col items-end ${
          isScrolling ? "opacity-0 -translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"
        }`}
      >
      {/* ── HAMBURGER TOGGLE BUTTON ── */}
      <button
        onClick={toggleMenu}
        className="w-12 h-12 rounded-full bg-[#101726]/80 backdrop-blur-md border text-white flex items-center justify-center shadow-xl active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer"
        style={{
          boxShadow: `0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 10px ${currentTheme.accent}15`,
          borderColor: isOpen ? currentTheme.accent : "rgba(255,255,255,0.15)",
        }}
      >
        <div className={`transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`}>
          {isOpen ? (
            <X className="w-5 h-5" style={{ color: currentTheme.accent }} />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </div>
      </button>

      {/* ── DROPDOWN LIST ── */}
      <div
        className="w-44 bg-[#101726]/85 backdrop-blur-lg border border-white/10 rounded-2xl p-4 shadow-2xl mt-2 flex flex-col gap-2.5"
        style={{
          boxShadow: `0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 15px ${currentTheme.accent}15`,
          borderColor: `${currentTheme.accent}30`,
          transformOrigin: "top right",
          transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease",
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0.9) translateY(-10px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          const isHovered = hoveredIndex === idx;
          const isItemActive = activeTab === item.label;
          const showHighlight = isItemActive || isHovered;
 
          return (
            <button
              key={idx}
              onClick={() => {
                handleNavClick(item.label);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="w-full flex items-center gap-3 rounded-xl h-11 px-4 transition-all duration-200 cursor-pointer border border-transparent select-none active:scale-98"
              style={{
                background: showHighlight ? currentTheme.bg : "transparent",
                borderColor: isItemActive ? `${currentTheme.accent}40` : "transparent",
              }}
            >
              <Icon
                className="w-4 h-4 transition-all duration-200"
                style={{
                  color: showHighlight ? currentTheme.accent : "rgba(255,255,255,0.55)",
                  filter: showHighlight ? `drop-shadow(0 0 4px ${currentTheme.accent})` : "none",
                }}
              />
              <span
                className="font-mono text-[11px] uppercase tracking-wider transition-all duration-200"
                style={{
                  color: showHighlight ? "#ffffff" : "rgba(255,255,255,0.55)",
                  fontWeight: isItemActive ? 700 : 500,
                }}
              >
                {item.text || item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  </>
);
}
