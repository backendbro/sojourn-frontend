import React from "react";
import Menu from "./navigation/Menu";

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <header className="w-full">
      <Menu />
      {children}
    </header>
  );
};

export default MainLayout;
