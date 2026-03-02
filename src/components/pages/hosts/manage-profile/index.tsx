"use client";

import Spinner from "@/components/svgs/Spinner";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { getProfileHostById, updateHostById, verfiyNIN } from "@/http/api";
import { formatDate, formatProfileData } from "@/lib/utils";
import { RootState } from "@/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, Pencil, Save, X } from "lucide-react";
import Image from "next/image";
import {
  LegacyRef,
  useRef,
  MouseEvent,
  ChangeEvent,
  useState,
  useEffect,
} from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import CompanyForm from "./company-form";
import { NINVerifcationType } from "@/types/users";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export interface IndividualAccountDetails {
  host: { firstName: string; lastName: string; email: string };
  profile: {
    governmentId?: string;
    gender: string;
    primaryPhoneNumber: string;
    dateOfBirth?: string;
  };
}

interface BooleanIndividualAccountDetails {
  firstName: boolean;
  lastName: boolean;
  phoneNumber: boolean;
  email: boolean;
  governmentId: boolean;
  gender: boolean;
  dateOfBirth: boolean;
}

export default () => {
  const hostId = useSelector((state: RootState) => state.user?.me?.host?.id);

  const client = useQueryClient();
  const ref = useRef() as LegacyRef<HTMLInputElement> | undefined;

  const [isNinVerficationLoading, setNinVerficationLoadingStatus] =
    useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(event.target.value, 10);
    setCurrentMonth(new Date(currentMonth.getFullYear(), newMonth));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(event.target.value, 10);
    setCurrentMonth(new Date(newYear, currentMonth.getMonth()));
  };

  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    return years.map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ));
  };

  const mutation = useMutation({
    mutationKey: ["update-host-profile"],
    mutationFn: updateHostById,
    async onSuccess() {
      toast("Update Profile Success", {
        description: "SuccessFully updated profile info.",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
      await client.invalidateQueries({ queryKey: ["update-host-profile"] });
    },
    onError() {
      toast("Error updating", {
        description: "Error occurred when updating profile Info.",
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["host-profile"],
    queryFn: () => getProfileHostById(hostId),
    refetchOnReconnect: true,
  });

  const [file, setFile] = useState<{ preview: string; blob: File | null }>({
    preview: "/assets/icons/person-placeholder.png",
    blob: null,
  });

  const isProfile = Boolean(data?.profile);

  const [state, setState] = useState<IndividualAccountDetails>(() => ({
    host: { firstName: "", lastName: "", email: "" },
    profile: {
      governmentId: "",
      gender: "",
      dateOfBirth: "",
      primaryPhoneNumber: "",
    },
  }));

  const [booleanState, setBooleanState] =
    useState<BooleanIndividualAccountDetails>({
      firstName: true,
      lastName: true,
      phoneNumber: true,
      email: true,
      governmentId: true,
      gender: true,
      dateOfBirth: true,
    });

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    const parent = name.split(".")[0];
    const child = name.split(".")[1];

    setState((prevState) => ({
      ...prevState,
      [parent]: {
        ...(parent === "profile" && prevState.profile),
        ...(parent === "host" && prevState.host),
        [child]: value,
      },
    }));
  }

  function opnFileDialog(e: MouseEvent<HTMLDivElement>) {
    //@ts-ignore
    ref.current.click();
  }

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;
    const url = URL.createObjectURL((files as FileList)[0]);
    setFile((prevState) => ({ blob: (files as FileList)[0], preview: url }));
  }

  async function NINverify() {
    setNinVerficationLoadingStatus(true);
    const body = {
      searchParameter: state.profile.governmentId,
      countryCode: "NG",
      verificationType: "NIN-VERIFY",
    } as NINVerifcationType;

    const data = await verfiyNIN(body);
    let nameMatch = false;
    if (data.verificationStatus === "VERIFIED") {
      nameMatch =
        (data.response[0].firstname as string).toLowerCase() ===
          state.host.firstName.toLowerCase() &&
        (data.response[0].surname as string).toLowerCase() ===
          state.host.lastName.toLowerCase();
    } else {
      toast("NIN validation Error", {
        description: "NIN data do not match specified records.",
      });
    }
    setNinVerficationLoadingStatus(false);
    return nameMatch;
  }

  function updateProfile() {
    let formData = new FormData();
    formData = formatProfileData(formData, {
      ...state,
      profile: {
        ...state.profile,
        ...(selectedDate && {
          dateOfBirth: selectedDate.toLocaleDateString().replaceAll("-", "/"),
        }),
      },
    });
    formData.append("id", hostId);
    if (file.blob) formData.append("file", file.blob);
    mutation.mutate(formData);
  }

  useEffect(() => {
    if (data) {
      const url =
        data.profile && data.profile.photo
          ? data.profile.photo
          : "/assets/icons/person-placeholder.png";

      setFile((prevState) => ({
        ...prevState,
        preview: url,
      }));
      data?.profile?.dateOfBirth
        ? setSelectedDate(new Date(data?.profile?.dateOfBirth))
        : setSelectedDate(undefined);
      setState({
        host: {
          firstName: data?.firstName,
          lastName: data?.lastName,
          email: data?.email,
        },
        profile: {
          primaryPhoneNumber: isProfile ? data.profile.primaryPhoneNumber : "",
          governmentId: isProfile ? data.profile.governmentId : "",
          gender: isProfile ? data.profile.gender : "",
          dateOfBirth:
            isProfile && data?.profile?.dateOfBirth
              ? formatDate(new Date(data.profile.dateOfBirth).toISOString())
              : "",
        },
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[200px]">
        <Spinner size={17} color="red" />
      </div>
    );
  }

  return data.accountType === "Company" ? (
    <CompanyForm />
  ) : (
    <div className="w-full p-5 md:px-20 md:py-[50px] flex justify-center mb-24">
      <div className="w-full md:w-5/6">
        <div className="w-full flex flex-col-reverse md:flex-row md:items-center md:justify-between">
          <div className="mt-4 md:mt-0">
            <h3 className="text-[1rem] md:text-[1.5rem]">
              Profile Information
            </h3>
            <p>Update your information and find out how it's used.</p>
          </div>
          <input
            onChange={handleFileUpload}
            type="file"
            ref={ref}
            className="hidden"
          />
          <Dialog>
            <DialogTrigger>
              <div className="w-[70px] h-[70px] cursor-pointer rounded-full bg-gray-300 relative overflow-hidden group">
                <Image src={file.preview} alt="placehoder_person" fill />
                <div className="flex items-center justify-center absolute hidden w-full h-1/2 bottom-0 left-0 bg-black opacity-20 group-hover:flex"></div>
                <Camera
                  size={25}
                  className="hidden stroke-gray-800 absolute top-1/2 left-1/3 -translate-1/2 group-hover:block"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="md:w-[500px]">
              <div className="w-full flex items-center justify-end">
                <DialogClose>
                  <X />
                </DialogClose>
              </div>
              <div className="w-full flex flex-col  items-center space-y-3">
                <DialogTitle className="text-[1.5rem]">
                  Profile Picture
                </DialogTitle>
                <div
                  role="button"
                  onClick={opnFileDialog}
                  className="w-[200px] h-[200px] cursor-pointer rounded-full bg-gray-300 relative overflow-hidden group"
                >
                  <Image src={file.preview} alt="placehoder_person" fill />
                  <div className="flex items-center justify-center absolute hidden w-full h-1/2 bottom-0 left-0 bg-black opacity-20 group-hover:flex"></div>
                  <Camera
                    size={60}
                    className="hidden stroke-gray-800 absolute top-1/2 left-1/3 -translate-1/2 group-hover:block"
                  />
                </div>
                <button
                  onClick={updateProfile}
                  disabled={!Boolean(file.blob)}
                  className="w-full flex items-center justify-center p-3 font-semibold text-[1.1rem] rounded-md outline-none bg-black text-white disabled:bg-gray-800 disabled:cursor-not-allowed ease duration-300 hover:bg-gray-950"
                >
                  {mutation.isPending ? (
                    <Spinner size={15} color="white" />
                  ) : (
                    <span>Save</span>
                  )}
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full">
          <form className="w-full px-2 py-4">
            <div className="w-full flex py-3 items-center justify-between border-b-2 border-b-secondary">
              <label htmlFor="first-name" className="w-1/6 text-gray-400">
                First Name
              </label>
              <input
                id="first-name"
                name="host.firstName"
                disabled={booleanState.firstName}
                className={`w-4/6 p-3 text-[16px] ${
                  !booleanState.firstName ? "focus:outline-2" : ""
                }`}
                value={state.host.firstName}
                onChange={handleChange}
              />
              {booleanState.firstName ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      firstName: false,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  <Pencil size={18} className="stroke-gray-600" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfile();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      firstName: true,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  {mutation.isPending ? (
                    <Spinner size={15} color="black" />
                  ) : (
                    <Save size={18} className="stroke-gray-600" />
                  )}
                </button>
              )}
            </div>
            <div className="w-full flex py-3 items-center justify-between border-b-2 border-b-secondary">
              <label htmlFor="last-name" className="w-1/6 text-gray-400">
                Last Name
              </label>
              <input
                id="last-name"
                name="host.lastName"
                disabled={booleanState.lastName}
                className="w-4/6 p-3  text-[16px]"
                value={state.host.lastName}
                onChange={handleChange}
              />
              {booleanState.lastName ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfile();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      lastName: false,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  <Pencil size={18} className="stroke-gray-600" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfile();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      lastName: true,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  {mutation.isPending ? (
                    <Spinner size={15} color="black" />
                  ) : (
                    <Save size={18} className="stroke-gray-600" />
                  )}
                </button>
              )}
            </div>
            <div className="w-full flex py-3 items-center justify-between border-b-2 border-b-secondary">
              <label htmlFor="phone" className="w-1/6 text-gray-400">
                Phone Number
              </label>
              <input
                id="phone"
                name="profile.primaryPhoneNumber"
                disabled={booleanState.phoneNumber}
                className="w-4/6 p-3 text-[16px] "
                value={state.profile.primaryPhoneNumber}
                onChange={handleChange}
              />
              {booleanState.phoneNumber ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      phoneNumber: false,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  <Pencil size={18} className="stroke-gray-600" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfile();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      phoneNumber: true,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  {mutation.isPending ? (
                    <Spinner size={15} color="black" />
                  ) : (
                    <Save size={18} className="stroke-gray-600" />
                  )}
                </button>
              )}
            </div>
            <div className="w-full flex py-3 items-center justify-between border-b-2 border-b-secondary">
              <label htmlFor="email" className="w-1/6 text-gray-400">
                Email Address
              </label>
              <input
                id="email"
                name="host.email"
                type="email"
                className="w-4/6 p-3 text-[16px] "
                disabled={booleanState.email}
                value={state.host.email}
                onChange={handleChange}
              />
              {booleanState.email ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      email: false,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  <Pencil size={18} className="stroke-gray-600" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfile();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      email: true,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  {mutation.isPending ? (
                    <Spinner size={15} color="black" />
                  ) : (
                    <Save size={18} className="stroke-gray-600" />
                  )}
                </button>
              )}
            </div>
            <div className="w-full flex py-3 items-center justify-between border-b-2 border-b-secondary">
              <label htmlFor="govt-id" className="w-1/6 text-gray-400">
                NIN
              </label>
              <input
                id="govt-id"
                name="profile.governmentId"
                disabled={booleanState.governmentId}
                className="w-4/6 p-3 text-[16px] "
                value={state.profile.governmentId}
                onChange={handleChange}
              />
              {booleanState.governmentId ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      governmentId: false,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  <Pencil size={18} className="stroke-gray-600" />
                </button>
              ) : (
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    // const ninVerfied = await NINverify();
                    // if (ninVerfied) {
                    updateProfile();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      governmentId: true,
                    }));
                    // } else {
                    //   toast("NIN verfication", {
                    //     description:
                    //       "The data you provided do not match the NIN records.",
                    //     closeButton: true,
                    //   });
                    // }
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  {mutation.isPending || isNinVerficationLoading ? (
                    <Spinner size={15} color="black" />
                  ) : (
                    <Save size={18} className="stroke-gray-600" />
                  )}
                </button>
              )}
            </div>
            <div className="w-full flex py-3 items-center justify-between border-b-2 border-b-secondary">
              <label htmlFor="gender" className="w-1/6 text-gray-400">
                Gender
              </label>
              <select
                id="gender"
                name="profile.gender"
                className="w-4/6 p-3  "
                value={state.profile.gender}
                disabled={booleanState.gender}
                onChange={handleChange}
              >
                <option value="">select</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
              {booleanState.gender ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      gender: false,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  <Pencil size={18} className="stroke-gray-600" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfile();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      gender: true,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  {mutation.isPending ? (
                    <Spinner size={15} color="black" />
                  ) : (
                    <Save size={18} className="stroke-gray-600" />
                  )}
                </button>
              )}
            </div>
            <div className="w-full flex py-3 items-center justify-between border-b-2 border-b-secondary">
              <label htmlFor="dob" className="w-1/6 text-gray-400">
                Date of Birth
              </label>
              <Popover>
                <PopoverTrigger className="w-4/6 bg-gray-50 px-2 py-3 text-left font-md rounded-md">
                  {state.profile.dateOfBirth || selectedDate
                    ? new Date(selectedDate as Date).toLocaleDateString()
                    : "Choose a Date"}
                </PopoverTrigger>
                <PopoverContent className="w-auto z-[99999]">
                  <div className="mb-2 flex items-center gap-2">
                    {/* Month Dropdown */}
                    <select
                      value={currentMonth.getMonth()}
                      onChange={handleMonthChange}
                      className="p-2 border rounded"
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i} value={i}>
                          {new Date(0, i).toLocaleString("default", {
                            month: "long",
                          })}
                        </option>
                      ))}
                    </select>

                    {/* Year Dropdown */}
                    <select
                      value={currentMonth.getFullYear()}
                      onChange={handleYearChange}
                      className="p-2 border rounded"
                    >
                      {renderYearOptions()}
                    </select>
                  </div>
                  <div className="w-full flex items-center">
                    <Calendar
                      id="dob"
                      disabled={(date) =>
                        date > new Date() || booleanState.dateOfBirth
                      }
                      // mode="single"
                      // captionLayout="dropdown-buttons"
                      // className="rounded-md border shadow"
                      // onSelect={(date: Date | undefined) => {
                      //   setState((prevState) => ({
                      //     ...prevState,
                      //     user: { ...prevState.user },
                      //     profile: {
                      //       ...prevState.profile,
                      //       dateOfBirth: (date as Date).toString(),
                      //     },
                      //   }));
                      // }}
                      // selected={new Date(state.profile.dateOfBirth as string)}
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateChange}
                      // disabled={(date) => date > new Date()} // Disable future dates
                      month={currentMonth} // Pass the controlled current month
                      onMonthChange={setCurrentMonth} // Update the current month on navigation
                    />
                  </div>
                </PopoverContent>
              </Popover>
              {booleanState.dateOfBirth ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      dateOfBirth: false,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  <Pencil size={18} className="stroke-gray-600" />
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updateProfile();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      dateOfBirth: true,
                    }));
                  }}
                  className="p-2 bg-red-50 rounded-md"
                >
                  {mutation.isPending ? (
                    <Spinner size={15} color="black" />
                  ) : (
                    <Save size={18} className="stroke-gray-600" />
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
