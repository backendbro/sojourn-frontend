import { User } from "lucide-react";
import clsx from "clsx";

type Props = {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  xs: { container: "w-8 h-8", icon: "w-4 h-4" },
  sm: { container: "w-10 h-10", icon: "w-5 h-5" },
  md: { container: "w-12 h-12", icon: "w-6 h-6" },
  lg: { container: "w-16 h-16", icon: "w-8 h-8" },
};

export default function DefaultAvatar({ size = "md", className }: Props) {
  const s = sizeMap[size];
  return (
    <div
      className={clsx(
        s.container,
        "rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center shadow-sm ring-2 ring-offset-2 ring-gray-100",
        className
      )}
    >
      <User className={clsx(s.icon, "text-gray-500")} />
    </div>
  );
}
