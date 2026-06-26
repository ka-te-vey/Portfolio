import { Mail } from "lucide-react";
import Shuffle from "@/components/Font/Shuffle.jsx";

const GithubIcon = ({ size = 16, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact({ colorMode = "green" }) {
  const colorPalettes = {
    cyan: {
      accent: "rgba(6,182,212,1)",
      accentBg: "rgba(6,182,212,0.1)",
      text: "#b6e3f4",
      screenBg: "#061521",
      glow: "0 0 20px rgba(6,182,212,0.45)",
      panelBorder: "rgba(6,182,212,0.3)",
      portText: "rgba(6,182,212,0.7)",
    },
    amber: {
      accent: "rgba(245,158,11,1)",
      accentBg: "rgba(245,158,11,0.1)",
      text: "#fde68a",
      screenBg: "#1a1202",
      glow: "0 0 20px rgba(245,158,11,0.45)",
      panelBorder: "rgba(245,158,11,0.3)",
      portText: "rgba(245,158,11,0.7)",
    },
    green: {
      accent: "rgba(34,197,94,1)",
      accentBg: "rgba(34,197,94,0.1)",
      text: "#bbf7d0",
      screenBg: "#05180c",
      glow: "0 0 20px rgba(34,197,94,0.45)",
      panelBorder: "rgba(34,197,94,0.3)",
      portText: "rgba(34,197,94,0.7)",
    },
    mono: {
      accent: "rgba(226,232,240,1)",
      accentBg: "rgba(226,232,240,0.1)",
      text: "#f1f5f9",
      screenBg: "#0f172a",
      glow: "0 0 20px rgba(226,232,240,0.3)",
      panelBorder: "rgba(226,232,240,0.2)",
      portText: "rgba(226,232,240,0.5)",
    },
  };

  const currentTheme = colorPalettes[colorMode] || colorPalettes.green;

  const contactPorts = [
    {
      port: "PORT-25",
      protocol: "SMTP",
      name: "Email",
      value: "oscar19092019@gmail.com",
      url: "mailto:oscar19092019@gmail.com",
      icon: Mail,
      target: "_self"
    },
    {
      port: "PORT-80",
      protocol: "HTTP",
      name: "GitHub",
      value: "github.com/ka-te-vey",
      url: "https://github.com/ka-te-vey",
      icon: GithubIcon,
      target: "_blank"
    },
    {
      port: "PORT-443",
      protocol: "HTTPS",
      name: "LinkedIn",
      value: "hap-sreypich-b38852390",
      url: "https://www.linkedin.com/in/hap-sreypich-b38852390/",
      icon: LinkedinIcon,
      target: "_blank"
    }
  ];

  return (
    <div
      id="contact-section"
      style={{
        width: "100%",
        minHeight: "550px",
        background: "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "80px 40px",
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
            System Communication // Direct Line
          </span>
        </div>

        <Shuffle
          text="Contact Me"
          tag="h2"
          className="silkscreen-text"
          style={{
            fontSize: "48px",
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
          Reach out through any of the active routing connection ports below.
        </p>
      </div>

      {/* Cards Layout Grid */}
      <div
        style={{
          display: "flex",
          maxWidth: "1100px",
          width: "100%",
          gap: "24px",
          zIndex: 1,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {contactPorts.map((portInfo, idx) => {
          const Icon = portInfo.icon;
          return (
            <a
              key={idx}
              href={portInfo.url}
              target={portInfo.target}
              rel="noreferrer"
              style={{
                textDecoration: "none",
                display: "flex",
                flex: "1 1 300px",
                maxWidth: "340px",
                transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                const inner = e.currentTarget.firstElementChild;
                if (inner) {
                  inner.style.borderColor = currentTheme.accent;
                  inner.style.boxShadow = `0 12px 30px rgba(0,0,0,0.4), 0 0 15px ${currentTheme.accent}20`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                const inner = e.currentTarget.firstElementChild;
                if (inner) {
                  inner.style.borderColor = currentTheme.panelBorder;
                  inner.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
                }
              }}
            >
              <div
                style={{
                  width: "100%",
                  background: "linear-gradient(135deg, #16222f 0%, #0d1620 100%)",
                  borderRadius: "14px",
                  border: `1.5px solid ${currentTheme.panelBorder}`,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                  padding: "24px",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxSizing: "border-box",
                  minHeight: "190px",
                  transition: "all 0.25s ease",
                }}
              >
                {/* Glow Overlay inside Card */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at 50% 10%, ${currentTheme.accentBg} 0%, transparent 60%)`,
                    pointerEvents: "none",
                  }}
                />

                {/* Screws */}
                {["top-left", "top-right", "bottom-left", "bottom-right"].map((corner) => {
                  const posStyle = {};
                  if (corner.includes("top")) posStyle.top = "10px";
                  if (corner.includes("bottom")) posStyle.bottom = "10px";
                  if (corner.includes("left")) posStyle.left = "10px";
                  if (corner.includes("right")) posStyle.right = "10px";
                  return (
                    <span
                      key={corner}
                      style={{
                        position: "absolute",
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "#080c12",
                        border: "1px solid rgba(255,255,255,0.15)",
                        ...posStyle,
                      }}
                    />
                  );
                })}

                {/* Top Section */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 1 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                    <span style={{ fontSize: "11px", fontFamily: "monospace", color: currentTheme.portText, fontWeight: "bold" }}>
                      {portInfo.port} // {portInfo.protocol}
                    </span>
                    <span style={{ fontSize: "18px", color: "#ffffff", fontWeight: 700, fontFamily: "sans-serif" }}>
                      {portInfo.name}
                    </span>
                  </div>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      background: "rgba(8,12,20,0.5)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={18} style={{ color: currentTheme.accent }} />
                  </div>
                </div>

                {/* Bottom Section */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", zIndex: 1, marginTop: "20px" }}>
                  <span
                    style={{
                      fontSize: "12px",
                      fontFamily: "monospace",
                      color: "rgba(255,255,255,0.6)",
                      lineBreak: "anywhere",
                    }}
                  >
                    {portInfo.value}
                  </span>
                  <div
                    style={{
                      fontSize: "11px",
                      fontFamily: "monospace",
                      color: currentTheme.accent,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: "bold",
                    }}
                  >
                    <span>[ CONNECT_PORT ]</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
