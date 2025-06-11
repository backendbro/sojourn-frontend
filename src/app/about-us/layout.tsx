import type { Metadata } from "next";
import "@/app/about-us.css";

export const metadata: Metadata = {
  title: "About Sojourn - Our Story",
  description:
    "Learn about Sojourn's mission to provide people with luxury stays and extraordinary experiences worldwide.",
  openGraph: {
    title: "About Sojourn - Our Story",
    url: "https://sojourn.ng/about-us",
    description:
      "Learn about Sojourn's mission to provide people with luxury stays and extraordinary experiences worldwide.",
    type: "website",
    images: [
      {
        url: "https://www.sojourn.ng/assets/logo/sojourn-logo-red.png",
        width: 1200,
        height: 630,
        alt: "Sojourn Nigeria -  Our Story",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full">{children}</div>;
}
