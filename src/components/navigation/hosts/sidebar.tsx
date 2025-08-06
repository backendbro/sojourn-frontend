import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  WalletIcon,
  EnvelopeIcon,
  UserPlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

const navigation = [
  { name: "Properties", href: "#", icon: BuildingOfficeIcon, current: true },
  { name: "Bookings", href: "#", icon: CalendarIcon, current: false },
  { name: "Wallet", href: "#", icon: WalletIcon, current: false },
  { name: "Inbox", href: "#", icon: EnvelopeIcon, current: false },
  {
    name: "My Plan",
    href: "#",
    icon: UserPlusIcon,
    current: false,
    badge: "Pro",
  },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
}

export default function Sidebar({
  open,
  setOpen,
  collapsed = false,
  setCollapsed,
}: SidebarProps) {
  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <img
                      src="/sojourn-logo.svg"
                      alt="Sojourn"
                      className="h-8 w-auto"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className={clsx(
                                  item.current
                                    ? "bg-primary-50 text-primary-600 border-r-2 border-primary-600"
                                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors duration-200"
                                )}
                              >
                                <item.icon
                                  className={clsx(
                                    item.current
                                      ? "text-primary-600"
                                      : "text-gray-400 group-hover:text-primary-600",
                                    "h-6 w-6 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                                <span className="flex items-center gap-2">
                                  {item.name}
                                  {item.badge && (
                                    <span className="inline-flex items-center rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700">
                                      {item.badge}
                                    </span>
                                  )}
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div
        className={clsx(
          "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 ease-in-out",
          collapsed ? "lg:w-16" : "lg:w-72"
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4 relative">
          {/* Toggle Button */}
          <button
            onClick={() => setCollapsed && setCollapsed(!collapsed)}
            className="absolute -right-3 top-8 bg-white border border-gray-200 rounded-full p-1.5 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
          >
            {collapsed ? (
              <ChevronRightIcon className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
            )}
          </button>

          <div className="flex h-16 shrink-0 items-center">
            <img
              src="/sojourn-logo.svg"
              alt="Sojourn"
              className={clsx(
                "shrink-0 transition-all duration-300",
                collapsed ? "h-8 w-8" : "h-8 w-auto"
              )}
            />
          </div>

          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={clsx(
                          item.current
                            ? "bg-primary-50 text-primary-600 border-r-2 border-primary-600"
                            : "text-gray-700 hover:text-primary-600 hover:bg-gray-50",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors duration-200",
                          collapsed && "justify-center"
                        )}
                        title={collapsed ? item.name : undefined}
                      >
                        <item.icon
                          className={clsx(
                            item.current
                              ? "text-primary-600"
                              : "text-gray-400 group-hover:text-primary-600",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {!collapsed && (
                          <span className="flex items-center gap-2">
                            {item.name}
                            {item.badge && (
                              <span className="inline-flex items-center rounded-full bg-primary-100 px-2 py-1 text-xs font-medium text-primary-700">
                                {item.badge}
                              </span>
                            )}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
