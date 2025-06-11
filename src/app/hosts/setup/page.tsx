"use client";

import Spinner from "@/components/svgs/Spinner";
import { doesUserExists, signupHost } from "@/http/api";
import { RootState } from "@/store";
import { HostAccountCreation } from "@/types/users";
import { useMutation } from "@tanstack/react-query";
import { Building2, User } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default () => {
  const [state, setState] = useState("");

  const [accountType, setAccountType] = useState<"Individual" | "Company" | "">(
    ""
  );

  const [isExistingEmail, setEmailValidity] = useState(false);

  const [company, setCompany] = useState({
    companyName: "",
    registrationNumber: "",
    vatNumber: "",
  });

  const isLoggedIn = useSelector((state: RootState) => state.user?.loggedIn);
  const user = useSelector((state: RootState) => state?.user.me.user);

  const mutation = useMutation({
    mutationFn: doesUserExists,
    onSuccess: async (data) => {
      if (!data.user && !data.host) {
        setEmailValidity(true);
      } else if (data.user && !data.host) {
        setEmailValidity(true);
      } else {
        location.href = "/";
      }
    },
  });

  const createHost = useMutation({
    mutationFn: signupHost,
    onSuccess: async (data) => {
      toast("Host account creation", {
        description: "account created successfully",
        closeButton: true,
      });
      location.href = "/hosts/dashboard/my-plan";
    },
    onError(error) {
      toast("Host account creation", {
        description: "account created was unsuccessful",
        action: {
          label: "Ok",
          onClick: () => {
            return null;
          },
        },
      });
    },
  });

  const individualButtonStyle =
    accountType === "Individual"
      ? "bg-primary text-white"
      : "bg-white text-black";

  const companyButtonStyle =
    accountType === "Company" ? "bg-primary text-white" : "bg-white text-black";

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCompany((prevState) => ({ ...prevState, [name]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (
      accountType === "Company" &&
      (!company.companyName ||
        !company.registrationNumber ||
        !company.vatNumber)
    ) {
      toast("Host account creation", {
        description: "Please fill in all the fields.",
        action: {
          label: "OK",
          onClick: () => null,
        },
      });
    } else {
      const host = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accountType: accountType,
        ...(company.companyName && {
          registrationNumber: company.registrationNumber,
          companyName: company.companyName,
          vatNumber: company.vatNumber,
        }),
      } as HostAccountCreation;

      createHost.mutate(host);
    }
  }

  useEffect(() => {
    if (isLoggedIn && user?.email) {
      mutation.mutate(user?.email);
    }
  }, [user?.email, isLoggedIn]);

  if (mutation.isPending) {
    return (
      <div className="w-full flex flex-col justify-center items-center min-h-[200px]">
        <Spinner size={23} color="red" />
      </div>
    );
  }

  return isLoggedIn && isExistingEmail ? (
    <div className="w-full min-h-[500px] flex flex-col justify-center items-center space-y-3 py-[20px]">
      <h3 className="text-3xl">Create a host account</h3>
      <form
        onSubmit={onSubmit}
        className="w-full min-h-[250px] md:w-2/5 flex flex-col items-center justify-center space-y-4 mb-2"
      >
        <div className="w-full h-full flex items-center justify-center space-x-4">
          <button
            onClick={(e) => {
              setAccountType("Individual");
              setState(
                "This is an account type for individuals who want to list their properties themselves."
              );
              e.preventDefault();
            }}
            className={`w-1/4 h-[100px] rounded-md border border-gray-400 p-3 flex items-center justify-center ${individualButtonStyle}`}
          >
            <div className="flex flex-col items-center">
              <User size={22} />
              <span className="font-semibold">Individual</span>
            </div>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setAccountType("Company");
              setState(
                "This is an account type for businesses, corporations, or registered organiations"
              );
            }}
            className={`w-1/4 h-[100px] rounded-md border border-gray-400 p-3 flex items-center justify-center ${companyButtonStyle}`}
          >
            <div className="flex flex-col items-center">
              <Building2 size={22} />
              <span className="font-semibold">Business</span>
            </div>
          </button>
        </div>
        {accountType === "Company" ? (
          <div className="w-3/5  grid md:grid-cols-2 gap-3">
            <div className="flex flex-col  col-span-2">
              <label htmlFor="company-name">Company/Business Name</label>
              <input
                name="companyName"
                onChange={handleChange}
                value={company.companyName}
                id="company-name"
                className="w-full border rounded-md p-2 border-gray-500 text-[16px]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="reg-number">Registration no.</label>
              <input
                name="registrationNumber"
                onChange={handleChange}
                value={company.registrationNumber}
                id="reg-number"
                className="w-full border rounded-md p-2 border-gray-500 text-[16px]"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="vat-number">TIN</label>
              <input
                onChange={handleChange}
                name="vatNumber"
                value={company.vatNumber}
                id="vat-number"
                className="w-full border rounded-md p-2 border-gray-500 text-[16px]"
              />
            </div>
          </div>
        ) : null}
        <p className="text-center font-[500] text-sm">{state}</p>
        {state ? (
          <button className="flex items-center justify-center bg-primary text-white rounded-md px-7 py-2 ease duration-300 hover:bg-red-700">
            {!createHost.isPending ? (
              <span>Continue</span>
            ) : (
              <Spinner color="white" size={17} />
            )}
          </button>
        ) : null}
      </form>
    </div>
  ) : null;
};
