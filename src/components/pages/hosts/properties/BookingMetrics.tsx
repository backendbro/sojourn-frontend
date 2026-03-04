"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  DollarSign,
  Users,
  Building2,
  TrendingUp,
  TrendingDown,
  Info,
  Plus,
  Star,
  BarChart3,
  Percent,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import {
  me,
  getProperties,
  getBookingsByHostId,
  getReviews,
  getSubscriptionsById,
} from "@/http/api";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { PLANS, PLAN_LISTING_LIMITS } from "@/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

/* ── formatting helpers ── */
function fmtNum(n: number): string {
  return n.toLocaleString();
}

function fmtCurrency(n: number) {
  if (n == null || Number.isNaN(n)) return "₦0";
  return "₦" + Math.round(n).toLocaleString();
}

function fmtPctChange(current: number, previous?: number | null) {
  if (previous == null) return null;
  if (previous === 0) return current === 0 ? "0.0%" : "new";
  const change = ((current - previous) / previous) * 100;
  return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
}

/* ── date helpers ── */
const MS_PER_DAY = 86_400_000;

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 1);
}
function daysInMonth(d: Date) {
  return Math.round((endOfMonth(d).getTime() - startOfMonth(d).getTime()) / MS_PER_DAY);
}
function toDateSafe(v: any): Date | null {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

function bookingNightsOverlap(ci: Date, co: Date, ps: Date, pe: Date) {
  const s = Math.max(ci.getTime(), ps.getTime());
  const e = Math.min(co.getTime(), pe.getTime());
  return e - s <= 0 ? 0 : Math.ceil((e - s) / MS_PER_DAY);
}

function extractAmount(b: any): number {
  for (const v of [
    b?.payment?.amount, b?.payment?.amountPaid, b?.payment?.total,
    b?.amount, b?.total, b?.amountPaid, b?.cryptoPaymentAmount, b?.payment?.paidAmount,
  ]) {
    const n = Number(v);
    if (!Number.isNaN(n) && n !== 0) return n;
  }
  return 0;
}

function aggregateBookings(bookings: any[], pStart: Date, pEnd: Date) {
  let total = 0, revenue = 0, nights = 0, reviewCount = 0, ratingSum = 0;
  const guests = new Set<string>();

  for (const b of bookings) {
    const ci = toDateSafe(b?.checkIn ?? b?.check_in_date ?? b?.createdAt ?? b?.created_at);
    const co = toDateSafe(b?.checkOut ?? b?.check_out_date);
    const created = toDateSafe(b?.createdAt ?? b?.created_at);

    const inPeriod =
      (ci && ci >= pStart && ci < pEnd) || (created && created >= pStart && created < pEnd);
    if (!inPeriod) continue;
    if (String(b?.status ?? "").toLowerCase().includes("cancel")) continue;

    total++;
    revenue += extractAmount(b);
    if (ci && co) nights += bookingNightsOverlap(ci, co, pStart, pEnd);
    else nights++;
    if (b?.guestId) guests.add(b.guestId);
    if (b?.guest?.id) guests.add(b.guest.id);
    if (Array.isArray(b.reviews)) {
      reviewCount += b.reviews.length;
      for (const r of b.reviews) {
        const rv = Number(r?.rating ?? r?.score ?? 0);
        if (!Number.isNaN(rv) && rv > 0) ratingSum += rv;
      }
    }
  }
  return { total, revenue, nights, uniqueGuests: guests.size, reviewCount, ratingSum };
}

function reviewKey(r: any) {
  if (!r) return "";
  return r.id ? String(r.id) : `${r.bookingId ?? ""}:${r.userId ?? ""}:${r.propertyId ?? ""}:${r.createdAt ?? ""}`;
}
function dedupeReviews(reviews: any[]) {
  const seen = new Set<string>();
  return reviews.filter((r) => { const k = reviewKey(r); if (!k || seen.has(k)) return false; seen.add(k); return true; });
}
function aggregateReviews(reviews: any[], propIds: string[]) {
  const deduped = dedupeReviews(reviews);
  const propSet = new Set(propIds);
  let totalCount = 0, totalSum = 0;
  const perProp: Record<string, { count: number; sum: number }> = {};
  for (const r of deduped) {
    const pid = r?.propertyId ?? r?.property_id ?? r?.property?.id;
    if (!pid || !propSet.has(pid)) continue;
    const rating = Number(r?.rating ?? r?.score ?? 0);
    if (Number.isNaN(rating) || rating <= 0) continue;
    totalCount++; totalSum += rating;
    if (!perProp[pid]) perProp[pid] = { count: 0, sum: 0 };
    perProp[pid].count++; perProp[pid].sum += rating;
  }
  return { totalCount, totalSum, perProp };
}

/* ── Info tooltip button ── */
function InfoTip({ text }: { text: string }) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button type="button" className="ml-1.5 text-gray-400 hover:text-gray-600 transition-colors">
            <Info className="w-3.5 h-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[240px] text-xs leading-relaxed">
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

/* ── Main Component ── */
export default function BookingMetrics(): JSX.Element {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [propertiesRaw, setPropertiesRaw] = useState<any[] | null>(null);
  const [bookingsRaw, setBookingsRaw] = useState<any[] | null>(null);
  const [subscriptionRaw, setSubscriptionRaw] = useState<any | null>(null);
  const [hostName, setHostName] = useState("");
  const [ratingsOpen, setRatingsOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const user = await me("hosts");
        if (cancelled) return;
        const id = user?.host?.id ?? null;
        setHostName(user?.host?.firstName ?? "");
        if (!id) {
          setPropertiesRaw([]);
          setBookingsRaw([]);
          setSubscriptionRaw(null);
          return;
        }
        const [propsRes, bookingsRes, subRes] = await Promise.allSettled([
          getProperties(id),
          getBookingsByHostId(id),
          getSubscriptionsById(id),
        ]);
        if (cancelled) return;
        const list = propsRes.status === "fulfilled"
          ? Array.isArray(propsRes.value) ? propsRes.value : propsRes.value?.data ?? propsRes.value?.properties ?? propsRes.value?.items ?? []
          : [];
        setPropertiesRaw(list);
        const bList = bookingsRes.status === "fulfilled"
          ? Array.isArray(bookingsRes.value) ? bookingsRes.value : bookingsRes.value?.data ?? bookingsRes.value?.bookings ?? bookingsRes.value?.items ?? []
          : [];
        setBookingsRaw(bList);
        setSubscriptionRaw(subRes.status === "fulfilled" ? subRes.value : null);
      } catch {
        setPropertiesRaw([]);
        setBookingsRaw([]);
        setSubscriptionRaw(null);
      }
      finally { if (!cancelled) setLoading(false); }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const { data: reviewsData } = useQuery({ queryKey: ["reviews"], queryFn: getReviews });

  const planInfo = useMemo(() => {
    const sub = subscriptionRaw;
    const planPaidFor = sub
      ? PLANS.find(
          (p) => p.price.annually.id === sub.planId || p.price.monthly.id === sub.planId
        )
      : PLANS.find((p) => p.name === "Basic");
    const planName = planPaidFor?.name ?? "Basic";
    const limit = PLAN_LISTING_LIMITS[planName] ?? 1;
    const props = Array.isArray(propertiesRaw) ? propertiesRaw : [];
    const count = props.length;
    return { planName, limit, count, atLimit: limit < 999 && count >= limit };
  }, [subscriptionRaw, propertiesRaw]);

  const computed = useMemo(() => {
    const props = Array.isArray(propertiesRaw) ? propertiesRaw : [];
    const bookings = Array.isArray(bookingsRaw) ? bookingsRaw : [];
    const activeProperties = props.reduce((s, p) => s + (["active", "approved"].includes(p?.activeStatus ?? p?.status ?? "") || p?.active ? 1 : 0), 0);
    const now = new Date();
    const thisStart = startOfMonth(now), thisEnd = endOfMonth(now);
    const prev = new Date(thisStart); prev.setMonth(prev.getMonth() - 1);
    const prevStart = startOfMonth(prev), prevEnd = endOfMonth(prev);
    const aggThis = aggregateBookings(bookings, thisStart, thisEnd);
    const aggPrev = aggregateBookings(bookings, prevStart, prevEnd);
    const hasData = bookings.length > 0 && (aggThis.total > 0 || aggPrev.total > 0);
    const totalBookings = hasData ? aggThis.total : props.reduce((s, p) => s + (Number(p.bookings) || 0), 0);
    const revenue = hasData ? aggThis.revenue : props.reduce((s, p) => s + (Number(p.revenue) || 0), 0);
    const uniqueGuests = hasData ? aggThis.uniqueGuests : props.reduce((s, p) => s + (Number(p.uniqueGuests) || Number(p.bookings) || 0), 0);
    const avgBookingValue = totalBookings > 0 ? Math.ceil(revenue / totalBookings) : 0;
    let occupancyRate: number | null = null;
    if (hasData) {
      const denom = activeProperties > 0 ? activeProperties * daysInMonth(thisStart) : 0;
      occupancyRate = denom > 0 ? Math.min(100, (aggThis.nights / denom) * 100) : aggThis.nights > 0 ? null : 0;
    }
    const reviewsArr = Array.isArray(reviewsData) ? reviewsData : reviewsData?.data ?? [];
    const embeddedReviews: any[] = [];
    for (const b of bookings) if (Array.isArray(b.reviews)) embeddedReviews.push(...b.reviews);
    const propIds = props.map((p) => p?.id).filter(Boolean) as string[];
    const { totalCount, totalSum, perProp } = aggregateReviews([...reviewsArr, ...embeddedReviews], propIds);
    const guestSat = totalCount > 0 ? totalSum / totalCount : null;
    const perPropertyList = props.map((p) => {
      const r = p?.id && perProp[p.id] ? perProp[p.id] : { count: 0, sum: 0 };
      return { id: p?.id, title: p?.title ?? p?.name ?? "Untitled", reviewCount: r.count, avgRating: r.count > 0 ? r.sum / r.count : null };
    });
    return {
      totalBookings, revenue, uniqueGuests, activeProperties,
      prevTotalBookings: hasData ? aggPrev.total : null,
      prevRevenue: hasData ? aggPrev.revenue : null,
      prevUniqueGuests: hasData ? aggPrev.uniqueGuests : null,
      avgBookingValue, occupancyRate, guestSat, totalReviewCount: totalCount, perPropertyList,
    };
  }, [propertiesRaw, bookingsRaw, reviewsData]);

  const today = new Date();
  const greeting = today.getHours() < 12 ? "Good morning" : today.getHours() < 18 ? "Good afternoon" : "Good evening";
  const dateStr = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  const metrics = [
    {
      title: "Total Bookings", value: fmtNum(computed.totalBookings),
      change: fmtPctChange(computed.totalBookings, computed.prevTotalBookings),
      up: computed.totalBookings >= (computed.prevTotalBookings ?? 0),
      comparison: computed.prevTotalBookings != null ? `vs ${fmtNum(computed.prevTotalBookings)} last month` : "No previous month data",
      icon: CalendarCheck, color: "bg-blue-50 text-blue-600 ring-blue-100",
      bg: "bg-blue-50/60",
      info: "Total number of confirmed bookings for this month. Cancelled bookings are excluded. Compared month-over-month to show your growth trend.",
    },
    {
      title: "Revenue Generated", value: fmtCurrency(computed.revenue),
      change: fmtPctChange(computed.revenue, computed.prevRevenue),
      up: computed.revenue >= (computed.prevRevenue ?? 0),
      comparison: computed.prevRevenue != null ? `vs ${fmtCurrency(computed.prevRevenue)} last month` : "No previous month data",
      icon: DollarSign, color: "bg-emerald-50 text-emerald-600 ring-emerald-100",
      bg: "bg-emerald-50/60",
      info: "Total earnings from all bookings this month. Includes all payment types (card, crypto, credits). This is your gross revenue before any fees.",
    },
    {
      title: "Unique Guests", value: fmtNum(computed.uniqueGuests),
      change: fmtPctChange(computed.uniqueGuests, computed.prevUniqueGuests),
      up: computed.uniqueGuests >= (computed.prevUniqueGuests ?? 0),
      comparison: computed.prevUniqueGuests != null ? `vs ${fmtNum(computed.prevUniqueGuests)} last month` : "No previous month data",
      icon: Users, color: "bg-violet-50 text-violet-600 ring-violet-100",
      bg: "bg-violet-50/60",
      info: "Number of distinct guests who made bookings this month. Repeat guests are counted once. A growing number means you're attracting new visitors.",
    },
    {
      title: "Active Properties", value: fmtNum(computed.activeProperties),
      change: null, up: true,
      comparison: "Currently listed and accepting bookings",
      icon: Building2, color: "bg-amber-50 text-amber-600 ring-amber-100",
      bg: "bg-amber-50/60",
      info: "Properties currently set to 'active' status and visible to guests. Deactivated or pending-approval properties are not included.",
    },
  ];

  const secondaryStats = [
    {
      title: "Avg. Booking Value", value: fmtCurrency(computed.avgBookingValue),
      sub: "Per booking this month",
      icon: BarChart3, color: "text-blue-500",
      bg: "bg-sky-50/60",
      info: "Your total revenue divided by the number of bookings this month. Higher values suggest premium pricing or longer stays.",
    },
    {
      title: "Occupancy Rate",
      value: computed.occupancyRate != null ? `${computed.occupancyRate.toFixed(1)}%` : "N/A",
      sub: "Booked nights vs available",
      icon: Percent, color: "text-emerald-500",
      bg: "bg-orange-50/60",
      info: "Percentage of available nights that were booked this month. Calculated as: (booked nights) / (active properties × days in month). Higher is better.",
    },
    {
      title: "Guest Satisfaction",
      value: computed.guestSat ? `${computed.guestSat.toFixed(1)}/5` : "N/A",
      sub: computed.totalReviewCount > 0 ? `Based on ${fmtNum(computed.totalReviewCount)} reviews` : "No reviews yet",
      icon: Star, color: "text-amber-500",
      bg: "bg-rose-50/60",
      info: "Average rating across all reviews for your properties. Ratings are on a 1-5 scale. Guests leave reviews after their stay.",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-gray-200 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-medium text-gray-500">{dateStr}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
            {greeting}{hostName ? `, ${hostName}` : ""}!
          </h1>
          <p className="mt-1 text-sm sm:text-base text-gray-500 max-w-xl">
            Here&apos;s how your properties are performing this month. Keep an eye on your metrics and take action.
          </p>
        </div>
        {planInfo.atLimit ? (
          <button
            onClick={() => router.push("/hosts/dashboard/my-plan")}
            className="shrink-0 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all active:scale-[0.97] shadow-md shadow-amber-200"
          >
            <Plus className="w-4 h-4" />
            Upgrade to add more listings
          </button>
        ) : (
          <button
            onClick={() => router.push("/hosts/dashboard/properties/create")}
            className="shrink-0 inline-flex items-center gap-2 bg-primary hover:bg-red-600 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all active:scale-[0.97] shadow-md shadow-red-200"
          >
            <Plus className="w-4 h-4" />
            Create a Listing
          </button>
        )}
      </div>

      {/* ── Main Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          const changeLabel = m.change;
          const isUp = m.up;
          return (
            <div
              key={m.title}
              className={`relative ${m.bg} rounded-2xl border border-gray-100 p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] transition-shadow group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ring-1 ${m.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {changeLabel && (
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                    isUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
                  }`}>
                    {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {changeLabel}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">{m.title}</h3>
                <InfoTip text={m.info} />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 tabular-nums">{m.value}</p>
              <p className="text-xs text-gray-400 mt-1.5">{m.comparison}</p>
            </div>
          );
        })}
      </div>

      {/* ── Secondary Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {secondaryStats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className={`${s.bg} rounded-2xl border border-gray-100 p-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] transition-shadow`}>
              <div className="flex items-center gap-3 mb-3">
                <Icon className={`w-5 h-5 ${s.color}`} />
                <div className="flex items-center">
                  <h3 className="text-sm font-medium text-gray-600">{s.title}</h3>
                  <InfoTip text={s.info} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 tabular-nums">{s.value}</p>
              <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* ── Per-property Ratings ── */}
      {computed.perPropertyList.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] overflow-hidden">
          <button
            onClick={() => setRatingsOpen(!ratingsOpen)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-gray-900 text-sm">Per-property ratings</span>
              <span className="text-xs text-gray-400 ml-1">({computed.perPropertyList.length} properties)</span>
            </div>
            {ratingsOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>

          {ratingsOpen && (
            <div className="border-t border-gray-100 divide-y divide-gray-50">
              {computed.perPropertyList.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => p.id && router.push(`/hosts/dashboard/properties/${p.id}`)}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{p.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {p.reviewCount > 0 ? `${p.reviewCount} review${p.reviewCount !== 1 ? "s" : ""}` : "No reviews yet"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 ml-4">
                    {p.avgRating ? (
                      <>
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-gray-900 text-sm">{p.avgRating.toFixed(1)}</span>
                      </>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
