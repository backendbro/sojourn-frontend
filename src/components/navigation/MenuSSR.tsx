// import HamburgerButton from "../buttons/HamburgerButton";
// import MobileSearch from "./mobile-search";
// import MenuSearch from "../ui/menu-search";

// const MenuSSR = () => {
//   return (
     
//     //<div className="w-full px-5 h-[67px] max-w-[1400px] 2xl:mx-auto bg-paper flex items-center justify-between sm:px-[80px]">
//     <div className="w-full px-3 sm:px-5 md:px-10 lg:px-[80px] min-h-[64px] sm:min-h-[72px] md:min-h-[80px] max-w-[1400px] 2xl:mx-auto bg-primary flex items-center justify-between gap-3 sm:gap-4"> 
//        <div className="shrink-0">
//         <MobileSearch />
//       </div>
   
//       <div className="flex items-center">
//          <div className="flex-1 flex items-center justify-center min-w-0">
//         <MenuSearch />
//       </div>
//         <HamburgerButton />
//       </div>
//     </div>
//   );
// };

// export default MenuSSR;


import HamburgerButton from "../buttons/HamburgerButton";
import MobileSearch from "./mobile-search";
import MenuSearch from "../ui/menu-search";

const MenuSSR = () => {
  return (
    <div className="w-full px-3 sm:px-5 md:px-10 lg:px-[80px] min-h-[64px] sm:min-h-[72px] md:min-h-[80px] max-w-[1400px] 2xl:mx-auto bg-primary flex items-center justify-between gap-3 sm:gap-4">
      <div className="shrink-0">
        <MobileSearch />
      </div>
      <div className="flex-1 flex items-center justify-center min-w-0">
        <MenuSearch />
      </div>
      <HamburgerButton />
    </div>
  );
};

export default MenuSSR;
