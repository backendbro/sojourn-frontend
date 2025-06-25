import type { Metadata } from "next";
import Menu from "@/components/navigation/Menu";
import AppProvider from "./provider";
import "./custom.css";
import "react-multi-carousel/lib/styles.css";
import "./globals.css";
import Sidebar from "@/components/navigation/sidebar";
import SidebarProvider from "./SidebarProvider";
import { inter, raleway } from "@/fonts";
import Script from "next/script";
import Prompt from "@/components/ui/prompt";
import NetworkProvider from "@/components/network/network-provider";
import NotificationProvider from "@/components/notification/notification-provider";
import FacebookAdsScript from "@/components/scripts/facebook-ads-script";
import StructuredData from "@/components/StructuredData/StructuredData";

export const metadata: Metadata = {
  title: "Sojourn | Book Unique Stays & Travel Experiences Worldwide",
  description:
    "Discover unique accommodations, cozy homes, and extraordinary travel experiences with Sojourn. Explore stays that match your style and budget. Travel, connect, and create unforgettable memories.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  keywords: [
    "sojourn nigeria",
    "sojourn naija",
    "sojourn abuja",
    "sojourn lagos",
    "shorlets in abuja",
    "shorlets in lagos",
    "shorlets in portharcourt",
    "sojourn portharcourt",
    "sojourn akwa ibom",
    "shorlets in akwa ibom",
    "sojourn delta",
    "shorlets in delta",
    "sojourn oyo",
    "shorlets in oyo",
    "sojourn benin",
    "shorlets in benin",
    "unique stays",
    "travel experiences",
    "vacation rentals",
    "holiday homes",
    "Sojourn",
  ],
  openGraph: {
    title: "Sojourn: Book Unique Stays & Travel Experiences Worldwide",
    description:
      "Discover unique accommodations, cozy homes, and extraordinary travel experiences with Sojourn. Explore stays that match your style and budget.",
    url: "https://www.sojourn.ng",
    type: "website",
    images: [
      {
        url: "https://www.sojourn.ng/assets/logo/sojourn-logo-red.png",
        width: 1200,
        height: 630,
        alt: "Sojourn Nigeria, Luxury away from home",
      },
    ],
  },
  other: {
    "google-site-verification": "mCQUQ_-DYgnrdxZ3BLJHR6WxhLq1vHl2AEWWbsJyqq8",
  },
  verification: {
    google: "mCQUQ_-DYgnrdxZ3BLJHR6WxhLq1vHl2AEWWbsJyqq8",
  },
  metadataBase: new URL("https://sojourn.ng"),
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-E34PC8GDB6"
        strategy="afterInteractive"
      />
      {/* <Script strategy="afterInteractive" id="google-analytics">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-E34PC8GDB6');`}
      </Script> */}

      <Script strategy="afterInteractive" id="google-analytics">
        {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-E34PC8GDB6', {
      page_path: window.location.pathname,
    });
  `}
      </Script>
      <Script
        src="https://code.tidio.co/z4gvzirnqym0ttmipzijrxrrhd7um6o1.js"
        async
      />
      <body className={`${raleway.variable} ${inter.variable} font-sans`}>
        <StructuredData />
        <AppProvider>
          <Prompt />
          <NotificationProvider>
            <NetworkProvider>
              <Menu />
              <SidebarProvider>
                <Sidebar />
                {children}
              </SidebarProvider>
            </NetworkProvider>
          </NotificationProvider>
        </AppProvider>
        <FacebookAdsScript />
      </body>
    </html>
  );
}
