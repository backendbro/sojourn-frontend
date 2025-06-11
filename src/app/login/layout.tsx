import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Login - Sojourn",
  description: "Sojourn nigeria, Login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full">
      <Suspense fallback={<div>loading...</div>}>{children}</Suspense>
    </div>
  );
}
