"use client";

import Spinner from "@/components/svgs/Spinner";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { getProfileHostById, updateHostById } from "@/http/api";
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

export interface IndividualAccountDetails {
  host: { firstName: string; lastName: string; email: string };
  profile: {
    gender: string;
    primaryPhoneNumber: string;
    companyName: string;
    registrationNumber: string;
    vatNumber: string;
  };
}

interface BooleanIndividualAccountDetails {
  firstName: boolean;
  lastName: boolean;
  phoneNumber: boolean;
  email: boolean;
  gender: boolean;
  companyName: boolean;
  registrationNumber: boolean;
  vatNumber: boolean;
}

export default () => {
  const hostId = useSelector((state: RootState) => state.user?.me?.host?.id);

  const client = useQueryClient();
  const ref = useRef() as LegacyRef<HTMLInputElement> | undefined;

  const mutation = useMutation({
    mutationKey: ["update-host-company-profile"],
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
      gender: "",
      dateOfBirth: "",
      primaryPhoneNumber: "",
      companyName: "",
      registrationNumber: "",
      vatNumber: "",
    },
  }));

  const [booleanState, setBooleanState] =
    useState<BooleanIndividualAccountDetails>({
      firstName: true,
      lastName: true,
      phoneNumber: true,
      email: true,
      gender: true,
      companyName: true,
      registrationNumber: true,
      vatNumber: true,
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

  function updateProfile() {
    let formData = new FormData();
    formData = formatProfileData(formData, {
      ...state,
      profile: {
        ...state.profile,
      },
    });
    formData.append("id", hostId);
    if (file.blob) formData.append("file", file.blob);
    mutation.mutate(formData);
  }

  useEffect(() => {
    if (data) {
      const photoUrl =
        data.profile && data.profile.photo
          ? data.profile.photo
          : "/assets/icons/person-placeholder.png";
      const url = photoUrl;
      setFile((prevState) => ({
        ...prevState,
        preview: url,
      }));
      setState({
        host: {
          firstName: data?.firstName,
          lastName: data?.lastName,
          email: data?.email,
        },
        profile: {
          registrationNumber: isProfile ? data.profile.registrationNumber : "",
          vatNumber: isProfile ? data.profile.vatNumber : "",
          companyName: isProfile ? data.profile.companyName : "",
          primaryPhoneNumber: isProfile ? data.profile.primaryPhoneNumber : "",
          gender: isProfile ? data.profile.gender : "",
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

  return (
    <div className="w-full p-5 md:py-[50px] flex justify-center">
      <div className="w-full md:w-5/6">
        <div className="w-full flex flex-col-reverse md:flex-row md:items-center md:justify-between">
          <div className="mt-4 md:mt-0">
            <h3 className="text-[1rem] md:text-[1.5rem]">
              Company Information
            </h3>
            <p>Update the company information and find out how it's used.</p>
          </div>
          <input
            onChange={handleFileUpload}
            type="file"
            ref={ref}
            className="hidden"
          />
          <Dialog>
            <DialogTrigger className="w-[70px] h-[70px]">
              <div className="w-full h-full cursor-pointer rounded-full bg-gray-300 relative overflow-hidden group">
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
                className="w-4/6 p-3  text-[16px]"
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
                className="w-4/6 p-3  text-[16px]"
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
              <label htmlFor="companyName" className="w-1/6 text-gray-400">
                Company/Business name
              </label>
              <input
                id="companyName"
                name="profile.companyName"
                disabled={booleanState.companyName}
                className="w-4/6 p-3  text-[16px]"
                value={state.profile.companyName}
                onChange={handleChange}
              />
              {booleanState.companyName ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      companyName: false,
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
                      companyName: true,
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
              <label htmlFor="vatNumber" className="w-1/6 text-gray-400">
                Tin no
              </label>
              <input
                id="vatNumber"
                name="profile.vatNumber"
                className="w-4/6 p-3 text-[16px]"
                value={state.profile.vatNumber}
                disabled={booleanState.vatNumber}
                onChange={handleChange}
              />
              {booleanState.vatNumber ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      vatNumber: false,
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
                      vatNumber: true,
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
              <label htmlFor="regNumber" className="w-1/6 text-gray-400">
                Registration Number
              </label>
              <input
                id="regNumber"
                name="profile.registrationNumber"
                className="w-4/6 p-3 text-[16px]"
                value={state.profile.registrationNumber}
                disabled={booleanState.registrationNumber}
                onChange={handleChange}
              />
              {booleanState.registrationNumber ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBooleanState((prevState) => ({
                      ...prevState,
                      registrationNumber: false,
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
                      registrationNumber: true,
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
