
export function ShiningText({ children, text, className = "", style = {} }) {
  return (
    <span
      style={{
        backgroundImage: "linear-gradient(120deg, currentColor 35%, #ffffff 50%, currentColor 65%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: "none", // Clears inherited text-shadow that breaks the background-clip mask
        ...style,
      }}
      className={`animate-shiny-text inline-block ${className}`}
    >
      {children || text}
    </span>
  );
}
