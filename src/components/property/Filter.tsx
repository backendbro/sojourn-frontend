"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SlidersHorizontal } from "lucide-react";
import FilterSearch from "./filter-search";
import { useState } from "react";
import { setMobileSearchStatus } from "@/store/features/mobile-search-slice";

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(change) => {
        setOpen(change);
      }}
    >
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
          <SlidersHorizontal size={16} strokeWidth={2.5} className="text-gray-700" />
          <span className="text-sm font-medium text-gray-700 hidden sm:inline">
            Filters
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="!max-w-[820px] !p-0 !gap-0 overflow-hidden rounded-2xl [&>button]:hidden">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-gray-100">
          <DialogTitle className="text-lg font-bold">Filters</DialogTitle>
        </DialogHeader>
        <FilterSearch
          setMobileSearchStatus={setMobileSearchStatus}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
