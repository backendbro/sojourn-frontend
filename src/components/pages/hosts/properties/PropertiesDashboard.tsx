"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  MoreVertical,
  Power,
  Eye,
  ChevronRight,
  Building2,
  ClipboardCheck,
  MapPin,
  Calendar,
  ImageIcon,
  BarChart3,
  Minimize2,
  ArrowRight,
} from "lucide-react";
import {
  getInspections,
  getProperties,
  me,
  updatePropertyWithoutPhotos,
} from "@/http/api";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import Spinner from "@/components/svgs/Spinner";

const INITIAL_VISIBLE = 4;

export default function PropertiesDashboard(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<"properties" | "inspections">("properties");
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [inspectionsRaw, setInspectionsRaw] = useState<any | null>(null);
  const [propertiesRaw, setPropertiesRaw] = useState<any | null>(null);
  const [hostId, setHostId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: any) => updatePropertyWithoutPhotos(payload),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: ["properties"] });
      await client.invalidateQueries({ queryKey: ["inspections"] });
    },
  });

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const user = await me("hosts");
        if (cancelled) return;
        const id = user?.host?.id ?? null;
        if (!id) { setHostId(null); return; }
        setHostId(id);
        const [insRes, propsRes] = await Promise.all([getInspections(id), getProperties(id)]);
        if (cancelled) return;
        setInspectionsRaw(insRes);
        setPropertiesRaw(propsRes);
      } catch (err) {
        console.error("Failed to load:", err);
      } finally { if (!cancelled) setLoading(false); }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    setExpanded(false);
  }, [selectedTab]);

  const inspections: any[] = Array.isArray(inspectionsRaw) ? inspectionsRaw : inspectionsRaw?.data ?? inspectionsRaw?.inspections ?? inspectionsRaw?.items ?? [];
  const propertiesList: any[] = Array.isArray(propertiesRaw) ? propertiesRaw : propertiesRaw?.data ?? propertiesRaw?.properties ?? propertiesRaw?.items ?? [];

  const filterBySearch = (item: any) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    const title = (item.title ?? item.name ?? "").toString().toLowerCase();
    const location = (item.location ?? "").toString().toLowerCase();
    return title.includes(q) || location.includes(q);
  };

  const toggleActiveStatus = (property: any) => {
    if (!hostId) return;
    mutation.mutate({
      hostId,
      id: property.id ?? property._id ?? property?.propertyId,
      activeStatus: property.activeStatus === "active" ? "deactivated" : "active",
    });
  };

  const allItems = selectedTab === "inspections"
    ? inspections.filter(filterBySearch)
    : propertiesList.filter(filterBySearch);

  const previewItems = allItems.slice(0, INITIAL_VISIBLE);
  const hasMore = allItems.length > INITIAL_VISIBLE;

  const handleExpand = () => {
    setAnimating(true);
    setTimeout(() => {
      setExpanded(true);
      setAnimating(false);
    }, 250);
  };

  const handleMinimize = () => {
    setAnimating(true);
    setTimeout(() => {
      setExpanded(false);
      setAnimating(false);
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  };

  const tabs = [
    { key: "inspections" as const, label: "Inspections", icon: ClipboardCheck, count: inspections.length },
    { key: "properties" as const, label: "Properties", icon: Building2, count: propertiesList.length },
  ];

  const renderCard = (item: any) => {
    const id = String(item.id ?? "");
    const isHovered = hoveredRowId === id;
    const title = item.title ?? item.name ?? "Untitled";
    const photo = Array.isArray(item.photos) && item.photos.length > 0 ? item.photos[0] : null;
    const statusRaw = item.activeStatus ?? item.status ?? "inactive";
    const isActive = statusRaw === "active" || statusRaw === "approved";
    const location = item.location ?? "—";
    const type = item.type ?? "—";

    return (
      <div
        key={id}
        onMouseEnter={() => setHoveredRowId(id)}
        onMouseLeave={() => setHoveredRowId(null)}
        className="group relative bg-white rounded-2xl border-2 border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
      >
        <div className="flex gap-4 p-4">
          <div className="relative w-24 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
            {photo ? (
              <img src={photo} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Building2 className="w-8 h-8 text-gray-200" />
              </div>
            )}
            <span className={`absolute top-1.5 left-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isActive ? "bg-emerald-500 text-white" : "bg-amber-400 text-white"
            }`}>
              {isActive ? "Active" : statusRaw ? statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1) : "Unknown"}
            </span>
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900 truncate">{title}</h3>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{location}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2.5">
              <span className="inline-flex items-center gap-1 text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md font-medium">{type}</span>
              {selectedTab === "inspections" ? (
                <>
                  {item.inspectionDate && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                      <Calendar className="w-3 h-3" />{item.inspectionDate}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                    <ImageIcon className="w-3 h-3" />{Array.isArray(item.photos) ? item.photos.length : 0}
                  </span>
                </>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                  <BarChart3 className="w-3 h-3" />{item.bookings ?? 0} bookings
                </span>
              )}
            </div>
          </div>
          <div className="shrink-0 self-start">
            {renderDropdown(item, id)}
          </div>
        </div>
      </div>
    );
  };

  const renderListRow = (item: any) => {
    const id = String(item.id ?? "");
    const isHovered = hoveredRowId === id;
    const title = item.title ?? item.name ?? "Untitled";
    const photo = Array.isArray(item.photos) && item.photos.length > 0 ? item.photos[0] : null;
    const statusRaw = item.activeStatus ?? item.status ?? "inactive";
    const isActive = statusRaw === "active" || statusRaw === "approved";
    const location = item.location ?? "—";
    const type = item.type ?? "—";

    return (
      <div
        key={id}
        onMouseEnter={() => setHoveredRowId(id)}
        onMouseLeave={() => setHoveredRowId(null)}
        className={`group flex items-center gap-4 px-4 py-3 border-b border-gray-50 last:border-b-0 transition-colors ${
          isHovered ? "bg-gray-50/60" : ""
        }`}
      >
        <div className="relative w-14 h-11 rounded-lg overflow-hidden shrink-0 bg-gray-100">
          {photo ? (
            <img src={photo} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Building2 className="w-5 h-5 text-gray-200" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 truncate">{title}</h4>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
            <MapPin className="w-3 h-3 shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        <span className="hidden sm:inline-flex text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md font-medium shrink-0">
          {type}
        </span>

        <span className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full ${
          isActive ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
        }`}>
          {isActive ? "Active" : statusRaw ? statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1) : "—"}
        </span>

        {selectedTab === "properties" && (
          <span className="hidden md:inline-flex items-center gap-1 text-xs text-gray-400 shrink-0">
            <BarChart3 className="w-3 h-3" />{item.bookings ?? 0}
          </span>
        )}

        <div className="shrink-0">
          {renderDropdown(item, id)}
        </div>
      </div>
    );
  };

  const renderDropdown = (item: any, id: string) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100">
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href={`/hosts/dashboard/properties/${id}`} className="flex items-center gap-2 w-full">
            <Eye size={14} /> View / Edit
          </Link>
        </DropdownMenuItem>
        {(item.status === "approved" || item.activeStatus) && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toggleActiveStatus(item)}>
              {mutation.isPending ? (
                <Spinner size={14} color="red" />
              ) : (
                <div className="flex items-center gap-2">
                  <Power size={14} />
                  <span>{item.activeStatus === "active" ? "Deactivate" : "Activate"}</span>
                </div>
              )}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="space-y-6" ref={containerRef}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Properties & Inspections
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your listings and track their performance
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = selectedTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                className={`flex items-center gap-2.5 px-5 py-3.5 text-base font-bold border-b-[3px] transition-all duration-200 ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-200"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-gray-400"}`} />
                <span>{tab.label}</span>
                <span className={`ml-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                  isActive ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-400"
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={`Search ${selectedTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner size={24} color="red" />
        </div>
      ) : allItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Building2 className="w-7 h-7 text-gray-300" />
          </div>
          <p className="text-sm text-gray-400 font-medium">No {selectedTab} found.</p>
        </div>
      ) : (
        <div className="relative overflow-hidden">
          {/* ── Card view (preview) ── */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              expanded
                ? "opacity-0 -translate-x-8 max-h-0 pointer-events-none"
                : animating
                  ? "opacity-0 translate-x-8"
                  : "opacity-100 translate-x-0"
            }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {previewItems.map(renderCard)}
            </div>

            {hasMore && (
              <div className="flex justify-center pt-5">
                <button
                  onClick={handleExpand}
                  className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-primary bg-primary/5 hover:bg-primary/10 rounded-full transition-all hover:gap-3"
                >
                  <span>View all {allItems.length} {selectedTab}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* ── List view (expanded) ── */}
          <div
            className={`transition-all duration-300 ease-in-out ${
              expanded
                ? animating
                  ? "opacity-0 translate-x-8"
                  : "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8 max-h-0 pointer-events-none absolute inset-0"
            }`}
          >
            {/* Minimize header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500 font-medium">
                Showing all <span className="font-bold text-gray-900">{allItems.length}</span> {selectedTab}
              </p>
              <button
                onClick={handleMinimize}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Minimize</span>
              </button>
            </div>

            {/* List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
              {allItems.map(renderListRow)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
