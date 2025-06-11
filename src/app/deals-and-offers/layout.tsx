import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exclusive Deals & Offers | Save More with Sojourn",
  description:
    "Discover exclusive deals and offers on unique stays and travel experiences. Book now and save big on your next getaway with Sojourn.",
  keywords: [
    "travel deals",
    "exclusive offers",
    "Sojourn discounts",
    "save on travel",
    "unique stays deals",
    "vacation offers",
    "holiday discounts",
  ],
  openGraph: {
    title: "Exclusive Deals & Offers | Save More with Sojourn",
    description:
      "Discover exclusive deals and offers on unique stays and travel experiences. Book now and save big on your next getaway with Sojourn.",
    url: "https://www.sojourn.ng/deals-and-offers",
    type: "website",
    images: [
      {
        url: "https://www.sojourn.ng/assets/logo/sojourn-logo-red.png",
        width: 1200,
        height: 630,
        alt: "Exclusive Deals & Offers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exclusive Deals & Offers | Save More with Sojourn",
    description:
      "Discover exclusive deals and offers on unique stays and travel experiences. Book now and save big on your next getaway with Sojourn.",
    images: ["https://www.sojourn.ng/assets/logo/sojourn-logo-red.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full">{children}</div>;
}
