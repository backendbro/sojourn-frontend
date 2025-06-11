"use client";

import Spinner from "@/components/svgs/Spinner";
import { BANKS } from "@/constants";
import {
  addtAccountNumber,
  deleteAccountById,
  getAccountNumbers,
} from "@/http/api";
import { RootState } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import { ChangeEvent, FormEvent, useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default () => {
  const client = useQueryClient();

  const hostId = useSelector((state: RootState) => state.user.me?.host?.id);

  const [state, setState] = useState<{
    bankName: string;
    bankAccountNumber: string;
  }>({ bankAccountNumber: "", bankName: "" });

  const mutation = useMutation({
    mutationFn: addtAccountNumber,
    mutationKey: ["add-account-number"],
    async onSuccess() {
      await client.invalidateQueries({ queryKey: ["host-account-numbers"] });
      toast("added account successfully", {
        description: "Successfully added account number",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
    onError() {
      toast("Error", {
        description: "Error adding account number",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAccountById,
    mutationKey: ["delete-account-number"],
    async onSuccess() {
      await client.invalidateQueries({ queryKey: ["host-account-numbers"] });
      toast("deleted account successfully", {
        description: "Successfully deleted account number",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
    onError() {
      toast("Error", {
        description: "Error deleting account number",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["host-account-numbers"],
    queryFn: () => getAccountNumbers(hostId),
  });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (!value) return;
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (state.bankAccountNumber && state.bankName) {
      mutation.mutate({ hostId, ...state });
    }
  }

  const deleteAccountNumber =
    (id: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      deleteMutation.mutate(id);
    };

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[200px]">
        <Spinner color="red" size={17} />
      </div>
    );
  }

  return (
    <div className="w-full p-5 md:px-20 md:py-[50px] space-y-3">
      <h3 className="text-[1rem] md:text-[1.5rem]">Payment Information</h3>
      <p className="w-full">
        Securely add or remove payment methods to mak e it easier when you
        withdraw
      </p>
      <div className="w-full space-y-2">
        {data.map(
          (d: { id: string; bankName: string; bankAccountNumber: string }) => (
            <div
              key={d.id}
              className="w-full md:w-1/2 flex justify-between p-2 bg-red-50 rounded-md truncate"
            >
              <div className="flex space-x-2">
                <div>{d.bankName}</div>
                <div>{d.bankAccountNumber}</div>
              </div>
              <button
                onClick={deleteAccountNumber(d.id)}
                className="flex items-center justify-center border-0 outline-none"
              >
                {deleteMutation.isPending ? (
                  <Spinner color="red" size={17} />
                ) : (
                  <Trash2 color="red" size={17} />
                )}
              </button>
            </div>
          )
        )}
      </div>
      <form onSubmit={onSubmit} className="w-full space-y-4">
        <div className="w-full flex flex-col md:flex-row md:items-center md:space-x-2">
          <div className="w-full flex flex-col space-y-2">
            <label htmlFor="bank">Select Bank</label>
            <select
              id="bank"
              name="bankName"
              value={state.bankName}
              onChange={handleChange}
              className="w-full border border-black p-2 rounded-md"
            >
              <option>Select</option>
              {BANKS.map((bank, idx: number) => (
                <option key={bank.id}>{bank.name}</option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col space-y-2">
            <label htmlFor="accountNumber">Account Number</label>
            <input
              value={state.bankAccountNumber}
              name="bankAccountNumber"
              onChange={handleChange}
              id="accountNumber"
              className="w-full border border-black p-2 rounded-md text-[16px]"
              placeholder="Enter account no."
            />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <button
            disabled={!state.bankAccountNumber || !state.bankName}
            className="bg-primary flex items-center justify-center rounded-full border-o outline-none py-2 px-4 ease duration-300 hover:bg-red-800 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? (
              <Spinner size={17} color="white" />
            ) : (
              <div className="flex items-center space-x-1">
                <span className="text-white">Add account</span>
                <Plus size={17} color="white" />
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
