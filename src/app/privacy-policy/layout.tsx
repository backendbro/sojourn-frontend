import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Sojourn nigeria, terms of use",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full">{children}</div>;
}
