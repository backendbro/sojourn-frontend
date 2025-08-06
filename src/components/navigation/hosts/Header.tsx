import { useState } from "react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [currency, setCurrency] = useState("NGN (₦)");
  const [language, setLanguage] = useState("EN");

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={onMenuClick}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1 items-center justify-between">
          {/* Left side - Logo and navigation */}
          <div className="flex items-center gap-x-4">
            <div className="hidden lg:flex lg:items-center lg:gap-x-4">
              <div className="flex items-center gap-x-2">
                <img
                  src="/sojourn-logo.svg"
                  alt="Sojourn"
                  className="h-8 w-auto"
                />
              </div>
            </div>
          </div>

          {/* Center - Currency and Language selectors */}
          <div className="flex items-center gap-x-4">
            <div className="hidden sm:flex sm:items-center sm:gap-x-4">
              {/* Currency Selector */}
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="appearance-none bg-transparent border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="NGN (₦)">NGN (₦)</option>
                  <option value="USD ($)">USD ($)</option>
                  <option value="EUR (€)">EUR (€)</option>
                </select>
                <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Language Selector */}
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="appearance-none bg-transparent border border-gray-300 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="EN">EN</option>
                  <option value="FR">FR</option>
                  <option value="ES">ES</option>
                </select>
                <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-x-4">
            <button
              type="button"
              className="hidden sm:flex items-center gap-x-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors duration-200"
            >
              <span>Go to Guest</span>
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-x-2 rounded-lg bg-gray-100 p-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors duration-200"
              >
                <UserCircleIcon className="h-5 w-5" />
                <span className="hidden sm:block">Account</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
