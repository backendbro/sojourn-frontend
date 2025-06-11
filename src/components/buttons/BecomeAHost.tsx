import Link from "next/link";
import HomeIcon from "../svgs/HomeIcon";

export default () => {
  return (
    <Link
      href="/hosts/signup"
      className="hidden ml-5  text-black w-[193px] px-2 h-[47px] font-[450] items-center bg-paper border border-black rounded-3xl text-[13px] justify-center bg-paper ease-in duration-200 hover:bg-red-50 lg:px-4 lg:space-x-2 xl:flex"
    >
      <span className="font-sans">Become a host</span>
      <HomeIcon size={16} />
    </Link>
  );
};
