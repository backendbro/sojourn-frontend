import { PropertySearchQueriesKeys } from "@/types/properties";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type Searchvalues = {
  value: string;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  adults: number;
  children: number;
  infants: number;
  open: boolean;
  openChildrenCalculator: boolean;
};

type SearchState = {
  searchValues: Searchvalues;
  setSearchValue: Dispatch<SetStateAction<SearchState>>;
};

const Context = createContext<SearchState>({
  searchValues: {} as Searchvalues,
  setSearchValue: () => {},
});

export const SearchContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchValue, setSearchValue] = useState({
    searchValues: { adults: 1, children: 0, infants: 0 },
  } as SearchState);

  return (
    <Context.Provider value={{ ...searchValue, setSearchValue }}>
      {children}
    </Context.Provider>
  );
};

export const useListingSearch = (initialState?: {
  searchValues: Searchvalues;
}) => {
  const { searchValues, setSearchValue } = useContext<SearchState>(Context);

  useEffect(() => {
    if (initialState) {
      setSearchValue((prevState) => ({
        ...prevState,
        ...initialState,
      }));
    }
  }, []);

  return {
    ...searchValues,
    setSearchValue: setSearchValue as Dispatch<SetStateAction<SearchState>>,
  };
};
