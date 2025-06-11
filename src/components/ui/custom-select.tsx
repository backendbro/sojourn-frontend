"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

type SelectItemType = {
  value: string;
  text: string;
};

const CustomSelect: React.FC<{
  label: string;
  withIcons?: boolean;
  selected: string;
  data: SelectItemType[];
  className?: string;
  onChange: (value: string) => void;
}> = ({ data, onChange, label, className, withIcons = false, selected }) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger
        className={`w-[180px] bg-paper ${className} border-0 focus:ring-0 hover:bg-red-50`}
      >
        {withIcons && (
          <>
            {selected === "english" ? (
              <Image
                src="/assets/icons/english-flag.png"
                alt="english flag"
                width={13}
                height={13}
                className="mx-[3px]"
              />
            ) : (
              <Image
                src="/assets/icons/french-flag.png"
                alt="french flag"
                width={13}
                height={13}
                className="mx-[3px]"
              />
            )}
          </>
        )}
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent className="bg-paper cursor-pointer z-[9999999]">
        <SelectGroup>
          <SelectLabel></SelectLabel>
          {data.map(({ value, text }, idx: number) => (
            <SelectItem className="list-none" key={idx} value={value}>
              {text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
