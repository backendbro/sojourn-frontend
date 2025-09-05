"use client";

import { Switch } from "@/components/ui/switch";
import { PLANS } from "@/constants";
import { useState } from "react";
import Image from "next/image";
import { CircleChevronRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { cancelSubscriptionById, getSubscriptionsById } from "@/http/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Spinner from "@/components/svgs/Spinner";
import { toast } from "sonner";

const SubscriptionTable = dynamic(() => import("./subscription-table"));

export default () => {
  const id = useSelector((state: RootState) => state.user.me?.host?.id);
  const [checked, setChecked] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-subscriptions"],
    queryFn: () => getSubscriptionsById(id),
    refetchOnReconnect: true,
  });

  const mutation = useMutation({
    mutationKey: ["cancel-subscription"],
    mutationFn: cancelSubscriptionById,
    onSuccess() {
      toast("subscription cancellation", {
        description: "successful",
        closeButton: true,
      });
    },
    onError() {
      toast("subscription cancellation", {
        description: "Not successful",
        closeButton: true,
      });
    },
  });

  function disableSubscription() {
    mutation.mutate(id);
  }

  const monthlyActiveCss =
    checked === false ? "text-primary" : "text-[#676363]";
  const yearlyActiveCss = checked === true ? "text-primary" : "text-[#676363]";

  const planPaidFor = data
    ? PLANS.find(
        (p) =>
          p.price.annually.id === data.planId ||
          p.price.monthly.id === data.planId
      )
    : PLANS.find((p) => p.name === "Basic");

  const isLitePlan = planPaidFor?.name === "Lite";

  const isNotBasicPlan = planPaidFor?.name !== "Basic";

  const plan = isLitePlan
    ? PLANS.find((p) => p.name === "Premium")
    : PLANS.find((p) => p.name === "Lite");

  const upgradeLink = isLitePlan
    ? checked
      ? `/hosts/checkout/${plan?.price.annually.id}?name=${plan?.name}&type=${
          plan?.price.annually.type
        }&price=${plan?.price.annually.amount}&upgrade=${true}`
      : `/hosts/checkout/${plan?.price.monthly.id}?name=${plan?.name}&type=${
          plan?.price.monthly.type
        }&price=${plan?.price.monthly.amount}&upgrade=${true}`
    : "";

  const nextPaymentDate =
    data && data.nextPaymentDate
      ? new Date(data.nextPaymentDate).toDateString()
      : "Not set";

  if (isLoading) {
    return (
      <div className="w-full flex flex-col jsutify-center items-center min-h-[200px]">
        <Spinner color="red" size={20} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col jsutify-center items-center min-h-[200px]">
        <p>Sorry, could not get subscription datta at this time</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-5 px-3">
      <div className="w-full flex flex-col space-y-4 md:space-y-0 md:flex-row items-center space-x-2 mb-4">
        <h3 className="text-[2rem] sm:text-[2.5rem] text-black text-[#310000]">
          Plans & Billing
        </h3>
        <div className="py-3 px-4 flex bg-[#FFF1D7] rounded-full space-x-3 items-center">
          <span className={`font-[700] text-[16px] ${monthlyActiveCss}`}>
            Monthly Plan
          </span>
          <Switch
            id="plan"
            checked={checked}
            onCheckedChange={(checked) => {
              setChecked(checked);
            }}
            className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary"
          />
          <span className={`font-[700] text-[16px] ${yearlyActiveCss}`}>
            Yearly Plan
          </span>
        </div>
      </div>
      {planPaidFor?.name === "Basic" ? (
        <div className="w-full flex bg-white grid gap-y-5 md:grid-cols-3 md:gap-x-10 ">
          {PLANS.map((plan, idx: number) => (
            <div
              key={idx}
              className={`flex cursor-pointer flex-col space-y-4 items-center py-7 rounded-3xl relative rounded-2xl border border-gray-300 hover:border-primary ${
                "Basic" === plan.name ? "bg-primary text-white" : ""
              }`}
            >
              <div className="flex space-x-2">
                <div className="relative w-[50px] h-[50px] overflow-hidden flex items-center justify-center">
                  <Image
                    src={"Basic" === plan.name ? plan.iconWhite : plan.icon}
                    alt={plan.name}
                    width={70}
                    height={70}
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-[700] text-[20px]">{plan.name}</h4>
                  <div className="flex space-x-5">
                    {checked ? (
                      <div
                        className={`${
                          plan.name === "Basic" || plan.name === "Lite"
                            ? ""
                            : "blur-lg"
                        } text-[32px] font-[600] ${
                          plan.name === "Basic" ? "text-white" : "text-primary"
                        } font-inter`}
                      >
                        ₦{Number(plan.price.annually.amount)}
                      </div>
                    ) : (
                      <div
                        className={`${
                          plan.name === "Basic" || plan.name === "Lite"
                            ? ""
                            : "blur-lg"
                        } text-[32px] font-[600] ${
                          plan.name === "Basic" ? "text-white" : "text-primary"
                        } font-inter`}
                      >
                        ₦{Number(plan.price.monthly.amount)}
                      </div>
                    )}
                    <div className="border flex flex-col justify-center border-transparent border-l-gray-300 w-[50px] h-[50px] px-2">
                      <span>Per</span>
                      <span>{checked ? "Year" : "Month"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {planPaidFor?.name !== "Basic" ? (
        <div className="w-full flex flex-col  border border-gray-300 rounded-2xl py-7 px-10 md:px-20">
          <div className="w-full flex flex-col space-y-3 md:space-y-0 md:flex-row  md:space-x-[10rem] py-3">
            <div className="flex flex-col">
              <h5 className="text-[18px]">Plan</h5>
              <span className="font-semibold text-[28px]">{data.planName}</span>
            </div>
            <div className="flex flex-col">
              <h5 className="text-[18px]">Payment</h5>
              <div className="flex space-x-5">
                <div className="text-[32px] font-[600] font-semibold font-inter">
                  ₦
                  {checked
                    ? planPaidFor?.price.annually.amount
                    : planPaidFor?.price.monthly.amount}
                </div>
                <div className="border flex flex-col justify-center border-transparent border-l-gray-300 w-[50px] h-[50px] px-2">
                  <span>Per</span>
                  <span>{checked ? "Year" : "Month"}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:items-center md:space-x-4">
              <button
                disabled={!isNotBasicPlan}
                onClick={disableSubscription}
                className="w-full flex items-center justify-center text-gray-500 text-[18px] border-0 outline-none bg-transparent text-left disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {mutation.isPending ? (
                  <Spinner color="red" size={18} />
                ) : (
                  <span>Cancel</span>
                )}
              </button>
              {isNotBasicPlan ? (
                <Link
                  href={upgradeLink}
                  className="text-primary font-semibold text-[18px] border-0 outline-none bg-transparent text-left"
                >
                  Upgrade
                </Link>
              ) : null}
            </div>
          </div>
          <div className="w-full flex flex-col space-y-4 md:space-y-0 md:flex-row  md:space-x-[9rem] py-3 mt-4 border-t border-t-gray-300">
            <div className="flex flex-col">
              <h5 className="text-[18px]">Renewal Date</h5>
              <span className="font-semibold text-[20px]">
                {nextPaymentDate}
              </span>
            </div>
            <div className="flex flex-col">
              <h5 className="text-[18px]">Total Revenue</h5>
              <span className="font-semibold text-[20px] font-inter">₦0</span>
            </div>
          </div>
        </div>
      ) : null}
      <div className="w-full flex items-center justify-between">
        <div className="w-1/4 md:w-1/3 h-[1px] bg-gray-300"></div>
        <div>
          <span className="text-[16px] md:text-[25px]">Compare our plans</span>
        </div>
        <div className="w-1/4 md:w-1/3 h-[1px] bg-gray-300"></div>
      </div>
      <div className="w-full flex bg-white grid gap-y-5 md:grid-cols-3 md:gap-x-10 md:gap-y-0">
        {PLANS.map((plan, idx: number) => {
          const q = checked
            ? `/hosts/checkout/${plan.price.annually.id}/?name=${plan.name}&type=${plan.price.annually.type}&price=${plan.price.annually.amount}`
            : `/hosts/checkout/${plan.price.monthly.id}/?name=${plan.name}&type=${plan.price.monthly.type}&price=${plan.price.monthly.amount}`;
          return (
            <div
              key={idx}
              className={`${
                plan.name === "Basic" || plan.name === "Lite"
                  ? ""
                  : "blur-lg pointer-events-none"
              } min-h-[350px] flex flex-col space-y-4 items-center py-10 rounded-3xl relative border border-gray-300 hover:border-primary cursor-pointer sj-shadow`}
            >
              <h4 className="font-[700] text-[20px]">{plan.name}</h4>
              <div className="flex space-x-5">
                {checked ? (
                  <div className="text-[32px] font-[600] text-primary font-inter ">
                    ₦{Number(plan.price.annually.amount)}
                  </div>
                ) : (
                  <div className="text-[32px] font-[600] text-primary font-inter">
                    ₦{Number(plan.price.monthly.amount)}
                  </div>
                )}
                <div className="border flex flex-col justify-center border-transparent border-l-gray-300 w-[50px] h-[50px] px-2">
                  <span>Per</span>
                  <span>{checked ? "Year" : "Month"}</span>
                </div>
              </div>
              <p className="text-[#676363] text-[18px] font-[500]">
                {plan.desc}
              </p>
              <ul className="w-5/6 space-y-3">
                {plan.list.map((item, key: number) => (
                  <li key={key} className="flex space-x-1">
                    <CircleChevronRight className="fill-primary stroke-white w-[20px] h-[20px]" />
                    <div className="text-[16px]">{item}</div>
                  </li>
                ))}
              </ul>
              {planPaidFor?.name === "Basic" && plan.name !== "Basic" ? (
                <Link
                  prefetch={true}
                  href={q}
                  className="px-4 py-2 bg-primary text-white rounded-md font-semibold ease duration-300 hover:bg-red-900"
                >
                  Get plan
                </Link>
              ) : null}
            </div>
          );
        })}
      </div>
      <SubscriptionTable />
    </div>
  );
};
