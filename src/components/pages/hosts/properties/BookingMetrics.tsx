"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { me, getProperties, getBookingsByHostId, getReviews } from "@/http/api";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

/* ---------- formatting helpers ---------- */
function formatNumber(n: number): string {
  return n.toLocaleString();
}

function formatCurrency(n: number) {
  if (n == null || Number.isNaN(n)) return "₦0";
  return "₦" + Math.round(n).toLocaleString();
}

/**
 * Formats percent change for display.
 * Rules:
 *  - If previous == null -> returns null
 *  - If previous === 0 && current === 0 -> "0.0%"
 *  - If previous === 0 && current > 0 -> "new"
 *  - Otherwise compute ((current - previous) / previous) * 100 and return sign with 1 decimal place
 */
function formatPercentChangeSafe(current: number, previous?: number | null) {
  if (previous == null) return null;
  if (previous === 0) {
    if (current === 0) return "0.0%";
    return "new";
  }
  const change = ((current - previous) / previous) * 100;
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(1)}%`;
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
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
    padding: "16px",
  },

  headerRow: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  headerTitle: {
    margin: 0,
    fontSize: "clamp(24px, 5vw, 34px)",
    fontWeight: 700,
    background: "linear-gradient(90deg, #ef4444 0%, #7c3aed 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    lineHeight: 1.05,
  },

  headerSubtitle: {
    margin: "6px 0 0 0",
    fontSize: "clamp(12px, 2.5vw, 13.5px)",
    color: palette.gray600,
    maxWidth: 760,
  },

  buttonPrimary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: palette.primary500,
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: 8,
    fontSize: 14,
    cursor: "pointer",
    boxShadow: "0 6px 18px -8px rgba(239,68,68,0.45)",
    whiteSpace: "nowrap",
  },

  headerLeft: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    minWidth: 0,
  },

  metricsGrid: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },
  card: {
    padding: 16,
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
    fontSize: "clamp(12px, 3vw, 13px)",
    color: palette.gray600,
    fontWeight: 500,
  },
  metricValue: {
    margin: 0,
    fontSize: "clamp(20px, 5vw, 26px)",
    color: palette.gray900,
    fontWeight: 700,
  },
  metricComparison: {
    margin: 0,
    fontSize: "clamp(11px, 2.5vw, 12px)",
    color: palette.gray500,
  },

  statsGrid: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  },
  smallCardTitle: {
    margin: 0,
    fontSize: "clamp(12px, 3vw, 13px)",
    color: palette.gray600,
    fontWeight: 500,
    marginBottom: 8,
  },
  smallCardValue: {
    margin: 0,
    fontSize: "clamp(18px, 4.5vw, 20px)",
    color: palette.gray900,
    fontWeight: 700,
  },
  smallCardMeta: {
    margin: 0,
    fontSize: "clamp(11px, 2.5vw, 12px)",
    color: palette.gray500,
    marginTop: 6,
  },
};

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

/* ---------- Utilities for dates & booking aggregation ---------- */

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}
function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0, 0);
}
function daysInMonth(date: Date) {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
}

function toDateSafe(v: any): Date | null {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

function bookingNightsOverlap(
  bookingCheckIn: Date,
  bookingCheckOut: Date,
  periodStart: Date,
  periodEnd: Date
) {
  const start = Math.max(bookingCheckIn.getTime(), periodStart.getTime());
  const end = Math.min(bookingCheckOut.getTime(), periodEnd.getTime());
  const diffMs = end - start;
  if (diffMs <= 0) return 0;
  return Math.ceil(diffMs / MS_PER_DAY);
}

function extractBookingAmount(b: any): number {
  const tryNums = [
    b?.payment?.amount,
    b?.payment?.amountPaid,
    b?.payment?.total,
    b?.amount,
    b?.total,
    b?.amountPaid,
    b?.cryptoPaymentAmount,
    b?.payment?.paidAmount,
  ];
  for (const v of tryNums) {
    const n = Number(v);
    if (!Number.isNaN(n) && n !== 0) return n;
  }
  return 0;
}

function aggregateBookingsForPeriod(
  bookings: any[],
  periodStart: Date,
  periodEnd: Date
) {
  let totalBookings = 0;
  let revenue = 0;
  let bookedNights = 0;
  let uniqueGuestsSet = new Set<string>();
  let reviewCount = 0;
  let ratingWeightedSum = 0;

  for (const b of bookings) {
    const checkIn = toDateSafe(
      b?.checkIn ?? b?.check_in_date ?? b?.createdAt ?? b?.created_at
    );
    const checkOut = toDateSafe(b?.checkOut ?? b?.check_out_date);
    const createdAt = toDateSafe(b?.createdAt ?? b?.created_at);

    const inPeriod =
      (checkIn && checkIn >= periodStart && checkIn < periodEnd) ||
      (createdAt && createdAt >= periodStart && createdAt < periodEnd);

    if (!inPeriod) continue;

    const status = String(b?.status ?? "").toLowerCase();
    if (status.includes("cancel")) continue;

    totalBookings += 1;

    const amount = extractBookingAmount(b);
    revenue += amount;

    if (checkIn && checkOut) {
      bookedNights += bookingNightsOverlap(
        checkIn,
        checkOut,
        periodStart,
        periodEnd
      );
    } else {
      bookedNights += 1;
    }

    if (b?.guestId) uniqueGuestsSet.add(b.guestId);
    if (b?.guest?.id) uniqueGuestsSet.add(b.guest.id);

    if (Array.isArray(b.reviews)) {
      reviewCount += b.reviews.length;
      for (const r of b.reviews) {
        const rv = Number(r?.rating ?? r?.score ?? 0);
        if (!Number.isNaN(rv) && rv > 0) {
          ratingWeightedSum += rv;
        }
      }
    }
  }

  const uniqueGuests = uniqueGuestsSet.size;

  return {
    totalBookings,
    revenue,
    bookedNights,
    uniqueGuests,
    reviewCount,
    ratingWeightedSum,
  };
}

/* ---------- Reviews helpers (dedupe, aggregate) ---------- */

/** create a stable key for a review to dedupe */
function reviewKey(r: any) {
  if (!r) return "";
  if (r.id) return String(r.id);
  // fallback to combination
  return `${r.bookingId ?? r.booking_id ?? ""}:${r.userId ?? r.user_id ?? ""}:${
    r.propertyId ?? r.property_id ?? ""
  }:${r.createdAt ?? r.created_at ?? ""}`;
}

/** dedupe array of reviews by the stable key */
function dedupeReviews(reviews: any[]) {
  const seen = new Set<string>();
  const out: any[] = [];
  for (const r of reviews) {
    const k = reviewKey(r);
    if (!k) continue;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(r);
  }
  return out;
}

/** aggregate reviews array filtered to propertyIds; returns totals + per-property map */
function aggregateReviewsForProperties(reviews: any[], propertyIds: string[]) {
  const deduped = dedupeReviews(reviews);
  const propSet = new Set(propertyIds);
  let totalCount = 0;
  let totalSum = 0;
  const perProperty: Record<string, { count: number; sum: number }> = {};

  for (const r of deduped) {
    const pid = r?.propertyId ?? r?.property_id ?? r?.property?.id;
    if (!pid) continue;
    if (!propSet.has(pid)) continue;
    const rating = Number(r?.rating ?? r?.score ?? 0);
    if (Number.isNaN(rating) || rating <= 0) continue;

    totalCount += 1;
    totalSum += rating;
    if (!perProperty[pid]) perProperty[pid] = { count: 0, sum: 0 };
    perProperty[pid].count += 1;
    perProperty[pid].sum += rating;
  }

  return { totalCount, totalSum, perProperty };
}

/* ---------- BookingMetrics component (uses getReviews via useQuery) ---------- */

export default function BookingMetrics(): JSX.Element {
  const router = useRouter();

  // local state
  const [loading, setLoading] = useState(false);
  const [propertiesRaw, setPropertiesRaw] = useState<any[] | null>(null);
  const [bookingsRaw, setBookingsRaw] = useState<any[] | null>(null);

  // fetch properties and bookings for logged-in host
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const user = await me("hosts");
        if (cancelled) return;

        const id = user?.host?.id ?? null;
        if (!id) {
          setPropertiesRaw([]);
          setBookingsRaw([]);
          return;
        }

        const [propsRes, bookingsRes] = await Promise.allSettled([
          getProperties(id),
          getBookingsByHostId(id),
        ]);
        if (cancelled) return;

        const list =
          propsRes.status === "fulfilled"
            ? Array.isArray(propsRes.value)
              ? propsRes.value
              : propsRes.value?.data ??
                propsRes.value?.properties ??
                propsRes.value?.items ??
                []
            : [];
        setPropertiesRaw(list);

        const bookingsList =
          bookingsRes.status === "fulfilled"
            ? Array.isArray(bookingsRes.value)
              ? bookingsRes.value
              : bookingsRes.value?.data ??
                bookingsRes.value?.bookings ??
                bookingsRes.value?.items ??
                []
            : [];
        setBookingsRaw(bookingsList);
      } catch (err) {
        console.error("Failed to load properties/bookings:", err);
        setPropertiesRaw([]);
        setBookingsRaw([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // fetch reviews with react-query using your existing endpoint
  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });

  // compute aggregates (current month & previous month) with booking-level logic and reviews
  const computed = useMemo(() => {
    const props = Array.isArray(propertiesRaw) ? propertiesRaw : [];
    const bookings = Array.isArray(bookingsRaw) ? bookingsRaw : [];

    const activeProperties = props.reduce((s, p) => {
      const isActive =
        p?.activeStatus === "active" ||
        p?.status === "active" ||
        p?.status === "approved" ||
        p?.active === true;
      return s + (isActive ? 1 : 0);
    }, 0);

    const now = new Date();
    const thisMonthStart = startOfMonth(now);
    const thisMonthEnd = endOfMonth(now);

    const prev = new Date(thisMonthStart.getTime());
    prev.setMonth(prev.getMonth() - 1);
    const prevMonthStart = startOfMonth(prev);
    const prevMonthEnd = endOfMonth(prev);

    const aggThis = aggregateBookingsForPeriod(
      bookings,
      thisMonthStart,
      thisMonthEnd
    );
    const aggPrev = aggregateBookingsForPeriod(
      bookings,
      prevMonthStart,
      prevMonthEnd
    );

    const hasBookingData =
      bookings.length > 0 &&
      (aggThis.totalBookings > 0 || aggPrev.totalBookings > 0);

    const totalBookings = hasBookingData
      ? aggThis.totalBookings
      : props.reduce((s, p) => s + (Number(p.bookings) || 0), 0);
    const revenue = hasBookingData
      ? aggThis.revenue
      : props.reduce((s, p) => s + (Number(p.revenue) || 0), 0);

    const prevTotalBookings = hasBookingData ? aggPrev.totalBookings : null;
    const prevRevenue = hasBookingData ? aggPrev.revenue : null;

    const avgBookingValue =
      totalBookings > 0 ? Math.ceil(revenue / totalBookings) : 0;

    let occupancyRate: number | null = null;
    if (hasBookingData) {
      const bookedNights = aggThis.bookedNights;
      const daysInPeriod = daysInMonth(thisMonthStart);
      const denom = activeProperties > 0 ? activeProperties * daysInPeriod : 0;
      occupancyRate =
        denom > 0
          ? Math.min(100, (bookedNights / denom) * 100)
          : bookedNights > 0
          ? null
          : 0;
    } else {
      const occupancyVals = props
        .map((p) => (p.occupancyRate ? Number(p.occupancyRate) : null))
        .filter((v) => v !== null) as number[];

      if (occupancyVals.length > 0) {
        occupancyRate =
          occupancyVals.reduce((a, b) => a + b, 0) / occupancyVals.length;
      } else {
        const denom = activeProperties * 30;
        occupancyRate =
          denom > 0 ? Math.min(100, (totalBookings / denom) * 100) : null;
      }
    }

    // --- Reviews: combine endpoint reviews + booking-embedded reviews, dedupe, filter to host properties
    const reviewsFromEndpoint = Array.isArray(reviewsData)
      ? reviewsData
      : reviewsData?.data ?? reviewsData ?? [];
    // collect booking-level reviews (if any)
    const bookingEmbeddedReviews: any[] = [];
    for (const b of bookings) {
      if (Array.isArray(b.reviews)) {
        for (const r of b.reviews) {
          bookingEmbeddedReviews.push(r);
        }
      }
    }

    // combine and dedupe
    const combinedReviews = [...reviewsFromEndpoint, ...bookingEmbeddedReviews];
    const propertyIds = props.map((p) => p?.id).filter(Boolean) as string[];
    const { totalCount, totalSum, perProperty } = aggregateReviewsForProperties(
      combinedReviews,
      propertyIds
    );

    const guestSatisfactionRating =
      totalCount > 0 ? totalSum / totalCount : null;

    const uniqueGuests = hasBookingData
      ? aggThis.uniqueGuests
      : props.reduce(
          (s, p) => s + (Number(p.uniqueGuests) || Number(p.bookings) || 0),
          0
        );

    // per-property breakdown (map to property titles)
    const perPropertyList = props.map((p) => {
      const pid = p?.id;
      const r =
        pid && perProperty[pid] ? perProperty[pid] : { count: 0, sum: 0 };
      const avg = r.count > 0 ? r.sum / r.count : null;
      return {
        id: pid,
        title: p?.title ?? p?.name ?? "Untitled",
        reviewCount: r.count,
        avgRating: avg,
      };
    });

    return {
      totalBookings,
      revenue,
      uniqueGuests,
      activeProperties,

      prevTotalBookings,
      prevRevenue,

      avgBookingValue,
      occupancyRate,
      guestSatisfactionRating,
      totalReviewCount: totalCount,
      perPropertyList,
    };
  }, [propertiesRaw, bookingsRaw, reviewsData]);

  // create metrics array (UI-ready), show friendly text when previous data is unknown
  const metrics = [
    {
      id: "bookings",
      title: "Total Bookings",
      value: formatNumber(computed.totalBookings),
      change: formatPercentChangeSafe(
        computed.totalBookings,
        computed.prevTotalBookings
      ),
      changeType:
        computed.prevTotalBookings == null
          ? "neutral"
          : computed.totalBookings >= (computed.prevTotalBookings ?? 0)
          ? "increase"
          : "decrease",
      comparison:
        computed.prevTotalBookings != null
          ? `vs ${formatNumber(computed.prevTotalBookings)} last month`
          : "No previous month data",
      icon: CalendarIcon,
      color: "blue",
    },
    {
      id: "revenue",
      title: "Revenue Generated",
      value: formatCurrency(computed.revenue),
      change: formatPercentChangeSafe(computed.revenue, computed.prevRevenue),
      changeType:
        computed.prevRevenue == null
          ? "neutral"
          : computed.revenue >= (computed.prevRevenue ?? 0)
          ? "increase"
          : "decrease",
      comparison:
        computed.prevRevenue != null
          ? `vs ${formatCurrency(computed.prevRevenue)} last month`
          : "No previous month data",
      icon: CurrencyDollarIcon,
      color: "green",
    },
    {
      id: "active",
      title: "Active Properties",
      value: formatNumber(computed.activeProperties),
      change: null,
      changeType: "neutral",
      comparison: "Based on current property statuses",
      icon: BuildingOfficeIcon,
      color: "orange",
    },
  ];

  // small stats
  const avgBookingValue = computed.avgBookingValue;
  const avgBookingValueStr = avgBookingValue
    ? formatCurrency(avgBookingValue)
    : formatCurrency(0);
  const avgBookingValueChange = formatPercentChangeSafe(avgBookingValue, null);

  const occupancyRate = computed.occupancyRate;
  const occupancyRateStr =
    occupancyRate != null ? `${occupancyRate.toFixed(1)}%` : "N/A";
  const occupancyChange = formatPercentChangeSafe(occupancyRate ?? 0, null);

  const guestSatRating = computed.guestSatisfactionRating ?? null;
  const guestSatReviews = computed.totalReviewCount || 0;

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div style={styles.headerLeft}>
          <h1 style={styles.headerTitle}>Welcome back — great to see you!</h1>
          <p style={styles.headerSubtitle}>
            Here’s your performance snapshot — quick insights from your
            properties so you can take action fast.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            style={styles.buttonPrimary}
            type="button"
            onClick={() => router.push("/hosts/dashboard/properties/create")}
            aria-label="Create a new listing"
          >
            <PlusIcon style={{ width: 18, height: 18 }} />
            <span style={{ lineHeight: 1 }}>Create a Listing</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={styles.metricsGrid}>
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
      <div style={styles.statsGrid}>
        <div style={styles.card}>
          <h3 style={styles.smallCardTitle}>Average Booking Value</h3>
          <p style={styles.smallCardValue}>{avgBookingValueStr}</p>
          <p style={styles.smallCardMeta}>
            {avgBookingValueChange ?? "No previous month data"} from last month
          </p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.smallCardTitle}>Occupancy Rate</h3>
          <p style={styles.smallCardValue}>{occupancyRateStr}</p>
          <p style={styles.smallCardMeta}>
            {occupancyChange ?? "No previous month data"} from last month
          </p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.smallCardTitle}>Guest Satisfaction</h3>
          <p style={styles.smallCardValue}>
            {guestSatRating ? `${guestSatRating.toFixed(1)}/5` : "N/A"}
          </p>
          <p style={styles.smallCardMeta}>
            {guestSatReviews > 0
              ? `Based on ${formatNumber(guestSatReviews)} reviews`
              : "No reviews yet"}
          </p>
        </div>
      </div>

      {/* Per-property breakdown (reviews) */}
      <div style={{ marginTop: 18 }}>
        <h3 style={{ margin: "0 0 8px 0", fontSize: 15 }}>
          Per-property ratings
        </h3>
        <div style={{ display: "grid", gap: 8 }}>
          {Array.isArray(computed.perPropertyList) &&
            computed.perPropertyList.map((p) => (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 12,
                  borderRadius: 8,
                  border: "1px solid #ececec",
                  background: "#fff",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    {p.reviewCount > 0
                      ? `${p.reviewCount} review(s)`
                      : "No reviews"}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700 }}>
                    {p.avgRating ? p.avgRating.toFixed(1) : "—"}
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>
                    {p.avgRating ? "/5" : ""}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
