// import React, { useEffect, useState } from "react";
// import {
//   MapPinIcon,
//   EyeIcon,
//   CalendarIcon,
//   StarIcon,
//   HeartIcon,
//   ArrowRightIcon,
// } from "@heroicons/react/24/outline";
// import { me, getProperties } from "@/http/api";

// /** Mock property data (unchanged) */
// const previewProperties = [
//   {
//     id: 1,
//     name: "Luxury Villa Abuja",
//     type: "Villa",
//     location: "Abuja, Zone 5",
//     rating: 4.8,
//     reviews: 24,
//     image:
//       "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
//     status: "active",
//     views: 156,
//     bookings: 8,
//   },
//   {
//     id: 2,
//     name: "Modern Apartment Complex",
//     type: "Apartment",
//     location: "Lagos, Victoria Island",
//     rating: 4.6,
//     reviews: 18,
//     image:
//       "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
//     status: "active",
//     views: 203,
//     bookings: 12,
//   },
//   {
//     id: 3,
//     name: "Cozy Studio Space",
//     type: "Studio",
//     location: "Port Harcourt, GRA",
//     rating: 4.9,
//     reviews: 31,
//     image:
//       "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
//     status: "active",
//     views: 89,
//     bookings: 5,
//   },
//   {
//     id: 4,
//     name: "Executive Penthouse",
//     type: "Penthouse",
//     location: "Kano, Nasarawa",
//     rating: 4.7,
//     reviews: 15,
//     image:
//       "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
//     status: "inactive",
//     views: 67,
//     bookings: 3,
//   },
//   {
//     id: 5,
//     name: "Family Townhouse",
//     type: "Townhouse",
//     location: "Ibadan, Bodija",
//     rating: 4.5,
//     reviews: 22,
//     image:
//       "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
//     status: "active",
//     views: 134,
//     bookings: 9,
//   },
// ];

// const [loading, setLoading] = useState(false);

// // store raw responses (we will normalise before rendering)
// const [propertiesRaw, setPropertiesRaw] = useState<any | null>(null);
// useEffect(() => {
//   let cancelled = false;

//   const load = async () => {
//     setLoading(true);
//     try {
//       const user = await me("hosts");
//       if (cancelled) return;

//       const id = user?.host?.id ?? null;
//       if (!id) return;

//       // only fetch properties now
//       const propsRes = await getProperties(id);
//       if (cancelled) return;

//       setPropertiesRaw(propsRes);
//       console.log(propertiesRaw);
//     } catch (err) {
//       console.error("Failed to load properties:", err);
//     } finally {
//       if (!cancelled) setLoading(false);
//     }
//   };

//   load();
//   return () => {
//     cancelled = true;
//   };
// }, []);

// /** Palette (based on your earlier tailwind config approximations) */
// const palette = {
//   gray900: "#111827",
//   gray700: "#374151",
//   gray600: "#4b5563",
//   gray500: "#6b7280",
//   gray400: "#9ca3af",
//   gray200: "#e5e7eb",
//   gray100: "#f3f4f6",
//   white: "#ffffff",
//   primary600: "#dc2626",
//   success100: "#dcfce7",
//   success800: "#14532d",
//   warning100: "#fffbeb",
//   warning800: "#78350f",
//   yellow400: "#f59e0b",
//   cardShadow:
//     "0 6px 18px -8px rgba(17,24,39,0.08), 0 8px 20px -10px rgba(17,24,39,0.03)",
// };

// /** Inline styles used across the component */
// const styles: { [k: string]: React.CSSProperties } = {
//   container: { display: "flex", flexDirection: "column", gap: 24 },
//   headerRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     gap: 12,
//   },
//   headerTitle: {
//     margin: 0,
//     fontSize: 20,
//     fontWeight: 600,
//     color: palette.gray900,
//   },
//   headerSubtitle: { margin: "4px 0 0 0", fontSize: 13, color: palette.gray600 },

//   viewAllButton: {
//     background: "transparent",
//     border: "none",
//     color: palette.primary600,
//     fontSize: 14,
//     fontWeight: 600,
//     cursor: "pointer",
//     padding: 6,
//   },

//   grid: {
//     display: "grid",
//     gap: 20,
//     alignItems: "stretch",
//   },

//   card: {
//     borderRadius: 12,
//     overflow: "hidden",
//     background: palette.white,
//     border: `1px solid ${palette.gray200}`,
//     display: "flex",
//     flexDirection: "column",
//     transition: "box-shadow 220ms ease, transform 220ms ease",
//     boxShadow: "none",
//   },

//   cardHover: {
//     boxShadow: palette.cardShadow,
//     transform: "translateY(-4px)",
//   },

//   imageWrap: {
//     position: "relative",
//     width: "100%",
//     height: 192,
//     overflow: "hidden",
//     flexShrink: 0,
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover",
//     display: "block",
//   },

//   topIconBtn: {
//     padding: 8,
//     borderRadius: 999,
//     background: "rgba(255,255,255,0.92)",
//     backdropFilter: "blur(4px)",
//     border: "none",
//     cursor: "pointer",
//     display: "inline-flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   statusBadge: {
//     display: "inline-flex",
//     alignItems: "center",
//     padding: "6px 8px",
//     borderRadius: 999,
//     fontSize: 12,
//     fontWeight: 600,
//   },

//   details: {
//     padding: 16,
//     display: "flex",
//     flexDirection: "column",
//     gap: 12,
//     flexGrow: 1,
//   },

//   title: {
//     margin: 0,
//     fontSize: 14,
//     fontWeight: 600,
//     color: palette.gray900,
//     whiteSpace: "nowrap",
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//   },

//   typeText: { margin: 0, fontSize: 12, color: palette.gray500 },

//   locationRow: {
//     display: "flex",
//     gap: 6,
//     alignItems: "center",
//     fontSize: 12,
//     color: palette.gray600,
//   },

//   ratingRow: {
//     display: "flex",
//     gap: 8,
//     alignItems: "center",
//     fontSize: 12,
//     color: palette.gray900,
//   },

//   statsRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     gap: 12,
//     borderTop: `1px solid ${palette.gray100}`,
//     paddingTop: 10,
//   },

//   statItem: {
//     display: "flex",
//     gap: 6,
//     alignItems: "center",
//     fontSize: 12,
//     color: palette.gray600,
//   },

//   actionWrap: { paddingTop: 6 },

//   viewBtn: {
//     width: "100%",
//     padding: "10px 12px",
//     borderRadius: 10,
//     border: "none",
//     cursor: "pointer",
//     fontSize: 13,
//     fontWeight: 600,
//     display: "inline-flex",
//     gap: 8,
//     alignItems: "center",
//     justifyContent: "center",
//     transition: "transform 200ms ease, background 200ms ease, color 200ms ease",
//     background: "#f3f4f6",
//     color: palette.gray700,
//   },

//   viewBtnHover: {
//     background: palette.primary600,
//     color: "#fff",
//     transform: "scale(1.02)",
//   },

//   arrowIconBase: { width: 12, height: 12, transition: "transform 200ms ease" },
// };

// /** Responsive hook to compute columns: 1 / 2 / 3 / 5 (breakpoints: 0, 768, 1024, 1280) */
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

//   const cols = (() => {
//     if (width === null) return 3; // initial reasonable default
//     if (width < 768) return 1;
//     if (width < 1024) return 2;
//     if (width < 1280) return 3;
//     return 5;
//   })();

//   return { cols };
// }

// /** Main component */
// export default function PropertyPreview(): JSX.Element {
//   const { cols } = useResponsiveCols();
//   const [hoveredId, setHoveredId] = useState<number | null>(null);
//   const [btnHoverId, setBtnHoverId] = useState<number | null>(null);

//   const gridStyle: React.CSSProperties = {
//     ...styles.grid,
//     gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.headerRow}>
//         <div>
//           <h2 style={styles.headerTitle}>Property Preview</h2>
//           <p style={styles.headerSubtitle}>
//             Quick overview of your property listings
//           </p>
//         </div>

//         <button
//           style={styles.viewAllButton}
//           aria-label="View all properties"
//           title="View all properties"
//         >
//           View All Properties →
//         </button>
//       </div>

//       {/* Grid */}
//       <div style={gridStyle}>
//         {previewProperties.map((property) => {
//           const isHovered = hoveredId === property.id;
//           const isBtnHovered = btnHoverId === property.id;

//           return (
//             <article
//               key={property.id}
//               style={{
//                 ...styles.card,
//                 ...(isHovered ? styles.cardHover : {}),
//                 display: "flex",
//                 flexDirection: "column",
//                 height: "100%",
//               }}
//               onMouseEnter={() => setHoveredId(property.id)}
//               onMouseLeave={() => {
//                 setHoveredId((prev) => (prev === property.id ? null : prev));
//                 setBtnHoverId((prev) => (prev === property.id ? null : prev));
//               }}
//               aria-labelledby={`property-title-${property.id}`}
//             >
//               {/* Image area */}
//               <div style={styles.imageWrap}>
//                 <img
//                   src={property.image}
//                   alt={property.name}
//                   style={styles.image}
//                   loading="lazy"
//                 />

//                 {/* Favorite button (top-right) */}
//                 <div style={{ position: "absolute", top: 12, right: 12 }}>
//                   <button
//                     type="button"
//                     aria-label={`Favorite ${property.name}`}
//                     style={styles.topIconBtn}
//                     title="Favorite"
//                   >
//                     <HeartIcon
//                       style={{ width: 16, height: 16, color: palette.gray600 }}
//                     />
//                   </button>
//                 </div>

//                 {/* Status badge (top-left) */}
//                 <div style={{ position: "absolute", top: 12, left: 12 }}>
//                   <span
//                     style={{
//                       ...styles.statusBadge,
//                       background:
//                         property.status === "active"
//                           ? palette.success100
//                           : palette.warning100,
//                       color:
//                         property.status === "active"
//                           ? palette.success800
//                           : palette.warning800,
//                     }}
//                     aria-hidden
//                   >
//                     {property.status === "active" ? "Active" : "Inactive"}
//                   </span>
//                 </div>
//               </div>

//               {/* Details */}
//               <div style={styles.details}>
//                 <div>
//                   <h3 id={`property-title-${property.id}`} style={styles.title}>
//                     {property.name}
//                   </h3>
//                   <p style={styles.typeText}>{property.type}</p>
//                 </div>

//                 {/* Location */}
//                 <div style={styles.locationRow}>
//                   <MapPinIcon
//                     style={{ width: 12, height: 12, color: palette.gray400 }}
//                   />
//                   <span
//                     style={{
//                       fontSize: 12,
//                       color: palette.gray600,
//                       overflow: "hidden",
//                       textOverflow: "ellipsis",
//                       whiteSpace: "nowrap",
//                     }}
//                   >
//                     {property.location}
//                   </span>
//                 </div>

//                 {/* Rating */}
//                 <div style={styles.ratingRow}>
//                   <div
//                     style={{ display: "flex", gap: 6, alignItems: "center" }}
//                   >
//                     <StarIcon
//                       style={{
//                         width: 12,
//                         height: 12,
//                         color: palette.yellow400,
//                       }}
//                     />
//                     <span
//                       style={{
//                         fontSize: 12,
//                         fontWeight: 600,
//                         color: palette.gray900,
//                       }}
//                     >
//                       {property.rating}
//                     </span>
//                   </div>
//                   <span style={{ fontSize: 12, color: palette.gray500 }}>
//                     ({property.reviews} reviews)
//                   </span>
//                 </div>

//                 {/* Stats */}
//                 <div style={styles.statsRow}>
//                   <div style={styles.statItem}>
//                     <EyeIcon
//                       style={{ width: 12, height: 12, color: palette.gray400 }}
//                     />
//                     <span>{property.views}</span>
//                   </div>
//                   <div style={styles.statItem}>
//                     <CalendarIcon
//                       style={{ width: 12, height: 12, color: palette.gray400 }}
//                     />
//                     <span>{property.bookings}</span>
//                   </div>
//                 </div>

//                 {/* Action */}
//                 <div style={styles.actionWrap}>
//                   <button
//                     type="button"
//                     onMouseEnter={() => setBtnHoverId(property.id)}
//                     onMouseLeave={() => setBtnHoverId(null)}
//                     style={{
//                       ...styles.viewBtn,
//                       ...(isBtnHovered ? styles.viewBtnHover : {}),
//                     }}
//                     aria-label={`View ${property.name}`}
//                   >
//                     <span style={{ fontSize: 13, lineHeight: 1 }}>View</span>
//                     <ArrowRightIcon
//                       style={{
//                         ...styles.arrowIconBase,
//                         transform: isBtnHovered
//                           ? "translateX(6px)"
//                           : "translateX(0)",
//                         color: isBtnHovered ? "#fff" : palette.gray700,
//                       }}
//                     />
//                   </button>
//                 </div>
//               </div>
//             </article>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  MapPinIcon,
  EyeIcon,
  CalendarIcon,
  StarIcon,
  HeartIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { me, getProperties } from "@/http/api";

/** Mock property data (unchanged) - used only as fallback */
const previewProperties = [
  {
    id: 1,
    name: "Luxury Villa Abuja",
    type: "Villa",
    location: "Abuja, Zone 5",
    rating: 4.8,
    reviews: 24,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    status: "active",
    views: 156,
    bookings: 8,
  },
  {
    id: 2,
    name: "Modern Apartment Complex",
    type: "Apartment",
    location: "Lagos, Victoria Island",
    rating: 4.6,
    reviews: 18,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
    status: "active",
    views: 203,
    bookings: 12,
  },
  {
    id: 3,
    name: "Cozy Studio Space",
    type: "Studio",
    location: "Port Harcourt, GRA",
    rating: 4.9,
    reviews: 31,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    status: "active",
    views: 89,
    bookings: 5,
  },
  {
    id: 4,
    name: "Executive Penthouse",
    type: "Penthouse",
    location: "Kano, Nasarawa",
    rating: 4.7,
    reviews: 15,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop",
    status: "inactive",
    views: 67,
    bookings: 3,
  },
  {
    id: 5,
    name: "Family Townhouse",
    type: "Townhouse",
    location: "Ibadan, Bodija",
    rating: 4.5,
    reviews: 22,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
    status: "active",
    views: 134,
    bookings: 9,
  },
];

export default function PropertyPreview(): JSX.Element {
  // responsive grid helper
  function useResponsiveCols() {
    const [width, setWidth] = useState<number | null>(null);
    useEffect(() => {
      function update() {
        if (typeof window !== "undefined") setWidth(window.innerWidth);
      }
      update();
      window.addEventListener("resize", update);
      return () => window.removeEventListener("resize", update);
    }, []);

    const cols = (() => {
      if (width === null) return 3;
      if (width < 768) return 1;
      if (width < 1024) return 2;
      if (width < 1280) return 3;
      return 5;
    })();

    return { cols };
  }

  const { cols } = useResponsiveCols();

  // local UI state (use string ids for UUID compatibility)
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [btnHoverId, setBtnHoverId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // store raw response from backend
  const [propertiesRaw, setPropertiesRaw] = useState<any | null>(null);

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

        setPropertiesRaw(propsRes);
      } catch (err) {
        console.error("Failed to load properties:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  /** Palette & styles (kept from your file) */
  const palette = {
    gray900: "#111827",
    gray700: "#374151",
    gray600: "#4b5563",
    gray500: "#6b7280",
    gray400: "#9ca3af",
    gray200: "#e5e7eb",
    gray100: "#f3f4f6",
    white: "#ffffff",
    primary600: "#dc2626",
    success100: "#dcfce7",
    success800: "#14532d",
    warning100: "#fffbeb",
    warning800: "#78350f",
    yellow400: "#f59e0b",
    cardShadow:
      "0 6px 18px -8px rgba(17,24,39,0.08), 0 8px 20px -10px rgba(17,24,39,0.03)",
  };

  const styles: { [k: string]: React.CSSProperties } = {
    container: { display: "flex", flexDirection: "column", gap: 24 },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
    },
    headerTitle: {
      margin: 0,
      fontSize: 20,
      fontWeight: 600,
      color: palette.gray900,
    },
    headerSubtitle: {
      margin: "4px 0 0 0",
      fontSize: 13,
      color: palette.gray600,
    },

    viewAllButton: {
      background: "transparent",
      border: "none",
      color: palette.primary600,
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      padding: 6,
    },

    grid: {
      display: "grid",
      gap: 20,
      alignItems: "stretch",
    },

    card: {
      borderRadius: 12,
      overflow: "hidden",
      background: palette.white,
      border: `1px solid ${palette.gray200}`,
      display: "flex",
      flexDirection: "column",
      transition: "box-shadow 220ms ease, transform 220ms ease",
      boxShadow: "none",
    },

    cardHover: {
      boxShadow: palette.cardShadow,
      transform: "translateY(-4px)",
    },

    imageWrap: {
      position: "relative",
      width: "100%",
      height: 192,
      overflow: "hidden",
      flexShrink: 0,
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    },

    topIconBtn: {
      padding: 8,
      borderRadius: 999,
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(4px)",
      border: "none",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
    },

    statusBadge: {
      display: "inline-flex",
      alignItems: "center",
      padding: "6px 8px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
    },

    details: {
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      flexGrow: 1,
    },

    title: {
      margin: 0,
      fontSize: 14,
      fontWeight: 600,
      color: palette.gray900,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },

    typeText: { margin: 0, fontSize: 12, color: palette.gray500 },

    locationRow: {
      display: "flex",
      gap: 6,
      alignItems: "center",
      fontSize: 12,
      color: palette.gray600,
    },

    ratingRow: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      fontSize: 12,
      color: palette.gray900,
    },

    statsRow: {
      display: "flex",
      justifyContent: "space-between",
      gap: 12,
      borderTop: `1px solid ${palette.gray100}`,
      paddingTop: 10,
    },

    statItem: {
      display: "flex",
      gap: 6,
      alignItems: "center",
      fontSize: 12,
      color: palette.gray600,
    },

    actionWrap: { paddingTop: 6 },

    viewBtn: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 10,
      border: "none",
      cursor: "pointer",
      fontSize: 13,
      fontWeight: 600,
      display: "inline-flex",
      gap: 8,
      alignItems: "center",
      justifyContent: "center",
      transition:
        "transform 200ms ease, background 200ms ease, color 200ms ease",
      background: "#f3f4f6",
      color: palette.gray700,
    },

    viewBtnHover: {
      background: palette.primary600,
      color: "#fff",
      transform: "scale(1.02)",
    },

    arrowIconBase: {
      width: 12,
      height: 12,
      transition: "transform 200ms ease",
    },
  };

  // --- Normalise backend response into array
  const propertiesList: any[] = Array.isArray(propertiesRaw)
    ? propertiesRaw
    : propertiesRaw?.data ??
      propertiesRaw?.properties ??
      propertiesRaw?.items ??
      [];

  // use backend data if present, otherwise fallback to previewProperties
  const propertiesToRender =
    propertiesList.length > 0 ? propertiesList : previewProperties;

  const gridStyle: React.CSSProperties = {
    ...styles.grid,
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.headerTitle}>Property Preview</h2>
          <p style={styles.headerSubtitle}>
            Quick overview of your property listings
          </p>
        </div>

        <button
          style={styles.viewAllButton}
          aria-label="View all properties"
          title="View all properties"
        >
          View All Properties →
        </button>
      </div>

      {/* Grid */}
      <div style={gridStyle}>
        {loading && (
          <div style={{ gridColumn: `1 / -1`, padding: 12 }}>
            Loading properties…
          </div>
        )}

        {!loading && propertiesToRender.length === 0 && (
          <div style={{ gridColumn: `1 / -1`, padding: 12 }}>
            No properties found
          </div>
        )}

        {!loading &&
          propertiesToRender.map((rawProp) => {
            // normalize fields from backend vs preview mock
            const prop = rawProp;
            const pid = String(
              prop.id ?? prop._id ?? prop.name ?? Math.random()
            );
            const title = prop.title ?? prop.name ?? "Untitled property";
            const type = prop.type ?? "—";
            const location = prop.location ?? "—";
            const status =
              prop.activeStatus ?? prop.status ?? prop.active ?? "inactive";
            const photos = Array.isArray(prop.photos) ? prop.photos : [];
            const image =
              photos.length > 0
                ? photos[0]
                : (prop.image as string) ??
                  (prop.imageUrl as string) ??
                  "https://via.placeholder.com/800x500?text=No+image";
            const views = prop.views ?? "-";
            const bookings = prop.bookings ?? 0;
            const rating = prop.rating ?? "-";
            const reviews = prop.reviews ?? "-";

            const isHovered = hoveredId === pid;
            const isBtnHovered = btnHoverId === pid;

            return (
              <article
                key={pid}
                style={{
                  ...styles.card,
                  ...(isHovered ? styles.cardHover : {}),
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
                onMouseEnter={() => setHoveredId(pid)}
                onMouseLeave={() => {
                  setHoveredId((prev) => (prev === pid ? null : prev));
                  setBtnHoverId((prev) => (prev === pid ? null : prev));
                }}
                aria-labelledby={`property-title-${pid}`}
              >
                {/* Image area */}
                <div style={styles.imageWrap}>
                  <img
                    src={image}
                    alt={title}
                    style={styles.image}
                    loading="lazy"
                  />

                  {/* Favorite button (top-right) */}
                  <div style={{ position: "absolute", top: 12, right: 12 }}>
                    <button
                      type="button"
                      aria-label={`Favorite ${title}`}
                      style={styles.topIconBtn}
                      title="Favorite"
                    >
                      <HeartIcon
                        style={{
                          width: 16,
                          height: 16,
                          color: palette.gray600,
                        }}
                      />
                    </button>
                  </div>

                  {/* Status badge (top-left) */}
                  <div style={{ position: "absolute", top: 12, left: 12 }}>
                    <span
                      style={{
                        ...styles.statusBadge,
                        background:
                          status === "active"
                            ? palette.success100
                            : palette.warning100,
                        color:
                          status === "active"
                            ? palette.success800
                            : palette.warning800,
                      }}
                      aria-hidden
                    >
                      {status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div style={styles.details}>
                  <div>
                    <h3 id={`property-title-${pid}`} style={styles.title}>
                      {title}
                    </h3>
                    <p style={styles.typeText}>{type}</p>
                  </div>

                  {/* Location */}
                  <div style={styles.locationRow}>
                    <MapPinIcon
                      style={{ width: 12, height: 12, color: palette.gray400 }}
                    />
                    <span
                      style={{
                        fontSize: 12,
                        color: palette.gray600,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {location}
                    </span>
                  </div>

                  {/* Rating */}
                  <div style={styles.ratingRow}>
                    <div
                      style={{ display: "flex", gap: 6, alignItems: "center" }}
                    >
                      <StarIcon
                        style={{
                          width: 12,
                          height: 12,
                          color: palette.yellow400,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: palette.gray900,
                        }}
                      >
                        {rating}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: palette.gray500 }}>
                      ({reviews} reviews)
                    </span>
                  </div>

                  {/* Stats */}
                  <div style={styles.statsRow}>
                    <div style={styles.statItem}>
                      <EyeIcon
                        style={{
                          width: 12,
                          height: 12,
                          color: palette.gray400,
                        }}
                      />
                      <span>{views}</span>
                    </div>
                    <div style={styles.statItem}>
                      <CalendarIcon
                        style={{
                          width: 12,
                          height: 12,
                          color: palette.gray400,
                        }}
                      />
                      <span>{bookings}</span>
                    </div>
                  </div>

                  {/* Action */}
                  <div style={styles.actionWrap}>
                    <button
                      type="button"
                      onMouseEnter={() => setBtnHoverId(pid)}
                      onMouseLeave={() => setBtnHoverId(null)}
                      style={{
                        ...styles.viewBtn,
                        ...(isBtnHovered ? styles.viewBtnHover : {}),
                      }}
                      aria-label={`View ${title}`}
                    >
                      <span style={{ fontSize: 13, lineHeight: 1 }}>View</span>
                      <ArrowRightIcon
                        style={{
                          ...styles.arrowIconBase,
                          transform: isBtnHovered
                            ? "translateX(6px)"
                            : "translateX(0)",
                          color: isBtnHovered ? "#fff" : palette.gray700,
                        }}
                      />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
      </div>
    </div>
  );
}
