"use client";
import PropertiesIcon from "@/components/svgs/PropertiesIcon";
import {
  AMMENITIES,
  PROPERTY_TYPE_DESCRIPTIONS,
  WHAT_IS_NEAR,
} from "@/constants";
import {
  Check,
  CheckCircle,
  MoveLeft,
  MoveRight,
  School,
  X,
} from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import PersonsIcon from "@/components/svgs/PersonsIcon";
import React from "react";
import { Switch } from "@/components/ui/switch";
import {
  CreateInspectionForm,
  CreateInspectionFormValidationType,
  defaultValues,
  validateAmmenities,
  validateBasicPropertyDetailsSection,
  validateContactInfo,
  validateHouseRules,
  validateInspection,
  validateInspectionDateAndTime,
  validateNumberOfPictures,
  validatePrice,
  validatePropertyLocationDetails,
  validateTypeOfProperty,
  validateWhatIsNear,
} from "@/lib/utils";

import Spinner from "@/components/svgs/Spinner";
import { FormStates } from "@/store/features/inspection-request-slice";
import { createInspection } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const CalendarDateAndTime = dynamic(
  () => import("@/components/ui/calendar-date-time")
);

export const FormDescription: FC<{
  next: () => void;
  prev: (e: MouseEvent<HTMLButtonElement>) => void;
}> = ({ next, prev }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
      className="w-full relative h-full overflow-y-auto flex flex-col items-center justify-center 2xl:max-w-[1400px] 2xl:mx-auto"
    >
      <div className="w-full flex flex-col-reverse items-center justify-center md:flex-row md:space-x-6  md:w-full">
        <div className="w-4/5 mt-4 md:mt-0 md:w-1/2">
          <h2 className="text-xl md:text-3xl font-bold mb-4">
            Tell us about your place
          </h2>
          <p className="w-full">
            In this step, we will ask you questions regarding the property like
            the name, location and etc. You will also be required to fill the
            number of guests the property can take and a convenient date for a
            formal inspection of the property.
          </p>
        </div>
        <div className="w-5/6 h-[170px] relative rounded-lg shadow-2xl md:w-[340px] h-[200px]">
          <Image
            src="/assets/imgs/property-5.jpg"
            alt="house image"
            fill
            priority={true}
            className=""
          />
        </div>
      </div>
      <div className="w-full fixed h-[60px] bg-white bottom-0 border-t border-t-gray-400 flex items-center justify-between px-5">
        <button
          onClick={prev}
          className="border-0 outline-none text-sm py-2 px-7 bg-white text-black font-semibold underline"
        >
          Back
        </button>
        <button className="border-0 outline-none text-sm py-2 px-7 flex items-center space-x-2 rounded-full bg-black text-white font-semibold ease duration-300 hover:bg-red-700">
          <span> Next</span>
          <MoveRight color="white" size={20} />
        </button>
      </div>
    </form>
  );
};

export const TitleAndPropertyDescription: FC<{
  form: CreateInspectionForm;
  setForm: Dispatch<SetStateAction<CreateInspectionForm>>;
  formValidation: CreateInspectionFormValidationType;
  setFormValidation: Dispatch<
    SetStateAction<CreateInspectionFormValidationType>
  >;
  next: () => void;
  prev: (e: MouseEvent<HTMLButtonElement>) => void;
}> = ({ form, setForm, setFormValidation, next, formValidation, prev }) => {
  const titleInValidStyle = formValidation.title
    ? "border-primary border-[2px]"
    : "";
  const maxNumberOfPeopleInValidStyle = formValidation.maxNumberOfPeople
    ? "border-primary border-[2px]"
    : "";
  const numberOfRoomsInValidStyle = formValidation.numberOfRooms
    ? "border-primary border-[2px]"
    : "";
  const descriptionInValidStyle = formValidation.description
    ? "border-primary border-[2px]"
    : "";

  const areFieldsMissing =
    formValidation.title ||
    formValidation.maxNumberOfPeople ||
    formValidation.numberOfRooms ||
    formValidation.description;

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        const values = validateBasicPropertyDetailsSection(form);

        if (Object.keys(values).length) {
          setFormValidation((prev) => ({ ...prev, ...values }));

          return;
        } else {
          next();
        }
      }}
      className="w-full relative h-full overflow-y-auto flex items-center justify-center max-w-[1400px] mx-auto"
    >
      <div className="w-5/6 min-h-[100px] md:w-4/6 lg:w-1/2 about-one">
        <h3 className="text-xl md:text-3xl mb-10">Basic Property Details.</h3>
        <div className="w-full">
          {areFieldsMissing ? (
            <h4 className="text-primary text-md font-semibold">
              Please fill in missing fields
            </h4>
          ) : null}
          <div className="w-full flex flex-col">
            <div className="w-full flex flex-col space-y-2 mb-4">
              <label htmlFor="title">Title</label>
              <div className="w-full flex  space-x-2">
                <input
                  className={`w-[96%] border border-black rounded-md p-3  placeholder:text-gray-300 text-md ${titleInValidStyle}`}
                  name="title"
                  id="title"
                  value={form.title}
                  onChange={(e) => {
                    setForm((prevState: any) => ({
                      ...prevState,
                      title: e.target.value,
                    }));
                    if (e.target.value) {
                      setFormValidation((prev) => ({ ...prev, title: false }));
                    }
                  }}
                  placeholder="Enter Property Title"
                />
              </div>
            </div>
            <div className="w-full flex items-center space-x-5">
              <div className="w-1/2 flex flex-col space-y-2 mb-4">
                <label htmlFor="max-number-of-people">Max No. of People</label>
                <div className="w-full flex  space-x-2">
                  <input
                    className={`w-[96%] border border-black rounded-md p-3  placeholder:text-gray-300 text-md ${maxNumberOfPeopleInValidStyle}`}
                    name="maxNumberOfPeople"
                    id="max-number-of-people"
                    value={form.maxNumberOfPeople}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) return;
                      setForm((prevState: any) => ({
                        ...prevState,
                        maxNumberOfPeople: Number(e.target.value),
                      }));
                      if (e.target.value) {
                        setFormValidation((prev) => ({
                          ...prev,
                          maxNumberOfPeople: false,
                        }));
                      }
                    }}
                    placeholder="Enter the max no. of people allowed "
                  />
                </div>
              </div>
              <div className="w-1/2 flex flex-col space-y-2 mb-4">
                <label htmlFor="number-of-rooms">No. of rooms</label>
                <div className="w-full flex  space-x-2">
                  <input
                    className={`w-[93%] border border-black rounded-md p-3  placeholder:text-gray-300 text-md ${numberOfRoomsInValidStyle}`}
                    name="numberOfRooms"
                    id="number-of-rooms"
                    value={form.numberOfRooms}
                    onChange={(e) => {
                      if (isNaN(Number(e.target.value))) return;
                      setForm((prevState: any) => ({
                        ...prevState,
                        numberOfRooms: Number(e.target.value),
                      }));
                      if (e.target.value) {
                        setFormValidation((prev) => ({
                          ...prev,
                          numberOfRooms: false,
                        }));
                      }
                    }}
                    placeholder="4"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full space-y-2">
            <label htmlFor="property-description">Description</label>
            <div className="w-full flex  space-x-2">
              <textarea
                className={`w-[96%] border border-black rounded-md p-3 h-[160px] resize-none md:h-[120px] placeholder:text-gray-300 text-md ${descriptionInValidStyle}`}
                name="description"
                id="property-description"
                value={form.description}
                onChange={(e) => {
                  setForm((prevState: any) => ({
                    ...prevState,
                    description: e.target.value,
                  }));
                  if (e.target.value) {
                    setFormValidation((prev) => ({
                      ...prev,
                      description: false,
                    }));
                  }
                }}
                placeholder="Describe your property max (200) characters."
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bg-white w-full h-[60px] bottom-0 border-t border-t-gray-400 flex items-center justify-between px-5">
        <button
          onClick={prev}
          className="border-0 outline-none text-sm py-2 px-7 bg-white text-black font-semibold underline"
        >
          Back
        </button>
        <button className="border-0 outline-none text-sm py-2 px-7 flex items-center space-x-2 rounded-full bg-black text-white font-semibold ease duration-300 hover:bg-red-700">
          <span> Next</span>
          <MoveRight color="white" size={20} />
        </button>
      </div>
    </form>
  );
};

export const UploadPropertyImages: FC<{
  form: CreateInspectionForm;
  setForm: Dispatch<SetStateAction<CreateInspectionForm>>;
  formValidation: CreateInspectionFormValidationType;
  setFormValidation: Dispatch<
    SetStateAction<CreateInspectionFormValidationType>
  >;
  next: () => void;
  prev: (e: MouseEvent<HTMLButtonElement>) => void;
}> = ({ form, setForm, formValidation, setFormValidation, next, prev }) => {
  const fileUploadRef = useRef({} as HTMLInputElement);

  const [photos, setPhotos] = useState<string[]>([]);

  const [error, setError] = useState("");

  const removePhotoByIndex =
    (targetIdx: number) => (e: MouseEvent<HTMLDivElement>) => {
      const photoSlice = photos.filter((_, idx: number) => idx !== targetIdx);
      const filesSlice = form.files.filter(
        (_: any, idx: number) => idx !== targetIdx
      );
      setForm((prevState: CreateInspectionForm) => ({
        ...prevState,
        files: filesSlice,
      }));
      setPhotos(photoSlice);
    };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const { files, name } = e.target;
    const listOfPhotos = files as FileList;

    if (listOfPhotos.length + photos.length > 10) {
      setError("Cannot upload more than 10 images.");
      setTimeout(() => setError(""), 4000);
      return;
    }

    const displayUrls: string[] = [];
    const filesList: File[] = [];
    for (let i = 0; i < listOfPhotos.length; i++) {
      const url = URL.createObjectURL(listOfPhotos[i]);
      displayUrls.push(url);
      const file = files?.item(i) as File;
      filesList.push(file);
    }
    setForm((prevState: CreateInspectionForm) => ({
      ...prevState,
      files: [...prevState.files, ...filesList],
    }));
    if (filesList.length > 2) {
      setFormValidation((prev) => ({ ...prev, files: false }));
      setError("");
    }

    setPhotos((prevState) => [...prevState, ...displayUrls]);
  };

  useEffect(() => {
    const listOfPhotos = form.files;
    const displayUrls: string[] = [];
    for (let i = 0; i < listOfPhotos.length; i++) {
      const url = URL.createObjectURL(listOfPhotos[i]);
      displayUrls.push(url);
    }

    setPhotos(displayUrls);
  }, []);

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        const values = validateNumberOfPictures(form);

        if (Object.keys(values).length) {
          setFormValidation((prev) => ({ ...prev, ...values }));
          setError("Number of images cannot be less than 3.");
          return;
        } else {
          next();
        }
      }}
      className="w-full relative h-full overflow-y-auto flex items-center justify-center max-w-[1400px] mx-auto"
    >
      <div className="w-full flex flex-col items-center min-h-[100px] md:w-5/6 about-one max-w-[1400px] mx-auto">
        {error && (
          <span className="text-primary font-semibold mb-4">{error}</span>
        )}
        {photos.length ? (
          <p className="text-sm text-gray-400 mb-3">
            Click on image tile to remove it.{form.files.length}
          </p>
        ) : (
          ""
        )}
        {photos.length ? (
          <div className="w-full flex flex-col items-center">
            <div className="w-5/6 grid grid-cols-2 gap-4 md:grid-cols-4 md:w-full lg:w-4/6">
              {photos.map((url, idx: number) => (
                <div
                  onClick={removePhotoByIndex(idx)}
                  key={idx}
                  className="w-full h-[150px] rounded-md relative about-one shadow-xl group"
                >
                  <span className="hidden absolute items-center justify-center w-full h-full bg-paper opacity-30 top-0 left-0 z-50 cursor-pointer group-hover:flex">
                    <X size={60} color="red" />
                  </span>
                  <Image
                    src={url}
                    alt="property image"
                    fill
                    priority
                    className="rounded-md"
                  />
                </div>
              ))}
            </div>
            {photos.length < 6 && (
              <button
                className="p-2 bg-secondary rounded-md absolute bottom-[-50px]"
                onClick={(e) => {
                  e.preventDefault();
                  fileUploadRef.current.click();
                }}
              >
                upload more..
              </button>
            )}
            <input
              onChange={handleUpload}
              name="photos"
              ref={fileUploadRef}
              className="hidden"
              type="file"
              multiple
            />
          </div>
        ) : (
          <>
            <h3 className="text-xl md:text-3xl mb-5">Add property photos.</h3>
            <div className="w-full flex justify-center h-[300px]">
              <div className="w-5/6 h-full flex items-center flex-col space-y-2 justify-center bg-[#fef7ea] rounded-md border-2 border-dashed border-[#F0AE2F] md:w-3/6">
                <p className="text-sm  px-2 md:text-md md:px-0 text-black">
                  Accepted file formats (.jpg, .png, .jpeg)
                </p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    fileUploadRef.current.click();
                  }}
                  className="outline-none rounded-full border-2  border-golden-orange py-2 px-4 text-golden-orange font-bold"
                >
                  upload photos
                </button>
                <input
                  onChange={handleUpload}
                  name="photos"
                  ref={fileUploadRef}
                  className="hidden"
                  type="file"
                  multiple
                />
              </div>
            </div>
          </>
        )}
      </div>
      <div className="fixed bg-white w-full h-[60px] bottom-0 border-t border-t-gray-400 flex items-center justify-between px-5">
        <button
          onClick={prev}
          className="border-0 outline-none text-sm py-2 px-7 bg-white text-black font-semibold underline"
        >
          Back
        </button>
        <button className="border-0 outline-none text-sm py-2 px-7 flex items-center space-x-2 rounded-full bg-black text-white font-semibold ease duration-300 hover:bg-red-700">
          <span> Next</span>
          <MoveRight color="white" size={20} />
        </button>
      </div>
    </form>
  );
};

export type PropertyTypes = "smart-share" | "prime-inn" | "town-house" | "";

export const TypeOfProperty: FC<{
  form: CreateInspectionForm;
  setForm: Dispatch<SetStateAction<CreateInspectionForm>>;
  formValidation: CreateInspectionFormValidationType;
  setFormValidation: Dispatch<
    SetStateAction<CreateInspectionFormValidationType>
  >;
  next: () => void;
  prev: (e: MouseEvent<HTMLButtonElement>) => void;
}> = ({ form, setForm, formValidation, next, prev, setFormValidation }) => {
  const isSmartHomeCss =
    form.typeOfProperty === "smart-share"
      ? "border-2 bg-gray-100"
      : "border border-gray-300";
  const isPrimeInCss =
    form.typeOfProperty === "prime-inn"
      ? "border-2 bg-gray-100"
      : "border border-gray-300";
  const isTownHouseCss =
    form.typeOfProperty === "town-house"
      ? "border-2 bg-gray-100"
      : "border border-gray-300";

  const selectPropertyType =
    (value: PropertyTypes) => (e: MouseEvent<HTMLDivElement>) => {
      setForm((prevState: any) => ({ ...prevState, typeOfProperty: value }));
      setFormValidation((prev) => ({ ...prev, typeOfProperty: false }));
    };

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        const values = validateTypeOfProperty(form);

        if (Object.keys(values).length) {
          setFormValidation((prev) => ({ ...prev, ...values }));

          return;
        } else {
          next();
        }
      }}
      className="w-full relative min-h-[400px] overflow-y-auto flex flex-col items-center max-w-[1400px] mx-auto"
    >
      <div className="w-full flex flex-col ">
        <div className="w-full flex flex-col items-center min-h-[100px] md:w-5/6 about-one max-w-[1400px] mx-auto">
          <h3 className="text-xl md:text-3xl mb-5 text-center">
            What best describes your place?
          </h3>
          {formValidation.typeOfProperty ? (
            <span className="text-md text-primary text-center font-semibold mb-4">
              Please select the type of property
            </span>
          ) : null}
          <div className="w-5/6 grid grid-cols-2 gap-4 md:w-4/6 md:grid-cols-3 lg:w-1/2">
            <div
              onClick={selectPropertyType("smart-share")}
              className={`w-full h-[100px] border-black ${isSmartHomeCss}  rounded-md cursor-pointer flex flex-col items-center justify-center`}
            >
              <div className="flex items-center">
                <PersonsIcon />
              </div>
              <span className="font-bold">Smart Share</span>
            </div>
            <div
              onClick={selectPropertyType("prime-inn")}
              className={`w-full h-[100px] ${isPrimeInCss} border-black rounded-md cursor-pointer  flex flex-col items-center justify-center`}
            >
              <PropertiesIcon color="black" />
              <span className="font-bold">Prime Inn</span>
            </div>
            <div
              onClick={selectPropertyType("town-house")}
              className={`w-full h-[100px] ${isTownHouseCss} border-black rounded-md cursor-pointer  flex flex-col items-center justify-center`}
            >
              <School strokeWidth={1.5} />
              <span className="font-bold">Town House</span>
            </div>
          </div>
          <p className="w-5/6 h-[70px] mt-5 text-sm text-black font-[500] md:w-4/6 lg:w-1/2">
            {PROPERTY_TYPE_DESCRIPTIONS[form.typeOfProperty]}
          </p>
        </div>
      </div>
      <div className="w-full bg-white fixed h-[60px] bottom-0 border-t border-t-gray-400 flex items-center justify-between px-5">
        <button
          onClick={prev}
          className="border-0 outline-none text-sm py-2 px-7 bg-white text-black font-semibold underline"
        >
          Back
        </button>
        <button className="border-0 outline-none text-sm py-2 px-7 flex items-center space-x-2 rounded-full bg-black text-white font-semibold ease duration-300 hover:bg-red-700">
          <span> Next</span>
          <MoveRight color="white" size={20} />
        </button>
      </div>
    </form>
  );
};

export const PropertyLocation: FC<{
  form: CreateInspectionForm;
  setForm: Dispatch<SetStateAction<CreateInspectionForm>>;
  formValidation: CreateInspectionFormValidationType;
  setFormValidation: Dispatch<
    SetStateAction<CreateInspectionFormValidationType>
  >;
  next: () => void;
  prev: (e: MouseEvent<HTMLButtonElement>) => void;
}> = ({ form, setForm, setFormValidation, formValidation, next, prev }) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prevState: CreateInspectionForm) => ({
      ...prevState,
      [name]: type === "number" ? +value : value,
    }));
    setFormValidation((prev) => ({ ...prev, [name]: false }));
  };

  const invalidCountryStyle = formValidation.country
    ? "border-primary border-[2px]"
    : "";
  const invalidCityStyle = formValidation.city
    ? "border-primary border-[2px]"
    : "";
  const invalidStreetStyle = formValidation.street
    ? "border-primary border-[2px]"
    : "";
  const invalidHouseNumberStyle = formValidation.houseNumber
    ? "border-primary border-[2px]"
    : "";
  const invalidZipStyle = formValidation.zip
    ? "border-primary border-[2px]"
    : "";

  const isLocationFormValid =
    formValidation.country ||
    formValidation.city ||
    formValidation.street ||
    formValidation.houseNumber ||
    formValidation.zip;

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        const values = validatePropertyLocationDetails(form);

        if (Object.keys(values).length) {
          setFormValidation((prev) => ({ ...prev, ...values }));
          return;
        } else {
          next();
        }
      }}
      className="w-full relative h-full overflow-y-auto flex items-center justify-center max-w-[1400px] mx-auto"
    >
      <div className="w-5/6 flex flex-col items-center min-h-[100px] md:w-5/6 about-one max-w-[1400px] mx-auto">
        <div className="w-full md:w-4/6 lg:w-1/2 flex flex-col items-center">
          <h3 className="w-full text-xl md:text-3xl mb-5 md:text-center">
            Where is this property located?
          </h3>
          {isLocationFormValid ? (
            <span className="text-primary font-semibold ">
              Please fill all missing fields
            </span>
          ) : null}
          <div className="w-full space-y-2 mb-4">
            <label htmlFor="country">Country</label>
            <input
              className={`w-[96%] border border-black rounded-md p-3 capitalize  placeholder:text-gray-300 text-md disabled:cursor-not-allowed ${invalidCountryStyle}`}
              name="country"
              id="country"
              disabled
              onChange={handleChange}
              placeholder="Nigeria"
              value={form.country}
            />
          </div>
          <div className="w-full flex flex-col items-center md:flex-row">
            <div className="w-full space-y-2 mb-4 md:w-1/2">
              <label htmlFor="city">City</label>
              <select
                className={`w-[96%] border border-black rounded-md p-3 placeholder:text-gray-300 text-md ${invalidCityStyle}`}
                name="city"
                id="city"
                value={form.city}
                onChange={handleChange}
              >
                <option selected>Select</option>
                <option value="abuja">Abuja</option>
                <option value="lagos">Lagos</option>
                <option value="port harcourt">Portharcourt</option>
                <option value="akwa-ibom">Akwa-ibom</option>
                <option value="delta">Delta</option>
                <option value="oyo">Oyo</option>
                <option value="benin">Benin</option>
              </select>
            </div>
            <div className="w-full space-y-2 mb-4 md:w-1/2">
              <label htmlFor="street">Street</label>
              <input
                className={`w-[96%] border border-black rounded-md p-3 placeholder:text-gray-300 text-md ${invalidStreetStyle}`}
                name="street"
                id="street"
                value={form.street}
                onChange={handleChange}
                placeholder="Enter the street name"
              />
            </div>
          </div>
          <div className="w-full flex items-center">
            <div className="w-1/2 space-y-2 mb-4">
              <label htmlFor="number">House Number</label>
              <input
                className={`w-[96%] border border-black rounded-md p-3 placeholder:text-gray-300 text-md ${invalidHouseNumberStyle}`}
                name="houseNumber"
                id="number"
                value={form.houseNumber ? form.houseNumber : ""}
                onChange={handleChange}
                type="number"
                placeholder="Enter the house number"
              />
            </div>
            <div className="w-1/2 space-y-2 mb-4">
              <label htmlFor="zip">Area/Town</label>
              <input
                className={`w-[96%] border border-black rounded-md p-3  placeholder:text-gray-300 text-md ${invalidZipStyle}`}
                name="zip"
                id="zip"
                value={form.zip}
                onChange={handleChange}
                placeholder="Enter the area/town"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white fixed h-[60px] bottom-0 border-t border-t-gray-400 flex items-center justify-between px-5">
        <button
          onClick={prev}
          className="border-0 outline-none text-sm py-2 px-7 bg-white text-black font-semibold underline"
        >
          Back
        </button>
        <button className="border-0 outline-none text-sm py-2 px-7 flex items-center space-x-2 rounded-full bg-black text-white font-semibold ease duration-300 hover:bg-red-700">
          <span> Next</span>
          <MoveRight color="white" size={20} />
        </button>
      </div>
    </form>
  );
};

export const ContactInformation: FC<{
  form: CreateInspectionForm;
  setForm: Dispatch<SetStateAction<CreateInspectionForm>>;
  formValidation: CreateInspectionFormValidationType;
  setFormValidation: Dispatch<
    SetStateAction<CreateInspectionFormValidationType>
  >;
  next: () => void;
  prev: (e: MouseEvent<HTMLButtonElement>) => void;
}> = ({ form, setForm, setFormValidation, formValidation, prev, next }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState: CreateInspectionForm) => ({
      ...prevState,
      [name]: value,
    }));
    setFormValidation((prev) => ({ ...prev, [name]: false }));
  };

  const invalidContactNameStyle = formValidation.contactName
    ? "border-primary border-[2px]"
    : "";
  const invalidContactEmailStyle = formValidation.contactEmail
    ? "border-primary border-[2px]"
    : "";
  const invalidContactPhoneStyle = formValidation.contactPhoneNumber
    ? "border-primary border-[2px]"
    : "";

  const isContactFormValid =
    formValidation.contactName ||
    formValidation.contactEmail ||
    formValidation.contactPhoneNumber;

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        const values = validateContactInfo(form);

        if (Object.keys(values).length) {
          setFormValidation((prev) => ({ ...prev, ...values }));
          return;
        } else {
          next();
        }
      }}
      className="w-full relative h-full overflow-y-auto flex items-center justify-center max-w-[1400px] mx-auto"
    >
      <div className="w-full flex flex-col items-center min-h-[100px] md:w-5/6 about-one max-w-[1400px] mx-auto">
        <div className="w-5/6 md:w-1/2 flex flex-col items-center">
          <h3 className="w-full text-xl md:text-3xl mb-5 md:text-center">
            How can you be contacted?
          </h3>
          {isContactFormValid ? (
            <span className="text-primary font-semibold md:text-center">
              Please fill in all fields
            </span>
          ) : null}
          <div className="w-full space-y-2 mb-4">
            <label htmlFor="contact_name">Contact Name</label>
            <input
              className={`w-[96%] border border-black rounded-md p-3 placeholder:text-gray-300 text-md ${invalidContactNameStyle}`}
              name="contactName"
              id="contact_name"
              value={form.contactName}
              onChange={handleChange}
              placeholder="Enter the contact name"
            />
          </div>
          <div className="w-full flex flex-col items-center md:flex-row">
            <div className="w-full space-y-2 mb-4 md:w-1/2">
              <label htmlFor="contact_phone">Phone Number</label>
              <input
                className={`w-[96%] border border-black rounded-md p-3  placeholder:text-gray-300 text-md ${invalidContactPhoneStyle}`}
                name="contactPhoneNumber"
                id="contact_phone"
                placeholder="Enter your phone number"
                value={form.contactPhoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="w-full space-y-2 mb-4 md:w-1/2">
              <label htmlFor="contact_email">Email Address</label>
              <input
                className={`w-[96%] border border-black rounded-md p-3  placeholder:text-gray-300 text-md ${invalidContactEmailStyle}`}
                name="contactEmail"
                id="contact_email"
                type="email"
                value={form.contactEmail}
                onChange={handleChange}
                placeholder="Enter the contact email"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white fixed h-[60px] bottom-0 border-t border-t-gray-400 flex items-center justify-between px-5">
        <button
          onClick={prev}
          className="border-0 outline-none text-sm py-2 px-7 bg-white text-black font-semibold underline"
        >
          Back
        </button>
        <button className="border-0 outline-none text-sm py-2 px-7 flex items-center space-x-2 rounded-full bg-black text-white font-semibold ease duration-300 hover:bg-red-700">
          <span> Next</span>
          <MoveRight color="white" size={20} />
        </button>
      </div>
    </form>
  );
};

export const InpsectionDateAndComments: FC<{
  form: CreateInspectionForm;
  setForm: Dispatch<SetStateAction<CreateInspectionForm>>;
  formValidation: CreateInspectionFormValidationType;
  setFormValidation: Dispatch<
    SetStateAction<CreateInspectionFormValidationType>
  >;
  prev: (e: MouseEvent<HTMLButtonElement>) => void;
  currentFormState: FormStates;
  setFormState: Dispatch<SetStateAction<FormStates>>;
}> = ({
  form,
  setForm,
  formValidation,
  setFormValidation,
  prev,
  setFormState,
  currentFormState,
}) => {
  const router = useRouter();

  const [createInspectionStatus, setCreateInspectionStatus] = useState(false);

  const [error, setError] = useState("");
  const hostId = useSelector((state: RootState) => state.user.me?.host?.id);

  const mutation = useMutation({
    mutationFn: createInspection,
    onSuccess() {
      setCreateInspectionStatus(true);
      setForm(defaultValues);
      setFormState("section-13");
    },
    onError(error, variables, context) {
      setError("Inspection Creation Failed.");
    },
  });

  const onSubmit = () => {
    const errors = validateInspection(form);
    if (errors.length) {
      setError("Please Check the previous sections. Some fields are missing");
    } else {
      const { files, ...rest } = form;
      const keys = Object.keys(rest);
      const inspection = new FormData();
      inspection.append("hostId", hostId);
      for (let i = 0; i < files.length; i++) {
        const element = files[i];
        inspection.append("files", element);
      }
      for (let key of keys) {
        //@ts-ignore
        let element = rest[key];
        if (Array.isArray(element)) {
          element = JSON.stringify(element);
        }
        inspection.append(key, element);
      }
      mutation.mutate(inspection);
    }
  };

  const isInspectionDateAndTimeFormValid =
    formValidation.inspectionDate || formValidation.inspectionTime;

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        const values = validateInspectionDateAndTime(form);

        if (Object.keys(values).length) {
          setFormValidation((prev) => ({ ...prev, ...values }));
          return;
        } else {
          onSubmit();
        }
      }}
      className="w-full relative h-full overflow-y-auto flex items-center justify-center max-w-[1400px] mx-auto"
    >
      <div className="fixed w-full bottom-[60px] flex items-center justify-center">
        <span className="p-2 rounded-md text-red-500 font-semibold text-center md:text-left">
          {error}
        </span>
      </div>
      <div className="w-full flex flex-col items-center min-h-[100px] md:w-5/6 about-one max-w-[1400px] mx-auto">
        <div className="w-5/6 md:w-1/2 flex flex-col items-center">
          <h3 className="w-full text-xl md:text-3xl mb-5 md:text-center ">
            Schedule an Inspection date
          </h3>
          {isInspectionDateAndTimeFormValid ? (
            <span className="text-primary font-semibold md:text-center"></span>
          ) : null}
          <p className="w-full text-md md:text-md mb-2 md:text-center ">
            Click to open up calendar and time selectors.
          </p>
          <div className="w-full flex flex-col justify-center  relative md:w-4/5">
            <CalendarDateAndTime
              form={form}
              setForm={setForm}
              setFormValidation={setFormValidation}
              formValidation={formValidation}
            />
          </div>
          <div className="w-full flex mt-14 flex-col justify-center  relative lg:w-5/6">
            <p className="w-full text-sm font-semibold">
              Choose a date that you will be available, to avoid rescheduling.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-white fixed h-[60px] bottom-0 border-t border-t-gray-400 flex items-center justify-between px-5">
        <button
          onClick={prev}
          className="border-0 outline-none text-sm py-2 px-7 bg-white text-black font-semibold underline"
        >
          Back
        </button>
        {currentFormState === "section-13" ? (
          <div className="flex items-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                router.push("/hosts/dashboard/properties");
              }}
              className="border-0 outline-none text-sm py-2 px-7 flex items-center justify-center rounded-full bg-black text-white font-semibold ease duration-300 hover:bg-red-700"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            {createInspectionStatus && (
              <span>
                <Check size={17} color="green" />
              </span>
            )}
            <button className="border-0 outline-none text-sm py-2 px-7 flex items-center justify-center rounded-full bg-black text-white font-semibold ease duration-300 hover:bg-red-700">
              {mutation.isPending ? <Spinner /> : <span>Submit</span>}
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export const WhatIsNear: FC<{
  form: CreateInspectionForm;
  setForm: Dispatch<SetStateAction<CreateInspectionForm>>;
  formValidation: CreateInspectionFormValidationType;
  setFormValidation: Dispatch<
    SetStateAction<CreateInspectionFormValidationType>
  >;
  next: () => void;
  prev: (e: MouseEvent<HTMLButtonElement>) => void;
}> = ({ form, setForm, formValidation, setFormValidation, prev, next }) => {
  const [others, setOthers] = useState<string[]>([]);

  const [other, setOther] = useState("");

  const [showOthers, setShowOthers] = useState(false);

  const handleOtherToggle =
    (value: string) => (e: MouseEvent<HTMLDivElement>) => {
      if (others.includes(value)) {
        const filtered = others.filter((target) => target !== value);
        const mainStateFiltered = form.nearbyPlaces.filter(
          (target: string) => target !== value
        );
        if (filtered.length === 0) {
          setShowOthers(false);
        }
        setOthers(filtered);
        setForm((prevState: CreateInspectionForm) => ({
          ...prevState,
          nearbyPlaces: mainStateFiltered,
        }));
      } else {
        setOthers((prevState) => [...prevState, value]);
        setForm((prevState: CreateInspectionForm) => ({
          ...prevState,
          nearbyPlaces: [...prevState.nearbyPlaces, value],
        }));
      }
    };

  const handleOtherChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOther(e.target.value);
  };

  const handleEnterKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (others.includes(other) || !other) return;
      setFormValidation((prev) => ({ ...prev, nearbyPlaces: false }));
      setOthers((prevState) => [...prevState, other]);
      setForm((prevState: CreateInspectionForm) => ({
        ...prevState,
        nearbyPlaces: [...prevState.nearbyPlaces, other],
      }));
      setOther("");
    }
  };

  const addOther = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (others.includes(other) || !other) return;
    setFormValidation((prev) => ({ ...prev, nearbyPlaces: false }));
    setOthers((prevState) => [...prevState, other]);
    setForm((prevState: CreateInspectionForm) => ({
      ...prevState,
      nearbyPlaces: [...prevState.nearbyPlaces, other],
    }));
    setOther("");
  };

  const onSelect = (value: string) => (e: MouseEvent<HTMLDivElement>) => {
    setFormValidation((prev) => ({ ...prev, nearbyPlaces: false }));

    if (form.nearbyPlaces.includes(value)) {
      const nearbyPlacesFiltered = form.nearbyPlaces.filter(
        (target: string) => target !== value
      );
      setForm((prevState: CreateInspectionForm) => ({
        ...prevState,
        nearbyPlaces: nearbyPlacesFiltered,
      }));
      return;
    }
    setForm((prevState: CreateInspectionForm) => ({
      ...prevState,
      nearbyPlaces: [...prevState.nearbyPlaces, value],
    }));
  };

  const places = WHAT_IS_NEAR.map(({ text, Icon }, idx: number) => {
    const isSelectedCss = form.nearbyPlaces.includes(text)
      ? "bg-gray-100 border-2 border-black"
      : "border border-gray-300";

    return (
      <div
        onClick={onSelect(text)}
        key={idx}
        className={`w-full rounded-md space-x-2 p-2 cursor-pointer flex items-center justify-center ${isSelectedCss}  hover:bg-gray-100`}
      >
        <Icon size={16} />
        <span className="capitalize font-semibold">{text}</span>
      </div>
    );
  });

  const isNearbyPlacesValid = formValidation.nearbyPlaces;

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        const values = validateWhatIsNear(form);

        if (Object.keys(values).length) {
          setFormValidation((prev) => ({ ...prev, ...values }));
          return;
        } else {
          next();
        }
      }}
      className="w-full relative h-full overflow-y-auto flex items-center justify-center max-w-[1400px] mx-auto"
    >
      <div className="w-full flex flex-col items-center min-h-[100px] md:w-5/6 about-one max-w-[1400px] mx-auto">
        <h3 className="text-xl mb-5 text-center mb-2 md:text-3xl ">
          Which of these are close by?
        </h3>
        {isNearbyPlacesValid ? (
          <span className="text-primary font-semibold">
            You have to add at least one
          </span>
        ) : null}
        <p className="text-black text-sm mb-2">
          Click on item to add or remove from choices.
        </p>
        {showOthers && others.length ? (
          <>
            <div className="w-5/6 grid grid-cols-2 gap-4 md:w-4/6 md:grid-cols-3 lg:w-1/2">
              {others.map((text, idx: number) => {
                const isSelectedCss = others.includes(text)
                  ? "bg-gray-100 border-2 border-black"
                  : "border border-gray-300";
                return (
                  <div
                    className={`w-full rounded-md space-x-2 p-2 cursor-pointer flex items-center justify-center ${isSelectedCss}  hover:bg-gray-100`}
                    key={idx}
                    onClick={handleOtherToggle(text)}
                  >
                    <CheckCircle size={16} />
                    <span className="capitalize font-semibold">{text}</span>
                  </div>
                );
              })}
            </div>
            {others.length ? (
              <div className="w-5/6 md:w-4/6 lg:w-1/2">
                <div
                  onClick={() => {
                    setShowOthers(false);
                  }}
                  className="w-[150px] item-left mt-4 space-x-1 cursor-pointer border-b-[1.5px] border-b-black flex items-end font-semibold"
                >
                  <MoveLeft size={16} />
                  <span>Back to selection</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <div className="w-5/6 grid grid-cols-2 gap-4 md:w-4/6 md:grid-cols-3 lg:w-1/2">
            {places}
            {others.length ? (
              <div
                onClick={() => {
                  setShowOthers(true);
                }}
                className="w-full cursor-pointer md:col-span-2 underline flex items-end font-semibold"
              >
                <span>+{others.length} more...(click to view)</span>
              </div>
            ) : (
              ""
            )}
          </div>
        )}

        <div className="w-5/6 flex flex-col justify-center md:w-4/6 lg:w-1/2">
          <label htmlFor="others" className="mt-4">
            Can't find what you're looking for? Add it below.
          </label>
          <div className="w-full space-y-4 flex justify-center flex-col  mt-2 md:flex-row md:space-y-0">
            <input
              onKeyUp={handleEnterKey}
              onChange={handleOtherChange}
              id="others"
              name="others"
              value={other}
              className="py-3 px-5 w-full text-md font-[500] rounded-tl-full rounded-bl-full text-[16px] rounded-tr-full rounded-br-full border border-black box-border md:w-4/6  md:rounded-tr-none md:rounded-br-none"
            />
            <button
              onClick={addOther}
              className="bg-black p-[13px] w-full text-white rounded-tr-full rounded-br-full rounded-tl-full rounded-bl-full font-semibold border-0 box-border md:rounded-tl-none md:rounded-bl-none md:w-2/6"
            >
              Add place
            </button>
          </div>
        </div>
      </div>
      <div className="w-full bg-white fixed h-[60px] bottom-0 border-t border-t-gray-400 flex items-center justify-between px-5">
        <button
          onClick={prev}
          className="border-0 outline-none text-sm py-2 px-7 bg-white text-black font-semibold underline"
        >
          Back
        </button>
        <button className="border-0 outline-none text-sm py-2 px-7 flex items-center space-x-2 rounded-full bg-black text-white font-semibold ease duration-300 hover:bg-red-700">
          <span> Next</span>
          <MoveRight color="white" size={20} />
        </button>
      </div>
    </form>
  );
};

export const Ammenities: FC<{
  form: CreateInspectionForm;
  setForm: Dispatch<SetStateAction<CreateInspectionForm>>;
  formValidation: CreateInspectionFormValidationType;
  setFormValidation: Dispatch<
    SetStateAction<CreateInspectionFormValidationType>
  >;
  next: () => void;
  prev: (e: MouseEvent<HTMLButtonElement>) => void;
}> = ({ form, setForm, formValidation, setFormValidation, next, prev }) => {
  const [others, setOthers] = useState<string[]>([]);

  const [other, setOther] = useState("");

  const [showOthers, setShowOthers] = useState(false);

  const handleOtherToggle =
    (value: string) => (e: MouseEvent<HTMLDivElement>) => {
      if (others.includes(value)) {
        const filtered = others.filter((target) => target !== value);
        const mainStateFiltered = form.ammenities.filter(
          (target: string) => target !== value
        );
        if (filtered.length === 0) {
          setShowOthers(false);
        }
        setOthers(filtered);
        setForm((prevState: CreateInspectionForm) => ({
          ...prevState,
          ammenities: mainStateFiltered,
        }));
      } else {
        setOthers((prevState) => [...prevState, value]);
        setForm((prevState: CreateInspectionForm) => ({
          ...prevState,
          ammenities: [...prevState.ammenities, value],
        }));
      }
    };

  const handleOtherChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOther(e.target.value);
  };

  const handleEnterKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (others.includes(other) || !other) return;
      setFormValidation((prev) => ({ ...prev, ammenities: false }));
      setOthers((prevState) => [...prevState, other]);
      setForm((prevState: CreateInspectionForm) => ({
        ...prevState,
        ammenities: [...prevState.ammenities, other],
      }));
      setOther("");
    }
  };

  const addOther = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (others.includes(other) || !other) return;
    setFormValidation((prev) => ({ ...prev, ammenities: false }));
    setOthers((prevState) => [...prevState, other]);
    setForm((prevState: CreateInspectionForm) => ({
      ...prevState,
      ammenities: [...prevState.ammenities, other],
    }));
    setOther("");
  };

  const onSelect = (value: string) => (e: MouseEvent<HTMLDivElement>) => {
    setFormValidation((prev) => ({ ...prev, ammenities: false }));
    if (form.ammenities.includes(value)) {
      const ammenitiesFiltered = form.ammenities.filter(
        (target: string) => target !== value
      );
      setForm((prevState: CreateInspectionForm) => ({
        ...prevState,
        ammenities: ammenitiesFiltered,
      }));
      return;
    }
    setForm((prevState: CreateInspectionForm) => ({
      ...prevState,
      ammenities: [...prevState.ammenities, value],
    }));
  };

  const isAmmenitiesValid = formValidation.ammenities;

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        const values = validateAmmenities(form);

        if (Object.keys(values).length) {
          setFormValidation((prev) => ({ ...prev, ...values }));
          return;
        } else {
          next();
        }
      }}
      className="w-full relative h-full overflow-y-auto flex items-center justify-center max-w-[1400px] mx-auto"
    >
      <div className="w-full flex flex-col items-center min-h-[100px] md:w-5/6 about-one max-w-[1400px] mx-auto">
        <h3 className="text-xl mb-5 text-center mb-2 md:text-3xl ">
          Choose available amenities.
        </h3>
        {isAmmenitiesValid ? (
          <span className="text-primary font-semibold">
            You have to add at least one
          </span>
        ) : null}
        <p className="text-black text-sm mb-2">
          Click on item to add or remove from choices.
        </p>
        {showOthers && others.length ? (
          <>
            <div className="w-5/6 grid grid-cols-2 gap-4 md:w-5/6 md:grid-cols-3 lg:w-1/2">
              {others.map((text, idx: number) => {
                const isSelectedCss = others.includes(text)
                  ? "bg-gray-100 border-2 border-black"
                  : "border border-gray-300";
                return (
                  <div
                    className={`w-full rounded-md space-x-2 p-2 cursor-pointer flex items-center justify-center ${isSelectedCss} hover:bg-gray-100`}
                    key={idx}
                    onClick={handleOtherToggle(text)}
                  >
                    <CheckCircle size={16} />
                    <span className="capitalize font-semibold">{text}</span>
                  </div>
                );
              })}
            </div>
            {others.length ? (
              <div className="w-5/6 md:w-5/6 lg:w-1/2">
                <div
                  onClick={() => {
                    setShowOthers(false);
                  }}
                  className="w-[150px] item-left mt-4 space-x-1 cursor-pointer border-b-[1.5px] border-b-black flex items-end font-semibold"
                >
                  <MoveLeft size={16} />
                  <span>Back to selection</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <div className="w-5/6 grid grid-cols-2 gap-4 md:w-5/6 md:grid-cols-3 lg:w-1/2">
            {AMMENITIES.map(({ text, Icon }, idx: number) => {
              const isSelectedCss = form.ammenities.includes(text)
                ? "bg-gray-100 border-2 border-black"
                : "border border-gray-300";

              return (
                <div
                  onClick={onSelect(text)}
                  key={idx}
                  className={`w-full rounded-md space-x-2 p-2 cursor-pointer flex items-center justify-center ${isSelectedCss}  hover:bg-gray-100`}
                >
                  <Icon size={16} />
                  <span className="capitalize font-semibold">{text}</span>
                </div>
              );
            })}
            {others.length ? (
              <div
                onClick={() => {
                  setShowOthers(true);
                }}
                className="w-full cursor-pointer md:col-span-2 underline flex items-end font-semibold"
              >
                <span>+{others.length} more...(click to view)</span>
              </div>
            ) : (
              ""
            )}
          </div>
        )}

        <div className="w-5/6 flex flex-col justify-center md:w-5/6 lg:w-1/2">
          <label htmlFor="others" className="mt-4">
            Can't find what you're looking for? Add it below.
          </label>
          <div className="w-full space-y-4 flex justify-center flex-col  mt-2 md:flex-row md:space-y-0">
            <input
              onKeyUp={handleEnterKey}
              onChange={handleOtherChange}
              id="others"
              name="others"
              value={other}
              className="py-3 px-5 w-full text-md font-[500] rounded-tl-full rounded-bl-full rounded-tr-full rounded-br-full border border-black box-border md:w-4/6  md:rounded-tr-none md:rounded-br-none"
            />
            <button
              onClick={addOther}
              className="bg-black p-[13px] w-full text-white rounded-tr-full rounded-br-full rounded-tl-full rounded-bl-full font-semibold border-0 box-border md:rounded-tl-none md:rounded-bl-none md:w-2/6"
            >
              Add more
            </button>
          </div>
        </div>
      </div>
      <div className="w-full fixed bg-white h-[60px] bottom-0 border-t border-t-gray-400 flex items-center justify-between px-5">
        <button
          onClick={prev}
          className="border-0 outline-none text-sm py-2 px-7 bg-white text-black font-semibold underline"
        >
          Back
        </button>
        <button className="border-0 outline-none text-sm py-2 px-7 flex items-center space-x-2 rounded-full bg-black text-white font-semibold ease duration-300 hover:bg-red-700">
          <span> Next</span>
          <MoveRight color="white" size={20} />
        </button>
      </div>
    </form>
  );
};

const RULES = [
  "No smoking",
  "No pets",
  "No candles or open fire",
  "Unregistered vistors are not allowed",
  "Damaged or Missing items will be charged",
];

export const HouseRules: FC<{
  form: CreateInspectionForm;
  setForm: Dispatch<SetStateAction<CreateInspectionForm>>;
  formValidation: CreateInspectionFormValidationType;
  setFormValidation: Dispatch<
    SetStateAction<CreateInspectionFormValidationType>
  >;
  next: () => void;
  prev: (e: MouseEvent<HTMLButtonElement>) => void;
}> = ({ form, setForm, formValidation, setFormValidation, next, prev }) => {
  const [rule, setRule] = useState("");

  const [preDefinedRules, setPredefinedRules] = useState<string[]>([]);

  const [showOthers, setShowOthers] = useState(false);
  const handleRuleToggle =
    (value: string) => (e: MouseEvent<HTMLDivElement>) => {
      if (form.houseRules.includes(value)) {
        const filtered = form.houseRules.filter(
          (target: string) => target !== value
        );
        if (filtered.length === 0) {
          setShowOthers(false);
        }
        setForm((prevState: CreateInspectionForm) => ({
          ...prevState,
          houseRules: filtered,
        }));
      } else {
        setForm((prevState: CreateInspectionForm) => ({
          ...prevState,
          houseRules: [...prevState.houseRules, value],
        }));
      }
    };

  const handleRuleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRule(e.target.value);
  };

  const setTime = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState: CreateInspectionForm) => ({
      ...prevState,
      [name]: value,
    }));
    setFormValidation((prev) => ({ ...prev, [name]: false }));
  };

  const handleEnterKey = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      if (form.houseRules.includes(rule.toLowerCase()) || !rule) return;
      setFormValidation((prev) => ({ ...prev, houseRules: false }));
      setForm((prevState: CreateInspectionForm) => ({
        ...prevState,
        houseRules: [...prevState.houseRules, rule],
      }));
      setRule("");
    }
  };

  const addOther = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (form.houseRules.includes(rule.toLowerCase()) || !rule) return;
    setFormValidation((prev) => ({ ...prev, houseRules: false }));
    setForm((prevState: CreateInspectionForm) => ({
      ...prevState,
      houseRules: [...prevState.houseRules, rule],
    }));
    setRule("");
  };

  const invalidCheckInStyle = formValidation.checkInAfter
    ? "border-primary border-[2px]"
    : "";
  const invalidCheckOutStyle = formValidation.checkOutBefore
    ? "border-primary border-[2px]"
    : "";
  const invalidHouseRulesStyle = formValidation.houseRules
    ? "border-primary border-[2px]"
    : "";

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        const values = validateHouseRules(form);

        if (Object.keys(values).length) {
          setFormValidation((prev) => ({ ...prev, ...values }));
          return;
        } else {
          next();
        }
      }}
      className="w-full relative h-full overflow-y-auto flex items-center justify-center max-w-[1400px] mx-auto"
    >
      <div className="w-full flex flex-col items-center min-h-[100px] md:w-5/6 about-one max-w-[1400px] mx-auto">
        <h3 className="text-xl mb-5 text-center mb-2 md:text-3xl ">
          What are the House rules?
        </h3>
        {showOthers ? (
          ""
        ) : (
          <div className="w-5/6 md:w-4/6 lg:w-1/2">
            <div className="w-full flex flex-col  md:flex-row md:items-center md:space-x-5">
              <div className="w-full flex flex-col space-y-2 mb-4 md:w-1/2">
                <label htmlFor="check-in-after">Check in after</label>
                <div className="w-full flex  space">
                  <input
                    className={`w-[96%] border border-black rounded-md p-3 capitalize placeholder:text-gray-800 text-md ${invalidCheckInStyle}`}
                    name="checkInAfter"
                    id="check-in-after"
                    type="time"
                    onChange={setTime}
                    value={form.checkInAfter}
                    placeholder="Four bedroom semi detached duplex"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col space-y-2 mb-4 md:w-1/2">
                <label htmlFor="check-out-before">Check out before</label>
                <div className="w-full flex">
                  <input
                    className={`w-[96%] border border-black rounded-md p-3 capitalize placeholder:text-gray-800 text-md ${invalidCheckOutStyle}`}
                    name="checkOutBefore"
                    id="check-out-before"
                    type="time"
                    onChange={setTime}
                    value={form.checkOutBefore}
                    placeholder="10:00am"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {form.houseRules.length ? (
          <div className="w-5/6 md:w-4/6 lg:w-1/2 text-sm mb-4 text-black font-semibold">
            Click on rule to remove it from the list.
          </div>
        ) : null}
        {formValidation.houseRules ? (
          <div className="w-5/6 md:w-4/6 lg:w-1/2 text-sm mb-4 text-primary font-semibold">
            Please add at least one house rule
          </div>
        ) : null}

        <div className="w-5/6 p-0 relative grid grid-cols-2 gap-4 md:w-4/6 lg:w-1/2">
          {form.houseRules.length ? (
            <div className="w-full col-span-2">
              <span className="w-[30px] h-[30px] flex items-center justify-center bg-black font-semibold rounded-full text-white">
                {form.houseRules.length}
              </span>
            </div>
          ) : null}
          {!showOthers
            ? RULES.map((text: string, idx: number) => {
                const isRuleSelected = form.houseRules.includes(text);
                const selectedStyle = isRuleSelected
                  ? "bg-black text-white"
                  : "";
                return (
                  <div
                    onClick={handleRuleToggle(text)}
                    className={`w-full truncate cursor-pointer py-2 px-4 text-xs rounded-full border border-gray-300 hover:bg-gray-100 ${selectedStyle}`}
                    key={idx}
                  >
                    {text}
                  </div>
                );
              })
            : null}
          {form.houseRules
            .filter((v) => !RULES.includes(v))
            .map((text: string, idx: number) => {
              if (idx >= 1 && !showOthers) return;
              return (
                <div
                  onClick={handleRuleToggle(text)}
                  className="w-full truncate cursor-pointer py-2 px-4 text-xs rounded-full border border-gray-300 hover:bg-gray-100"
                  key={idx}
                >
                  {text}
                </div>
              );
            })}
          {form.houseRules.length &&
          form.houseRules.length > 6 &&
          !showOthers ? (
            <div
              onClick={() => {
                setShowOthers(true);
              }}
              className="w-full cursor-pointer md:col-span-2 underline flex items-end font-semibold"
            >
              <span>+{form.houseRules.length - 6} more...(click to view)</span>
            </div>
          ) : null}
          {form.houseRules.length && showOthers ? (
            <div
              onClick={() => {
                setShowOthers(false);
              }}
              className="w-full cursor-pointer md:col-span-2 underline flex items-end font-semibold"
            >
              <span>Back to full view</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="w-5/6 flex flex-col justify-center md:w-4/6 lg:w-1/2">
          <label htmlFor="others" className="mt-4">
            Add your house rules.
          </label>
          <div className="w-full space-y-4 flex justify-center flex-col  mt-2 md:flex-row md:space-y-0">
            <input
              onKeyUp={handleEnterKey}
              onChange={handleRuleChange}
              id="others"
              name="others"
              placeholder="Can't find a specific house rule? type it here..."
              value={rule}
              className="py-3 px-5 w-full text-md font-[500] rounded-tl-full rounded-bl-full rounded-tr-full rounded-br-full border border-black box-border md:w-4/6  md:rounded-tr-none md:rounded-br-none"
            />
            <button
              onClick={addOther}
              className="bg-black p-[13px] w-full text-white rounded-tr-full rounded-br-full rounded-tl-full rounded-bl-full font-semibold border-0 box-border md:rounded-tl-none md:rounded-bl-none md:w-2/6"
            >
              Add rule
            </button>
          </div>
        </div>
      </div>
      <div className="w-full fixed bg-white h-[60px] bottom-0 border-t border-t-gray-400 flex items-center justify-between px-5">
        <button
          onClick={prev}
          className="border-0 outline-none text-sm py-2 px-7 bg-white text-black font-semibold underline"
        >
          Back
        </button>
        <button className="border-0 outline-none text-sm py-2 px-7 flex items-center space-x-2 rounded-full bg-black text-white font-semibold ease duration-300 hover:bg-red-700">
          <span> Next</span>
          <MoveRight color="white" size={20} />
        </button>
      </div>
    </form>
  );
};

export const PriceCalculator: FC<{
  form: CreateInspectionForm;
  setForm: Dispatch<SetStateAction<CreateInspectionForm>>;
  formValidation: CreateInspectionFormValidationType;
  setFormValidation: Dispatch<
    SetStateAction<CreateInspectionFormValidationType>
  >;
  next: () => void;
  prev: (e: MouseEvent<HTMLButtonElement>) => void;
}> = ({ form, setForm, formValidation, setFormValidation, next, prev }) => {
  const [animPrice, setAnimPricing] = useState(() => form.price);

  const [animation, showAnimation] = useState(false);

  const [openSwitch, setOpenSwitch] = useState(false);

  const animCss = animation ? "" : "hidden";

  const guestServiceFee = (10 / 100) * form.price;

  const youEarn = form.price - (2 / 100) * form.price;

  useEffect(() => {
    if (animPrice > 0) {
      setFormValidation((prev) => ({ ...prev, price: false }));
      showAnimation(true);
      let timeout = setTimeout(() => {
        showAnimation(false);
        setForm((prevState: CreateInspectionForm) => ({
          ...prevState,
          price: animPrice,
        }));
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    } else if (animPrice <= 0) {
      showAnimation(false);
      setForm((prevState: CreateInspectionForm) => ({
        ...prevState,
        price: 0,
      }));
    } else {
      return;
    }
  }, [animPrice]);

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        const values = validatePrice(form);

        if (Object.keys(values).length) {
          setFormValidation((prev) => ({ ...prev, ...values }));
          return;
        } else {
          next();
        }
      }}
      className="w-full relative h-full overflow-y-auto flex items-center justify-center max-w-[1400px] mx-auto"
    >
      <div className="w-full flex flex-col items-center min-h-[100px] md:w-5/6 about-one max-w-[1400px] mx-auto">
        <h3 className="text-xl mb-5 text-center md:text-3xl ">Pricing.</h3>
        <p className="text-md mb-2 text-center md:text-md ">
          Type the amount below.
        </p>
        {formValidation.price ? (
          <span className="text-primary font-semibold">
            Please enter an amount
          </span>
        ) : null}
        <div className="w-5/6 flex items-center justify-center md:w-4/6 lg:w-1/2">
          <div className="w-full flex items-center justify-center">
            <label className="text-[40px] font-bold">₦</label>
            <input
              className="w-[220px] py-4 text-[40px] font-bold border-0 outline-none"
              placeholder="35000"
              name="price"
              onChange={(e) => {
                if (isNaN(+e.target.value.split(",").join(""))) return;
                setAnimPricing(+e.target.value.split(",").join(""));
              }}
              value={animPrice.toLocaleString()}
            />
            <span className="font-semibold">/night</span>
          </div>
        </div>
        <div className="w-5/6 flex items-center justify-center md:w-4/5 lg:w-1/2">
          <div className="rounded-md shadow-md w-[300px] h-[220px] p-2 relative">
            <svg
              height="100%"
              className="absolute top-0 left-0 bg-transparent"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                rx="8"
                ry="8"
                className={`line ${animCss}`}
                height="100%"
                width="100%"
                strokeLinejoin="round"
              />
            </svg>
            <ul className="overflow-hidden w-full p-0">
              <li className="w-full p-2 font-semibold text-sm flex items-center justify-between">
                <span className="font-semibold">Base price</span>
                <span className="font-semibold">
                  ₦{form.price.toLocaleString()}
                </span>
              </li>
              <li className="w-full font-semibold p-2 text-sm flex items-center justify-between">
                <span className="font-semibold">Guest service fee</span>
                <span className="font-semibold">
                  ₦{guestServiceFee.toLocaleString()}
                </span>
              </li>
              <li className="w-full font-semibold p-2 text-sm flex items-center justify-between">
                <div className="flex space-x-1">
                  <span className="font-semibold">Caution fee</span>
                  <Switch
                    id="caution-fee"
                    checked={openSwitch}
                    onCheckedChange={(checked) => {
                      setOpenSwitch(checked);
                    }}
                    className="isolate"
                  />
                </div>
                {openSwitch ? (
                  <input
                    name="cautionFee"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setForm((prevState: CreateInspectionForm) => ({
                        ...prevState,
                        cautionFee: +e.target.value,
                      }));
                    }}
                    value={form.cautionFee}
                    className="px-1 py-1 isolate outline-none border border-black rounded-md w-[80px] text-md"
                  />
                ) : null}
              </li>

              <li className="w-full font-semibold py-2 px-2 text-sm flex items-center justify-between mt-3 border-t-[1.5px] border-t-gray-300">
                <span className="font-semibold"> Guest price before taxes</span>
                <span className="font-semibold">
                  ₦
                  {(
                    guestServiceFee +
                    form.price +
                    form.cautionFee
                  ).toLocaleString()}
                </span>
              </li>
              <li className="w-full py-2 px-2 font-semibold text-sm flex items-center justify-between">
                <span className="font-semibold"> You earn</span>
                <span className="font-semibold">
                  ₦{youEarn.toLocaleString()}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full bg-white fixed h-[60px] bottom-0 border-t border-t-gray-400 flex items-center justify-between px-5">
        <button
          onClick={prev}
          className="border-0 outline-none text-sm py-2 px-7 bg-white text-black font-semibold underline"
        >
          Back
        </button>
        <button className="border-0 outline-none text-sm py-2 px-7 flex items-center space-x-2 rounded-full bg-black text-white font-semibold ease duration-300 hover:bg-red-700">
          <span> Next</span>
          <MoveRight color="white" size={20} />
        </button>
      </div>
    </form>
  );
};

export function PropertyCreatedMessage() {
  return (
    <div className="w-5/6 min-h-[200px] shadow-lg py-10 flex items-center justify-center flex flex-col max-w-[600px]">
      <CheckCircle color="#34A853" size={100} />
      <p className="text-center font-semibold my-2 md:text-left text-[20px] font-bold">
        Inspection request has been submitted successfully.
      </p>
    </div>
  );
}
