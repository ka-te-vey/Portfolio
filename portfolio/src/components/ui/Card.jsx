import { CometCard } from "@/components/ui/comet-card.jsx";

export default function Card({
  title,
  subtitle,
  description,
  tech = [],
  status,
  consoleMock,
  repoUrl,
  launchUrl,
  launchBtnText,
  colorMode = "green",
  icon: Icon,
  children
}) {
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

  const currentTheme = colorPalettes[colorMode] || colorPalettes.green;

  return (
    <CometCard className="flex-1 min-w-[320px] max-w-[380px]">
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #16222f 0%, #0d1620 100%)",
          borderRadius: "14px",
          border: `1.5px solid ${currentTheme.panelBorder}`,
          boxShadow: "inset 0 1px 2px rgba(255,255,255,0.05)",
          padding: "24px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          justifyContent: "space-between",
          minHeight: "440px",
        }}
      >
        {/* Screen glow inside card */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 10%, ${currentTheme.accentBg} 0%, transparent 60%)`,
            pointerEvents: "none",
          }}
        />

        {/* Corner screws */}
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
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#080c12",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "inset 0 1px 1px rgba(0,0,0,0.5)",
                ...posStyle,
              }}
            />
          );
        })}

        <div>
          {/* Header */}
          <div
            style={{
              position: "relative",
              marginBottom: "16px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              paddingBottom: "14px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {Icon && (
                <div style={{ color: currentTheme.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={24} style={{ filter: `drop-shadow(0 0 6px ${currentTheme.accent})` }} />
                </div>
              )}
              <div>
                <div style={{ fontSize: "10px", color: currentTheme.accent, fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {subtitle}
                </div>
                <h3 style={{ fontSize: "20px", color: "#ffffff", fontFamily: "sans-serif", margin: "4px 0 0 0", fontWeight: 700 }}>
                  {title}
                </h3>
              </div>
            </div>
            {status && (
              <span
                style={{
                  fontSize: "9px",
                  fontFamily: "monospace",
                  background: currentTheme.accentBg,
                  border: `1px solid ${currentTheme.panelBorder}`,
                  color: currentTheme.text,
                  padding: "2px 6px",
                  borderRadius: "3px",
                  fontWeight: "bold",
                }}
              >
                {status}
              </span>
            )}
          </div>

          {/* Description */}
          {description && (
            <p
              style={{
                fontSize: "12.5px",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "sans-serif",
                lineHeight: "1.5",
                margin: "0 0 16px 0",
              }}
            >
              {description}
            </p>
          )}

          {/* Terminal Mock Window */}
          {consoleMock && (
            <div
              style={{
                background: "#050a10",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "6px",
                padding: "10px",
                fontFamily: "monospace",
                fontSize: "10px",
                color: currentTheme.text,
                marginBottom: "18px",
                whiteSpace: "pre-line",
                lineHeight: "1.4",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8)",
              }}
            >
              {consoleMock}
            </div>
          )}

          {/* Children */}
          {children}
        </div>

        {/* Conditionally render bottom section only if tech tags or buttons are present */}
        {(tech.length > 0 || launchUrl || repoUrl) && (
          <div>
            {/* Tech tags */}
            {tech.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                {tech.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      color: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      padding: "2px 8px",
                      borderRadius: "20px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Action buttons */}
            {(launchUrl || repoUrl) && (
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => window.open(launchUrl || repoUrl, "_blank")}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: `1.5px solid ${currentTheme.accent}`,
                    borderRadius: "6px",
                    padding: "8px 12px",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontFamily: "monospace",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    textTransform: "uppercase",
                    boxShadow: `0 0 8px ${currentTheme.accentBg}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = currentTheme.accent;
                    e.currentTarget.style.color = "#000000";
                    e.currentTarget.style.boxShadow = currentTheme.glow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#ffffff";
                    e.currentTarget.style.boxShadow = `0 0 8px ${currentTheme.accentBg}`;
                  }}
                >
                  {launchBtnText || "LAUNCH_SYS"}
                </button>
                {repoUrl && (
                  <button
                    onClick={() => window.open(repoUrl, "_blank")}
                    style={{
                      width: "40px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1.5px solid rgba(255,255,255,0.15)",
                      borderRadius: "6px",
                      padding: "8px 0",
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "11px",
                      fontFamily: "monospace",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                      e.currentTarget.style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                    }}
                    title="Source Code"
                  >
                    &lt;/&gt;
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </CometCard>
  );
}
