import CurrencyAndLanguage from "../ui/CurrencyAndLanguage";
import MenuSearch from "../ui/menu-search";
import LoginAndSignup from "./LoginAndSignup";
import { FC } from "react";

const MenuList: FC<{ loggedIn: boolean }> = ({ loggedIn = false }) => {
  return (
    <div className="w-full flex items-center">
      <nav className="w-full  flex items-center  text-black font-[600px] text-[14px] font-[500]">
        <MenuSearch />
        <div className="flex items-center">
          <CurrencyAndLanguage />
          {!loggedIn ? <LoginAndSignup /> : ""}
        </div>
      </nav>
    </div>
  );
};

export default MenuList;
