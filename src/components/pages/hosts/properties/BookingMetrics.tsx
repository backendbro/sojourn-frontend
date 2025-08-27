// import React, { useEffect, useState } from "react";
// import {
//   ArrowTrendingUpIcon,
//   ArrowTrendingDownIcon,
//   CalendarIcon,
//   CurrencyDollarIcon,
//   UsersIcon,
//   BuildingOfficeIcon,
//   PlusIcon,
// } from "@heroicons/react/24/outline";

// /** Data (unchanged) */
// const bookingMetrics = [
//   {
//     id: 1,
//     title: "Total Bookings",
//     value: "1,247",
//     change: "+12.5%",
//     changeType: "increase",
//     comparison: "vs 1,108 last month",
//     icon: CalendarIcon,
//     color: "blue",
//   },
//   {
//     id: 2,
//     title: "Revenue Generated",
//     value: "₦8,562,450",
//     change: "+8.2%",
//     changeType: "increase",
//     comparison: "vs ₦7,912,300 last month",
//     icon: CurrencyDollarIcon,
//     color: "green",
//   },
//   {
//     id: 3,
//     title: "Unique Guests",
//     value: "892",
//     change: "+15.3%",
//     changeType: "increase",
//     comparison: "vs 774 last month",
//     icon: UsersIcon,
//     color: "purple",
//   },
//   {
//     id: 4,
//     title: "Active Properties",
//     value: "12",
//     change: "+2",
//     changeType: "increase",
//     comparison: "vs 10 last month",
//     icon: BuildingOfficeIcon,
//     color: "orange",
//   },
// ];

// /** Color palette (based on your tailwind config + reasonable matches) */
// const palette = {
//   primary500: "#ef4444",
//   gray900: "#111827",
//   gray600: "#4b5563",
//   gray500: "#6b7280",
//   gray300: "#d1d5db",
//   gray50: "#f9fafb",
//   success600: "#16a34a",
//   red600: "#ef4444",

//   // approximations for blue/green/purple/orange variants used in the metric chips
//   blue50: "#eff6ff",
//   blue600: "#2563eb",
//   blue200: "#bfdbfe",

//   green50: "#f0fdf4", // matches success.50
//   green600: "#16a34a",
//   green200: "#bbf7d0",

//   purple50: "#f5f3ff",
//   purple600: "#7c3aed",
//   purple200: "#d6bcfa",

//   orange50: "#fff7ed",
//   orange600: "#d97706",
//   orange200: "#fed7aa",
// };

// /** Helper to return inline styles for the colored icon chip */
// function getChipStyle(color: string): React.CSSProperties {
//   switch (color) {
//     case "blue":
//       return {
//         backgroundColor: palette.blue50,
//         color: palette.blue600,
//         border: `1px solid ${palette.blue200}`,
//       };
//     case "green":
//       return {
//         backgroundColor: palette.green50,
//         color: palette.green600,
//         border: `1px solid ${palette.green200}`,
//       };
//     case "purple":
//       return {
//         backgroundColor: palette.purple50,
//         color: palette.purple600,
//         border: `1px solid ${palette.purple200}`,
//       };
//     case "orange":
//       return {
//         backgroundColor: palette.orange50,
//         color: palette.orange600,
//         border: `1px solid ${palette.orange200}`,
//       };
//     default:
//       return {
//         backgroundColor: palette.gray50,
//         color: palette.gray600,
//         border: `1px solid ${palette.gray300}`,
//       };
//   }
// }

// /** Inline styles reused throughout the component */
// const styles: { [k: string]: React.CSSProperties } = {
//   container: { display: "flex", flexDirection: "column", gap: 24 },
//   headerRow: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 16,
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//   },
//   headerTitle: {
//     margin: 0,
//     fontSize: 20,
//     fontWeight: 600,
//     color: palette.gray900,
//   },
//   headerSubtitle: {
//     marginTop: 4,
//     marginBottom: 0,
//     fontSize: 13,
//     color: palette.gray600,
//   },
//   headerControls: { display: "flex", gap: 12, alignItems: "center" },

//   select: {
//     fontSize: 14,
//     border: `1px solid ${palette.gray300}`,
//     borderRadius: 10,
//     padding: "6px 10px",
//     outline: "none",
//     backgroundColor: "#fff",
//   },

//   buttonPrimary: {
//     display: "inline-flex",
//     alignItems: "center",
//     gap: 8,
//     backgroundColor: palette.primary500,
//     color: "#fff",
//     border: "none",
//     padding: "8px 12px",
//     borderRadius: 8,
//     fontSize: 14,
//     cursor: "pointer",
//     boxShadow: "0 6px 18px -8px rgba(239,68,68,0.45)",
//   },

//   /** Grid containers will have dynamic gridTemplateColumns applied inline at render time */
//   card: {
//     padding: 20,
//     borderRadius: 12,
//     background: "#fff",
//     border: `1px solid ${palette.gray300}`,
//     boxShadow:
//       "0 4px 25px -5px rgba(0,0,0,0.08), 0 10px 10px -5px rgba(0,0,0,0.04)",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     minHeight: 110,
//   },

//   metricTopRow: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },

//   chipBase: {
//     padding: 8,
//     borderRadius: 8,
//     display: "inline-flex",
//     alignItems: "center",
//     justifyContent: "center",
//     minWidth: 36,
//     minHeight: 36,
//   },

//   changeRow: { display: "flex", alignItems: "center", gap: 6 },

//   metricTitle: {
//     margin: 0,
//     fontSize: 13,
//     color: palette.gray600,
//     fontWeight: 500,
//   },
//   metricValue: {
//     margin: 0,
//     fontSize: 26,
//     color: palette.gray900,
//     fontWeight: 700,
//   },
//   metricComparison: { margin: 0, fontSize: 12, color: palette.gray500 },

//   smallCardTitle: {
//     margin: 0,
//     fontSize: 13,
//     color: palette.gray600,
//     fontWeight: 500,
//     marginBottom: 8,
//   },
//   smallCardValue: {
//     margin: 0,
//     fontSize: 20,
//     color: palette.gray900,
//     fontWeight: 700,
//   },
//   smallCardMeta: {
//     margin: 0,
//     fontSize: 12,
//     color: palette.gray500,
//     marginTop: 6,
//   },

//   /** Responsive helper fallback */
//   headerLeftWrap: { display: "flex", flexDirection: "column", gap: 4 },
// };

// /** Responsive hook: returns number of columns for the metrics grid and stats grid */
// function useResponsiveCols() {
//   const [width, setWidth] = useState<number | null>(null);
//   useEffect(() => {
//     function update() {
//       if (typeof window !== "undefined") setWidth(window.innerWidth);
//     }
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);

//   // Default breakpoints similar to Tailwind: md = 768, lg = 1024
//   const metricsCols =
//     width === null ? 4 : width < 768 ? 1 : width < 1024 ? 2 : 4;
//   const statsCols = width === null ? 3 : width < 768 ? 1 : 3;
//   return { metricsCols, statsCols };
// }

// /** Main component */
// export default function BookingMetrics(): JSX.Element {
//   const { metricsCols, statsCols } = useResponsiveCols();

//   // inline grid styles computed
//   const metricsGridStyle: React.CSSProperties = {
//     display: "grid",
//     gridTemplateColumns: `repeat(${metricsCols}, 1fr)`,
//     gap: 24,
//   };

//   const statsGridStyle: React.CSSProperties = {
//     display: "grid",
//     gridTemplateColumns: `repeat(${statsCols}, 1fr)`,
//     gap: 24,
//   };

//   return (
//     <div style={styles.container}>
//       {/* Section Header */}
//       <div
//         style={{
//           ...styles.headerRow,
//           // on wide screens behave like row; we'll use a small adaptive trick:
//           flexDirection: "row",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <div style={styles.headerLeftWrap}>
//           <h2 style={styles.headerTitle}>Booking Metrics</h2>
//           <p style={styles.headerSubtitle}>
//             Performance overview from account creation to current day
//           </p>
//         </div>

//         <div style={styles.headerControls}>
//           <select style={styles.select} aria-label="time range">
//             <option>This Month</option>
//             <option>Last Month</option>
//             <option>Last 3 Months</option>
//             <option>This Year</option>
//           </select>

//           <button style={styles.buttonPrimary} type="button">
//             <PlusIcon style={{ width: 18, height: 18 }} />
//             <span style={{ lineHeight: 1 }}>Create a Listing</span>
//           </button>
//         </div>
//       </div>

//       {/* Metrics Grid */}
//       <div style={metricsGridStyle}>
//         {bookingMetrics.map((metric) => {
//           const Icon = metric.icon;
//           const chipStyle = {
//             ...styles.chipBase,
//             ...getChipStyle(metric.color),
//           };

//           const changeIsIncrease = metric.changeType === "increase";

//           return (
//             <div key={metric.id} style={styles.card}>
//               <div style={styles.metricTopRow}>
//                 <div style={chipStyle}>
//                   <Icon style={{ width: 20, height: 20 }} />
//                 </div>

//                 <div style={styles.changeRow}>
//                   {changeIsIncrease ? (
//                     <ArrowTrendingUpIcon
//                       style={{
//                         width: 16,
//                         height: 16,
//                         color: palette.success600,
//                       }}
//                     />
//                   ) : (
//                     <ArrowTrendingDownIcon
//                       style={{ width: 16, height: 16, color: palette.red600 }}
//                     />
//                   )}
//                   <span
//                     style={{
//                       fontSize: 13,
//                       fontWeight: 500,
//                       color: changeIsIncrease
//                         ? palette.success600
//                         : palette.red600,
//                     }}
//                   >
//                     {metric.change}
//                   </span>
//                 </div>
//               </div>

//               <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//                 <h3 style={styles.metricTitle}>{metric.title}</h3>
//                 <p style={styles.metricValue}>{metric.value}</p>
//                 <p style={styles.metricComparison}>{metric.comparison}</p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Additional Stats Row */}
//       <div style={statsGridStyle}>
//         <div style={styles.card}>
//           <h3 style={styles.smallCardTitle}>Average Booking Value</h3>
//           <p style={styles.smallCardValue}>₦6,875</p>
//           <p style={styles.smallCardMeta}>+5.2% from last month</p>
//         </div>

//         <div style={styles.card}>
//           <h3 style={styles.smallCardTitle}>Occupancy Rate</h3>
//           <p style={styles.smallCardValue}>78.5%</p>
//           <p style={styles.smallCardMeta}>+3.1% from last month</p>
//         </div>

//         <div style={styles.card}>
//           <h3 style={styles.smallCardTitle}>Guest Satisfaction</h3>
//           <p style={styles.smallCardValue}>4.8/5</p>
//           <p style={styles.smallCardMeta}>Based on 892 reviews</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  BuildingOfficeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { me, getProperties } from "@/http/api";

/**
 * BookingMetrics (self-contained)
 *
 * - Fetches properties internally (no props required)
 * - Computes totals: bookings, revenue, unique guests, active properties
 * - Computes small stats: avg booking value, occupancy (approx), guest satisfaction
 * - Uses an embedded `previousMonth` object to compute percent/absolute deltas (replace values with your real last-month numbers if desired)
 */

/* ---------- formatting helpers ---------- */
function formatNumber(n: number): string {
  return n.toLocaleString();
}

function formatCurrency(n: number): string {
  if (n == null || Number.isNaN(n)) return "₦0";
  return "₦" + Math.round(n).toLocaleString();
}

function formatPercentChange(current: number, previous?: number) {
  if (previous == null || previous === 0) return null;
  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(1)}%`;
}

function formatAbsoluteChange(current: number, previous?: number) {
  if (previous == null) return null;
  const diff = current - previous;
  const sign = diff >= 0 ? "+" : "";
  return `${sign}${formatNumber(Math.abs(diff))}`;
}

/* ---------- palette & styles (kept inline for portability) ---------- */
const palette = {
  primary500: "#ef4444",
  gray900: "#111827",
  gray600: "#4b5563",
  gray500: "#6b7280",
  gray300: "#d1d5db",
  gray50: "#f9fafb",
  success600: "#16a34a",
  red600: "#ef4444",

  blue50: "#eff6ff",
  blue600: "#2563eb",
  blue200: "#bfdbfe",

  green50: "#f0fdf4",
  green600: "#16a34a",
  green200: "#bbf7d0",

  purple50: "#f5f3ff",
  purple600: "#7c3aed",
  purple200: "#d6bcfa",

  orange50: "#fff7ed",
  orange600: "#d97706",
  orange200: "#fed7aa",
};

const styles: { [k: string]: React.CSSProperties } = {
  container: { display: "flex", flexDirection: "column", gap: 24 },
  headerRow: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "flex-start",
  },
  headerTitle: {
    margin: 0,
    fontSize: 30,
    fontWeight: 600,
    color: palette.gray900,
  },
  headerSubtitle: { margin: 0, fontSize: 13, color: palette.gray600 },

  metricsGrid: { display: "grid", gap: 24 },
  card: {
    padding: 20,
    borderRadius: 12,
    background: "#fff",
    border: `1px solid ${palette.gray300}`,
    boxShadow: "0 4px 25px -5px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 110,
  },
  metricTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chipBase: {
    padding: 8,
    borderRadius: 8,
    minWidth: 36,
    minHeight: 36,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  metricTitle: {
    margin: 0,
    fontSize: 13,
    color: palette.gray600,
    fontWeight: 500,
  },
  metricValue: {
    margin: 0,
    fontSize: 26,
    color: palette.gray900,
    fontWeight: 700,
  },
  metricComparison: { margin: 0, fontSize: 12, color: palette.gray500 },

  statsGrid: { display: "grid", gap: 24 },
  smallCardTitle: {
    margin: 0,
    fontSize: 13,
    color: palette.gray600,
    fontWeight: 500,
    marginBottom: 8,
  },
  smallCardValue: {
    margin: 0,
    fontSize: 20,
    color: palette.gray900,
    fontWeight: 700,
  },
  smallCardMeta: {
    margin: 0,
    fontSize: 12,
    color: palette.gray500,
    marginTop: 6,
  },
};

/* returns chip style based on color string */
function getChipStyle(color: string): React.CSSProperties {
  switch (color) {
    case "blue":
      return {
        backgroundColor: palette.blue50,
        color: palette.blue600,
        border: `1px solid ${palette.blue200}`,
        marginBottom: 10,
      };
    case "green":
      return {
        backgroundColor: palette.green50,
        color: palette.green600,
        border: `1px solid ${palette.green200}`,
        marginBottom: 10,
      };
    case "purple":
      return {
        backgroundColor: palette.purple50,
        color: palette.purple600,
        border: `1px solid ${palette.purple200}`,
        marginBottom: 10,
      };
    case "orange":
      return {
        backgroundColor: palette.orange50,
        color: palette.orange600,
        border: `1px solid ${palette.orange200}`,
        marginBottom: 10,
      };
    default:
      return {
        backgroundColor: palette.gray50,
        color: palette.gray600,
        border: `1px solid ${palette.gray300}`,
        marginBottom: 10,
      };
  }
}

/* ---------- BookingMetrics component ---------- */

export default function BookingMetrics(): JSX.Element {
  // local state
  const [loading, setLoading] = useState(false);
  const [propertiesRaw, setPropertiesRaw] = useState<any[] | null>(null);

  // you fetch properties the same way you already did in your other component
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const user = await me("hosts");
        if (cancelled) return;

        const id = user?.host?.id ?? null;
        if (!id) return;

        const propsRes = await getProperties(id);
        if (cancelled) return;

        // normalize to array if needed
        const list = Array.isArray(propsRes)
          ? propsRes
          : propsRes?.data ?? propsRes?.properties ?? propsRes?.items ?? [];
        setPropertiesRaw(list);
        console.log(list);
      } catch (err) {
        console.error("Failed to load properties:", err);
        setPropertiesRaw([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // ---- previousMonth default values (embedded) ----
  // Replace these values with your real last-month numbers if/when available.
  const previousMonth = {
    totalBookings: 1108,
    revenue: 7912300,
    uniqueGuests: 774,
    activeProperties: 10,
    avgBookingValue: 6545,
    occupancyRate: 75.4,
    guestSatisfaction: { rating: 4.6, reviews: 800 },
  };

  // ---- compute aggregates from propertiesRaw ----
  const computed = useMemo(() => {
    const props = Array.isArray(propertiesRaw) ? propertiesRaw : [];

    const totalBookings = props.reduce(
      (s, p) => s + (Number(p.bookings) || 0),
      0
    );
    const revenue = props.reduce((s, p) => s + (Number(p.revenue) || 0), 0);

    // unique guests fallback: use p.uniqueGuests if available else bookings
    const uniqueGuests = props.reduce(
      (s, p) => s + (Number(p.uniqueGuests) || Number(p.bookings) || 0),
      0
    );

    const activeProperties = props.reduce(
      (s, p) =>
        s +
        (p.activeStatus === "active" ||
        p.status === "active" ||
        p.active === true
          ? 1
          : 0),
      0
    );

    const avgBookingValue = totalBookings > 0 ? revenue / totalBookings : 0;

    // occupancy: prefer provided occupancyRate per property average, otherwise approximate
    const occupancyVals = props
      .map((p) => (p.occupancyRate ? Number(p.occupancyRate) : null))
      .filter((v) => v !== null) as number[];

    let occupancyRate: number | null = null;
    if (occupancyVals.length > 0) {
      occupancyRate =
        occupancyVals.reduce((a, b) => a + b, 0) / occupancyVals.length;
    } else {
      // approximate occupancy: bookings / (activeProperties * periodDays) * 100
      // choose 30 days as default rolling period (this is an approximation — replace with bookings nights for accurate rate)
      const denom = activeProperties * 30;
      if (denom > 0) {
        occupancyRate = Math.min(100, (totalBookings / denom) * 100);
      } else {
        occupancyRate = null;
      }
    }

    // guest satisfaction: weighted by property.reviews if present
    const totalReviewCount = props.reduce(
      (s, p) => s + (Number(p.reviews) || 0),
      0
    );
    const ratingWeightedSum = props.reduce(
      (s, p) => s + (Number(p.rating) || 0) * (Number(p.reviews) || 0),
      0
    );
    const guestSatisfactionRating =
      totalReviewCount > 0 ? ratingWeightedSum / totalReviewCount : null;

    return {
      totalBookings,
      revenue,
      uniqueGuests,
      activeProperties,
      avgBookingValue,
      occupancyRate,
      guestSatisfactionRating,
      totalReviewCount,
    };
  }, [propertiesRaw]);

  // ---- build metrics for the UI ----
  const metrics = [
    {
      id: "bookings",
      title: "Total Bookings",
      value: formatNumber(computed.totalBookings),
      change: formatPercentChange(
        computed.totalBookings,
        previousMonth.totalBookings
      ),
      changeType:
        computed.totalBookings >= (previousMonth.totalBookings ?? 0)
          ? "increase"
          : "decrease",
      comparison: `vs ${formatNumber(previousMonth.totalBookings)} last month`,
      icon: CalendarIcon,
      color: "blue",
    },
    {
      id: "revenue",
      title: "Revenue Generated",
      value: formatCurrency(computed.revenue),
      change: formatPercentChange(computed.revenue, previousMonth.revenue),
      changeType:
        computed.revenue >= (previousMonth.revenue ?? 0)
          ? "increase"
          : "decrease",
      comparison: `vs ${formatCurrency(previousMonth.revenue)} last month`,
      icon: CurrencyDollarIcon,
      color: "green",
    },
    {
      id: "guests",
      title: "Unique Guests",
      value: formatNumber(computed.uniqueGuests),
      change: formatPercentChange(
        computed.uniqueGuests,
        previousMonth.uniqueGuests
      ),
      changeType:
        computed.uniqueGuests >= (previousMonth.uniqueGuests ?? 0)
          ? "increase"
          : "decrease",
      comparison: `vs ${formatNumber(previousMonth.uniqueGuests)} last month`,
      icon: UsersIcon,
      color: "purple",
    },
    {
      id: "active",
      title: "Active Properties",
      value: formatNumber(computed.activeProperties),
      change: formatAbsoluteChange(
        computed.activeProperties,
        previousMonth.activeProperties
      ),
      changeType:
        computed.activeProperties >= (previousMonth.activeProperties ?? 0)
          ? "increase"
          : "decrease",
      comparison: `vs ${formatNumber(
        previousMonth.activeProperties
      )} last month`,
      icon: BuildingOfficeIcon,
      color: "orange",
    },
  ];

  // small stats
  const avgBookingValue = computed.avgBookingValue;
  const avgBookingValueStr = avgBookingValue
    ? formatCurrency(avgBookingValue)
    : formatCurrency(0);
  const avgBookingValueChange = formatPercentChange(
    avgBookingValue,
    previousMonth.avgBookingValue
  );

  const occupancyRate = computed.occupancyRate;
  const occupancyRateStr =
    occupancyRate != null ? `${occupancyRate.toFixed(1)}%` : "N/A";
  const occupancyChange = formatPercentChange(
    occupancyRate ?? 0,
    previousMonth.occupancyRate
  );

  const guestSatRating =
    computed.guestSatisfactionRating ??
    previousMonth.guestSatisfaction.rating ??
    null;
  const guestSatReviews =
    computed.totalReviewCount || previousMonth.guestSatisfaction.reviews || 0;

  // responsive: default metricsCols = 4 on wide, 2 on medium, 1 on small
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  useEffect(() => {
    function update() {
      if (typeof window !== "undefined") setWindowWidth(window.innerWidth);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const metricsCols =
    windowWidth === null
      ? 4
      : windowWidth < 768
      ? 1
      : windowWidth < 1024
      ? 2
      : 4;

  const metricsGridStyle: React.CSSProperties = {
    ...styles.metricsGrid,
    gridTemplateColumns: `repeat(${metricsCols}, minmax(0, 1fr))`,
  };

  const statsGridStyle: React.CSSProperties = {
    ...styles.statsGrid,
    gridTemplateColumns: `repeat(3, minmax(0, 1fr))`,
  };

  // render
  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div>
          <h1 style={styles.headerTitle}>Welcome back</h1>
          <p style={styles.headerSubtitle}>
            Performance overview (computed from your properties)
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={metricsGridStyle}>
        {metrics.map((metric) => {
          const Icon = (metric.icon as any) ?? CalendarIcon;
          const chipStyle = {
            ...styles.chipBase,
            ...getChipStyle(metric.color),
          };

          const changeIsIncrease = metric.changeType === "increase";
          const changeLabel = metric.change ?? null;

          return (
            <div key={metric.id} style={styles.card}>
              <div style={styles.metricTopRow}>
                <div style={chipStyle}>
                  <Icon style={{ width: 20, height: 20 }} />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {changeLabel ? (
                    <>
                      {changeIsIncrease ? (
                        <ArrowTrendingUpIcon
                          style={{
                            width: 16,
                            height: 16,
                            color: palette.success600,
                          }}
                        />
                      ) : (
                        <ArrowTrendingDownIcon
                          style={{
                            width: 16,
                            height: 16,
                            color: palette.red600,
                          }}
                        />
                      )}
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: changeIsIncrease
                            ? palette.success600
                            : palette.red600,
                        }}
                      >
                        {changeLabel}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <h3 style={styles.metricTitle}>{metric.title}</h3>
                <p style={styles.metricValue}>{metric.value}</p>
                <p style={styles.metricComparison}>{metric.comparison ?? ""}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Stats */}
      <div style={statsGridStyle}>
        <div style={styles.card}>
          <h3 style={styles.smallCardTitle}>Average Booking Value</h3>
          <p style={styles.smallCardValue}>{avgBookingValueStr}</p>
          <p style={styles.smallCardMeta}>
            {avgBookingValueChange ?? "+0%"} from last month
          </p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.smallCardTitle}>Occupancy Rate</h3>
          <p style={styles.smallCardValue}>{occupancyRateStr}</p>
          <p style={styles.smallCardMeta}>
            {occupancyChange ?? "+0%"} from last month
          </p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.smallCardTitle}>Guest Satisfaction</h3>
          <p style={styles.smallCardValue}>
            {guestSatRating ? `${guestSatRating.toFixed(1)}/5` : "N/A"}
          </p>
          <p style={styles.smallCardMeta}>
            Based on {formatNumber(guestSatReviews)} reviews
          </p>
        </div>
      </div>
    </div>
  );
}
