"use client";

import React, { useEffect, useState } from "react";
import {
  CalendarCheck,
  MessageSquare,
  Star,
  ClipboardCheck,
  LogIn,
  LogOut,
  Activity,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  me,
  getBookingsByHostId,
  getMessagesByHostId,
  getReviews,
  getProperties,
  getInspections,
} from "@/http/api";
import Link from "next/link";
import hdate from "human-date";

type ActivityItem = {
  id: string;
  icon: React.ElementType;
  accent: string;
  title: string;
  description: string;
  time: Date;
  href: string;
};

const VISIBLE_COUNT = 5;

function safeDate(v: any): Date | null {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

export default function RecentActivity() {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const user = await me("hosts");
        if (cancelled) return;
        const hostId = user?.host?.id;
        if (!hostId) { setActivities([]); return; }

        const [bookingsRes, messagesRes, reviewsRes, propsRes, inspRes] =
          await Promise.allSettled([
            getBookingsByHostId(hostId),
            getMessagesByHostId(hostId),
            getReviews(),
            getProperties(hostId),
            getInspections(hostId),
          ]);

        if (cancelled) return;

        const items: ActivityItem[] = [];

        const bookings: any[] = bookingsRes.status === "fulfilled"
          ? (Array.isArray(bookingsRes.value) ? bookingsRes.value : bookingsRes.value?.data ?? bookingsRes.value?.bookings ?? [])
          : [];
        const messages: any[] = messagesRes.status === "fulfilled"
          ? (Array.isArray(messagesRes.value) ? messagesRes.value : messagesRes.value?.data ?? [])
          : [];
        const allReviews: any[] = reviewsRes.status === "fulfilled"
          ? (Array.isArray(reviewsRes.value) ? reviewsRes.value : reviewsRes.value?.data ?? [])
          : [];
        const properties: any[] = propsRes.status === "fulfilled"
          ? (Array.isArray(propsRes.value) ? propsRes.value : propsRes.value?.data ?? propsRes.value?.properties ?? [])
          : [];
        const inspections: any[] = inspRes.status === "fulfilled"
          ? (Array.isArray(inspRes.value) ? inspRes.value : inspRes.value?.data ?? inspRes.value?.inspections ?? [])
          : [];

        const propIds = new Set(properties.map((p: any) => p.id));
        const propMap = new Map(properties.map((p: any) => [p.id, p.title ?? p.name ?? "Property"]));

        for (const b of bookings) {
          const created = safeDate(b.createdAt ?? b.created_at);
          const checkIn = safeDate(b.checkIn ?? b.check_in_date);
          const checkOut = safeDate(b.checkOut ?? b.check_out_date);
          const guestName = [b.guest?.firstName, b.guest?.lastName].filter(Boolean).join(" ") || "A guest";
          const propTitle = b.property?.title ?? b.propertyTitle ?? propMap.get(b.propertyId) ?? "a property";
          const status = String(b.status ?? "").toLowerCase();

          if (created) {
            if (status.includes("cancel")) {
              items.push({ id: `bk-c-${b.id}`, icon: CalendarCheck, accent: "#EF4444", title: "Booking cancelled", description: `${guestName}'s booking for ${propTitle} was cancelled`, time: created, href: "/hosts/dashboard/bookings" });
            } else {
              items.push({ id: `bk-n-${b.id}`, icon: CalendarCheck, accent: "#3B82F6", title: "New booking", description: `${guestName} booked ${propTitle}`, time: created, href: "/hosts/dashboard/bookings" });
            }
          }
          const now = new Date();
          if (checkIn && checkIn.toDateString() === now.toDateString()) {
            items.push({ id: `bk-ci-${b.id}`, icon: LogIn, accent: "#10B981", title: "Guest checking in today", description: `${guestName} checks into ${propTitle}`, time: checkIn, href: "/hosts/dashboard/bookings" });
          }
          if (checkOut && checkOut.toDateString() === now.toDateString()) {
            items.push({ id: `bk-co-${b.id}`, icon: LogOut, accent: "#F59E0B", title: "Guest checking out today", description: `${guestName} checks out of ${propTitle}`, time: checkOut, href: "/hosts/dashboard/bookings" });
          }
        }

        for (const m of messages) {
          const date = safeDate(m.date ?? m.createdAt ?? m.created_at);
          const guestName = [m.guestFirstName, m.guestLastName].filter(Boolean).join(" ") || "A guest";
          if (date) {
            items.push({ id: `msg-${m.id}`, icon: MessageSquare, accent: "#8B5CF6", title: m.unread ? "New message" : "Message", description: `${guestName}: ${m.title ?? "sent you a message"}`, time: date, href: "/hosts/dashboard/inbox" });
          }
        }

        for (const r of allReviews) {
          const pId = r.propertyId ?? r.property_id ?? r.property?.id;
          if (!pId || !propIds.has(pId)) continue;
          const date = safeDate(r.createdAt ?? r.created_at ?? r.date);
          const rating = Number(r.rating ?? r.score ?? 0);
          const guestName = [r.user?.firstName, r.user?.lastName].filter(Boolean).join(" ") || r.userName || "A guest";
          const propTitle = propMap.get(pId) ?? "your property";
          if (date) {
            items.push({ id: `rev-${r.id ?? `${pId}-${date.getTime()}`}`, icon: Star, accent: "#EAB308", title: `New review${rating > 0 ? ` — ${rating}★` : ""}`, description: `${guestName} reviewed ${propTitle}`, time: date, href: "/hosts/dashboard/properties" });
          }
        }

        for (const ins of inspections) {
          const date = safeDate(ins.createdAt ?? ins.created_at ?? ins.inspectionDate);
          const status = String(ins.status ?? ins.activeStatus ?? "").toLowerCase();
          const propTitle = ins.title ?? ins.name ?? propMap.get(ins.propertyId) ?? "a property";
          if (date) {
            items.push({ id: `ins-${ins.id}`, icon: ClipboardCheck, accent: status.includes("approv") ? "#10B981" : "#F97316", title: `Inspection ${status.includes("approv") ? "approved" : status.includes("reject") ? "rejected" : "submitted"}`, description: propTitle, time: date, href: "/hosts/dashboard/properties" });
          }
        }

        items.sort((a, b) => b.time.getTime() - a.time.getTime());
        setActivities(items);
      } catch (err) {
        console.error("Failed to load activity:", err);
        setActivities([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  const visible = showAll ? activities : activities.slice(0, VISIBLE_COUNT);
  const hasMore = activities.length > VISIBLE_COUNT;

  return (
    <div className="bg-gray-950 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Animated house & nature vector background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

        {/* ── Cityscape / houses silhouette along bottom ── */}
        <svg className="absolute bottom-0 left-0 w-full h-48 sm:h-56" viewBox="0 0 1200 200" fill="none" preserveAspectRatio="xMidYMax slice">
          {/* Ground */}
          <rect x="0" y="180" width="1200" height="20" fill="rgba(255,255,255,0.04)" />
          {/* House 1 - small */}
          <g className="activity-bg-float-2" style={{ transformOrigin: "120px 180px" }}>
            <rect x="80" y="130" width="80" height="50" fill="rgba(255,255,255,0.05)" />
            <polygon points="80,130 120,95 160,130" fill="rgba(255,255,255,0.06)" />
            <rect x="105" y="150" width="18" height="30" fill="rgba(255,255,255,0.03)" />
            <rect x="88" y="142" width="12" height="12" fill="rgba(255,255,255,0.03)" />
            <rect x="138" y="142" width="12" height="12" fill="rgba(255,255,255,0.03)" />
          </g>
          {/* House 2 - tall */}
          <g>
            <rect x="220" y="100" width="70" height="80" fill="rgba(255,255,255,0.05)" />
            <polygon points="220,100 255,65 290,100" fill="rgba(255,255,255,0.07)" />
            <rect x="243" y="145" width="16" height="35" fill="rgba(255,255,255,0.03)" />
            <rect x="228" y="112" width="12" height="12" fill="rgba(255,255,255,0.03)" />
            <rect x="260" y="112" width="12" height="12" fill="rgba(255,255,255,0.03)" />
          </g>
          {/* Building - apartment */}
          <g>
            <rect x="340" y="80" width="60" height="100" fill="rgba(255,255,255,0.05)" />
            <rect x="348" y="90" width="10" height="10" fill="rgba(255,255,255,0.03)" />
            <rect x="363" y="90" width="10" height="10" fill="rgba(255,255,255,0.03)" />
            <rect x="378" y="90" width="10" height="10" fill="rgba(255,255,255,0.03)" />
            <rect x="348" y="108" width="10" height="10" fill="rgba(255,255,255,0.03)" />
            <rect x="363" y="108" width="10" height="10" fill="rgba(255,255,255,0.03)" />
            <rect x="378" y="108" width="10" height="10" fill="rgba(255,255,255,0.03)" />
            <rect x="348" y="126" width="10" height="10" fill="rgba(255,255,255,0.03)" />
            <rect x="363" y="126" width="10" height="10" fill="rgba(255,255,255,0.03)" />
            <rect x="378" y="126" width="10" height="10" fill="rgba(255,255,255,0.03)" />
            <rect x="360" y="150" width="18" height="30" fill="rgba(255,255,255,0.03)" />
          </g>
          {/* House 3 - cozy */}
          <g className="activity-bg-float-1" style={{ transformOrigin: "500px 180px" }}>
            <rect x="460" y="125" width="90" height="55" fill="rgba(255,255,255,0.05)" />
            <polygon points="455,125 505,80 555,125" fill="rgba(255,255,255,0.06)" />
            <rect x="490" y="148" width="20" height="32" fill="rgba(255,255,255,0.03)" />
            <rect x="465" y="138" width="14" height="14" fill="rgba(255,255,255,0.03)" />
            <rect x="530" y="138" width="14" height="14" fill="rgba(255,255,255,0.03)" />
            <rect x="498" y="88" width="4" height="20" fill="rgba(255,255,255,0.05)" />
          </g>
          {/* House 4 - far right */}
          <g>
            <rect x="950" y="120" width="75" height="60" fill="rgba(255,255,255,0.05)" />
            <polygon points="950,120 987,85 1025,120" fill="rgba(255,255,255,0.06)" />
            <rect x="975" y="148" width="16" height="32" fill="rgba(255,255,255,0.03)" />
            <rect x="955" y="132" width="12" height="12" fill="rgba(255,255,255,0.03)" />
            <rect x="1000" y="132" width="12" height="12" fill="rgba(255,255,255,0.03)" />
          </g>
          {/* House 5 - medium */}
          <g>
            <rect x="1080" y="110" width="65" height="70" fill="rgba(255,255,255,0.05)" />
            <polygon points="1080,110 1112,75 1145,110" fill="rgba(255,255,255,0.07)" />
            <rect x="1100" y="148" width="16" height="32" fill="rgba(255,255,255,0.03)" />
          </g>
        </svg>

        {/* ── Trees scattered ── */}
        <svg className="absolute bottom-0 left-0 w-full h-48 sm:h-56 activity-bg-float-1" viewBox="0 0 1200 200" fill="none" preserveAspectRatio="xMidYMax slice">
          {/* Tree 1 */}
          <rect x="40" y="155" width="6" height="25" fill="rgba(255,255,255,0.05)" />
          <circle cx="43" cy="145" r="18" fill="rgba(255,255,255,0.04)" />
          <circle cx="35" cy="150" r="14" fill="rgba(255,255,255,0.035)" />
          <circle cx="52" cy="148" r="15" fill="rgba(255,255,255,0.035)" />
          {/* Tree 2 */}
          <rect x="195" y="158" width="5" height="22" fill="rgba(255,255,255,0.05)" />
          <circle cx="197" cy="148" r="16" fill="rgba(255,255,255,0.04)" />
          {/* Tree 3 - pine */}
          <rect x="427" y="155" width="5" height="25" fill="rgba(255,255,255,0.05)" />
          <polygon points="410,155 430,110 450,155" fill="rgba(255,255,255,0.04)" />
          <polygon points="415,140 430,100 445,140" fill="rgba(255,255,255,0.035)" />
          {/* Tree 4 */}
          <rect x="620" y="160" width="5" height="20" fill="rgba(255,255,255,0.05)" />
          <circle cx="622" cy="150" r="15" fill="rgba(255,255,255,0.04)" />
          <circle cx="630" cy="147" r="12" fill="rgba(255,255,255,0.035)" />
          {/* Tree 5 - pine */}
          <rect x="780" y="152" width="5" height="28" fill="rgba(255,255,255,0.05)" />
          <polygon points="763,152 783,100 803,152" fill="rgba(255,255,255,0.04)" />
          <polygon points="768,135 783,95 798,135" fill="rgba(255,255,255,0.035)" />
          {/* Tree 6 */}
          <rect x="890" y="158" width="5" height="22" fill="rgba(255,255,255,0.05)" />
          <circle cx="892" cy="148" r="16" fill="rgba(255,255,255,0.04)" />
          <circle cx="900" cy="145" r="13" fill="rgba(255,255,255,0.035)" />
          {/* Bush 1 */}
          <ellipse cx="170" cy="174" rx="20" ry="10" fill="rgba(255,255,255,0.03)" />
          {/* Bush 2 */}
          <ellipse cx="580" cy="176" rx="18" ry="8" fill="rgba(255,255,255,0.03)" />
          {/* Bush 3 */}
          <ellipse cx="850" cy="175" rx="22" ry="9" fill="rgba(255,255,255,0.03)" />
        </svg>

        {/* ── Stars / sky elements floating at top ── */}
        <svg className="absolute top-0 left-0 w-full h-32" viewBox="0 0 1200 120" fill="none" preserveAspectRatio="xMidYMin slice">
          <circle cx="80" cy="25" r="1.5" fill="rgba(255,255,255,0.15)" className="activity-bg-pulse" />
          <circle cx="200" cy="50" r="1" fill="rgba(255,255,255,0.12)" className="activity-bg-pulse-delay" />
          <circle cx="350" cy="18" r="1.5" fill="rgba(255,255,255,0.1)" className="activity-bg-pulse" />
          <circle cx="520" cy="40" r="1" fill="rgba(255,255,255,0.15)" className="activity-bg-pulse-delay" />
          <circle cx="680" cy="15" r="1.5" fill="rgba(255,255,255,0.12)" className="activity-bg-pulse" />
          <circle cx="800" cy="55" r="1" fill="rgba(255,255,255,0.1)" className="activity-bg-pulse-delay" />
          <circle cx="950" cy="30" r="1.5" fill="rgba(255,255,255,0.15)" className="activity-bg-pulse" />
          <circle cx="1100" cy="20" r="1" fill="rgba(255,255,255,0.12)" className="activity-bg-pulse-delay" />
          <circle cx="1050" cy="65" r="1" fill="rgba(255,255,255,0.1)" className="activity-bg-pulse" />
          <circle cx="140" cy="70" r="1" fill="rgba(255,255,255,0.08)" className="activity-bg-pulse-delay" />
          <circle cx="450" cy="75" r="1.5" fill="rgba(255,255,255,0.1)" className="activity-bg-pulse" />
          <circle cx="750" cy="80" r="1" fill="rgba(255,255,255,0.12)" className="activity-bg-pulse-delay" />
          {/* Moon */}
          <circle cx="1050" cy="35" r="16" fill="rgba(255,255,255,0.04)" />
          <circle cx="1056" cy="30" r="14" fill="rgba(17,24,39,1)" />
        </svg>

        {/* Soft warm glow behind houses */}
        <div className="absolute bottom-0 left-1/3 w-80 h-40 rounded-full bg-amber-500/[0.04] blur-[60px]" />
        <div className="absolute bottom-0 right-1/4 w-60 h-32 rounded-full bg-primary/[0.05] blur-[50px]" />
      </div>

      {/* Content (above background) */}
      <div className="relative z-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">Recent Activity</h2>
            <p className="text-xs text-gray-400 mt-0.5 font-medium">Live updates across your properties</p>
          </div>
        </div>
        {hasMore && (
          <button
            onClick={() => setShowAll((p) => !p)}
            className="text-xs font-bold text-white/70 hover:text-white transition-colors flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-full"
          >
            {showAll ? "Show less" : "View all"}
            <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 py-3">
              <div className="w-10 h-10 rounded-2xl bg-white/5 animate-pulse" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-32 bg-white/5 rounded-lg animate-pulse" />
                <div className="h-3 w-56 bg-white/[0.03] rounded-lg animate-pulse" />
              </div>
              <div className="h-3 w-16 bg-white/5 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && activities.length === 0 && (
        <div className="text-center py-14">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/5 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-white/20" />
          </div>
          <p className="text-base font-bold text-white/60">No activity yet</p>
          <p className="text-sm text-white/30 mt-1">Your first booking is just around the corner!</p>
        </div>
      )}

      {/* Activity list */}
      {!loading && activities.length > 0 && (
        <div className="space-y-1">
          {visible.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group flex items-center gap-4 px-4 py-3.5 -mx-2 rounded-2xl hover:bg-white/[0.04] transition-all duration-200"
              >
                {/* Accent icon */}
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${item.accent}15` }}
                >
                  <Icon className="w-[18px] h-[18px]" style={{ color: item.accent }} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <h4 className="text-sm font-bold text-white group-hover:text-white/90 transition-colors truncate">
                      {item.title}
                    </h4>
                    {idx === 0 && (
                      <span className="shrink-0 text-[9px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate group-hover:text-gray-400 transition-colors">
                    {item.description}
                  </p>
                </div>

                {/* Timestamp */}
                <span className="text-[11px] font-semibold text-gray-600 shrink-0 whitespace-nowrap group-hover:text-gray-500 transition-colors">
                  {hdate.relativeTime(item.time)}
                </span>
              </Link>
            );
          })}
        </div>
      )}

      </div>{/* end content z-10 */}
    </div>
  );
}
