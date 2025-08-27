"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Wallet, ArrowUpRight, X } from "lucide-react";
import { getWalletById, me } from "../../../http/api";
import { computePaymentSummary } from "./summary";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
// at top of balance-card.jsx
import MakeWithdraw from "./make-withdrawal";

const BalanceCard = () => {
  const [isLg, setIsLg] = useState(false);
  const [hostId, setHostId] = useState(null);
  const [walletData, setWalletData] = useState(null); // null until loaded
  const [loading, setLoading] = useState(false);
  const [loadingWallet, setLoadingWallet] = useState(false);

  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const overlayRef = useRef(null);

  // you already have user info in redux; using it can be handy:
  const hostIds = useSelector((state) => state.user.me?.host?.id);

  // breakpoint listener (runs once)
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

  // load current user (host id) ONCE on mount
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const result = await me("hosts");
        if (cancelled) return;
        const id = result?.host?.id ?? null;
        setHostId(id);
      } catch (err) {
        console.error("Failed to load current user:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // fetch wallet whenever hostId becomes available
  useEffect(() => {
    if (!hostId) return; // don't fetch until we have hostId
    let cancelled = false;

    const getTotalHostEarnings = async () => {
      setLoadingWallet(true);
      try {
        const res = await getWalletById(hostId);
        if (cancelled) return;
        setWalletData(res);
      } catch (err) {
        console.error(`Failed to fetch host earnings for ${hostId}:`, err);
      } finally {
        if (!cancelled) setLoadingWallet(false);
      }
    };

    getTotalHostEarnings();

    return () => {
      cancelled = true;
    };
  }, [hostId]);

  // memoize summary so it doesn't recompute every render unnecessarily
  const summary = useMemo(
    () => computePaymentSummary(walletData?.payments, { now: new Date() }),
    [walletData]
  );

  // modal: prevent background scroll while open & close with Esc
  useEffect(() => {
    if (isWithdrawOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e) => {
        if (e.key === "Escape") setIsWithdrawOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [isWithdrawOpen]);

  const openWithdraw = () => setIsWithdrawOpen(true);
  const closeWithdraw = () => setIsWithdrawOpen(false);

  // Colors / styles (unchanged)
  const primary600 = "#dc2626";
  const primary700 = "#b91c1c";
  const primary800 = "#991b1b";

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
    width: "8rem",
    height: "8rem",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    transform: "translate(-4rem, -4rem)",
  };

  const patternCircleBR = {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "6rem",
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
    padding: "2rem",
    borderRadius: "0.75rem",
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

  const decorativeLarge = {
    width: "8rem",
    height: "8rem",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: "50%",
    backdropFilter: "blur(6px)",
  };

  const hoverLighten = (e, level = 0.3) => {
    e.currentTarget.style.backgroundColor = `rgba(255,255,255,${level})`;
  };
  const hoverReset = (e, level = 0.2) => {
    e.currentTarget.style.backgroundColor = `rgba(255,255,255,${level})`;
  };

  // safe display value
  const balanceDisplay =
    walletData && walletData.walletBalance !== undefined
      ? walletData.walletBalance
      : loadingWallet
      ? "Loading..."
      : "—";

  return (
    <div style={rootStyle}>
      <div style={gradientStyle} />
      <div style={patternWrapperStyle}>
        <div style={patternCircleTL} />
        <div style={patternCircleBR} />
      </div>

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
              <p style={balanceStyle}>{balanceDisplay}</p>
              <p style={lastUpdatedStyle}>
                Last updated: {walletData ? "Just now" : "Not available"}
              </p>
            </div>

            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button
                type="button"
                aria-label="Withdraw"
                style={withdrawBtnBase}
                onMouseEnter={(e) => hoverLighten(e, 0.3)}
                onMouseLeave={(e) => hoverReset(e, 0.2)}
                onClick={openWithdraw}
                disabled={!walletData && !hostId}
              >
                <ArrowUpRight
                  style={{ width: "1rem", height: "1rem", color: "#ffffff" }}
                />
                <span>Withdraw</span>
              </button>
            </div>
          </div>

          <div
            style={{ display: isLg ? "block" : "none", marginLeft: "1.5rem" }}
          >
            <div style={decorativeLarge} />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isWithdrawOpen && (
        <div
          ref={overlayRef}
          onClick={(e) => {
            // close when clicking the overlay (but not modal content)
            if (e.target === overlayRef.current) closeWithdraw();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* dim */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* modal panel */}
          <div
            role="dialog"
            aria-modal="true"
            className="relative z-10 w-[min(720px,95vw)] max-h-[90vh] overflow-auto bg-white rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold">Withdraw</h3>
              <button
                aria-label="Close withdraw modal"
                onClick={closeWithdraw}
                className="p-2 rounded hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Pass wallet id if available, otherwise fallback to hostId */}
            <div>
              <MakeWithdraw id={hostIds} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BalanceCard;
