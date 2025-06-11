"use client";

import { Toaster } from "sonner";
import { FC, PropsWithChildren, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MenuContextProvider } from "@/context/MenuContext";
import { SearchContextProvider } from "@/context/SearchContext";
import { store } from "../store";
import { Provider } from "react-redux";
import { TooltipProvider } from "@/components/ui/tooltip";

import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();

// const clientId = process.env.SJ_GOOGLE_CLIENT_ID as string;

const clientId = process.env.NEXT_PUBLIC_SJ_GOOGLE_CLIENT_ID as string;

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Provider store={store}>
          <SearchContextProvider>
            <MenuContextProvider>
              <Suspense fallback={<div>loading...</div>}>
                <Toaster />
                <GoogleOAuthProvider clientId={clientId}>
                  {children}
                </GoogleOAuthProvider>
              </Suspense>
            </MenuContextProvider>
          </SearchContextProvider>
        </Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
