"use client";

import Spinner from "@/components/svgs/Spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BANKS } from "@/constants";
import { addAccountDetails, getWalletById, withdraw } from "@/http/api";
import { RootState } from "@/store";
import { WalletType } from "@/types/wallet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Info, Save } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default ({ id }: { id: string }) => {
  const client = useQueryClient();

  const hostId = useSelector((state: RootState) => state.user.me?.host?.id);

  const { data, isLoading, error } = useQuery({
    queryKey: ["wallet"],
    queryFn: () => getWalletById(id),
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: addAccountDetails,
    async onSuccess() {
      await client.invalidateQueries({ queryKey: ["wallet"] });
      toast("Account details has been added.", {
        description: "Success!",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
    onError() {
      toast("Adding account details failed.", {
        description: "Error encountered!",
        closeButton: true,
      });
    },
  });

  const [selection, setSelection] = useState<{ bank: string; crypto: string }>({
    bank: "",
    crypto: "",
  });

  const [accountNumber, setAccountNumber] = useState("");

  const currentBankSelection = selection.bank ? selection.bank : "Select Bank";
  const currentCryptoSelection = selection.crypto
    ? selection.crypto
    : "Select Crypto";

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    mutation.mutate({
      bankName: selection.bank,
      bankAccountNumber: accountNumber,
      hostId,
    } as WalletType);
  }

  if (error) {
    return toast("Wallet Account Error", {
      description: `Could not get account info at this time.`,
      closeButton: true,
    });
  }

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner size={17} color="red" />
      </div>
    );
  }

  return data && data?.accounts?.length ? (
    <Withdraw id={id} hostId={hostId} />
  ) : (
    <form onSubmit={onSubmit} className="w-full">
      <div className="w-full flex flex-col">
        <p className="text-[11px] font-bold">
          Add up to 3 different bank accounts.
        </p>
        <div className="w-full flex flex-col space-y-3">
          <h5>Bank Account Details</h5>
          <div className="w-full flex flex-col">
            <select
              onChange={(bank) => {
                setSelection((prevState) => ({
                  ...prevState,
                  bank: bank.target.value,
                }));
              }}
              className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400"
            >
              <option selected>{currentBankSelection}</option>
              {BANKS.map((bank) => (
                <option key={bank.id} value={bank.name}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>
          <input
            value={accountNumber}
            onChange={(e) => {
              setAccountNumber(e.target.value);
            }}
            placeholder="Enter account number"
            className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
          />
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="w-[45%] my-7 bg-gray-400 h-[1px]"></div>
          <span className="text-md">Or</span>
          <div className="w-[45%] my-7 bg-gray-400 h-[1px]"></div>
        </div>
        <div className="w-full flex flex-col space-y-3">
          <div className="w-full flex items-center space-x-2 ">
            <button
              disabled={!selection.bank || !accountNumber}
              className="w-full flex items-center justify-center bg-primary text-white font-semibold p-3 rounded-md disabled:bg-gray-300 cursor-pointer  disabled:cursor-not-allowed ease duration-300 hover:bg-purple-900"
            >
              {mutation.isPending ? (
                <Spinner color="#fff" size={15} />
              ) : (
                <div className="flex items-center space-x-1">
                  <span>Save </span>
                  <Save color="whitesmoke" size={17} />
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

function Withdraw({ id, hostId }: { id: string; hostId: string }) {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: withdraw,
    async onSuccess() {
      await client.invalidateQueries({ queryKey: ["wallet-multiple"] });
      toast("Withdraw request has been  submitted.", {
        description: "Success!",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
    onError() {
      toast("Withdraw request failed.", {
        description: "Error encountered!",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["wallet-single"],
    queryFn: () => getWalletById(id),
    refetchOnReconnect: true,
    refetchOnWindowFocus: false,
  });

  const [amount, setAmount] = useState("");

  const [accountId, setAccountId] = useState("");

  const walletBalance = isNaN(data?.availableBalance)
    ? 0
    : +Number(data.availableBalance).toFixed(2);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!isNaN(+e.target.value) && +e.target.value <= +data.availableBalance) {
      if (+e.target.value > 0) setAmount(e.target.value);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    mutation.mutate({
      amount: Number(-amount),
      hostId,
      walletId: data.id,
      accountId,
      description: `Withdrawal request of ₦${amount}`,
    });
  }

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner size={17} color="red" />
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} className="w-full space-y-3">
      <Link href="/hosts/dashboard/payment-info" className="mb-4">
        <div className="flex items-center space-x underline group">
          <span className="text-sm ease duration-300 group-hover:font-semibold">
            Add another account
          </span>
          <ArrowRight size={12} color="black" />
        </div>
      </Link>
      <div className="w-full flex-col space-y-3">
        <label htmlFor="bank-accounts">Choose an account for payment</label>
        <select
          id="bank-accounts"
          onChange={(wallet) => {
            setAccountId(wallet.target.value);
          }}
          value={accountId}
          className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400"
        >
          <option defaultValue="">Select</option>
          {data.accounts.map((d: any) => (
            <option key={d.id} value={d.id}>
              {d.bankAccountNumber} {d.bankName}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full flex flex-col justify-center">
        <div className="flex items-center space-x-1">
          <Tooltip>
            <TooltipTrigger
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Info size={14} />
            </TooltipTrigger>
            <TooltipContent className="max-w-[200px]">
              The available balance is the amount left after the service
              commission has been deducted.
            </TooltipContent>
          </Tooltip>
          <span className="text-[14px]">Available Balance:</span>
          <span className="font-inter">₦{walletBalance}</span>
        </div>
        <p className="text-[14px]">(2% commission applied)</p>
      </div>
      <div className="w-full flex flex-col space-y-2">
        <input
          id="withdrawal-amount"
          onChange={handleChange}
          value={!!amount ? amount : ""}
          className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
          placeholder="Enter Amount to withdraw"
        />
        <button
          disabled={walletBalance <= 0 || !accountId || !amount}
          className="w-full bg-primary flex items-center justify-center p-3 text-white font-semibold rounded-md ease duration-300 hover:bg-purple-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? <Spinner size={15} /> : <span>Withdraw</span>}
        </button>
      </div>
    </form>
  );
}
