// components/StructuredData.tsx
import Script from "next/script";

export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Sojourn Nigeria",
    description: "Book Unique Stays & Travel Experiences Worldwide",
    url: "https://sojourn.ng",
    logo: "https://sojourn.ng/assets/logo/sojourn-logo-red.png",
    sameAs: ["https://m.facebook.com/profile.php?id=61573968666419"],
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
