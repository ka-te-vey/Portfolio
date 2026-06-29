export default function Television({
  isTvOn = true,
  isZooming = false,
  isAntennaExtended = true,
  knob1Rot = 0,
  knob2Rot = 0,
  handleKnob1Click,
  handleKnob2Click,
  handleAntennaClick,
  handleAntennaWheel,
  handleScreenClick,
  currentPalette,
  children
}) {
  return (
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
        transition: "transform 1.2s cubic-bezier(0.7, 0, 0.3, 1), opacity 1.2s ease-in-out",
        transformOrigin: "235px 220px", // Centered roughly on the screen
        transform: isZooming ? "scale(6.5)" : "scale(1)",
        pointerEvents: isZooming ? "none" : "auto",
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
          
          {/* Left Antenna Wrapper (Wider Hit-box & Scroll target) */}
          <div 
            onClick={handleAntennaClick}
            onWheel={handleAntennaWheel}
            style={{
              position: "absolute",
              bottom: "8px",
              right: "calc(50% - 20px)",
              width: "40px",
              height: isAntennaExtended ? "140px" : "36px",
              transformOrigin: "bottom center",
              transform: "rotate(-38deg) translate(-2px, 0)",
              cursor: "pointer",
              pointerEvents: "auto",
              transition: "height 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Actual 3px Rod */}
            <div style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "3px",
              background: "linear-gradient(to top, #34526d, #88a7c4)",
              boxShadow: "0 0 3px rgba(0,0,0,0.4)",
            }} />
            
            {/* Metallic Tip Ball */}
            <div style={{
              position: "absolute",
              top: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #a5c2dd 60%, #527594 100%)",
              boxShadow: "0 0 4px rgba(100,200,255,0.3)",
            }} />
          </div>

          {/* Right Antenna Wrapper (Wider Hit-box & Scroll target) */}
          <div 
            onClick={handleAntennaClick}
            onWheel={handleAntennaWheel}
            style={{
              position: "absolute",
              bottom: "8px",
              left: "calc(50% - 20px)",
              width: "40px",
              height: isAntennaExtended ? "160px" : "40px",
              transformOrigin: "bottom center",
              transform: "rotate(32deg) translate(2px, 0)",
              cursor: "pointer",
              pointerEvents: "auto",
              transition: "height 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Actual 3px Rod */}
            <div style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              width: "3px",
              background: "linear-gradient(to top, #34526d, #88a7c4)",
              boxShadow: "0 0 3px rgba(0,0,0,0.4)",
            }} />

            {/* Metallic Tip Ball */}
            <div style={{
              position: "absolute",
              top: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #ffffff 0%, #a5c2dd 60%, #527594 100%)",
              boxShadow: "0 0 4px rgba(100,200,255,0.3)",
            }} />
          </div>
        </div>

        {/* Power status indicator LED under antennas */}
        <div style={{
          position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)",
          width: "8px", height: "8px", borderRadius: "50%",
          background: isTvOn ? "#39ff14" : "#ff073a",
          border: isTvOn ? "1px solid rgba(57,255,20,0.4)" : "1px solid rgba(255,7,58,0.4)",
          boxShadow: isTvOn 
            ? "0 0 10px #39ff14, 0 0 3px rgba(255,255,255,0.8)" 
            : "0 0 10px #ff073a, 0 0 3px rgba(255,255,255,0.8)",
          transition: "background 0.4s ease, box-shadow 0.4s ease, border 0.4s ease",
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
                  onClick={handleScreenClick}
                  className={isTvOn ? "tv-screen-anim tv-bad-signal" : ""}
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
                    cursor: "pointer",
                  }}
                >
                  {/* Zoom transition overlay */}
                  {isZooming && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "#0b2236", // Matches About page background
                        zIndex: 99,
                        animation: "fadeInOverlay 1.1s forwards",
                      }}
                    />
                  )}

                  {/* scanline */}
                  {isTvOn && <div className="tv-scanline" />}

                  {/* static noise background */}
                  {isTvOn && <div className="tv-static-noise" />}

                  {/* CRT corner vignette */}
                  <div style={{
                    position: "absolute", inset: 0, borderRadius: "12px",
                    background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,10,30,0.35) 100%)",
                    pointerEvents: "none", zIndex: 2,
                  }} />

                  {children}
                </div>
              </div>
            </div>

            {/* Brand label */}
            <div style={{
              textAlign: "center", marginTop: "20px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            }}>
              <span style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "rgba(120,170,210,0.5)",
                letterSpacing: "0.18em",
                fontFamily: "sans-serif",
                textTransform: "uppercase",
              }}>Sony</span>
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
