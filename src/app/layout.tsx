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
                <main id="main-content">{children}</main>
              </SidebarProvider>
            </NetworkProvider>
          </NotificationProvider>
        </AppProvider>
        <FacebookAdsScript />
      </body>
    </html>
  );
}
