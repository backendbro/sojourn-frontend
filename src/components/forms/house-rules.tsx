"use client";

import { Check, XCircle } from "lucide-react";
import { useState, MouseEvent, ChangeEvent } from "react";
import Spinner from "../svgs/Spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateInspectionWithoutPhotos,
  updatePropertyWithoutPhotos,
} from "@/http/api";
import { toast } from "sonner";

export default ({
  id,
  houseRules,
  isInspection = false,
  hostId,
}: {
  id: string;
  houseRules: string[];
  hostId: string;
  isInspection?: boolean;
}) => {
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: isInspection
      ? updateInspectionWithoutPhotos
      : updatePropertyWithoutPhotos,
    onSuccess: async (data) => {
      if (isInspection) {
        await client.invalidateQueries({
          queryKey: ["single-inspection-host"],
        });
      } else {
        await client.invalidateQueries({
          queryKey: ["single-property-host"],
        });
      }
    },
    onError(Error) {
      toast("Update Property Error", {
        description: "Error occurred when updating House rules",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const [state, setState] = useState<{ houseRules: string[] }>(() => ({
    houseRules,
  }));

  const [rule, setRule] = useState("");

  const addRule = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (state.houseRules.includes(rule)) return;
    setState((prevState) => ({
      ...prevState,
      houseRules: [...prevState.houseRules, rule],
    }));
    setRule("");
  };

  const removeRule = (value: string) => (e: MouseEvent<HTMLSpanElement>) => {
    const filteredRules = state.houseRules.filter((rule) => rule !== value);
    setState((prevState) => ({ ...prevState, houseRules: filteredRules }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRule(e.target.value);
  };

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutation.mutate({
      houseRules: state.houseRules,
      id,
      hostId,
    });
  };
  return (
    <form className="w-full w-full space-y-2 pb-5 mb-10">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4">
        <h4 className="w-full font-semibold underline text-md mb-2 col-span-2 md:col-span-4">
          List of House rules
        </h4>
        {state.houseRules.map((rule: string, idx: number) => (
          <div
            className="w-full flex items-center space-x-1 border border-gray-50 p-2 bg-gray-100 rounded-md"
            key={idx}
          >
            <span
              onClick={removeRule(rule)}
              className="cursor-pointer ease duration-300 hover:translate-x-1"
            >
              <XCircle size={15} />
            </span>
            <span>{rule}</span>
          </div>
        ))}
      </div>
      <label htmlFor="rule">What is near ?</label>
      <input
        value={rule}
        onChange={handleChange}
        type="text"
        id="rule"
        name="rule"
        className="w-full md:w-1/2 p-2 rounded-md border-2 border-black text-[16px]"
        placeholder="Enter  new rule"
      />
      <button
        onClick={addRule}
        className="flex items-center justify-center font-semibold outline-none border-0 bg-black text-white py-2 px-4 rounded-md ease duration-300 hover:bg-slate-700"
      >
        Add rule
      </button>
      <div className="w-full flex items-center justify-end">
        <button
          onClick={onSubmit}
          className="flex items-center justify-center font-semibold outline-none border-0 bg-black text-white py-2 px-4 rounded-md ease duration-300 hover:bg-slate-700"
        >
          {mutation.isPending ? (
            <Spinner size={17} color="white" />
          ) : mutation.isSuccess ? (
            <Check size={17} color="white" />
          ) : (
            <span>Update</span>
          )}
        </button>
      </div>
    </form>
  );
};
