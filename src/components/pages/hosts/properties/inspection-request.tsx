// "use client";
// import {
//   useEffect,
//   MouseEvent,
//   useCallback,
//   useState,
//   FC,
//   SetStateAction,
//   Dispatch,
//   FormEvent,
// } from "react";
// import type { RootState } from "@/store";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   closeForm,
//   FormStates,
// } from "@/store/features/inspection-request-slice";
// import Image from "next/image";
// import useQueryString from "@/hooks/useQueryString";
// import {
//   Ammenities,
//   ContactInformation,
//   FormDescription,
//   PropertyLocation,
//   HouseRules,
//   InpsectionDateAndComments,
//   PriceCalculator,
//   PropertyTypes,
//   TitleAndPropertyDescription,
//   TypeOfProperty,
//   UploadPropertyImages,
//   WhatIsNear,
//   PropertyCreatedMessage,
// } from "./inspection-request-form-states";
// import { Check, MoveRight, X } from "lucide-react";
// import Spinner from "@/components/svgs/Spinner";
// import { CreateInspectionFormValidationType, validateInspection } from "@/lib/utils";
// import { useMutation } from "@tanstack/react-query";
// import { createInspection } from "@/http/api";
// import dynamic from "next/dynamic";

// const LocationOnMap: any = dynamic(
//   async () => {
//     const comp = await import("@/components/maps/interactive-map");
//     return comp;
//   },
//   {
//     ssr: false,
//   }
// );

// export interface CreateInspectionForm {
//   title: string;
//   numberOfRooms: number;
//   maxNumberOfPeople: number;
//   description: string;
//   files: File[];
//   typeOfProperty: PropertyTypes;
//   country: string;
//   city: string;
//   street: string;
//   houseNumber: number;
//   zip: string;
//   nearbyPlaces: string[];
//   ammenities: string[];
//   houseRules: string[];
//   checkInAfter: string;
//   checkOutBefore: string;
//   price: number;
//   lat: string;
//   lng: string;
//   contactName: string;
//   contactPhoneNumber: string;
//   contactEmail: string;
//   inspectionDate: Date | null;
//   inspectionTime: string;
//   cautionFee: number;
// }

// const defaultValues = {
//   title: "",
//   numberOfRooms: 0,
//   maxNumberOfPeople: 0,
//   description: "",
//   files: [],
//   typeOfProperty: "" as PropertyTypes,
//   lat: "",
//   lng: "",
//   country: "nigeria",
//   city: "",
//   street: "",
//   houseNumber: 0,
//   zip: "",
//   nearbyPlaces: [],
//   ammenities: [],
//   houseRules: [],
//   checkInAfter: "",
//   checkOutBefore: "",
//   price: 0,
//   contactName: "",
//   contactPhoneNumber: "",
//   contactEmail: "",
//   inspectionDate: null,
//   inspectionTime: "",
//   cautionFee: 0,
// };

// export default () => {
//   const { router, pathname, params, removeQueryString, createQueryString } =
//     useQueryString();

//   let formOpen = useSelector((state: RootState) => state.inspection.formOpen);

//   const [currentFormState, setFormState] = useState<FormStates>("section-1");

//   const [createInspectionStatus, setCreateInspectionStatus] = useState(false);

//   const [form, setForm] = useState<CreateInspectionForm>(defaultValues);

//   const hostId = useSelector((state: RootState) => state.user.me?.host?.id);
//   const dispatch = useDispatch();

//   const mutation = useMutation({
//     mutationFn: createInspection,
//     onSuccess() {
//       setCreateInspectionStatus(true);
//       setForm(defaultValues);
//       setFormState("section-13");
//     },
//     onError(error, variables, context) {
//       setError("Inspection Creation Failed.");
//     },
//   });

//   const [error, setError] = useState("");

//   const isFormOpenFromUrl = params.get("inspecForm") === "1";

//   const showForm = formOpen || isFormOpenFromUrl;

//   let CurrentFormState: FC<{
//     form: CreateInspectionForm;
//     setForm: Dispatch<SetStateAction<CreateInspectionForm>>;
//       formValidation: CreateInspectionFormValidationType;
//       setFormValidation: Dispatch<
//         SetStateAction<CreateInspectionFormValidationType>
//       >;
//       prev: (e: MouseEvent<HTMLButtonElement>) => void;
//       next:() => void
//       currentFormState: FormStates;
//       setFormState: Dispatch<SetStateAction<FormStates>>;
//   }> = FormDescription;
//   switch (currentFormState) {
//     case "section-1":
//       CurrentFormState = FormDescription;
//       break;
//     case "section-2":
//       CurrentFormState = TitleAndPropertyDescription;
//       break;
//     case "section-3":
//       CurrentFormState = UploadPropertyImages;
//       break;
//     case "section-4":
//       CurrentFormState = TypeOfProperty;
//       break;
//     case "section-5":
//       CurrentFormState = PropertyLocation;
//       break;
//     case "section-6":
//       CurrentFormState = LocationOnMap;
//       break;
//     case "section-7":
//       CurrentFormState = WhatIsNear;
//       break;
//     case "section-8":
//       CurrentFormState = Ammenities;
//       break;
//     case "section-9":
//       CurrentFormState = HouseRules;
//       break;
//     case "section-10":
//       CurrentFormState = PriceCalculator;
//       break;
//     case "section-11":
//       CurrentFormState = ContactInformation;
//       break;
//     case "section-12":
//       CurrentFormState = InpsectionDateAndComments;
//       break;
//     case "section-13":
//       CurrentFormState = PropertyCreatedMessage;
//     default:
//       break;
//   }

//   useEffect(() => {
//     if (formOpen) document.body.style.overflow = "hidden";
//     return () => {
//       document.body.style.overflow = "hidden auto";
//     };
//   }, [formOpen]);

//   const prevSection = useCallback(
//     (e: MouseEvent<HTMLButtonElement>) => {
//       e.preventDefault();

//       switch (currentFormState) {
//         case "section-2":
//           setFormState("section-3");
//           break;
//         case "section-3":
//           setFormState("section-2");
//           break;
//         case "section-4":
//           setFormState("section-3");
//           break;
//         case "section-5":
//           setFormState("section-4");
//           break;
//         case "section-6":
//           setFormState("section-5");
//           break;
//         case "section-7":
//           setFormState("section-6");
//           break;
//         case "section-8":
//           setFormState("section-7");
//           break;
//         case "section-9":
//           setFormState("section-8");
//           break;
//         case "section-10":
//           setFormState("section-9");
//           break;
//         case "section-11":
//           setFormState("section-10");
//           break;
//         case "section-12":
//           setFormState("section-11");
//           break;
//         default:
//           break;
//       }

//       router.push(
//         pathname + "?" + createQueryString("currentSec", currentFormState)
//       );
//     },
//     [currentFormState]
//   );

//   const nextSection = useCallback(
//     (e: MouseEvent<HTMLButtonElement>) => {
//       e.preventDefault();
//       switch (currentFormState) {
//         case "section-1":
//           setFormState("section-2");
//           break;
//         case "section-2":
//           setFormState("section-3");
//           break;
//         case "section-3":
//           setFormState("section-4");
//           break;
//         case "section-4":
//           setFormState("section-5");
//           break;
//         case "section-5":
//           setFormState("section-6");
//           break;
//         case "section-6":
//           setFormState("section-7");
//           break;
//         case "section-7":
//           setFormState("section-8");
//           break;
//         case "section-8":
//           setFormState("section-9");
//           break;
//         case "section-9":
//           setFormState("section-10");
//           break;
//         case "section-10":
//           setFormState("section-11");
//           break;
//         case "section-11":
//           setFormState("section-12");
//           break;
//         default:
//           break;
//       }
//       router.push(
//         pathname + "?" + createQueryString("currentSec", currentFormState)
//       );
//     },
//     [currentFormState]
//   );

//   const onSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const errors = validateInspection(form);
//     if (errors.length) {
//       setError("Please Check the previous sections. Some fields are missing");
//     } else {
//       const { files, ...rest } = form;
//       const keys = Object.keys(rest);
//       const inspection = new FormData();
//       inspection.append("hostId", hostId);
//       for (let i = 0; i < files.length; i++) {
//         const element = files[i];
//         inspection.append("files", element);
//       }
//       for (let key of keys) {
//         //@ts-ignore
//         let element = rest[key];
//         if (Array.isArray(element)) {
//           element = JSON.stringify(element);
//         }
//         inspection.append(key, element);
//       }
//       mutation.mutate(inspection);
//     }
//   };

//   return (
//     showForm && (
//       <div className="fixed w-full h-screen bg-white text-black z-[9999999999]">
//         <div className="fixed w-full h-[60px] top-0 flex items-center justify-between px-5">
//           <Image
//             src="/assets/logo/sojourn-logo.svg"
//             alt="sojourn logo"
//             width={120}
//             height={40}
//             priority={true}
//           />
//           <button
//             onClick={() => {
//               dispatch(closeForm());
//               // router.push(
//               //   pathname + "?" + removeQueryString("inspecForm", "1")
//               // );
//             }}
//             className="border-0 outline-none text-sm py-2 px-7 flex tems-center space-x-1 rounded-full bg-primary text-white font-semibold ease duration-300 hover:bg-red-700"
//           >
//             <span> Cancel</span>
//             <X color="white" size={18} />
//           </button>
//         </div>
//         <div className="fixed w-full bottom-[60px] flex items-center justify-center">
//           <span className="p-2 rounded-md text-red-500 font-semibold text-center md:text-left">
//             {error}
//           </span>
//         </div>
//         <form
//           onSubmit={onSubmit}
//           className="w-full top-[60px] relative h-3/4 overflow-y-auto flex items-center justify-center max-w-[1400px] mx-auto"
//         >
//           <CurrentFormState form={form} setForm={setForm} />
//           <div className="fixed w-full h-[60px] bottom-0 border-t border-t-gray-400 flex items-center justify-between px-5">
//             <button
//               onClick={prevSection}
//               className="border-0 outline-none text-sm py-2 px-7 bg-white text-black font-semibold underline"
//             >
//               Back
//             </button>
//             {currentFormState === "section-12" ? (
//               <div className="flex items-center">
//                 {createInspectionStatus && (
//                   <span>
//                     <Check size={17} color="green" />
//                   </span>
//                 )}
//                 <button className="border-0 outline-none text-sm py-2 px-7 flex items-center justify-center rounded-full bg-black text-white font-semibold ease duration-300 hover:bg-red-700">
//                   {mutation.isPending ? <Spinner /> : <span>Submit</span>}
//                 </button>
//               </div>
//             ) : currentFormState === "section-13" ? (
//               <div className="flex items-center">
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     // router.push(
//                     //   pathname + "?" + removeQueryString("inspecForm", "1")
//                     // );
//                     dispatch(closeForm());
//                   }}
//                   className="border-0 outline-none text-sm py-2 px-7 flex items-center justify-center rounded-full bg-black text-white font-semibold ease duration-300 hover:bg-red-700"
//                 >
//                   Done
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={nextSection}
//                 className="border-0 outline-none text-sm py-2 px-7 flex items-center space-x-2 rounded-full bg-black text-white font-semibold ease duration-300 hover:bg-red-700"
//               >
//                 <span> Next</span>
//                 <MoveRight color="white" size={20} />
//               </button>
//             )}
//           </div>
//         </form>
//       </div>
//     )
//   );
// };
