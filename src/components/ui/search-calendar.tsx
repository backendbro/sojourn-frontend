"use client";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import CalenderIcon from "../svgs/CalendarIcon";
import DashIcon from "../svgs/DashIcon";
import { useListingSearch } from "@/context/SearchContext";
import { DateRange } from "react-day-picker";
import dynamic from "next/dynamic";
import { FC } from "react";
import useQueryString from "@/hooks/useQueryString";
import { toast } from "sonner";
import { numberOfNights } from "@/lib/utils";

const Calendar = dynamic(() =>
  import("./calendar").then((mod) => mod.Calendar)
);

const SearchCalendar: FC<{ showIcon?: boolean }> = ({ showIcon = true }) => {
  const { pathname } = useQueryString();

  const { checkInDate, checkOutDate, setSearchValue } = useListingSearch();

  const range: DateRange = {
    from: checkInDate as Date,
    to: checkOutDate as Date,
  };

  const checkInDateString = checkInDate
    ? checkInDate.toLocaleDateString()
    : "Check-in";

  const checkOutDateString = checkOutDate
    ? checkOutDate.toLocaleDateString()
    : "Check-out";

  const calendarCss = pathname === "/" ? "lg:w-3/6" : "sm:w-2/4";

  return (
    <div
      className={`w-full ${calendarCss} px-4 md:px-2 flex items-center  font-[300]  cursor-pointer ease duration-200 border-b-0 relative  after:lg:content-[''] after:lg:absolute after:lg:w-full after:lg:h-1/2 after:lg:top-[50%] after:lg:left-0 after:lg:translate-y-[-50%] after:lg:border-x-[1.4px] after:lg:border-x-slate-700 hover:bg-red-50 `}
    >
      <Popover>
        <PopoverTrigger className="w-full h-full z-[99]">
          <div
            className={`w-full space-x-0 flex py-5 items-center ${
              showIcon ? " px-3 lg:py-0  lg:px-4 lg:space-x-4" : "h-full"
            }`}
          >
            {showIcon && <CalenderIcon className="stroke-primary" />}
            <div className="truncate text-[16px] font-[700]">
              {checkInDateString}
            </div>
            <DashIcon />
            <div className="truncate text-[16px] font-[700]">
              {checkOutDateString}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto z-[99999]">
          <div className="w-full flex items-center space-x-6">
            <Calendar
              onSelect={(date) => {
                const today =
                  new Date(date as Date).toDateString() ===
                  new Date().toDateString();
                if (new Date(date as Date).getTime() < Date.now() && !today) {
                  toast("You cannot select a date earlier than today.", {
                    action: {
                      label: "Ok",
                      onClick() {
                        return;
                      },
                    },
                  });
                } else {
                  setSearchValue((prevState) => ({
                    ...prevState,
                    searchValues: {
                      ...prevState.searchValues,
                      checkInDate: date as Date,
                    },
                  }));
                }
              }}
              selected={checkInDate as Date}
              mode="single"
              className="rounded-md border shadow hidden lg:block"
            />
            <Calendar
              onSelect={(date) => {
                const numberOfDaysBetween = numberOfNights(
                  new Date(checkInDate as Date),
                  new Date(date as Date)
                );

                if (numberOfDaysBetween < 1) {
                  toast(
                    "You cannot select a date earlier or equal to your check in date.",
                    {
                      action: {
                        label: "Ok",
                        onClick() {
                          return;
                        },
                      },
                    }
                  );
                } else {
                  setSearchValue((prevState) => ({
                    ...prevState,
                    searchValues: {
                      ...prevState.searchValues,
                      checkOutDate: date as Date,
                    },
                  }));
                }
              }}
              selected={checkOutDate as Date}
              mode="single"
              className="rounded-md border shadow hidden lg:block"
            />
            <Calendar
              onSelect={(date: DateRange | undefined) => {
                const today =
                  new Date(date?.from as Date).toDateString() ===
                  new Date().toDateString();
                if (
                  new Date(date?.from as Date).getTime() < Date.now() &&
                  !today
                ) {
                  toast(
                    "You cannot select a check in date earlier than today.",
                    {
                      action: {
                        label: "Ok",
                        onClick() {
                          return;
                        },
                      },
                    }
                  );
                  return;
                }

                const numberOfDaysBetween = numberOfNights(
                  new Date(date?.from as Date),
                  new Date(date?.to as Date)
                );
                if (numberOfDaysBetween < 1) {
                  toast(
                    "You cannot select a date earlier or equal to your check in date.",
                    {
                      action: {
                        label: "Ok",
                        onClick() {
                          return;
                        },
                      },
                    }
                  );
                }
                setSearchValue((prevState) => ({
                  ...prevState,
                  searchValues: {
                    ...prevState.searchValues,
                    checkInDate: date?.from as Date,
                    checkOutDate: date?.to as Date,
                  },
                }));
              }}
              selected={range}
              mode="range"
              className="rounded-md  border shadow block lg:hidden"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchCalendar;
