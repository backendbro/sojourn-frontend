import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Your Property on Sojourn | Reach Travelers Worldwide",
  description:
    "Turn your space into income! List your property on Sojourn and connect with a global community of people. It's easy, secure, and free to get started.",
  keywords: [
    "sojourn nigeria",
    "sojourn naija",
    "sojourn abuja",
    "sojourn lagos",
    "sojourn portharcourt",
    "sojourn akwa ibom",
    "shorlets in akwa ibom",
    "sojourn delta",
    "shorlets in delta",
    "sojourn oyo",
    "shorlets in oyo",
    "sojourn benin",
    "shorlets in benin",
    "list your property",
    "become a host",
    "earn with your space",
    "vacation rental hosting",
    "Sojourn hosting",
    "short-term rental platform",
    "host on Sojourn",
    "travel accommodations",
    "property income",
  ],
  openGraph: {
    title: "List Your Property on Sojourn | Reach people Worldwide",
    description:
      "Turn your space into income! List your property on Sojourn and connect with a global community of people. It's easy, secure, and free to get started.",
    url: "https://www.sojourn.ng/become-a-host",
    type: "website",
    images: [
      {
        url: "https://www.sojourn.ng/assets/logo/sojourn-logo-red.png",
        width: 1200,
        height: 630,
        alt: "List Your Property on Sojourn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "List Your Property on Sojourn | Earn with Your Space",
    description:
      "Turn your space into income! List your property on Sojourn and connect with a global community of people. Start hosting today.",
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
