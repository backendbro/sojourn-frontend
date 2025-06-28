// "use client";

// import DashIcon from "../svgs/DashIcon";
// import ListingSearch from "./listing-search";
// import { useListingSearch } from "@/context/SearchContext";
// import SearchCalendar from "./search-calendar";
// import ChildrenAndInfantCalculator from "./children-infant-calculator";
// import PlusIcon from "../svgs/PlusIcon";
// import ChevronDownIcon from "../svgs/chevronDownIcon";
// import useQueryString from "@/hooks/useQueryString";
// import { FormEvent } from "react";
// import { setMobileSearchStatus } from "@/store/features/mobile-search-slice";
// import { useDispatch } from "react-redux";
// import { toast } from "sonner";
// import { Search, Users } from "lucide-react";

// const CustomSearch = () => {
//   const { router } = useQueryString();

//   const {
//     adults,
//     children,
//     infants,
//     setSearchValue,
//     value,
//     checkInDate,
//     checkOutDate,
//   } = useListingSearch();

//   const dispatch = useDispatch();

//   function onSubmit(e: FormEvent) {
//     e.preventDefault();
//     if (!checkInDate || !value || !checkOutDate) {
//       e.preventDefault();

//       toast("Search Error.", {
//         description: "You must fill in all fields.",
//         action: {
//           label: "Ok",
//           onClick: () => null,
//         },
//       });
//     } else {
//       e.preventDefault();
//       dispatch(setMobileSearchStatus(false));
//       router.push(
//         `/properties?city=${value}&adults=${adults}&children=${children}&infants=${infants}&check-in=${checkInDate.toISOString()}&check-out=${checkOutDate.toISOString()}`
//       );
//     }
//   }

//   return (
//     <form
//       onSubmit={onSubmit}
//       className=" w-[88%] max-w-[1400px] mx-auto text-[18px]  flex flex-col bg-white min-h-[60px] hero-search-shadow rounded-3xl  border border-slate-200 z-50  md:w-[550px] lg:justify-between lg:flex-row lg:rounded-full lg:py-0 lg:w-[950px]"
//     >
//       <ListingSearch />
//       <SearchCalendar />
//       <div className="px-4 flex flex-col items-center space-x-2 font-[300] cursor-pointer lg:flex-row">
//         <div className="w-full relative flex flex-col py-5 items-left lg:py-0 lg:w-auto lg:flex-row lg:items-center lg:justify-between">
//           <div className="w-full flex justify-between items-center px-3  lg:px-0">
//             <div className="flex items-center space-x-2 lg:space-x-4">
//               <Users size={20} className="stroke-primary" />
//               <div className="text-[16px] font-[700]">Adults</div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <button
//                 className="outline-none border-0 p-2 rounded-full hover:bg-red-50"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setSearchValue((prevState) => ({
//                     ...prevState,
//                     searchValues: {
//                       ...prevState.searchValues,
//                       adults:
//                         prevState.searchValues.adults - 1 < 1
//                           ? 1
//                           : prevState.searchValues.adults - 1,
//                     },
//                   }));
//                 }}
//               >
//                 <DashIcon />
//               </button>
//               <div className="text-[16px] font-[700]">{adults}</div>
//               <button
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setSearchValue((prevState) => ({
//                     ...prevState,
//                     searchValues: {
//                       ...prevState.searchValues,
//                       adults: prevState.searchValues.adults + 1,
//                     },
//                   }));
//                 }}
//                 className="outline-none border-0 font-[300] text-2xl  p-3 rounded-full hover:bg-red-50"
//               >
//                 <PlusIcon size={12} />
//               </button>
//             </div>
//           </div>
//           <ul className="block w-full overflow-hidden py-1  m-0 lg:hidden">
//             <li className="flex items-center  justify-between py-4 px-3 lg:py-2">
//               <div className="text-[16px] font-[700]">Children</div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     if (children === 0) return;
//                     setSearchValue((prevState) => ({
//                       ...prevState,
//                       searchValues: {
//                         ...prevState.searchValues,
//                         children: prevState.searchValues.children - 1,
//                       },
//                     }));
//                   }}
//                   className="outline-none border-0  p-2 rounded-full hover:bg-red-50"
//                 >
//                   <DashIcon />
//                 </button>
//                 <div className="text-[16px] font-[700]">{children}</div>
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setSearchValue((prevState) => ({
//                       ...prevState,
//                       searchValues: {
//                         ...prevState.searchValues,
//                         children: prevState.searchValues.children + 1,
//                       },
//                     }));
//                   }}
//                   className="outline-none border-0 font-[300] text-2xl  p-3 rounded-full hover:bg-red-50"
//                 >
//                   <PlusIcon size={12} />
//                 </button>
//               </div>
//             </li>
//             <li className="flex items-center justify-between px-3 py-4 lg:py-2">
//               <div className="flex items-center text-[16px]">
//                 <div className="text-[16px] font-[700]">Infants</div>
//                 <div className="text-slate-400 text-xs min-w-[50px] mx-1">
//                   till 1 year
//                 </div>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     if (infants === 0) return;
//                     setSearchValue((prevState) => ({
//                       ...prevState,
//                       searchValues: {
//                         ...prevState.searchValues,
//                         infants: prevState.searchValues.infants - 1,
//                       },
//                     }));
//                   }}
//                   className="outline-none border-0  p-2 rounded-full hover:bg-red-50"
//                 >
//                   <DashIcon />
//                 </button>
//                 <div className="text-[16px] font-[700]">{infants}</div>
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setSearchValue((prevState) => ({
//                       ...prevState,
//                       searchValues: {
//                         ...prevState.searchValues,
//                         infants: prevState.searchValues.infants + 1,
//                       },
//                     }));
//                   }}
//                   className="outline-none border-0 font-[300] text-2xl  p-3 rounded-full hover:bg-red-50"
//                 >
//                   <PlusIcon size={12} />
//                 </button>
//               </div>
//             </li>
//           </ul>
//           <div className="hidden w-full h-full  relative lg:flex">
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 setSearchValue((prevState) => ({
//                   ...prevState,
//                   searchValues: {
//                     ...prevState.searchValues,
//                     openChildrenCalculator:
//                       !prevState.searchValues.openChildrenCalculator,
//                   },
//                 }));
//               }}
//               className="flex items-center justify-between space-x-2 outline-none border-0 py-4  hover:bg-red-50 lg:px-2 lg:py-2"
//             >
//               <div className="text-[16px] font-[700]"> Children</div>
//               <ChevronDownIcon size={10} />
//             </button>
//             <ChildrenAndInfantCalculator />
//           </div>
//         </div>
//       </div>
//       <div>
//         <button className="w-full h-full py-3 outline-none flex items-center justify-center  space-x-1  border-none bg-primary px-4 rounded-full  ease duration-300  hover:bg-[#3EBB7F] lg:w-auto lg:px-5">
//           <Search color="white" size={20} />
//           <span className="text-white text-sm">Search</span>
//         </button>
//       </div>
//     </form>
//   );
// };

// export default CustomSearch;

"use client";

import DashIcon from "../svgs/DashIcon";
import ListingSearch from "./listing-search";
import { useListingSearch } from "@/context/SearchContext";
import SearchCalendar from "./search-calendar";
import ChildrenAndInfantCalculator from "./children-infant-calculator";
import PlusIcon from "../svgs/PlusIcon";
import ChevronDownIcon from "../svgs/chevronDownIcon";
import useQueryString from "@/hooks/useQueryString";
import { FormEvent } from "react";
import { setMobileSearchStatus } from "@/store/features/mobile-search-slice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Calendar, MapPin, Search, Users } from "lucide-react";

const CustomSearch = () => {
  const { router } = useQueryString();

  const {
    adults,
    children,
    infants,
    setSearchValue,
    value,
    checkInDate,
    checkOutDate,
  } = useListingSearch();

  const dispatch = useDispatch();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!checkInDate || !value || !checkOutDate) {
      toast("Search Error", {
        description: "Please fill in all required fields",
        action: {
          label: "OK",
          onClick: () => null,
        },
      });
    } else {
      dispatch(setMobileSearchStatus(false));
      router.push(
        `/properties?city=${value}&adults=${adults}&children=${children}&infants=${infants}&check-in=${checkInDate.toISOString()}&check-out=${checkOutDate.toISOString()}`
      );
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-[1000px] mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        {/* Location */}
        <div className="relative group">
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
            <MapPin className="w-5 h-5 text-primary" />
            <ListingSearch />
            {/* <div className="flex-1">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Location
              </label>
            </div> */}
          </div>
        </div>

        {/* Dates */}
        <div className="relative group">
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
            <Calendar className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Dates
              </label>
              <SearchCalendar />
            </div>
          </div>
        </div>

        {/* Guests */}
        <div className="relative group">
          <div className="flex items-center space-x-3 p-4 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-200">
            <Users className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-500 mb-1">
                Guests
              </label>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {adults + children} guest{adults + children !== 1 ? "s" : ""}
                  {infants > 0
                    ? `, ${infants} infant${infants !== 1 ? "s" : ""}`
                    : ""}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchValue((prev) => ({
                      ...prev,
                      searchValues: {
                        ...prev.searchValues,
                        openChildrenCalculator:
                          !prev.searchValues.openChildrenCalculator,
                      },
                    }));
                  }}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors duration-200"
                >
                  <ChevronDownIcon />
                </button>
              </div>
              {/* Guest Calculator */}
              <ChildrenAndInfantCalculator />
            </div>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="p-6 pt-0">
        <button
          type="submit"
          className="w-full bg-primary text-white py-4 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all duration-200 hover:bg-primary/90 active:scale-98"
        >
          <Search className="w-5 h-5" />
          <span>Search Properties</span>
        </button>
      </div>
    </form>
  );
};

export default CustomSearch;
