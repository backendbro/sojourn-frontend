import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type MenuState = {
  isMenuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>> | null;
};

const Context = createContext<MenuState>({
  isMenuOpen: false,
  setMenuOpen: null,
});

export const MenuContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <Context.Provider value={{ isMenuOpen, setMenuOpen }}>
      {children}
    </Context.Provider>
  );
};

export const useMenuState = () => {
  const { isMenuOpen, setMenuOpen } = useContext(Context);

  return {
    isMenuOpen,
    setMenuOpen: setMenuOpen as Dispatch<SetStateAction<boolean>>,
  };
};
