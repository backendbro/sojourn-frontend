"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
      <DialogTrigger>
        <SlidersHorizontal color="#444" size={23} strokeWidth={3} />
      </DialogTrigger>
      <DialogContent className="md:min-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-lg">Filters</DialogTitle>
          <DialogDescription>
            <FilterSearch
              setMobileSearchStatus={setMobileSearchStatus}
              setOpen={setOpen}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
