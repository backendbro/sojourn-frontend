"use client";

import { useState } from "react";
import CalendarIcon from "../svgs/CalendarIcon";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const DatePicker = () => {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="w-full outline-none border-0 flex items-center justify-start">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Date of Birth</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
