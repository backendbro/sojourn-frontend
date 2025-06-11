"use client";

import Spinner from "@/components/svgs/Spinner";
import { BANKS } from "@/constants";
import { getAccountByUserId, submitReferalWithrawal } from "@/http/api";
import { RootState } from "@/store";
import { IWithdrawal } from "@/types/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default ({ id }: { id: string }) => {
  const userId = useSelector((state: RootState) => state.user?.me?.user?.id);
  const client = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-user-account"],
    queryFn: () => getAccountByUserId(id),
  });

  const mutation = useMutation({
    mutationKey: ["user-withdraw"],
    mutationFn: submitReferalWithrawal,
    async onSuccess() {
      await client.invalidateQueries({ queryKey: ["get-user-account"] });
    },
    onError() {
      toast("Referal Withrawal.", {
        description: "Could not submit request at this time",
        action: {
          label: "OK",
          onClick: () => null,
        },
      });
    },
  });

  const [state, setState] = useState<IWithdrawal>(
    () =>
      ({
        bankName: data?.account?.bankName ? data?.account?.bankName : "",
        bankAccountNumber: data?.account?.bankAccountNumber
          ? data?.account?.bankAccountNumber
          : "",
        amount: 0,
        userId,
        refererId: userId,
      } as IWithdrawal)
  );

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === "amount") {
      if (value <= data.balance) {
        setState((prevState) => ({ ...prevState, [name]: -Number(value) }));
      }
    } else {
      setState((prevState) => ({ ...prevState, [name]: value }));
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const requestData = {
      bankName: state.bankName,
      bankAccountNumber: state.bankAccountNumber,
      amount: state.amount,
      refererId: state.refererId,
      ...(data?.account && { userId: state.userId }),
    };
    mutation.mutate(requestData);
  }

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner size={17} color="red" />
      </div>
    );
  }
  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="w-full space-y-2">
        {data?.account ? (
          <div className="w-full">
            <h6 className="underline font-semibold">Account Information</h6>
            <ul className="w-full overflow-hidden space-y-2">
              <li>
                <span className="font-semibold">Bank Name: </span>
                {data?.account?.bankName}
              </li>
              <li>
                <span className="font-semibold">Account No: </span>
                {data?.account?.bankAccountNumber}
              </li>
            </ul>
          </div>
        ) : (
          <>
            <label htmlFor="bank">Account Number</label>
            <select
              id="bank"
              required
              name="bankName"
              value={state.bankName}
              onChange={onChange}
              className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400"
            >
              <option selected>select bank</option>
              {BANKS.map((bank) => (
                <option key={bank.id} value={bank.name}>
                  {bank.name}
                </option>
              ))}
            </select>
            <label htmlFor="account-number">Account Number</label>
            <input
              required
              onChange={onChange}
              id="account-number"
              value={state.bankAccountNumber}
              name="bankAccountNumber"
              className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
            />
          </>
        )}
        <label htmlFor="amount">
          Amount max
          <span className="text-xs font-inter"> (₦{data?.balance})</span>
        </label>
        <input
          required
          value={state.amount}
          id="amount"
          name="amount"
          onChange={onChange}
          className="w-full py-3 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
        />
        <button
          disabled={
            mutation.isPending ||
            state.amount > data.balance ||
            state.amount <= 0
          }
          className="w-full flex items-center justify-center p-2 bg-black text-white rounded-full ease duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-slate-800"
        >
          {mutation.isPending ? (
            <Spinner size={17} color="white" />
          ) : (
            <span>Submit</span>
          )}
        </button>
      </form>
    </div>
  );
};
