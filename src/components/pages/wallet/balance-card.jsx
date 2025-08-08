import React, { useState, useEffect } from "react";
import { Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

const BalanceCard = () => {
  // detect 'lg' breakpoint (matches your Tailwind config: lg = 1025px)
  const [isLg, setIsLg] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1025px)");
    const handler = (e) => setIsLg(e.matches);
    setIsLg(mq.matches);
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else mq.addListener(handler);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handler);
      else mq.removeListener(handler);
    };
  }, []);

  // Colors (from your tailwind config)
  const primary600 = "#dc2626";
  const primary700 = "#b91c1c";
  const primary800 = "#991b1b";

  // Inline style objects
  const rootStyle = {
    position: "relative",
    overflow: "hidden",
    borderRadius: "0.75rem",
  };

  const gradientStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(90deg, ${primary600}, ${primary700}, ${primary800})`,
    zIndex: 0,
  };

  const patternWrapperStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    zIndex: 1,
    pointerEvents: "none",
  };

  const patternCircleTL = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "8rem", // 32
    height: "8rem",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    transform: "translate(-4rem, -4rem)",
  };

  const patternCircleBR = {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "6rem", // 24
    height: "6rem",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    transform: "translate(3rem, 3rem)",
  };

  const cardStyle = {
    position: "relative",
    zIndex: 2,
    backgroundColor: "transparent",
    color: "#ffffff",
    padding: "2rem", // p-8
    borderRadius: "0.75rem",
    // shadow-soft fallback (from your config)
    boxShadow:
      "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
  };

  const iconBoxStyle = {
    width: "3rem",
    height: "3rem",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(6px)",
  };

  const titleStyle = {
    fontSize: "1.125rem",
    fontWeight: 500,
    color: "rgba(255,255,255,0.9)",
    margin: 0,
  };

  const subtitleStyle = {
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.7)",
    margin: 0,
  };

  const balanceStyle = {
    fontSize: "2.25rem",
    fontWeight: 700,
    margin: "0 0 0.5rem 0",
    color: "white",
  };

  const lastUpdatedStyle = {
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.7)",
    margin: 0,
  };

  // button base + hover simulated via events
  const btnBase = {
    color: "#ffffff",
    fontWeight: 500,
    padding: "0.75rem 1.5rem",
    borderRadius: "0.75rem",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    border: "none",
    cursor: "pointer",
    transition: "background 0.15s ease",
    backdropFilter: "blur(6px)",
  };

  const withdrawBtnBase = {
    ...btnBase,
    backgroundColor: "rgba(255,255,255,0.2)",
  };

  const addFundsBtnBase = {
    ...btnBase,
    backgroundColor: "rgba(255,255,255,0.1)",
  };

  // decorative large circle (shown for lg screens)
  const decorativeLarge = {
    width: "8rem",
    height: "8rem",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: "50%",
    backdropFilter: "blur(6px)",
  };

  // helper to set hover styles via DOM events (simple inline solution)
  const hoverLighten = (e, level = 0.3) => {
    e.currentTarget.style.backgroundColor = `rgba(255,255,255,${level})`;
  };
  const hoverReset = (e, level = 0.2) => {
    e.currentTarget.style.backgroundColor = `rgba(255,255,255,${level})`;
  };

  return (
    <div style={rootStyle}>
      {/* gradient background */}
      <div style={gradientStyle} />

      {/* subtle white pattern */}
      <div style={patternWrapperStyle}>
        <div style={patternCircleTL} />
        <div style={patternCircleBR} />
      </div>

      {/* main card */}
      <div style={cardStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <div style={iconBoxStyle}>
                <Wallet
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    color: "#ffffff",
                  }}
                />
              </div>

              <div>
                <h2 style={titleStyle}>Wallet Balance</h2>
                <p style={subtitleStyle}>Available for withdrawal</p>
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <p style={balanceStyle}>₦1,386.80</p>
              <p style={lastUpdatedStyle}>Last updated: Just now</p>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button
                type="button"
                aria-label="Withdraw"
                style={withdrawBtnBase}
                onMouseEnter={(e) => hoverLighten(e, 0.3)}
                onMouseLeave={(e) => hoverReset(e, 0.2)}
              >
                <ArrowUpRight
                  style={{ width: "1rem", height: "1rem", color: "#ffffff" }}
                />
                <span>Withdraw</span>
              </button>

              <button
                type="button"
                aria-label="Add funds"
                style={addFundsBtnBase}
                onMouseEnter={(e) => hoverLighten(e, 0.2)}
                onMouseLeave={(e) => hoverReset(e, 0.1)}
              >
                <ArrowDownRight
                  style={{ width: "1rem", height: "1rem", color: "#ffffff" }}
                />
                <span>Add Funds</span>
              </button>
            </div>
          </div>

          {/* Decorative element only shown at 'lg' sizes */}
          <div
            style={{ display: isLg ? "block" : "none", marginLeft: "1.5rem" }}
          >
            <div style={decorativeLarge} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
