"use client";
import { useEffect, useState } from "react";
import CustomSelect from "./custom-select";
import { useDispatch, useSelector } from "react-redux";
import { setCurrency } from "@/store/features/currency-slice";
import { RootState } from "@/store";

const CurrencyAndLanguage = () => {
  const currency = useSelector((state: RootState) => state.currency.currency);

  const [selectedCurrency, setSelectedCurrency] = useState("naira");
  const dispatch = useDispatch();

  function onCurrencyChange(value: string) {
    setSelectedCurrency(value);
    if (value === "naira") {
      dispatch(setCurrency("NGN"));
    } else {
      dispatch(setCurrency("USD"));
    }
  }

  const [selectedLnguage, setSelectedLanguage] = useState("english");

  function onLanguageChange(value: string) {
    setSelectedLanguage(value);
  }

  useEffect(() => {
    if (currency === "NGN") {
      setSelectedCurrency("naira");
    } else {
      setSelectedCurrency("dollar");
    }
  }, [currency]);

  return (
    <ul className="hidden w-[250px] h-[25px] items-center justify-evenly mr-4 border-r border-r-primary  sm:flex">
      <li className="list-none">
        <CustomSelect
          data={[
            { value: "naira", text: "NGN (₦)" },
            { value: "dollar", text: "USD ($)" },
          ]}
          label="NGN (₦)"
          onChange={onCurrencyChange}
          className="w-auto font-[700]"
          selected={selectedCurrency}
        />
      </li>
      <li className="list-none">
        <CustomSelect
          data={[
            { value: "english", text: "EN" },
            { value: "french", text: "FR" },
          ]}
          label="EN"
          withIcons={true}
          onChange={onLanguageChange}
          className="w-auto font-[700]"
          selected={selectedLnguage}
        />
      </li>
    </ul>
  );
};

export default CurrencyAndLanguage;
