import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safety",
  description: "Sojourn nigeria safety",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full">{children}</div>;
}
