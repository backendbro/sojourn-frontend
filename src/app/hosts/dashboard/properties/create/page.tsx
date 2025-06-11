"use client";
import {
  useEffect,
  MouseEvent,
  useCallback,
  useState,
  FC,
  SetStateAction,
  Dispatch,
  ReactNode,
} from "react";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { FormStates } from "@/store/features/inspection-request-slice";
import {
  Ammenities,
  ContactInformation,
  FormDescription,
  PropertyLocation,
  HouseRules,
  InpsectionDateAndComments,
  PriceCalculator,
  TitleAndPropertyDescription,
  TypeOfProperty,
  UploadPropertyImages,
  WhatIsNear,
  PropertyCreatedMessage,
} from "@/components/pages/hosts/properties/inspection-request-form-states";
import { X } from "lucide-react";
import {
  CreateInspectionForm,
  CreateInspectionFormValidationType,
  defaultValidationValues,
  defaultValues,
} from "@/lib/utils";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";

const LocationOnMap: any = dynamic(
  async () => {
    const comp = await import("@/components/maps/interactive-map");
    return comp;
  },
  {
    ssr: false,
  }
);

export default () => {
  let formOpen = useSelector((state: RootState) => state.inspection.formOpen);

  const [currentFormState, setFormState] = useState<FormStates>("section-1");

  const [form, setForm] = useState<CreateInspectionForm>(defaultValues);

  const [formValidation, setFormValidation] =
    useState<CreateInspectionFormValidationType>(defaultValidationValues);

  let CurrentFormState: FC<{
    form: CreateInspectionForm;
    setForm: Dispatch<SetStateAction<CreateInspectionForm>>;
    formValidation: CreateInspectionFormValidationType;
    setFormValidation: Dispatch<
      SetStateAction<CreateInspectionFormValidationType>
    >;
    next: () => void;
    prev: (e: MouseEvent<HTMLButtonElement>) => void;
    setFormState: Dispatch<SetStateAction<FormStates>>;
    children?: ReactNode;
    currentFormState: FormStates;
  }> = FormDescription;
  switch (currentFormState) {
    case "section-1":
      CurrentFormState = FormDescription;
      break;
    case "section-2":
      CurrentFormState = TitleAndPropertyDescription;
      break;
    case "section-3":
      CurrentFormState = UploadPropertyImages;
      break;
    case "section-4":
      CurrentFormState = TypeOfProperty;
      break;
    case "section-5":
      CurrentFormState = PropertyLocation;
      break;
    case "section-6":
      CurrentFormState = LocationOnMap;
      break;
    case "section-7":
      CurrentFormState = WhatIsNear;
      break;
    case "section-8":
      CurrentFormState = Ammenities;
      break;
    case "section-9":
      CurrentFormState = HouseRules;
      break;
    case "section-10":
      CurrentFormState = PriceCalculator;
      break;
    case "section-11":
      CurrentFormState = ContactInformation;
      break;
    case "section-12":
      CurrentFormState = InpsectionDateAndComments;
      break;
    case "section-13":
      CurrentFormState = PropertyCreatedMessage;
    default:
      break;
  }

  useEffect(() => {
    if (formOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "hidden auto";
    };
  }, [formOpen]);

  const prevSection = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      switch (currentFormState) {
        case "section-2":
          setFormState("section-1");
          break;
        case "section-3":
          setFormState("section-2");
          break;
        case "section-4":
          setFormState("section-3");
          break;
        case "section-5":
          setFormState("section-4");
          break;
        case "section-6":
          setFormState("section-5");
          break;
        case "section-7":
          setFormState("section-6");
          break;
        case "section-8":
          setFormState("section-7");
          break;
        case "section-9":
          setFormState("section-8");
          break;
        case "section-10":
          setFormState("section-9");
          break;
        case "section-11":
          setFormState("section-10");
          break;
        case "section-12":
          setFormState("section-11");
          break;
        default:
          break;
      }
    },
    [currentFormState]
  );

  const nextSection = useCallback(() => {
    switch (currentFormState) {
      case "section-1":
        setFormState("section-2");
        break;
      case "section-2":
        setFormState("section-3");
        break;
      case "section-3":
        setFormState("section-4");
        break;
      case "section-4":
        setFormState("section-5");
        break;
      case "section-5":
        setFormState("section-6");
        break;
      case "section-6":
        setFormState("section-7");
        break;
      case "section-7":
        setFormState("section-8");
        break;
      case "section-8":
        setFormState("section-9");
        break;
      case "section-9":
        setFormState("section-10");
        break;
      case "section-10":
        setFormState("section-11");
        break;
      case "section-11":
        setFormState("section-12");
        break;
      default:
        break;
    }
  }, [currentFormState]);

  return (
    <div className="w-full h-full bg-white text-black z-[9999999999]">
      <div className="w-full h-[60px] top-0 flex items-center justify-between px-5 ">
        <Image
          src="/assets/logo/sojourn-logo.svg"
          alt="sojourn_logo"
          width={100}
          height={100}
          priority
        />
        <Link
          href="/hosts/dashboard/properties"
          className="border-0 outline-none text-sm py-2 px-7 flex tems-center space-x-1 rounded-full bg-primary text-white font-semibold ease duration-300 hover:bg-red-700"
        >
          <span> Cancel</span>
          <X color="white" size={18} />
        </Link>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
        <CurrentFormState
          prev={prevSection}
          currentFormState={currentFormState}
          form={form}
          formValidation={formValidation}
          setForm={setForm}
          setFormValidation={setFormValidation}
          next={nextSection}
          setFormState={setFormState}
        />
      </div>
    </div>
  );
};
