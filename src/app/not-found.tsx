import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col space-y-5 items-center justify-center h-screen">
      <h2 className="text-3xl">Not Found</h2>
      <p className="text-2xl">Could not find requested resource</p>
      <Image
        priority
        src="/assets/icons/404.svg"
        alt="404 Icon"
        width={300}
        height={300}
      />
      <Link
        className="px-10 py-3 rounded-full bg-primary text-white font-semibold ease duration-300 hover:bg-red-900"
        prefetch
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
