"use client";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import CalenderIcon from "../svgs/CalendarIcon";
import dynamic from "next/dynamic";
import { useState, MouseEvent, Dispatch, SetStateAction, FC } from "react";
import { SCHEDULE_TIMES } from "@/constants";
import { Clock } from "lucide-react";
import {
  CreateInspectionForm,
  CreateInspectionFormValidationType,
  isDate,
} from "@/lib/utils";

const Calendar = dynamic(() =>
  import("./calendar").then((mod) => mod.Calendar)
);

const CalendarDateAndTime: FC<{
  form: CreateInspectionForm;
  setForm: Dispatch<SetStateAction<CreateInspectionForm>>;
  formValidation: CreateInspectionFormValidationType;
  setFormValidation: Dispatch<
    SetStateAction<CreateInspectionFormValidationType>
  >;
}> = ({ form, setForm, formValidation, setFormValidation }) => {
  const [dateTime, setDate] = useState<{ date: Date; time: string }>({
    date: new Date(),
    time: "10:00",
  });

  const [dateOrTimeView, setDateOrTimeView] = useState<"date" | "time">("date");

  const dateString = form.inspectionDate
    ? new Date(form.inspectionDate).toLocaleDateString()
    : "Select Date";

  const dateStringCss = dateString === "Select Date" ? "text-lg" : "text-2xl";
  const timeStringCss = !form.inspectionTime ? "text-lg" : "text-2xl";

  const setTime = (time: string) => (e: MouseEvent<HTMLDivElement>) => {
    setForm((prevState: CreateInspectionForm) => ({
      ...prevState,
      inspectionTime: time,
    }));
    setFormValidation((prev) => ({ ...prev, inspectionTime: false }));
  };

  const invalidInspectionDateStyle = formValidation.inspectionDate
    ? "border-primary border-[2px]"
    : "";

  const invalidInspectionTimeStyle = formValidation.inspectionTime
    ? "border-primary border-[2px]"
    : "";

  return (
    <div className=" w-full space-y-2 flex justify-center flex-col font-[300]  cursor-pointer lg:border-b-0 md:w-auto md:px-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-2">
      <Popover>
        <PopoverTrigger
          onClick={(e) => {
            setDateOrTimeView("date");
          }}
          className={`w-5/6 px-2 h-full rounded-md border border-gray-300 ease duration-200 hover:bg-red-50 lg:w-1/2 ${invalidInspectionDateStyle}`}
        >
          <div className="w-full text-2xl font-[500]  space-x-2 flex py-2 items-center md:py-2 md:space-x-4 ">
            <CalenderIcon className="" />
            <div className={dateStringCss}>{dateString}</div>
          </div>
        </PopoverTrigger>
        <PopoverTrigger
          onClick={(e) => {
            setDateOrTimeView("time");
          }}
          className={`w-5/6 px-2 h-full space-x-2 rounded-md border border-gray-300 ease duration-200 hover:bg-red-50 lg:w-1/2 ${invalidInspectionTimeStyle}`}
        >
          <div className="w-full text-2xl font-[500] space-x-2 flex py-2 items-center md:space-x-4">
            <Clock size={17} className="" />
            <div className={timeStringCss}>
              {form.inspectionTime ? form.inspectionTime : "Select time"}
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto z-[999999999999999] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {dateOrTimeView === "date" ? (
            <Calendar
              onSelect={(date) => {
                if (isDate(date)) {
                  setForm((prevState: CreateInspectionForm) => ({
                    ...prevState,
                    inspectionDate: date as Date,
                  }));
                  setFormValidation((prev) => ({
                    ...prev,
                    inspectionDate: false,
                  }));
                }
              }}
              selected={form.inspectionDate as Date}
              mode="single"
              className="rounded-md border shadow"
            />
          ) : (
            <TimeScheduler
              setTime={setTime}
              currentSelection={form.inspectionTime}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CalendarDateAndTime;

export function TimeScheduler({
  setTime,
  currentSelection,
}: {
  currentSelection: string;
  setTime: (time: string) => (e: MouseEvent<HTMLDivElement | any>) => void;
}) {
  return (
    <div className="w-[300px] py-2 px-4 grid grid-cols-4 gap-4 min-h-[100px] rounded-md shadow-md border-[1.2px]">
      {SCHEDULE_TIMES.map((time: number, idx: number) => {
        const formattedTime = time + ":00 ";
        const timeSelectedCss =
          currentSelection === formattedTime
            ? "border-[1.5px] border-primary text-primary font-bold"
            : "";

        return (
          <div
            key={idx}
            onClick={setTime(formattedTime)}
            className={`w-full rounded-md p-2 rounded-md border ${timeSelectedCss} cursor-pointer hover:bg-red-50`}
          >
            {formattedTime}
          </div>
        );
      })}
    </div>
  );
}
