import HamburgerButton from "../buttons/HamburgerButton";
import MobileSearch from "./mobile-search";

const MenuSSR = () => {
  return (
    <div className="w-full px-5 h-[67px] max-w-[1400px] 2xl:mx-auto bg-paper flex items-center justify-between sm:px-[80px]">
      <MobileSearch />
      <div className="flex items-center">
        <HamburgerButton />
      </div>
    </div>
  );
};

export default MenuSSR;
