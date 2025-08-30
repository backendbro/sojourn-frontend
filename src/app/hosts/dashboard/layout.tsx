// import Sidebar from "@/components/navigation/hosts/sidebar";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Sojourn Nigeria",
//   description: "Sojourn Dashboard",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <div className="w-full h-full flex 2xl:max-w-[1400px] 2xl:mx-auto">
//       <Sidebar />
//       <div className="w-full min-h-[88.5vh]">{children}</div>
//     </div>
//   );
// }

import Sidebar from "@/components/navigation/hosts/sidebar";
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
      {/* Sidebar now positioned absolutely to go to edge */}
      <div className="fixed left-0 top-0 h-screen z-10">
        <Sidebar />
      </div>

      {/* Content area with padding to account for sidebar */}
      <div className="w-full min-h-[88.5vh] lg:pl-72">
        <div className="2xl:max-w-[1400px] 2xl:mx-auto w-full">{children}</div>
      </div>
    </div>
  );
}
