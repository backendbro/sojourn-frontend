import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import TransactionTable from "./TransactionTable";
import BalanceCard from "./balance-card";
import TransactionFilters from "./TransactionFilters";
import { getWalletById, me } from "../../../http/api";
import { computePaymentSummary } from "./summary";

export default function WalletPage(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [hostId, setHostId] = useState<number | null>(null);
  const [walletData, setWalletData] = useState<any>(null); // keep as any for now
  const [loading, setLoading] = useState(false);
  const [loadingWallet, setLoadingWallet] = useState(false);

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

  useEffect(() => {
    if (!hostId) return;
    let cancelled = false;

    const getTotalHostEarnings = async () => {
      setLoadingWallet(true);
      try {
        const id = hostId.toString();
        const res = await getWalletById(id);
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

  // ensure we pass an array to the summary function (avoid undefined)
  const payments = walletData?.payments ?? [];
  const summary = useMemo(
    () => computePaymentSummary(payments, { now: new Date() }),
    [payments]
  );

  // safe destructure with defaults (these are the fields you gave)
  const {
    earningsPctIncrease = 0,
    lastMonthEarnings = 0,
    lastMonthWithdrawals = 0,
    pendingTotal = 0,
    thisMonthEarnings = 0,
    thisMonthWithdrawals = 0,
    totalEarnings = 0,
    totalWithdrawals = 0,
    withdrawalsPctIncrease = 0,
  } = summary ?? {};

  // currency formatter for Naira, falls back gracefully in browsers
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    }).format(value ?? 0);

  // format percentage with sign
  const formatPct = (n: number) => {
    const sign = n > 0 ? "+" : n < 0 ? "" : "";
    return `${sign}${Number(n).toFixed(1)}%`;
  };

  // pick small arrow icon + color for the small caption line
  const renderPctBadge = (pct: number) => {
    if (pct > 0) {
      return (
        <span
          style={{ display: "flex", alignItems: "center", color: "#16a34a" }}
        >
          <ArrowUpRight
            style={{ width: "1rem", height: "1rem", marginRight: 6 }}
          />
          {formatPct(pct)}
        </span>
      );
    }
    if (pct < 0) {
      return (
        <span
          style={{ display: "flex", alignItems: "center", color: "#dc2626" }}
        >
          <ArrowDownRight
            style={{ width: "1rem", height: "1rem", marginRight: 6 }}
          />
          {formatPct(pct)}
        </span>
      );
    }
    // zero or no-change
    return (
      <span style={{ display: "flex", alignItems: "center", color: "#6b7280" }}>
        {formatPct(0)}
      </span>
    );
  };

  // large trend square (top-right of each card) - uses trending icons
  const TrendSquare = ({ pct }: { pct: number }) => {
    const common = {
      width: "3rem",
      height: "3rem",
      borderRadius: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    } as React.CSSProperties;

    if (pct > 0)
      return (
        <div style={{ ...common, backgroundColor: "#dcfce7" }}>
          <TrendingUp
            style={{ width: "1.5rem", height: "1.5rem", color: "#16a34a" }}
          />
        </div>
      );
    if (pct < 0)
      return (
        <div style={{ ...common, backgroundColor: "#fee2e2" }}>
          <TrendingDown
            style={{ width: "1.5rem", height: "1.5rem", color: "#dc2626" }}
          />
        </div>
      );
    return (
      <div style={{ ...common, backgroundColor: "#f3f4f6" }}>
        <CreditCard
          style={{ width: "1.5rem", height: "1.5rem", color: "#4b5563" }}
        />
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        animation: "fadeIn 0.5s ease-in-out",
      }}
    >
      {/* Page Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              color: "#111827",
            }}
          >
            Wallet
          </h1>
          <p style={{ color: "#4b5563", marginTop: "0.25rem" }}>
            Manage your transactions and withdrawals
          </p>
        </div>
      </div>

      {/* Balance Card */}
      <BalanceCard />

      {/* Quick Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {/* Total Earnings */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "0.75rem",
            boxShadow:
              "0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)",
            border: "1px solid #f3f4f6",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#4b5563",
                }}
              >
                Total Earnings
              </p>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#111827",
                }}
              >
                {formatCurrency(totalEarnings)}
              </p>
            </div>
            <TrendSquare pct={earningsPctIncrease} />
          </div>

          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
              fontSize: "0.875rem",
              color:
                earningsPctIncrease > 0
                  ? "#16a34a"
                  : earningsPctIncrease < 0
                  ? "#dc2626"
                  : "#6b7280",
            }}
          >
            {renderPctBadge(earningsPctIncrease)}
            <span style={{ marginLeft: 8 }}>{`from last month (${formatCurrency(
              lastMonthEarnings
            )})`}</span>
          </div>
        </div>

        {/* Total Withdrawals */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "0.75rem",
            boxShadow:
              "0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)",
            border: "1px solid #f3f4f6",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#4b5563",
                }}
              >
                Total Withdrawals
              </p>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#111827",
                }}
              >
                {formatCurrency(totalWithdrawals)}
              </p>
            </div>
            <TrendSquare pct={withdrawalsPctIncrease} />
          </div>

          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
              fontSize: "0.875rem",
              color:
                withdrawalsPctIncrease > 0
                  ? "#16a34a"
                  : withdrawalsPctIncrease < 0
                  ? "#dc2626"
                  : "#6b7280",
            }}
          >
            {renderPctBadge(withdrawalsPctIncrease)}
            <span style={{ marginLeft: 8 }}>{`${formatCurrency(
              thisMonthWithdrawals
            )} this month (last month: ${formatCurrency(
              lastMonthWithdrawals
            )})`}</span>
          </div>
        </div>

        {/* Pending */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "0.75rem",
            boxShadow:
              "0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)",
            border: "1px solid #f3f4f6",
            padding: "1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#4b5563",
                }}
              >
                Pending
              </p>
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#111827",
                }}
              >
                {formatCurrency(pendingTotal)}
              </p>
            </div>
            <div
              style={{
                width: "3rem",
                height: "3rem",
                backgroundColor: "#f3f4f6",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CreditCard
                style={{ width: "1.5rem", height: "1.5rem", color: "#4b5563" }}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: "1rem",
              fontSize: "0.875rem",
              color: "#4b5563",
            }}
          >
            {pendingTotal > 0
              ? `${formatCurrency(pendingTotal)} pending`
              : "No pending transactions"}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "0.75rem",
          boxShadow:
            "0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)",
          border: "1px solid #f3f4f6",
          padding: "1.5rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <Search
              style={{
                position: "absolute",
                left: "0.75rem",
                top: "50%",
                transform: "translateY(-50%)",
                width: "1.25rem",
                height: "1.25rem",
                color: "#9ca3af",
              }}
            />
            <input
              type="text"
              placeholder="Search by amount, payment type, or date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.75rem 0.5rem 2.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "0.5rem",
                outline: "none",
                transition: "border-color 0.2s ease-in-out",
                fontSize: "0.875rem",
              }}
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              backgroundColor: "#ffffff",
              color: "#374151",
              fontWeight: 500,
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid #d1d5db",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
            <Filter style={{ width: "1rem", height: "1rem" }} />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && <TransactionFilters />}
      </div>

      {/* Transaction Table */}
      <TransactionTable searchQuery={searchQuery} />
    </div>
  );
}
