import { Minus, Plus, Search, X } from "lucide-react";
import SearchCalendar from "../ui/search-calendar";
import { PropertySearchQueriesKeys } from "@/types/properties";
import useQueryString from "@/hooks/useQueryString";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { useListingSearch } from "@/context/SearchContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default ({
  searchParams: {
    city = "",
    checkInDate,
    checkOutDate,
    adults = 1,
    children = 0,
  },
}: {
  searchParams: PropertySearchQueriesKeys;
}) => {
  const { router } = useQueryString();

  const searchValues = useListingSearch();

  const [queryParams, setQueryParamState] = useState<{
    city: string;
    adults: number;
    children: number;
  }>(() => ({
    city,
    adults: adults,
    children,
  }));

  const [openSearch, setOpenSearch] = useState(false);

  const openSearchMenu = openSearch ? "flex" : "hidden md:flex";

  const openSearchButtonCss = openSearch
    ? "border border-primary text-primary"
    : "bg-primary text-white";

  const openSearchText = openSearch ? "close search menu" : "open search menu";

  const checkInDateState = searchValues.checkInDate ?? checkInDate;
  const checkOutDateState = searchValues.checkOutDate ?? checkOutDate;

  const adultsString =
    queryParams.adults > 1
      ? "adults"
      : queryParams.adults === 0
      ? "adults"
      : "adult";
  const childrenString =
    queryParams.children > 1
      ? "kids"
      : queryParams.children === 0
      ? "kids"
      : "kid";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQueryParamState((prevState) => ({
      ...prevState,
      [name]: value.toLowerCase(),
    }));
  };

  const add =
    (name: "adults" | "children") => (e: MouseEvent<HTMLButtonElement>) => {
      setQueryParamState((prevState) => ({
        ...prevState,
        [name]: +prevState[name] + 1,
      }));
    };
  const subtract =
    (name: "adults" | "children", initialValue: number = 1) =>
    (e: MouseEvent<HTMLButtonElement>) => {
      setQueryParamState((prevState) => ({
        ...prevState,
        [name]:
          +prevState[name] <= initialValue ? initialValue : prevState[name] - 1,
      }));
    };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(
      `/properties?city=${queryParams.city}&adults=${queryParams.adults}&children=${queryParams.children}&check-in=${checkInDateState}&check-out=${checkOutDateState}`
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full min-h-[50px] space-y-4 mt-2 mb-4 flex flex-col justify-center md:flex-row md:space-y-0 md:mt-0 md:h-[50px] md:mb-0"
    >
      <button
        onClick={(e) => {
          setOpenSearch(!openSearch);
        }}
        className={`w-[220px] flex items-center justify-center capitalize rounded-full ${openSearchButtonCss}  py-4 font-semibold text-sm ml-4 md:w-auto md:py-0 md:hidden`}
      >
        {openSearch ? <X color="red" /> : ""}
        <span>{openSearchText}</span>
      </button>
      <div
        className={`w-full ${openSearchMenu} bg-white shadow-md px-3 py-3 items-center flex flex-col md:w-3/5 md:flex-row md:justify-between md:rounded-full md:px-0 md:py-0`}
      >
        <div className="w-full h-full py-4 font-semibold text-lg flex items-center bg-red-50 rounded-tl-0 rounded-bl-0 md:w-1/4 md:rounded-tl-full md:rounded-bl-full md:py-2 md:font-normal md:text-sm">
          <input
            type="text"
            className="w-full bg-red-50 h-full border-0 px-4 outline-none h-full rounded-tl-full rounded-bl-full text-md placeholder:text-gray-300 md:border-r md:border-r-black text-[16px]"
            placeholder="Search By City"
            value={queryParams.city}
            name="city"
            onChange={handleChange}
          />
        </div>
        <div className="w-full h-full py-2 flex items-center  md:w-[200px]">
          <SearchCalendar showIcon={false} />
        </div>
        <div className="w-full h-full py-2 flex flex-col md:w-2/6 md:flex-row md:items-center">
          <div className="flex items-center space-x-6 mb-1 md:space-x-1 md:mb-0">
            <button
              onClick={subtract("adults")}
              className="p-2  rounded-md bg-red-50 ease duration-300 hover:bg-red-50 md:bg-white"
            >
              <Minus
                strokeWidth={0.5}
                className="w-[30px] stroke-w-[0.5px] h-[30px] md:w-[15px] md:h-[15px] md:stroke-w-[0.5px]"
              />
            </button>
            <span className="text-2xl md:text-sm">{queryParams.adults}</span>
            <button
              onClick={add("adults")}
              className="p-2  rounded-md bg-red-50 ease duration-300 hover:bg-red-50 md:bg-white"
            >
              <Plus
                strokeWidth={0.5}
                className="w-[30px] stroke-w-[0.5px] h-[30px] md:w-[15px] md:h-[15px] md:stroke-w-[0.5px]"
              />
            </button>
            <span className="text-2xl md:text-sm">{adultsString}</span>
          </div>
          <div className="flex items-center space-x-6 mt-1 md:space-x-1 md:mt-0">
            <button
              onClick={subtract("children", 0)}
              className="p-2  rounded-md bg-red-50 ease duration-300 hover:bg-red-50 md:bg-white"
            >
              <Minus
                strokeWidth={0.5}
                className="w-[30px] stroke-w-[0.5px] h-[30px] md:w-[15px] md:h-[15px] md:stroke-w-[0.5px]"
              />
            </button>
            <span className="text-2xl md:text-sm">{queryParams.children}</span>
            <button
              onClick={add("children")}
              className="p-2  rounded-md bg-red-50 ease duration-300 hover:bg-red-50 md:bg-white"
            >
              <Plus
                strokeWidth={0.5}
                className="w-[30px] stroke-w-[0.5px] h-[30px] md:w-[15px] md:h-[15px] md:stroke-w-[0.5px]"
              />
            </button>
            <span className="text-2xl md:text-sm">{childrenString}</span>
          </div>
        </div>
        <div className="w-full flex-items-center px-2 group md:w-auto">
          <button className="w-full flex justify-center mt-4 outline-none border-0 rounded-md p-3 bg-primary ease duration-300 md:rounded-full md:mt-0 md:w-auto group-hover:bg-green-500">
            <Search size={16} color="white" />
          </button>
        </div>
      </div>
      <Dialog>
        <DialogTrigger className="w-1/3 rounded-full border border-primary px-10 py-4 font-semibold text-sm text-primary ml-4 md:w-auto">
          Filters
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
            <DialogDescription>Listings Filters goes here.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </form>
  );
};
