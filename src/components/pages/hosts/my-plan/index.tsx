"use client";

import { Switch } from "@/components/ui/switch";
import { PLANS, PLAN_LISTING_LIMITS } from "@/constants";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Banknote,
  Building2,
  Calendar,
  Check,
  Crown,
  Home,
  Sparkles,
  Wallet,
  Zap,
} from "lucide-react";
import {
  cancelSubscriptionById,
  getProperties,
  getSubscriptionsById,
} from "@/http/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Spinner from "@/components/svgs/Spinner";
import { toast } from "sonner";

const SubscriptionTable = dynamic(() => import("./subscription-table"));

const PLAN_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Basic: Home,
  Lite: Zap,
  Premium: Crown,
};

export default () => {
  const id = useSelector((state: RootState) => state.user.me?.host?.id);
  const [checked, setChecked] = useState(false);
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const isNewHost = searchParams.get("newHost") === "true";

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-subscriptions", id],
    queryFn: () => getSubscriptionsById(id),
    refetchOnReconnect: true,
    enabled: !!id,
  });

  const { data: propertiesData } = useQuery({
    queryKey: ["get-properties-for-plan", id],
    queryFn: () => getProperties(id),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationKey: ["cancel-subscription"],
    mutationFn: cancelSubscriptionById,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get-subscriptions"] });
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

  const propertiesList = Array.isArray(propertiesData)
    ? propertiesData
    : propertiesData?.properties ?? propertiesData?.data ?? [];
  const propertyCount = Array.isArray(propertiesList) ? propertiesList.length : 0;
  const listingLimit =
    PLAN_LISTING_LIMITS[planPaidFor?.name ?? "Basic"] ?? 1;
  const listingUsageText = `${propertyCount} / ${listingLimit === 999 ? "∞" : listingLimit} listings`;

  if (isLoading) {
    return (
      <div className="w-full flex flex-col justify-center items-center min-h-[200px]">
        <Spinner color="red" size={20} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col justify-center items-center min-h-[200px]">
        <p>Sorry, could not get subscription data at this time</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col space-y-8 px-3 pb-12">
      {isNewHost && (
        <div className="rounded-xl bg-primary/10 border border-primary/20 px-4 py-3 flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-gray-900">Welcome! Choose your plan</p>
            <p className="text-sm text-gray-600 mt-0.5">
              Select a subscription plan to start listing your properties. You can
              also verify your email from the link we sent you.
            </p>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#310000] tracking-tight">
            Plans & Billing
          </h3>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Manage your subscription and track your listing limits
          </p>
        </div>
        <div className="flex items-center gap-3 py-2 px-4 bg-[#FFF1D7] rounded-full shadow-sm transition-all hover:shadow-md">
          <span className={`font-semibold text-sm ${monthlyActiveCss}`}>
            Monthly
          </span>
          <Switch
            id="plan"
            checked={checked}
            onCheckedChange={setChecked}
            className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary"
          />
          <span className={`font-semibold text-sm ${yearlyActiveCss}`}>
            Yearly <span className="text-xs text-primary">(10% off)</span>
          </span>
        </div>
      </div>

      {/* Education: 100% earnings */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFF1D7] to-[#FFE4B5] border border-primary/10 p-5 sm:p-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/20 group">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-colors" />
        <div className="relative flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform group-hover:scale-110">
            <Banknote className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-[#310000] text-base sm:text-lg">
              You keep 100% of your booking earnings
            </p>
            <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
              On every plan, you receive the full amount guests pay. Sojourn charges
              a fixed monthly subscription—never a percentage per booking.
            </p>
          </div>
        </div>
      </div>

      {/* Listing usage pill */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-2.5 shadow-sm transition-shadow hover:shadow">
          <Building2 className="h-5 w-5 text-primary" />
          <span className="font-medium text-gray-800">{planPaidFor?.name ?? "Basic"}</span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-4 py-2.5 shadow-sm">
          <span className="text-sm text-gray-600">Listings:</span>
          <span className="font-semibold text-gray-900">
            {listingUsageText}
            {listingLimit < 999 && propertyCount >= listingLimit && (
              <span className="ml-1 text-primary text-sm font-medium">(at limit)</span>
            )}
          </span>
        </div>
      </div>

      {planPaidFor?.name === "Basic" ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map((plan, idx) => {
            const PlanIcon = PLAN_ICONS[plan.name] ?? Home;
            const isActive = plan.name === "Basic";
            const isBlurred = plan.name !== "Basic" && plan.name !== "Lite";
            const href =
              plan.name !== "Basic"
                ? checked
                  ? `/hosts/checkout/${plan.price.annually.id}/?name=${plan.name}&type=${plan.price.annually.type}&price=${plan.price.annually.amount}`
                  : `/hosts/checkout/${plan.price.monthly.id}/?name=${plan.name}&type=${plan.price.monthly.type}&price=${plan.price.monthly.amount}`
                : null;
            const cardClassName = `group flex flex-col items-center rounded-2xl border-2 p-6 transition-all duration-300 ${
              isActive
                ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                : "border-gray-200 bg-white hover:border-primary/50 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
            }`;
            return href ? (
              <Link
                key={idx}
                href={href}
                prefetch={true}
                className={cardClassName}
              >
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 ${
                    isActive ? "bg-white/20" : "bg-primary/10 text-primary group-hover:scale-110"
                  }`}
                >
                  <PlanIcon className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-bold">{plan.name}</h4>
                <div className="mt-3 flex items-baseline gap-1">
                  <span
                    className={`text-2xl font-bold tabular-nums ${
                      isBlurred ? "blur-md" : ""
                    }`}
                  >
                    ₦
                    {checked
                      ? plan.price.annually.amount
                      : plan.price.monthly.amount}
                  </span>
                  <span className="text-sm opacity-80">/{checked ? "yr" : "mo"}</span>
                </div>
              </Link>
            ) : (
              <div key={idx} className={cardClassName}>
                <div
                  className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl transition-transform duration-300 ${
                    isActive ? "bg-white/20" : "bg-primary/10 text-primary group-hover:scale-110"
                  }`}
                >
                  <PlanIcon className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-bold">{plan.name}</h4>
                <div className="mt-3 flex items-baseline gap-1">
                  <span
                    className={`text-2xl font-bold tabular-nums ${
                      isBlurred ? "blur-md" : ""
                    }`}
                  >
                    ₦
                    {checked
                      ? plan.price.annually.amount
                      : plan.price.monthly.amount}
                  </span>
                  <span className="text-sm opacity-80">/{checked ? "yr" : "mo"}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      {planPaidFor?.name !== "Basic" ? (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
          <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Plan</p>
                <p className="mt-0.5 text-xl font-bold text-gray-900">{data.planName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Banknote className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Payment</p>
                <p className="mt-0.5 text-xl font-bold text-gray-900 tabular-nums">
                  ₦{checked ? planPaidFor?.price.annually.amount : planPaidFor?.price.monthly.amount}
                  <span className="text-sm font-normal text-gray-500">/{checked ? "year" : "month"}</span>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Renewal</p>
                <p className="mt-0.5 font-semibold text-gray-900">{nextPaymentDate}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Revenue</p>
                <Link
                  href="/hosts/dashboard/wallet"
                  className="mt-0.5 inline-block font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  View in Wallet →
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4">
            <button
              disabled={!isNotBasicPlan}
              onClick={disableSubscription}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {mutation.isPending ? (
                <Spinner color="red" size={16} />
              ) : (
                "Cancel subscription"
              )}
            </button>
            {isNotBasicPlan && (
              <Link
                href={upgradeLink}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-md"
              >
                Upgrade to Premium
              </Link>
            )}
          </div>
        </div>
      ) : null}
      {/* Compare plans section */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
          <h4 className="text-lg font-semibold text-gray-700">Compare plans</h4>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan, idx) => {
            const PlanIcon = PLAN_ICONS[plan.name] ?? Home;
            const q = checked
              ? `/hosts/checkout/${plan.price.annually.id}/?name=${plan.name}&type=${plan.price.annually.type}&price=${plan.price.annually.amount}`
              : `/hosts/checkout/${plan.price.monthly.id}/?name=${plan.name}&type=${plan.price.monthly.type}&price=${plan.price.monthly.amount}`;
            const isBlurred = plan.name !== "Basic" && plan.name !== "Lite";
            const isPopular = plan.popular;

            return (
              <div
                key={idx}
                className={`group relative flex flex-col rounded-2xl border-2 bg-white p-6 transition-all duration-300 ${
                  isBlurred
                    ? "pointer-events-none blur-sm"
                    : "border-gray-200 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-white shadow">
                    Popular
                  </div>
                )}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <PlanIcon className="h-6 w-6" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">{plan.name}</h4>
                <p className="mt-1 text-sm text-gray-500">{plan.desc}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary tabular-nums">
                    ₦{checked ? plan.price.annually.amount : plan.price.monthly.amount}
                  </span>
                  <span className="text-sm text-gray-500">/{checked ? "year" : "month"}</span>
                </div>
                {plan.yearlySavings && plan.yearlySavings !== "₦0" && checked && (
                  <p className="mt-1 text-xs font-medium text-primary">
                    Save {plan.yearlySavings} yearly
                  </p>
                )}
                <ul className="mt-6 space-y-3">
                  {plan.list.map((item, key) => (
                    <li key={key} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                {planPaidFor?.name === "Basic" && plan.name !== "Basic" && (
                  <Link
                    href={q}
                    prefetch
                    className="mt-8 block w-full rounded-xl bg-primary py-3 text-center font-semibold text-white transition-all hover:bg-primary/90 hover:shadow-lg"
                  >
                    Get {plan.name}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <SubscriptionTable />
    </div>
  );
};
