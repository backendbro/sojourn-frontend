"use client";

import {
  updateInspectionWithoutPhotos,
  updatePropertyWithoutPhotos,
} from "@/http/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Spinner from "../svgs/Spinner";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "../ui/switch";

type PriceProps = {
  id: string;
  hostId: string;
  price: number;
  isInspection?: boolean;
  cautionFee?: number;
};

export default ({
  id,
  hostId,
  price,
  isInspection = false,
  cautionFee,
}: PriceProps) => {
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
        description: "Error occurred when updating price",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const [state, setState] = useState<PriceProps>(() => ({ id, hostId, price }));

  const [animPrice, setAnimPricing] = useState(() => price);

  const [openSwitch, setOpenSwitch] = useState(() => !!cautionFee);

  const [cfee, setCFee] = useState(() => (cautionFee ? cautionFee : 0));

  const [animation, showAnimation] = useState(false);

  const animCss = animation ? "" : "hidden";

  const guestServiceFee = (10 / 100) * state.price;

  const youEarn = state.price - (2 / 100) * state.price;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    mutation.mutate({ ...state, cautionFee: cfee });
  }

  useEffect(() => {
    if (animPrice > 0) {
      showAnimation(true);
      let timeout = setTimeout(() => {
        showAnimation(false);
        setState((prevState: PriceProps) => ({
          ...prevState,
          price: animPrice,
        }));
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    } else if (animPrice <= 0) {
      showAnimation(false);
      setState((prevState: PriceProps) => ({
        ...prevState,
        price: 0,
      }));
    } else {
      return;
    }
  }, [animPrice]);

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-col min-h-[100px] md:w-5/6 lg:w-1/2 about-one max-w-[1400px] 2xl::mx-auto"
    >
      <h3 className="text-xl mb-5 md:text-3xl ">Pricing.</h3>
      <p className="text-md mb-2 md:text-md ">Type the amount below.</p>
      <div className="w-full flex items-center ">
        <div className="w-full flex items-center ">
          <label className="text-[40px] font-bold">₦</label>
          <input
            className="w-full py-4 text-[40px] font-bold border-0 outline-none text-[16px]"
            placeholder="35000"
            name="price"
            onChange={(e) => {
              if (isNaN(+e.target.value.split(",").join(""))) return;
              setAnimPricing(+e.target.value.split(",").join(""));
            }}
            value={animPrice.toLocaleString()}
          />
          <span className="font-semibold">/night</span>
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <div className="rounded-md shadow-md w-full h-[200px] p-2 relative">
          <svg
            height="100%"
            className="absolute top-0 left-0 bg-transparent"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              rx="8"
              ry="8"
              className={`line ${animCss}`}
              height="100%"
              width="100%"
              strokeLinejoin="round"
            />
          </svg>
          <ul className="overflow-hidden w-full p-0">
            <li className="w-full p-2 font-semibold text-sm flex items-center justify-between">
              <span className="font-semibold">Base price</span>
              <span className="font-semibold">
                ₦{state.price.toLocaleString()}
              </span>
            </li>
            <li className="w-full font-semibold p-2 text-sm flex items-center justify-between">
              <span className="font-semibold">Guest service fee</span>
              <span className="font-semibold">
                ₦{guestServiceFee.toLocaleString()}
              </span>
            </li>
            <li className="w-full font-semibold p-2 text-sm flex items-center justify-between">
              <div className="flex space-x-1">
                <span className="font-semibold">Caution fee</span>
                <Switch
                  id="caution-fee"
                  checked={openSwitch}
                  onCheckedChange={(checked) => {
                    setOpenSwitch(checked);
                  }}
                  className="isolate"
                />
              </div>
              {openSwitch ? (
                <input
                  name="cautionFee"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setCFee(+e.target.value);
                  }}
                  value={cfee}
                  className="px-1 py-1 isolate outline-none border border-black rounded-md w-[80px] text-md"
                />
              ) : null}
            </li>
            <li className="w-full font-semibold py-2 px-2 text-sm flex items-center justify-between mt-3 border-t-[1.5px] border-t-gray-300">
              <span className="font-semibold"> Guest price before taxes</span>
              <span className="font-semibold">
                ₦{(guestServiceFee + state.price + cfee).toLocaleString()}
              </span>
            </li>
            <li className="w-full py-2 px-2 font-semibold text-sm flex items-center justify-between">
              <span className="font-semibold"> You earn</span>
              <span className="font-semibold">₦{youEarn.toLocaleString()}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full flex items-center justify-end my-4">
        <button className="flex items-center justify-center font-semibold outline-none border-0 bg-black text-white py-2 px-4 rounded-md ease duration-300 hover:bg-slate-700">
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
