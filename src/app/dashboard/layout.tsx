import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sojourn Nigeria",
  description: "Sojourn Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex">
      <div className="w-full min-h-[88.5vh] ">{children}</div>
    </div>
  );
}
