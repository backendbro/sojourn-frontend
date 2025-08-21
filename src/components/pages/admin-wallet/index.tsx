import React, { useState } from "react";
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

export default () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

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

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
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
              transition: "background-color 0.2s ease-in-out",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#f9fafb")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#ffffff")
            }
          >
            <Download style={{ width: "1rem", height: "1rem" }} />
            <span>Export</span>
          </button>
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
                ₦2,000.00
              </p>
            </div>
            <div
              style={{
                width: "3rem",
                height: "3rem",
                backgroundColor: "#dcfce7",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUp
                style={{ width: "1.5rem", height: "1.5rem", color: "#16a34a" }}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
              fontSize: "0.875rem",
              color: "#16a34a",
            }}
          >
            <ArrowUpRight
              style={{ width: "1rem", height: "1rem", marginRight: "0.25rem" }}
            />
            <span>+12.5% from last month</span>
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
                ₦613.20
              </p>
            </div>
            <div
              style={{
                width: "3rem",
                height: "3rem",
                backgroundColor: "#fee2e2",
                borderRadius: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingDown
                style={{ width: "1.5rem", height: "1.5rem", color: "#dc2626" }}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
              fontSize: "0.875rem",
              color: "#dc2626",
            }}
          >
            <ArrowDownRight
              style={{ width: "1rem", height: "1rem", marginRight: "0.25rem" }}
            />
            <span>₦547.50 this month</span>
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
                ₦0.00
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
            No pending transactions
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
};
