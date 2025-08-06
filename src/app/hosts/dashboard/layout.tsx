import Sidebar from "@/components/navigation/hostse/sidebar";
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
    <div className="w-full h-full flex 2xl:max-w-[1400px] 2xl:mx-auto">
      <Sidebar />
      <div className="w-full min-h-[88.5vh]">{children}</div>
    </div>
  );
}
