"use client";

import { useListingSearch } from "@/context/SearchContext";
import { useEffect, useRef } from "react";
import DashIcon from "../svgs/DashIcon";
import PlusIcon from "../svgs/PlusIcon";
import useQueryString from "@/hooks/useQueryString";

export const ChildrenAndInfantCalculator = () => {
  const { pathname } = useQueryString();

  const { openChildrenCalculator, children, infants, adults, setSearchValue } =
    useListingSearch();

  const modalRef: any = useRef();

  const closeModal = () => {
    setSearchValue((prevState) => ({
      ...prevState,
      searchValues: {
        ...prevState.searchValues,
        openChildrenCalculator: false,
      },
    }));
  };

  const handleClickOutside = (event: Event) => {
    //@ts-ignore
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
    event.stopPropagation();
  };

  const handleKeyDown = (event: {
    key: string;
    stopPropagation: () => void;
  }) => {
    if (event.key === "Escape") {
      closeModal();
    }
    event.stopPropagation();
  };

  useEffect(() => {
    if (openChildrenCalculator) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openChildrenCalculator]);

  return (
    // openChildrenCalculator && (
    //   <div
    //     ref={modalRef}
    //     className="w-full bg-paper absolute shadow-lg left-2/4 md:left-3/4 w-auto z-[999999999] top-[100%] rounded-lg py-1 mt-0 sm:w-auto"
    //   >
    //     <ul className="w-full overflow-hidden py-1 m-0">
    //       {!(pathname === "/") ? (
    //         <li className="flex items-center px-3 justify-between py-4 sm:py-2">
    //           <div className="flex items-center space-x-2 lg:space-x-4">
    //             <div>Adults</div>
    //           </div>
    //           <div className="flex items-center space-x-2">
    //             <button
    //               className="outline-none border-0 p-2 rounded-full hover:bg-red-50"
    //               onClick={(e) => {
    //                 e.preventDefault();
    //                 e.stopPropagation();

    //                 setSearchValue((prevState) => ({
    //                   ...prevState,
    //                   searchValues: {
    //                     ...prevState.searchValues,
    //                     adults:
    //                       prevState.searchValues.adults - 1 < 1
    //                         ? 1
    //                         : prevState.searchValues.adults - 1,
    //                   },
    //                 }));
    //               }}
    //             >
    //               <DashIcon />
    //             </button>
    //             <div className="text-[20px]">{adults}</div>
    //             <button
    //               onClick={(e) => {
    //                 e.preventDefault();
    //                 e.stopPropagation();

    //                 setSearchValue((prevState) => ({
    //                   ...prevState,
    //                   searchValues: {
    //                     ...prevState.searchValues,
    //                     adults: prevState.searchValues.adults + 1,
    //                   },
    //                 }));
    //               }}
    //               className="outline-none border-0 font-[300] text-2xl  p-3 rounded-full hover:bg-red-50"
    //             >
    //               <PlusIcon size={12} />
    //             </button>
    //           </div>
    //         </li>
    //       ) : (
    //         ""
    //       )}
    //       <li className="flex items-center px-3 justify-between py-4 sm:py-2">
    //         <div className="ChildrenAndInfantCalculator">Children</div>
    //         <div className="flex items-center space-x-2">
    //           <button
    //             onClick={(e) => {
    //               e.preventDefault();
    //               e.stopPropagation();

    //               if (children === 0) return;
    //               setSearchValue((prevState) => ({
    //                 ...prevState,
    //                 searchValues: {
    //                   ...prevState.searchValues,
    //                   children: prevState.searchValues.children - 1,
    //                 },
    //               }));
    //             }}
    //             className="outline-none border-0  p-2 rounded-full hover:bg-red-50"
    //           >
    //             <DashIcon />
    //           </button>
    //           <div className="text-[20px]">{children}</div>
    //           <button
    //             onClick={(e) => {
    //               e.preventDefault();
    //               e.stopPropagation();

    //               setSearchValue((prevState) => ({
    //                 ...prevState,
    //                 searchValues: {
    //                   ...prevState.searchValues,
    //                   children: prevState.searchValues.children + 1,
    //                 },
    //               }));
    //             }}
    //             className="outline-none border-0 font-[300] text-2xl  p-3 rounded-full hover:bg-red-50"
    //           >
    //             <PlusIcon size={12} />
    //           </button>
    //         </div>
    //       </li>
    //       <li className="flex items-center  px-3 justify-between py-4 sm:py-2">
    //         <div className="flex items-center">
    //           <div className="ChildrenAndInfantCalculator">Infants</div>
    //           <div className="text-slate-400 text-xs min-w-[50px] mx-1">
    //             till 1 year
    //           </div>
    //         </div>
    //         <div className="flex items-center space-x-2">
    //           <button
    //             onClick={(e) => {
    //               e.preventDefault();
    //               e.stopPropagation();

    //               if (infants === 0) return;
    //               setSearchValue((prevState) => ({
    //                 ...prevState,
    //                 searchValues: {
    //                   ...prevState.searchValues,
    //                   infants: prevState.searchValues.infants - 1,
    //                 },
    //               }));
    //             }}
    //             className="outline-none border-0  p-2 rounded-full hover:bg-red-50"
    //           >
    //             <DashIcon />
    //           </button>
    //           <div className="text-[20px]">{infants}</div>
    //           <button
    //             onClick={(e) => {
    //               e.stopPropagation();
    //               e.preventDefault();
    //               setSearchValue((prevState) => ({
    //                 ...prevState,
    //                 searchValues: {
    //                   ...prevState.searchValues,
    //                   infants: prevState.searchValues.infants + 1,
    //                 },
    //               }));
    //             }}
    //             className="outline-none border-0 font-[300] text-2xl  p-3 rounded-full hover:bg-red-50"
    //           >
    //             <PlusIcon size={12} />
    //           </button>
    //         </div>
    //       </li>
    //     </ul>
    //   </div>
    // )

    openChildrenCalculator && (
      <div
        ref={modalRef}
        className="absolute z-[999999999] top-[100%] left-1/2 transform -translate-x-1/2 mt-2
               w-[90vw] max-w-sm sm:max-w-md md:max-w-lg bg-paper shadow-lg rounded-lg py-1"
      >
        <ul className="w-full overflow-hidden py-1 m-0">
          {pathname !== "/" && (
            <li className="flex items-center px-3 justify-between py-4 sm:py-2">
              <div className="flex items-center space-x-2 lg:space-x-4">
                <div>Adults</div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="outline-none border-0 p-2 rounded-full hover:bg-red-50"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchValue((prevState) => ({
                      ...prevState,
                      searchValues: {
                        ...prevState.searchValues,
                        adults:
                          prevState.searchValues.adults - 1 < 1
                            ? 1
                            : prevState.searchValues.adults - 1,
                      },
                    }));
                  }}
                >
                  <DashIcon />
                </button>
                <div className="text-[20px]">{adults}</div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSearchValue((prevState) => ({
                      ...prevState,
                      searchValues: {
                        ...prevState.searchValues,
                        adults: prevState.searchValues.adults + 1,
                      },
                    }));
                  }}
                  className="outline-none border-0 font-[300] text-2xl  p-3 rounded-full hover:bg-red-50"
                >
                  <PlusIcon size={12} />
                </button>
              </div>
            </li>
          )}

          {/* Children */}
          <li className="flex items-center px-3 justify-between py-4 sm:py-2">
            <div className="ChildrenAndInfantCalculator">Children</div>
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (children === 0) return;
                  setSearchValue((prevState) => ({
                    ...prevState,
                    searchValues: {
                      ...prevState.searchValues,
                      children: prevState.searchValues.children - 1,
                    },
                  }));
                }}
                className="outline-none border-0 p-2 rounded-full hover:bg-red-50"
              >
                <DashIcon />
              </button>
              <div className="text-[20px]">{children}</div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSearchValue((prevState) => ({
                    ...prevState,
                    searchValues: {
                      ...prevState.searchValues,
                      children: prevState.searchValues.children + 1,
                    },
                  }));
                }}
                className="outline-none border-0 font-[300] text-2xl p-3 rounded-full hover:bg-red-50"
              >
                <PlusIcon size={12} />
              </button>
            </div>
          </li>

          {/* Infants */}
          <li className="flex items-center px-3 justify-between py-4 sm:py-2">
            <div className="flex items-center">
              <div className="ChildrenAndInfantCalculator">Infants</div>
              <div className="text-slate-400 text-xs min-w-[50px] mx-1">
                till 1 year
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (infants === 0) return;
                  setSearchValue((prevState) => ({
                    ...prevState,
                    searchValues: {
                      ...prevState.searchValues,
                      infants: prevState.searchValues.infants - 1,
                    },
                  }));
                }}
                className="outline-none border-0 p-2 rounded-full hover:bg-red-50"
              >
                <DashIcon />
              </button>
              <div className="text-[20px]">{infants}</div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setSearchValue((prevState) => ({
                    ...prevState,
                    searchValues: {
                      ...prevState.searchValues,
                      infants: prevState.searchValues.infants + 1,
                    },
                  }));
                }}
                className="outline-none border-0 font-[300] text-2xl p-3 rounded-full hover:bg-red-50"
              >
                <PlusIcon size={12} />
              </button>
            </div>
          </li>
        </ul>
      </div>
    )
  );
};

export default ChildrenAndInfantCalculator;
