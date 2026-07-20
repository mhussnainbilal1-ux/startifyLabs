type LogoProps = {
    textColor?: string;
  };
  
  export const Logo = ({ textColor }: LogoProps) => {
    const background =
    textColor ?? "linear-gradient(135deg, #000000 0%, #00bcd4 100%)";
  
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            boxShadow: "0 8px 24px rgba(0, 188, 212, 0.35)",
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background,
              color: "#fff",
              fontSize: "18px",
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            &lt;/&gt;
          </span>
        </div>
  
        <h1
          style={{
            margin: 0,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "30px",
            fontWeight: 800,
            letterSpacing: "1px",
            lineHeight: 1,
            color: textColor,
            background: textColor
              ? undefined
              : "linear-gradient(135deg, #000000 0%, #00bcd4 100%)",
            WebkitBackgroundClip: textColor ? undefined : "text",
            WebkitTextFillColor: textColor
              ? textColor
              : "transparent",
          }}
        >
          STARTIFY{" "}
          <span
            style={{
              fontWeight: 500,
            }}
          >
            LABS
          </span>
        </h1>
      </div>
    );
  };