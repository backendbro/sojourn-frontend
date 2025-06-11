"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import MakeWithdrawal from "./make-withdrawal";
import { Suspense } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import WalletTable from "@/components/pages/hosts/wallet/wallet-table";
import { useQuery } from "@tanstack/react-query";
import { getWalletById } from "@/http/api";
import Spinner from "@/components/svgs/Spinner";
import { Wallet, X } from "lucide-react";
import useCurrency from "@/hooks/useCurrency";

export default () => {
  const id = useSelector((state: RootState) => state.user.me?.host?.id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["wallet-balance"],
    queryFn: () => getWalletById(id),
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });

  const walletBalance = isNaN(data?.walletBalance)
    ? 0
    : Number(data.walletBalance).toFixed(2);

  const { exchangeRate, error: currencyError, loading } = useCurrency();

  const currency = useSelector((state: RootState) => state.currency.currency);

  const symbol = currency === "NGN" ? "₦" : "$";

  const estimatedPrice =
    symbol === "$" ? +walletBalance / exchangeRate : +walletBalance;

  if (isLoading || loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[200px]">
        <Spinner size={17} color="red" />
      </div>
    );
  }

  return (
    <Suspense fallback={<></>}>
      <div className="w-full flex items-center justify-center mb-2">
        <div className="w-full relative flex flex-col">
          <h3 className="text-[2rem] sm:text-[2.5rem] text-black mb-4">
            Wallet
          </h3>
          <div className="w-full py-3  flex flex-col md:flex-row md:items-center justify-between bg-primary text-white px-6">
            <div className="flex items-center space-x-10 ">
              <Wallet color="white" size={40} />
              <div className="flex items-center flex-col md:flex-row">
                <p className="text-white md:w-[90px] text-sm">Wallet balance</p>
                <span className="font-bold text-white text-3xl font-inter">
                  {symbol}
                  {estimatedPrice.toFixed(2).toLocaleString()}
                </span>
              </div>
            </div>
            <Dialog>
              <DialogTrigger className="flex items-center justify-center mt-2 md:mt-0 space-x-1 rounded-full text-black font-semibold py-2 outline-none border-0 bg-white ease duration-300 hover:bg-gray-100 px-4">
                <span>Withdraw</span>
              </DialogTrigger>
              <DialogContent className="md:w-[400px]">
                <DialogTitle className="text-black text-center text-2xl">
                  Make a Withdrawal
                </DialogTitle>
                <MakeWithdrawal id={id} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div className="w-full">
        <WalletTable />
      </div>
    </Suspense>
  );
};
