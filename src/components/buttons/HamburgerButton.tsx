"use client";

import { useMenuState } from "@/context/MenuContext";
import { me } from "@/http/api";
import { RootState } from "@/store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInStatus, setMe } from "@/store/features/current-user-slice";
import HomeIcon from "../svgs/HomeIcon";
import MenuList from "../navigation/MenuList";
import BecomeAHost from "../loaders/become-a-host";
import LoginAndSignup from "../loaders/login-and-signup";
import LanguageAndCurrency from "../loaders/language-and-currency";
import useQueryString from "@/hooks/useQueryString";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const HamburgerButton = () => {
  const client = useQueryClient();
  const { pathname } = useQueryString();
  const isOnHosts = pathname.startsWith("/hosts");

  const previousPathnameRef = useRef(pathname);

  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: () => {
      const key = isOnHosts ? "hosts" : "guests";
      return me(key);
    },
    refetchOnWindowFocus: false,
    retry: false,
  });

  const dispatch = useDispatch();

  const { isMenuOpen, setMenuOpen } = useMenuState();

  const user = useSelector((state: RootState) => state.user);

  const animateOne = isMenuOpen ? "w-[0px] delay-0" : "w-[20px] delay-300";
  const animateTwo = isMenuOpen
    ? "rotate-45 delay-300"
    : "rotate-[0deg] delay-0";
  const animateThree = isMenuOpen
    ? "-rotate-45 translate-y-[-11.5px] delay-300"
    : "rotate-[0deg] delay-0";

  const buttonPos = isMenuOpen ? "translate-y-[5px]" : "";

  const hoverHamburgerIcon = user.loggedIn
    ? "px-2 py-2 flex justify-center items-center cursor-pointer hover:bg-red-50 rounded-md"
    : "";

  const isHostUserLoggedIn =
    (user?.loggedIn && !user?.me?.host) || !user?.loggedIn;

  const isUserLoggedInAndHost = user?.loggedIn && user?.me?.host;

  useEffect(() => {
    if (data && (data?.hosts || data?.user)) {
      if (isOnHosts) {
        const photo = data?.host?.photo ? data?.host?.photo : "";
        dispatch(
          setMe({
            firstName: data?.host?.firstName,
            lastName: data?.host?.lastName,
            photo: photo,
            id: data?.host?.id,
            host: data.host,
            user: data.user,
            userProfileComplete: data.userProfileComplete,
            hostProfileComplete: data.hostProfileComplete,
          })
        );
      } else {
        const photo = data?.user?.profile?.photo
          ? data?.user?.profile?.photo
          : "";
        dispatch(
          setMe({
            firstName: data?.user?.firstName,
            lastName: data?.user?.lastName,
            photo: photo,
            id: data?.user?.id,
            host: data.host,
            user: data.user,
            userProfileComplete: data.userProfileComplete,
            hostProfileComplete: data.hostProfileComplete,
          })
        );
      }
      dispatch(setLoggedInStatus(true));
    }
  }, [data]);

  useEffect(() => {
    async function revalidate() {
      await client.invalidateQueries({ queryKey: ["me"] });
    }

    const hadHostsBefore = previousPathnameRef.current.includes("/hosts");
    const hasHostsNow = pathname.includes("/hosts");

    if (hadHostsBefore !== hasHostsNow) {
      revalidate();
    }

    // Update the ref to track the current pathname for future comparisons
    previousPathnameRef.current = pathname;
  }, [pathname]);

  if (isLoading)
    return (
      <div
        onClick={() => setMenuOpen(!isMenuOpen)}
        className={` ml-5 px-2 py-2 flex justify-center items-center cursor-pointer hover:bg-red-50 rounded-md`}
      >
        <LanguageAndCurrency />
        <LoginAndSignup />
        <BecomeAHost />
        <button
          className={`border-0 ml-2 outline-none w-[20px] h-[20px] relative ease duration-300 ${buttonPos}`}
        >
          <div
            className={
              "w-[20px] ease duration-300  h-[2px] bg-primary my-1 " +
              animateTwo
            }
          ></div>
          <div
            className={
              "ease duration-300 h-[2px] bg-primary my-1 " + animateOne
            }
          ></div>
          <div
            className={
              "w-[20px] ease duration-300  h-[2px] bg-primary my-1 " +
              animateThree
            }
          ></div>
        </button>
      </div>
    );

  return (
    <div className="flex items-center space-x-2">
      <MenuList loggedIn={user?.loggedIn} />
      {isUserLoggedInAndHost ? (
        <>
          {!isOnHosts ? (
            <Link
              href="/hosts/dashboard/properties"
              className="hidden md:flex cursor-pointer"
            >
              <div className="text-black text-center flex w-[100px] font-bold px-2 h-[37px] font-[450] items-center bg-paper border border-black rounded-3xl text-[13px] justify-center bg-paper ease-in duration-200 hover:bg-red-50 lg:px-4 lg:space-x-2">
                <span className="inline-block  font-sans w-full text-[13px]">
                  Go to Host
                </span>
              </div>
            </Link>
          ) : (
            <Link href="/" className="hidden md:flex cursor-pointer">
              <div className="text-black text-center flex w-[120px] font-bold px-2 h-[37px] font-[450] items-center bg-paper border border-black rounded-3xl text-[13px] justify-center bg-paper ease-in duration-200 hover:bg-red-50 lg:px-4 lg:space-x-2">
                <span className="inline-block font-sans w-full text-[13px]">
                  Go to Guest
                </span>
              </div>
            </Link>
          )}
        </>
      ) : null}
      {isHostUserLoggedIn ? (
        <Link href="/become-a-host" className="hidden lg:flex cursor-pointer">
          <div className="text-white flex w-[150px] px-2 h-[37px] font-[450] items-center bg-primary rounded-md text-[13px] justify-center lg:px-4 lg:space-x-2">
            <span className="font-sans w-full text-[13px]">Become a host</span>
            <HomeIcon size={16} />
          </div>
        </Link>
      ) : null}
      <div
        onClick={() => setMenuOpen(!isMenuOpen)}
        className={`  ${hoverHamburgerIcon}`}
      >
        {user?.loggedIn ? (
          <div className="rounded-[50%] relative overflow-hidden bg-red-100 w-[35px] h-[35px] flex items-center justify-center text-md">
            {user?.me?.photo ? (
              <Image src={user.me.photo} alt="profile_picture" fill />
            ) : (
              <>
                {user?.me?.firstName ? (
                  <span className="text-primary font-bold capitalize">
                    {user.me?.firstName[0]}
                  </span>
                ) : null}

                {user?.me.lastName ? (
                  <span className="text-primary font-bold capitalize">
                    {user.me?.lastName[0]}
                  </span>
                ) : null}
              </>
            )}
          </div>
        ) : null}
        <button
          className={`border-0 ml-2 outline-none w-[20px] h-[20px] relative ease duration-300 ${buttonPos}`}
        >
          <div
            className={
              "w-[20px] ease duration-300  h-[2px] bg-primary my-1 " +
              animateTwo
            }
          ></div>
          <div
            className={
              "ease duration-300 h-[2px] bg-primary my-1 " + animateOne
            }
          ></div>
          <div
            className={
              "w-[20px] ease duration-300  h-[2px] bg-primary my-1 " +
              animateThree
            }
          ></div>
        </button>
      </div>
    </div>
  );
};

export default HamburgerButton;
