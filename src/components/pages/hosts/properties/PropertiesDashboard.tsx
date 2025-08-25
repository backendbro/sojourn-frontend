// import React, { useEffect, useState } from "react";
// import {
//   MagnifyingGlassIcon,
//   FunnelIcon,
//   PlusIcon,
//   EllipsisVerticalIcon,
//   EyeIcon,
//   PencilIcon,
//   TrashIcon,
// } from "@heroicons/react/24/outline";
// import { getInspections, getProperties, me } from "@/http/api";

// /** Mock data (unchanged) */
// const properties = [
//   {
//     id: 1,
//     name: "Finals",
//     type: "Town-House",
//     location: "Abuja, Zone 5 5",
//     status: "inactive",
//     views: null,
//     activeFrom: null,
//     bookings: 0,
//     revenue: "No",
//   },
//   {
//     id: 2,
//     name: "Aristocrat Apartments",
//     type: "Prime-Inn",
//     location: "Abuja, Gana Street 3",
//     status: "inactive",
//     views: null,
//     activeFrom: null,
//     bookings: 0,
//     revenue: "No",
//   },
//   {
//     id: 3,
//     name: "Tom And Jerry",
//     type: "Smart-Share",
//     location: "Abuja, Missisipi Street 7",
//     status: "inactive",
//     views: null,
//     activeFrom: null,
//     bookings: 0,
//     revenue: "No",
//   },
//   {
//     id: 4,
//     name: "Deluxe Apartments",
//     type: "Town-House",
//     location: "Abuja, Mississippi St 8",
//     status: "active",
//     views: 45,
//     activeFrom: "Mon Apr 21 2025",
//     bookings: 1,
//     revenue: "N2K",
//   },
// ];

// /** color palette (based on your tailwind config approximations) */
// const palette = {
//   primary500: "#ef4444",
//   primary700: "#dc2626",
//   primary600: "#dc2626",
//   gray900: "#111827",
//   gray700: "#374151",
//   gray600: "#4b5563",
//   gray500: "#6b7280",
//   gray300: "#d1d5db",
//   gray200: "#e5e7eb",
//   gray50: "#f9fafb",

//   success100: "#dcfce7",
//   success800: "#14532d",

//   warning100: "#fffbeb",
//   warning800: "#78350f",
// };

// /** inline styles */
// const styles: { [key: string]: React.CSSProperties } = {
//   container: { display: "flex", flexDirection: "column", gap: 24 },
//   headerRow: {
//     display: "flex",
//     gap: 16,
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexWrap: "wrap",
//   },
//   pageTitle: {
//     margin: 0,
//     fontSize: 24,
//     fontWeight: 700,
//     color: palette.gray900,
//   },
//   pageSubtitle: { margin: "6px 0 0 0", fontSize: 13, color: palette.gray600 },

//   tabsBar: { borderBottom: `1px solid ${palette.gray200}`, paddingBottom: 6 },
//   tabsNav: { display: "flex", gap: 24 },

//   tabButtonBase: {
//     padding: "8px 6px",
//     fontSize: 14,
//     fontWeight: 600,
//     borderBottom: "2px solid transparent",
//     background: "transparent",
//     cursor: "pointer",
//   },

//   searchRow: {
//     display: "flex",
//     gap: 12,
//     alignItems: "center",
//     width: "100%",
//     flexWrap: "wrap",
//   },
//   searchWrap: { position: "relative", flex: 1, maxWidth: 520 },
//   searchIcon: {
//     position: "absolute",
//     left: 10,
//     top: "50%",
//     transform: "translateY(-50%)",
//     width: 18,
//     height: 18,
//     color: palette.gray900,
//   } as React.CSSProperties,
//   input: {
//     width: "100%",
//     padding: "10px 12px 10px 38px",
//     border: `1px solid ${palette.gray300}`,
//     borderRadius: 8,
//     fontSize: 14,
//     outline: "none",
//     boxSizing: "border-box",
//   },
//   btnSecondary: {
//     display: "inline-flex",
//     gap: 8,
//     alignItems: "center",
//     padding: "8px 10px",
//     borderRadius: 8,
//     border: `1px solid ${palette.gray300}`,
//     background: "#fff",
//     cursor: "pointer",
//     fontSize: 14,
//   },

//   card: {
//     border: `1px solid ${palette.gray200}`,
//     borderRadius: 12,
//     background: "#fff",
//     overflow: "hidden",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
//   },

//   tableWrap: { width: "100%", overflowX: "auto" as const },

//   table: { width: "100%", borderCollapse: "collapse" as const, minWidth: 900 },
//   theadRow: { background: palette.gray50 },
//   thBase: {
//     textAlign: "left" as const,
//     padding: "14px 16px",
//     fontSize: 12,
//     fontWeight: 700,
//     color: palette.gray600,
//     textTransform: "uppercase" as const,
//     letterSpacing: "0.02em",
//   },
//   tdBase: {
//     padding: "12px 16px",
//     verticalAlign: "middle" as const,
//     fontSize: 14,
//     color: palette.gray900,
//   },

//   statusBadgeBase: {
//     display: "inline-block",
//     padding: "4px 8px",
//     borderRadius: 999,
//     fontSize: 12,
//     fontWeight: 600,
//   },

//   rowHoverBg: { background: "#f8fafc" },

//   footerBar: {
//     background: palette.primary600 ?? palette.primary500,
//     padding: "16px",
//     borderTop: `1px solid ${palette.primary700 ?? palette.primary500}`,
//     position: "relative",
//     color: "#fff",
//     overflow: "hidden",
//   },

//   footerContent: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     position: "relative",
//     zIndex: 2,
//   },

//   footerButton: {
//     padding: "8px 12px",
//     fontSize: 14,
//     color: "#fff",
//     background: palette.primary700 ?? palette.primary500,
//     borderRadius: 8,
//     border: `1px solid ${palette.primary500}`,
//     cursor: "not-allowed",
//     opacity: 0.9,
//   },

//   svgDecorationWrap: {
//     position: "absolute",
//     inset: 0,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     opacity: 0.06,
//     zIndex: 1,
//   },
// };

// /** responsive helper (for header layout) */
// function useWindowWidth() {
//   const [w, setW] = useState<number | null>(null);
//   useEffect(() => {
//     function update() {
//       if (typeof window !== "undefined") setW(window.innerWidth);
//     }
//     update();
//     window.addEventListener("resize", update);
//     return () => window.removeEventListener("resize", update);
//   }, []);
//   return w;
// }

// export default function PropertiesDashboard(): JSX.Element {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTab, setSelectedTab] = useState<"properties" | "inspections">(
//     "properties"
//   );
//   const [selectedRows, setSelectedRows] = useState<number[]>([]);
//   const [hoveredRowId, setHoveredRowId] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [inspections, setInspections] = useState(false);
//   const [property, setProperties] = useState(false);

//   useEffect(() => {
//     let cancelled = false;
//     const load = async () => {
//       setLoading(true);
//       try {
//         const user = await me("hosts");
//         if (cancelled) return;
//         const id = user && user.host && user.host.id ? user.host.id : null;
//         if (!id) return;

//         // fetch inspections and properties in parallel
//         const [insRes, propsRes] = await Promise.all([
//           getInspections(id),
//           getProperties(id),
//         ]);
//         if (cancelled) return;

//         // const items = Array.isArray(insRes)
//         //   ? insRes
//         //   : insRes?.data ?? insRes?.inspections ?? [];
//         // const props = Array.isArray(propsRes) ? propsRes : propsRes?.data ?? [];

//         setInspections(insRes);
//         setProperties(propsRes);

//         console.log(inspections);
//         console.log(property);
//       } catch (err) {
//         console.error("Failed to load transactions/props:", err);
//       } finally {
//         if (!cancelled) setLoading(false);
//       }
//     };
//     load();
//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const width = useWindowWidth();
//   const isNarrow = width !== null ? width < 640 : false;

//   const filteredProperties = properties.filter(
//     (p: { name: string; location: string }) =>
//       p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       p.location.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleRowSelect = (id: number) => {
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = () => {
//     if (
//       selectedRows.length === filteredProperties.length &&
//       filteredProperties.length > 0
//     ) {
//       setSelectedRows([]);
//     } else {
//       setSelectedRows(filteredProperties.map((p) => p.id));
//     }
//   };

//   const isAllSelected =
//     filteredProperties.length > 0 &&
//     selectedRows.length === filteredProperties.length;

//   return (
//     <div style={styles.container}>
//       {/* Page Header */}
//       <div
//         style={{
//           ...styles.headerRow,
//           flexDirection: isNarrow ? "column" : "row",
//           alignItems: isNarrow ? "flex-start" : "center",
//         }}
//       >
//         <div>
//           <h1 style={styles.pageTitle}>Properties</h1>
//           <p style={styles.pageSubtitle}>
//             Manage your property listings and track their performance
//           </p>
//         </div>

//         {/* Right side controls (kept minimal per original) */}
//       </div>

//       {/* Tabs */}
//       <div style={styles.tabsBar}>
//         <nav style={styles.tabsNav}>
//           <button
//             type="button"
//             onClick={() => setSelectedTab("inspections")}
//             style={{
//               ...styles.tabButtonBase,
//               borderBottomColor:
//                 selectedTab === "inspections"
//                   ? palette.primary500
//                   : "transparent",
//               color:
//                 selectedTab === "inspections"
//                   ? palette.primary600 ?? palette.primary500
//                   : palette.gray600,
//             }}
//           >
//             Inspections
//           </button>

//           <button
//             type="button"
//             onClick={() => setSelectedTab("properties")}
//             style={{
//               ...styles.tabButtonBase,
//               borderBottomColor:
//                 selectedTab === "properties"
//                   ? palette.primary500
//                   : "transparent",
//               color:
//                 selectedTab === "properties"
//                   ? palette.primary600 ?? palette.primary500
//                   : palette.gray600,
//             }}
//           >
//             Properties
//           </button>
//         </nav>
//       </div>

//       {/* Search & Filters */}
//       <div
//         style={{
//           ...styles.searchRow,
//           flexDirection: isNarrow ? "column" : "row",
//           alignItems: isNarrow ? "stretch" : "center",
//         }}
//       >
//         <div style={styles.searchWrap}>
//           <MagnifyingGlassIcon
//             style={{
//               position: "absolute",
//               left: 10,
//               top: "50%",
//               transform: "translateY(-50%)",
//               width: 18,
//               height: 18,
//               color: palette.gray300,
//             }}
//           />
//           <input
//             type="text"
//             placeholder="Search by property"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={styles.input}
//             aria-label="Search properties"
//           />
//         </div>

//         <div style={{ display: "flex", gap: 8 }}>
//           <button style={styles.btnSecondary} type="button" aria-label="Filter">
//             <FunnelIcon style={{ width: 16, height: 16 }} />
//             <span style={{ fontWeight: 600 }}>Filter</span>
//           </button>
//         </div>
//       </div>

//       {/* Properties Table Card */}
//       <div style={styles.card}>
//         <div style={styles.tableWrap}>
//           <table style={styles.table}>
//             <thead style={styles.theadRow}>
//               <tr>
//                 <th style={styles.thBase}>
//                   <input
//                     type="checkbox"
//                     checked={isAllSelected}
//                     onChange={handleSelectAll}
//                     style={{
//                       width: 16,
//                       height: 16,
//                       borderRadius: 4,
//                       border: `1px solid ${palette.gray300}`,
//                     }}
//                     aria-label="Select all rows"
//                   />
//                 </th>

//                 <th style={styles.thBase}>Status</th>
//                 <th style={styles.thBase}>Property</th>
//                 <th style={styles.thBase}>Type</th>
//                 <th style={styles.thBase}>Location</th>
//                 <th style={styles.thBase}>Views</th>
//                 <th style={styles.thBase}>Active From</th>
//                 <th style={styles.thBase}>Bookings</th>
//                 <th style={styles.thBase}>Revenue</th>
//                 <th style={styles.thBase}>Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredProperties.map((property) => {
//                 const isHovered = hoveredRowId === property.id;
//                 const rowStyle: React.CSSProperties = {
//                   background: isHovered
//                     ? styles.rowHoverBg.background
//                     : undefined,
//                   transition: "background 150ms",
//                 };

//                 const isSelected = selectedRows.includes(property.id);

//                 return (
//                   <tr
//                     key={property.id}
//                     onMouseEnter={() => setHoveredRowId(property.id)}
//                     onMouseLeave={() => setHoveredRowId(null)}
//                     style={rowStyle}
//                   >
//                     <td style={styles.tdBase}>
//                       <input
//                         type="checkbox"
//                         checked={isSelected}
//                         onChange={() => handleRowSelect(property.id)}
//                         style={{
//                           width: 16,
//                           height: 16,
//                           borderRadius: 4,
//                           border: `1px solid ${palette.gray300}`,
//                         }}
//                         aria-label={`Select row ${property.id}`}
//                       />
//                     </td>

//                     <td style={styles.tdBase}>
//                       <span
//                         style={{
//                           ...styles.statusBadgeBase,
//                           background:
//                             property.status === "active"
//                               ? palette.success100
//                               : palette.warning100,
//                           color:
//                             property.status === "active"
//                               ? palette.success800
//                               : palette.warning800,
//                         }}
//                       >
//                         {property.status === "active" ? "Active" : "Inactive"}
//                       </span>
//                     </td>

//                     <td style={styles.tdBase}>
//                       <div
//                         style={{
//                           fontSize: 14,
//                           fontWeight: 600,
//                           color: palette.gray900,
//                         }}
//                       >
//                         {property.name}
//                       </div>
//                     </td>

//                     <td style={styles.tdBase}>
//                       <div style={{ fontSize: 14, color: palette.gray900 }}>
//                         {property.type}
//                       </div>
//                     </td>

//                     <td style={styles.tdBase}>
//                       <div style={{ fontSize: 14, color: palette.gray900 }}>
//                         {property.location}
//                       </div>
//                     </td>

//                     <td style={styles.tdBase}>
//                       <div style={{ fontSize: 14, color: palette.gray900 }}>
//                         {property.views !== null ? property.views : "-"}
//                       </div>
//                     </td>

//                     <td style={styles.tdBase}>
//                       <div style={{ fontSize: 14, color: palette.gray900 }}>
//                         {property.activeFrom || "Not Active"}
//                       </div>
//                     </td>

//                     <td style={styles.tdBase}>
//                       <div style={{ fontSize: 14, color: palette.gray900 }}>
//                         {property.bookings}
//                       </div>
//                     </td>

//                     <td style={styles.tdBase}>
//                       <div style={{ fontSize: 14, color: palette.gray900 }}>
//                         {property.revenue}
//                       </div>
//                     </td>

//                     <td style={styles.tdBase}>
//                       <div
//                         style={{
//                           display: "flex",
//                           gap: 8,
//                           alignItems: "center",
//                         }}
//                       >
//                         <button
//                           type="button"
//                           aria-label="More actions"
//                           style={{
//                             display: "inline-flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             padding: 8,
//                             borderRadius: 8,
//                             border: "none",
//                             background: "transparent",
//                             cursor: "pointer",
//                           }}
//                         >
//                           <EllipsisVerticalIcon
//                             style={{
//                               width: 18,
//                               height: 18,
//                               color: palette.gray500,
//                             }}
//                           />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* Table Footer */}
//         <div style={styles.footerBar}>
//           <div style={styles.svgDecorationWrap}>
//             <svg
//               width="180"
//               height="110"
//               viewBox="0 0 120 80"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <rect x="20" y="40" width="80" height="30" fill="#fff" rx="2" />
//               <path d="M15 40L60 15L105 40H95L60 20L25 40H15Z" fill="#fff" />
//               <rect
//                 x="45"
//                 y="50"
//                 width="10"
//                 height="20"
//                 fill="#fff"
//                 opacity="0.8"
//               />
//               <rect
//                 x="30"
//                 y="45"
//                 width="8"
//                 height="8"
//                 fill="#fff"
//                 opacity="0.6"
//                 rx="1"
//               />
//               <rect
//                 x="82"
//                 y="45"
//                 width="8"
//                 height="8"
//                 fill="#fff"
//                 opacity="0.6"
//                 rx="1"
//               />
//               <rect
//                 x="75"
//                 y="25"
//                 width="6"
//                 height="15"
//                 fill="#fff"
//                 opacity="0.7"
//               />
//             </svg>
//           </div>

//           <div style={styles.footerContent}>
//             <div style={{ fontSize: 14, fontWeight: 600 }}>
//               {selectedRows.length} of {filteredProperties.length} row(s)
//               selected
//             </div>

//             <div style={{ display: "flex", gap: 8 }}>
//               <button type="button" style={styles.footerButton} disabled>
//                 Previous
//               </button>
//               <button type="button" style={styles.footerButton} disabled>
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { getInspections, getProperties, me } from "@/http/api";

/** (Optional) mock fallback if backend returns nothing */
const MOCK_PROPERTIES = [
  {
    id: 1,
    name: "Finals",
    type: "Town-House",
    location: "Abuja, Zone 5 5",
    status: "inactive",
    views: null,
    activeFrom: null,
    bookings: 0,
    revenue: "No",
  },
  {
    id: 2,
    name: "Aristocrat Apartments",
    type: "Prime-Inn",
    location: "Abuja, Gana Street 3",
    status: "inactive",
    views: null,
    activeFrom: null,
    bookings: 0,
    revenue: "No",
  },
  {
    id: 3,
    name: "Tom And Jerry",
    type: "Smart-Share",
    location: "Abuja, Missisipi Street 7",
    status: "inactive",
    views: null,
    activeFrom: null,
    bookings: 0,
    revenue: "No",
  },
  {
    id: 4,
    name: "Deluxe Apartments",
    type: "Town-House",
    location: "Abuja, Mississippi St 8",
    status: "active",
    views: 45,
    activeFrom: "Mon Apr 21 2025",
    bookings: 1,
    revenue: "N2K",
  },
];

/** color palette (kept from your file) */
const palette = {
  primary500: "#ef4444",
  primary700: "#dc2626",
  primary600: "#dc2626",
  gray900: "#111827",
  gray700: "#374151",
  gray600: "#4b5563",
  gray500: "#6b7280",
  gray300: "#d1d5db",
  gray200: "#e5e7eb",
  gray50: "#f9fafb",

  success100: "#dcfce7",
  success800: "#14532d",

  warning100: "#fffbeb",
  warning800: "#78350f",
};

const styles: { [key: string]: React.CSSProperties } = {
  container: { display: "flex", flexDirection: "column", gap: 24 },
  headerRow: {
    display: "flex",
    gap: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  pageTitle: {
    margin: 0,
    fontSize: 24,
    fontWeight: 700,
    color: palette.gray900,
  },
  pageSubtitle: { margin: "6px 0 0 0", fontSize: 13, color: palette.gray600 },

  tabsBar: { borderBottom: `1px solid ${palette.gray200}`, paddingBottom: 6 },
  tabsNav: { display: "flex", gap: 24 },

  tabButtonBase: {
    padding: "8px 6px",
    fontSize: 14,
    fontWeight: 600,
    borderBottom: "2px solid transparent",
    background: "transparent",
    cursor: "pointer",
  },

  searchRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
  },
  searchWrap: { position: "relative", flex: 1, maxWidth: 520 },
  searchIcon: {
    position: "absolute",
    left: 10,
    top: "50%",
    transform: "translateY(-50%)",
    width: 18,
    height: 18,
    color: palette.gray900,
  } as React.CSSProperties,
  input: {
    width: "100%",
    padding: "10px 12px 10px 38px",
    border: `1px solid ${palette.gray300}`,
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  },
  btnSecondary: {
    display: "inline-flex",
    gap: 8,
    alignItems: "center",
    padding: "8px 10px",
    borderRadius: 8,
    border: `1px solid ${palette.gray300}`,
    background: "#fff",
    cursor: "pointer",
    fontSize: 14,
  },

  card: {
    border: `1px solid ${palette.gray200}`,
    borderRadius: 12,
    background: "#fff",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
  },

  tableWrap: { width: "100%", overflowX: "auto" as const },

  table: { width: "100%", borderCollapse: "collapse" as const, minWidth: 900 },
  theadRow: { background: palette.gray50 },
  thBase: {
    textAlign: "left" as const,
    padding: "14px 16px",
    fontSize: 12,
    fontWeight: 700,
    color: palette.gray600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.02em",
  },
  tdBase: {
    padding: "12px 16px",
    verticalAlign: "middle" as const,
    fontSize: 14,
    color: palette.gray900,
  },

  statusBadgeBase: {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
  },

  rowHoverBg: { background: "#f8fafc" },

  footerBar: {
    background: palette.primary600 ?? palette.primary500,
    padding: "16px",
    borderTop: `1px solid ${palette.primary700 ?? palette.primary500}`,
    position: "relative",
    color: "#fff",
    overflow: "hidden",
  },

  footerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },

  footerButton: {
    padding: "8px 12px",
    fontSize: 14,
    color: "#fff",
    background: palette.primary700 ?? palette.primary500,
    borderRadius: 8,
    border: `1px solid ${palette.primary500}`,
    cursor: "not-allowed",
    opacity: 0.9,
  },

  svgDecorationWrap: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.06,
    zIndex: 1,
  },
};

function useWindowWidth() {
  const [w, setW] = useState<number | null>(null);
  useEffect(() => {
    function update() {
      if (typeof window !== "undefined") setW(window.innerWidth);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return w;
}

export default function PropertiesDashboard(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState<"properties" | "inspections">(
    "properties"
  );
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // store raw responses (we will normalise before rendering)
  const [inspectionsRaw, setInspectionsRaw] = useState<any | null>(null);
  const [propertiesRaw, setPropertiesRaw] = useState<any | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const user = await me("hosts");
        if (cancelled) return;
        const id = user && user.host && user.host.id ? user.host.id : null;
        if (!id) return;

        const [insRes, propsRes] = await Promise.all([
          getInspections(id),
          getProperties(id),
        ]);
        if (cancelled) return;

        setInspectionsRaw(insRes);
        setPropertiesRaw(propsRes);
      } catch (err) {
        console.error("Failed to load inspections/properties:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const width = useWindowWidth();
  const isNarrow = width !== null ? width < 640 : false;

  // --- Normalise responses into arrays (safe guards for different API shapes)
  const inspections: any[] = Array.isArray(inspectionsRaw)
    ? inspectionsRaw
    : inspectionsRaw?.data ??
      inspectionsRaw?.inspections ??
      inspectionsRaw?.items ??
      [];
  const propertiesList: any[] = Array.isArray(propertiesRaw)
    ? propertiesRaw
    : propertiesRaw?.data ??
      propertiesRaw?.properties ??
      propertiesRaw?.items ??
      [];

  // fallback to mock if backend empty (optional)
  const propsToRender =
    propertiesList.length > 0 ? propertiesList : MOCK_PROPERTIES;

  // filter functions (search both lists by title/name and location)
  const filterBySearch = (item: any) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    const title = (item.title ?? item.name ?? item.propertyTitle ?? "")
      .toString()
      .toLowerCase();
    const location = (item.location ?? "").toString().toLowerCase();
    return title.includes(q) || location.includes(q);
  };

  // selection handlers (now using string ids)
  const handleRowSelect = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAllFor = (items: any[]) => {
    const ids = items.map((i) => (i.id ? String(i.id) : ""));
    const allSelected = ids.every(
      (id) => selectedRows.includes(id) && id !== ""
    );
    if (allSelected) {
      // remove those ids
      setSelectedRows((prev) => prev.filter((x) => !ids.includes(x)));
    } else {
      // add missing ones
      setSelectedRows((prev) => Array.from(new Set([...prev, ...ids])));
    }
  };

  // derived filtered arrays
  const visibleInspections = inspections.filter(filterBySearch);
  const visibleProperties = propsToRender.filter(filterBySearch);

  const isAllSelected = (items: any[]) =>
    items.length > 0 && items.every((i) => selectedRows.includes(String(i.id)));

  // --- Render
  return (
    <div style={styles.container}>
      {/* Page Header */}
      <div
        style={{
          ...styles.headerRow,
          flexDirection: isNarrow ? "column" : "row",
          alignItems: isNarrow ? "flex-start" : "center",
        }}
      >
        <div>
          <h1 style={styles.pageTitle}>Properties</h1>
          <p style={styles.pageSubtitle}>
            Manage your property listings and track their performance
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabsBar}>
        <nav style={styles.tabsNav}>
          <button
            type="button"
            onClick={() => setSelectedTab("inspections")}
            style={{
              ...styles.tabButtonBase,
              borderBottomColor:
                selectedTab === "inspections"
                  ? palette.primary500
                  : "transparent",
              color:
                selectedTab === "inspections"
                  ? palette.primary600 ?? palette.primary500
                  : palette.gray600,
            }}
          >
            Inspections
          </button>

          <button
            type="button"
            onClick={() => setSelectedTab("properties")}
            style={{
              ...styles.tabButtonBase,
              borderBottomColor:
                selectedTab === "properties"
                  ? palette.primary500
                  : "transparent",
              color:
                selectedTab === "properties"
                  ? palette.primary600 ?? palette.primary500
                  : palette.gray600,
            }}
          >
            Properties
          </button>
        </nav>
      </div>

      {/* Search & Filters */}
      <div
        style={{
          ...styles.searchRow,
          flexDirection: isNarrow ? "column" : "row",
          alignItems: isNarrow ? "stretch" : "center",
        }}
      >
        <div style={styles.searchWrap}>
          <MagnifyingGlassIcon
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              width: 18,
              height: 18,
              color: palette.gray300,
            }}
          />
          <input
            type="text"
            placeholder={
              selectedTab === "inspections"
                ? "Search inspections or property"
                : "Search properties"
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.input}
            aria-label="Search"
          />
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          <button style={styles.btnSecondary} type="button" aria-label="Filter">
            <FunnelIcon style={{ width: 16, height: 16 }} />
            <span style={{ fontWeight: 600 }}>Filter</span>
          </button>
        </div>
      </div>

      {/* Data Table Card */}
      <div style={styles.card}>
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead style={styles.theadRow}>
              <tr>
                <th style={styles.thBase}>
                  <input
                    type="checkbox"
                    checked={
                      selectedTab === "inspections"
                        ? isAllSelected(visibleInspections)
                        : isAllSelected(visibleProperties)
                    }
                    onChange={() =>
                      selectedTab === "inspections"
                        ? handleSelectAllFor(visibleInspections)
                        : handleSelectAllFor(visibleProperties)
                    }
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      border: `1px solid ${palette.gray300}`,
                    }}
                    aria-label="Select all rows"
                  />
                </th>

                <th style={styles.thBase}>Status</th>
                <th style={styles.thBase}>
                  {selectedTab === "inspections"
                    ? "Inspection / Property"
                    : "Property"}
                </th>
                <th style={styles.thBase}>Type</th>
                <th style={styles.thBase}>Location</th>

                {selectedTab === "inspections" ? (
                  <>
                    <th style={styles.thBase}>Inspection Date</th>
                    <th style={styles.thBase}>Phone</th>
                    <th style={styles.thBase}>Photos</th>
                  </>
                ) : (
                  <>
                    <th style={styles.thBase}>Views</th>
                    <th style={styles.thBase}>Active From</th>
                    <th style={styles.thBase}>Bookings</th>
                    <th style={styles.thBase}>Revenue</th>
                  </>
                )}

                <th style={styles.thBase}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {/* Loading / empty states */}
              {loading && (
                <tr>
                  <td
                    style={styles.tdBase}
                    colSpan={selectedTab === "inspections" ? 9 : 11}
                  >
                    Loading...
                  </td>
                </tr>
              )}

              {!loading &&
                selectedTab === "inspections" &&
                (visibleInspections.length === 0 ? (
                  <tr>
                    <td style={styles.tdBase} colSpan={9}>
                      No inspections found.
                    </td>
                  </tr>
                ) : (
                  visibleInspections.map((ins: any) => {
                    const id = String(ins.id ?? "");
                    const isHovered = hoveredRowId === id;
                    const isSelected = selectedRows.includes(id);
                    const firstPhoto =
                      ins.photos && ins.photos.length ? ins.photos[0] : null;

                    return (
                      <tr
                        key={id}
                        onMouseEnter={() => setHoveredRowId(id)}
                        onMouseLeave={() => setHoveredRowId(null)}
                        style={{
                          background: isHovered
                            ? styles.rowHoverBg.background
                            : undefined,
                          transition: "background 150ms",
                        }}
                      >
                        <td style={styles.tdBase}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleRowSelect(id)}
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: 4,
                              border: `1px solid ${palette.gray300}`,
                            }}
                          />
                        </td>

                        <td style={styles.tdBase}>
                          <span
                            style={{
                              ...styles.statusBadgeBase,
                              background:
                                ins.status === "approved" ||
                                ins.status === "active"
                                  ? palette.success100
                                  : palette.warning100,
                              color:
                                ins.status === "approved" ||
                                ins.status === "active"
                                  ? palette.success800
                                  : palette.warning800,
                            }}
                          >
                            {ins.status
                              ? ins.status.toString().toUpperCase()
                              : "UNKNOWN"}
                          </span>
                        </td>

                        <td style={styles.tdBase}>
                          <div
                            style={{
                              display: "flex",
                              gap: 12,
                              alignItems: "center",
                            }}
                          >
                            {firstPhoto ? (
                              <img
                                src={firstPhoto}
                                alt={ins.title ?? "photo"}
                                style={{
                                  width: 56,
                                  height: 40,
                                  objectFit: "cover",
                                  borderRadius: 6,
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 56,
                                  height: 40,
                                  borderRadius: 6,
                                  background: palette.gray200,
                                }}
                              />
                            )}

                            <div>
                              <div
                                style={{
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: palette.gray900,
                                }}
                              >
                                {ins.title ?? "Untitled"}
                              </div>
                              <div
                                style={{ fontSize: 13, color: palette.gray600 }}
                              >
                                ID: {id}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td style={styles.tdBase}>
                          <div style={{ fontSize: 14, color: palette.gray900 }}>
                            {ins.type ?? "-"}
                          </div>
                        </td>

                        <td style={styles.tdBase}>
                          <div style={{ fontSize: 14, color: palette.gray900 }}>
                            {ins.location ?? "-"}
                          </div>
                        </td>

                        <td style={styles.tdBase}>
                          <div style={{ fontSize: 14, color: palette.gray900 }}>
                            {ins.inspectionDate ?? "-"}
                          </div>
                        </td>

                        <td style={styles.tdBase}>
                          <div style={{ fontSize: 14, color: palette.gray900 }}>
                            {ins.phone ?? "-"}
                          </div>
                        </td>

                        <td style={styles.tdBase}>
                          <div style={{ fontSize: 14, color: palette.gray900 }}>
                            {Array.isArray(ins.photos) ? ins.photos.length : 0}
                          </div>
                        </td>

                        <td style={styles.tdBase}>
                          <div
                            style={{
                              display: "flex",
                              gap: 8,
                              alignItems: "center",
                            }}
                          >
                            <button
                              type="button"
                              aria-label="More actions"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 8,
                                borderRadius: 8,
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                              }}
                            >
                              <EllipsisVerticalIcon
                                style={{
                                  width: 18,
                                  height: 18,
                                  color: palette.gray500,
                                }}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ))}

              {!loading &&
                selectedTab === "properties" &&
                (visibleProperties.length === 0 ? (
                  <tr>
                    <td style={styles.tdBase} colSpan={11}>
                      No properties found.
                    </td>
                  </tr>
                ) : (
                  visibleProperties.map((prop: any) => {
                    // API fields: id, title, type, location, activeFrom, bookings, revenue, status, photos, views
                    const id = String(prop.id ?? prop._id ?? "");
                    const isHovered = hoveredRowId === id;
                    const isSelected = selectedRows.includes(id);
                    const firstPhoto =
                      prop.photos && prop.photos.length ? prop.photos[0] : null;

                    return (
                      <tr
                        key={id}
                        onMouseEnter={() => setHoveredRowId(id)}
                        onMouseLeave={() => setHoveredRowId(null)}
                        style={{
                          background: isHovered
                            ? styles.rowHoverBg.background
                            : undefined,
                          transition: "background 150ms",
                        }}
                      >
                        <td style={styles.tdBase}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleRowSelect(id)}
                            style={{
                              width: 16,
                              height: 16,
                              borderRadius: 4,
                              border: `1px solid ${palette.gray300}`,
                            }}
                          />
                        </td>

                        <td style={styles.tdBase}>
                          <span
                            style={{
                              ...styles.statusBadgeBase,
                              background:
                                prop.status === "active"
                                  ? palette.success100
                                  : palette.warning100,
                              color:
                                prop.status === "active"
                                  ? palette.success800
                                  : palette.warning800,
                            }}
                          >
                            {prop.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </td>

                        <td style={styles.tdBase}>
                          <div
                            style={{
                              display: "flex",
                              gap: 12,
                              alignItems: "center",
                            }}
                          >
                            {firstPhoto ? (
                              <img
                                src={firstPhoto}
                                alt={prop.title ?? "photo"}
                                style={{
                                  width: 56,
                                  height: 40,
                                  objectFit: "cover",
                                  borderRadius: 6,
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 56,
                                  height: 40,
                                  borderRadius: 6,
                                  background: palette.gray200,
                                }}
                              />
                            )}

                            <div>
                              <div
                                style={{
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: palette.gray900,
                                }}
                              >
                                {prop.title ?? prop.name ?? "Untitled"}
                              </div>
                              <div
                                style={{ fontSize: 13, color: palette.gray600 }}
                              >
                                ID: {id}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td style={styles.tdBase}>
                          <div style={{ fontSize: 14, color: palette.gray900 }}>
                            {prop.type ?? "-"}
                          </div>
                        </td>

                        <td style={styles.tdBase}>
                          <div style={{ fontSize: 14, color: palette.gray900 }}>
                            {prop.location ?? "-"}
                          </div>
                        </td>

                        <td style={styles.tdBase}>
                          <div style={{ fontSize: 14, color: palette.gray900 }}>
                            {prop.views ?? "-"}
                          </div>
                        </td>

                        <td style={styles.tdBase}>
                          <div style={{ fontSize: 14, color: palette.gray900 }}>
                            {prop.activeFrom ?? "Not Active"}
                          </div>
                        </td>

                        <td style={styles.tdBase}>
                          <div style={{ fontSize: 14, color: palette.gray900 }}>
                            {prop.bookings ?? 0}
                          </div>
                        </td>

                        <td style={styles.tdBase}>
                          <div style={{ fontSize: 14, color: palette.gray900 }}>
                            {prop.revenue ?? "-"}
                          </div>
                        </td>

                        <td style={styles.tdBase}>
                          <div
                            style={{
                              display: "flex",
                              gap: 8,
                              alignItems: "center",
                            }}
                          >
                            <button
                              type="button"
                              aria-label="More actions"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 8,
                                borderRadius: 8,
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                              }}
                            >
                              <EllipsisVerticalIcon
                                style={{
                                  width: 18,
                                  height: 18,
                                  color: palette.gray500,
                                }}
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div style={styles.footerBar}>
          <div style={styles.svgDecorationWrap}>
            <svg
              width="180"
              height="110"
              viewBox="0 0 120 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="20" y="40" width="80" height="30" fill="#fff" rx="2" />
              <path d="M15 40L60 15L105 40H95L60 20L25 40H15Z" fill="#fff" />
              <rect
                x="45"
                y="50"
                width="10"
                height="20"
                fill="#fff"
                opacity="0.8"
              />
              <rect
                x="30"
                y="45"
                width="8"
                height="8"
                fill="#fff"
                opacity="0.6"
                rx="1"
              />
              <rect
                x="82"
                y="45"
                width="8"
                height="8"
                fill="#fff"
                opacity="0.6"
                rx="1"
              />
              <rect
                x="75"
                y="25"
                width="6"
                height="15"
                fill="#fff"
                opacity="0.7"
              />
            </svg>
          </div>

          <div style={styles.footerContent}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>
              {selectedRows.length} row(s) selected
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" style={styles.footerButton} disabled>
                Previous
              </button>
              <button type="button" style={styles.footerButton} disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
