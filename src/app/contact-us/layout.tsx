import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Get in Touch with Sojourn",
  description:
    "Have questions or need support? Contact Sojourn’s team for assistance with bookings, hosting, or general inquiries.",
  keywords: [
    "contact Sojourn",
    "get in touch",
    "customer support",
    "booking support",
    "host support",
    "Sojourn contact information",
  ],
  openGraph: {
    title: "Contact Us | Get in Touch with Sojourn",
    description:
      "Have questions or need support? Contact Sojourn’s team for assistance with bookings, hosting, or general inquiries.",
    url: "https://www.sojourn.ng/contact-us",
    type: "website",
    images: [
      {
        url: "https://www.sojourn.ng/assets/logo/sojourn-logo-red.png",
        width: 1200,
        height: 630,
        alt: "Contact Sojourn Support",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Get in Touch with Sojourn",
    description:
      "Have questions or need support? Contact Sojourn’s team for assistance with bookings, hosting, or general inquiries.",
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
