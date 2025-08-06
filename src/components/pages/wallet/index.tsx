"use client";

import Spinner from "@/components/svgs/Spinner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import TableLoader from "@/components/ui/table-loader";
import useQueryString from "@/hooks/useQueryString";
import { getSojournCreditsByUserId, transferSojournCredits } from "@/http/api";
import { RootState } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ArrowRight, Copy, X } from "lucide-react";
import dynamic from "next/dynamic";
import { useState, MouseEvent, useCallback, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Credits = dynamic(() => import("./credits-table"), { ssr: false });
const Referals = dynamic(() => import("./referals-table"), { ssr: false });

type TabState = "referals" | "credits";

type TransferType = {
  email: string;
  amount: number;
  error: string;
};

export default () => {
  const id = useSelector((state: RootState) => state.user.me?.user?.id);

  const { params } = useQueryString();

  const client = useQueryClient();

  const [state, setState] = useState<TransferType>({
    email: "",
    amount: 0,
    error: "",
  });

  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["wallet-credits"],
    queryFn: () => getSojournCreditsByUserId(id),
    refetchOnReconnect: true,
  });

  const mutation = useMutation({
    mutationKey: ["transfer-credit"],
    mutationFn: transferSojournCredits,
    async onSuccess() {
      await client.invalidateQueries({ queryKey: ["wallet-credits"] });
      setOpen(false);
    },
    onError(error: AxiosError) {
      setState((prevState) => ({
        ...prevState,
        //@ts-ignore
        error: error.response?.data?.message,
      }));
    },
  });

  const [tabState, setTabState] = useState<TabState>(() => {
    return (params.get("tabState") as TabState) ?? "referals";
  });

  const isReferals = tabState === "referals";

  const isCredits = tabState === "credits";

  const onTabChange = useCallback(
    (currentTab: TabState) => (e: MouseEvent<HTMLButtonElement>) => {
      setTabState(currentTab);
    },
    []
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    switch (type) {
      case "text":
        if (isNaN(+value) || +value <= 0) break;
        setState((prevState) => ({ ...prevState, [name]: +value }));
        break;
      default:
        setState((prevState) => ({ ...prevState, [name]: value }));
        break;
    }
  };

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    if (!state.email || !Number(state.amount) || Number(state.amount) < 0) {
      return;
    }
    mutation.mutate({ ...state, userId: id });
  };

  if (error) {
    toast("Error getting Inspections", {
      position: "bottom-left",
    });
  }

  if (isLoading) {
    return (
      <div className="w-full mt-4">
        <Skeleton className="h-8 w-1/3 bg-gray-200 mt-2" />
        {[1, 2, 3, 4].map((_, idx: number) => (
          <TableLoader key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full py-[50px] px-2 md:px-8">
      <div className="w-full flex flex-col space-y-7 justify-between md:flex-row md:items-center md:space-y-0">
        <div className="w-full min-h-[40px] flex flex-col space-y-7 md:space-y-0 md:flex-row md:items-center md:justify-between">
          <div className="w-full md:w-2/5">
            <button
              onClick={onTabChange("referals")}
              className={`w-1/2 border-b-2 border-b-red-200 pb-4 ${
                isReferals && "border-b-red-600 text-primary font-bold"
              }`}
            >
              Referrals
            </button>
            <button
              onClick={onTabChange("credits")}
              className={`w-1/2 border-b-2 border-b-red-200 pb-4 ${
                isCredits && "border-b-red-600 text-primary font-bold"
              }`}
            >
              Credits
            </button>
          </div>
          {tabState === "referals" ? (
            <button
              className="flex items-center justify-center space-x-1 bg-transparent text-black rounded-full px-5 py-3 ease duration-300 border border-black hover:bg-red-50"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://www.sojourn.ng/?ref=${id}`
                );
                toast("Referral Action.", {
                  description: "Copied referral link.",
                  closeButton: true,
                });
              }}
            >
              <span className="font-[600] text-[16px]">Copy referral link</span>
              <Copy size={16} color="black" />
            </button>
          ) : (
            <Dialog
              open={open}
              onOpenChange={(value) => {
                setOpen(value);
              }}
            >
              <DialogTrigger className="flex items-center justify-center space-x-1 bg-primary text-white rounded-full px-5 py-3 ease duration-300 hover:bg-red-700">
                <span className="font-[600] text-[16px]">Transfer</span>
                <ArrowRight size={20} color="white" />
              </DialogTrigger>
              <DialogContent>
                <div className="full flex items-center justify-between">
                  <DialogTitle>Transfer Credits</DialogTitle>
                </div>
                <span className="text-primary text-md font-[600]">
                  {state.error}
                </span>
                <div className="w-full flex flex-col items-center justify-center space-y-4">
                  <input
                    type="email"
                    value={state.email}
                    onChange={handleChange}
                    className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
                    placeholder="Enter email address"
                    name="email"
                  />
                  <input
                    value={String(state.amount)}
                    onChange={handleChange}
                    className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
                    placeholder="Amount of credits"
                    name="amount"
                    type="text"
                  />
                  <button
                    onClick={onSubmit}
                    className="w-full flex items-center justify-center py-5 px-3 rounded-full bg-primary text-white text-[20px] font-semibold hover:bg-red-700"
                  >
                    {mutation.isPending ? (
                      <Spinner size={20} color="red" />
                    ) : (
                      <div className="flex space-x-2 items-center">
                        <span>Send</span>
                        <ArrowRight color="white" size={25} />
                      </div>
                    )}
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      {tabState === "credits" ? <Credits data={data} /> : <Referals />}
    </div>
  );
};
