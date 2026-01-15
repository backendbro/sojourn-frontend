"use client";

import Spinner from "@/components/svgs/Spinner";
import useQueryString from "@/hooks/useQueryString";
import { logoutHost } from "@/http/api";
import { RootState } from "@/store";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfileMenu = () => {
  const user = useSelector((state: RootState) => state.user);

  const { pathname } = useQueryString();
  const isOnHosts = user?.me?.host && pathname.startsWith("/hosts");

  const isOnUserDashboard = pathname.startsWith("/dashboard");

  const mutation = useMutation({
    mutationFn: logoutHost,
    onSuccess: (data) => {
      location.reload();
    },
  });

  const [localLogin, setLocalLogin] = useState(false);

  const isGuestAndNotHost = user.me.user && !user.me.host;

  const isOnHostsAndHostExists = isOnHosts && user.me.host;

  const isOnGuestAndHostExists = !isOnHosts && user.me.host;

  useEffect(() => {
    setLocalLogin(user.loggedIn);
  }, [user.loggedIn]);

  return localLogin ? (
    <>
      {isOnHostsAndHostExists ? (
        <li className="block bg-secondary font-semibold md:hidden w-full ease duration-300 hover:bg-red-50 cursor-pointer list-none">
          <Link href="/" className="w-full h-full px-5 py-3 block">
            <div className="flex items-center space-x-2">
              <span> Go to Guest</span>
              <ArrowRight color="black" />
            </div>
          </Link>
        </li>
      ) : (
        <>
          {isOnGuestAndHostExists ? (
            <li className="block bg-secondary md:hidden w-full ease duration-300 hover:bg-red-50 cursor-pointer list-none">
              <Link
                href="/hosts/dashboard/properties"
                className="w-full h-full px-5 py-3 block"
              >
                <div className="flex items-center space-x-2">
                  <span> Go to Host</span>
                  <ArrowRight color="black" />
                </div>
              </Link>
            </li>
          ) : null}
          {isGuestAndNotHost ? (
            <li className="text-white flex w-full font-[450] items-center bg-primary justify-center lg:px-4 lg:space-x-2">
              <Link
                prefetch
                className="w-full h-full px-5 py-3 block text-md font-semibold"
                href="/become-a-host"
              >
                Become a host
              </Link>
            </li>
          ) : null}
        </>
      )}
      {!isOnHosts && !isOnUserDashboard ? (
        <li className="hidden md:block w-full ease duration-300 hover:bg-red-50 cursor-pointer list-none">
          <Link
            prefetch
            className="w-full h-full px-5 py-3 block"
            href="/dashboard/bookings"
          >
            Dashboard
          </Link>
        </li>
      ) : null}
      <li className="w-full ease duration-300 hover:bg-red-50 cursor-pointer list-none">
        <Link
          prefetch
          className="w-full h-full px-5 py-3 block"
          href={
            isOnHosts ? "/hosts/dashboard/manage-profile" : "/dashboard/profile"
          }
        >
          Manage Profile
        </Link>
      </li>
      <li className="w-full ease duration-300 hover:bg-red-50 cursor-pointer list-none">
        <Link
          prefetch
          className="w-full h-full px-5 py-3 block"
          href={
            isOnHosts
              ? "/hosts/dashboard/address-details"
              : "/dashboard/address"
          }
        >
          Address Details
        </Link>
      </li>

      {isOnHosts ? (
        <li className="w-full ease duration-300 hover:bg-red-50 cursor-pointer list-none">
          <Link
            prefetch
            className="w-full h-full px-5 py-3 block"
            href="/hosts/dashboard/payment-info"
          >
            Payment Information
          </Link>
        </li>
      ) : null}
      <li className="w-full ease duration-300 hover:bg-red-50 cursor-pointer list-none">
        <Link
          prefetch
          className="w-full h-full px-5 py-3 block"
          href={
            isOnHosts
              ? "/hosts/dashboard/update-password"
              : "/dashboard/update-password"
          }
        >
          Change Password
        </Link>
      </li>
      <li className="w-full ease duration-300 hover:bg-red-50 cursor-pointer  list-none">
        <button
          onClick={async (e) => {
            mutation.mutate();
          }}
          className="w-full h-full px-5 py-3 block text-left"
        >
          {mutation.isPending ? (
            <Spinner size={20} color="#aaaaaa" />
          ) : (
            <span>Logout</span>
          )}
        </button>
      </li>
    </>
  ) : (
    <>
      <li className="w-full ease duration-300 hover:bg-red-50 cursor-pointer list-none">
        <a className="w-full h-full px-5 py-3 block" href="/about-us">
          About us
        </a>
      </li>
      <li className="w-full  ease duration-300 hover:bg-red-50 cursor-pointer  list-none">
        <a className="w-full h-full px-5 py-3 block" href="/contact-us">
          Contact us
        </a>
      </li>
      <li className="text-white flex w-full font-[450] items-center bg-primary text-[13px] justify-center lg:px-4 lg:space-x-2 xl:hidden">
        <a
          className="w-full h-full px-5 py-3 block text-md font-semibold"
          href="/become-a-host"
        >
          Become a host
        </a>
      </li>
      <li className="w-full  ease duration-300 hover:bg-red-50 cursor-pointer  list-none">
        <Link className="w-full h-full px-5 py-3 block" href="/safety">
          Safety
        </Link>
      </li>
      <li className="w-full  ease duration-300 hover:bg-red-50 cursor-pointer  list-none">
        <Link className="w-full h-full px-5 py-3 block" href="/blog">
          Blog
        </Link>
      </li>
      <li className="w-full  ease duration-300 hover:bg-red-50 cursor-pointer lg:hidden list-none">
        <Link className="w-full h-full px-5 py-3 block" href="/login">
          Login
        </Link>
      </li>
      <li className="w-full ease duration-300 hover:bg-red-50 cursor-pointer lg:hidden  list-none">
        <Link className="w-full h-full px-5 py-3 block" href="/signup">
          Signup
        </Link>
      </li>
    </>
  );
};

export default ProfileMenu;
