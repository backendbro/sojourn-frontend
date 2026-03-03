// "use client";

// import Spinner from "@/components/svgs/Spinner";
// import { updatePassword } from "@/http/api";
// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { toast } from "sonner";

// interface IUpdatePassword {
//   oldPassword: string;
//   newPassword: string;
//   confirmPassword: string;
// }

// export default () => {
//   const [state, setState] = useState<IUpdatePassword>({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const [match, setMatch] = useState(false);

//   const [errorMessage, setErrorMessage] = useState(null);

//   const mutation = useMutation({
//     mutationKey: ["update-password"],
//     mutationFn: updatePassword,
//     onError: (error: any) => {
//       if (axios.isAxiosError(error)) {
//         // Check if it's an Axios error
//         const backendErrorMessage =
//           error.response?.data?.message || error.message;
//         setErrorMessage(backendErrorMessage);
//       }
//     },
//     onSuccess() {
//       toast("password successfully updated!", {
//         closeButton: true,
//       });
//       setErrorMessage(null);
//       setState({ oldPassword: "", newPassword: "", confirmPassword: "" });
//     },
//   });

//   function handleChange(e: ChangeEvent<HTMLInputElement>) {
//     const { name, value } = e.target;
//     setState((prevState: IUpdatePassword) => ({ ...prevState, [name]: value }));
//   }

//   function onSubmit(e: FormEvent) {
//     e.preventDefault();
//     mutation.mutate({
//       password: state.newPassword,
//       oldPassword: state.oldPassword,
//     });
//   }

//   useEffect(() => {
//     if (
//       state.newPassword === state.confirmPassword &&
//       !!state.newPassword &&
//       !!state.confirmPassword
//     ) {
//       setMatch(true);
//     } else {
//       setMatch(false);
//     }
//   }, [state.newPassword, state.confirmPassword]);

//   return (
//     <div className="w-full p-5 md:px-20 md:py-[50px] mb-24">
//       <h2 className="font-semibold text-2xl">Change password</h2>
//       <p>Here you can change your password</p>
//       {errorMessage ? (
//         <p className="text-primary text-md font-semibold">{errorMessage}</p>
//       ) : null}
//       <form onSubmit={onSubmit} className="space-y-8 w-full md:w-5/6">
//         <input
//           type="password"
//           name="oldPassword"
//           onChange={handleChange}
//           value={state.oldPassword}
//           placeholder="old password"
//           className="w-full py-5 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
//         />
//         <input
//           onChange={handleChange}
//           name="newPassword"
//           type="password"
//           value={state.newPassword}
//           placeholder="new password"
//           className="w-full py-5 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
//         />
//         <input
//           onChange={handleChange}
//           type="password"
//           name="confirmPassword"
//           value={state.confirmPassword}
//           placeholder="confirm password"
//           className="w-full py-5 px-2 my-3 outline-none border-b border-b-secondary placeholder:text-gray-400 text-[16px]"
//         />
//         <button
//           disabled={
//             !state.confirmPassword ||
//             !state.newPassword ||
//             !state.oldPassword ||
//             !match
//           }
//           className="flex items-center justify-center px-10 py-4 border border-primary rounded-full text-primary ease duration-300 hover:bg-red-50  disabled:cursor-not-allowed "
//         >
//           {!mutation.isPending ? (
//             <span>Change password</span>
//           ) : (
//             <Spinner color="red" size={25} />
//           )}
//         </button>
//       </form>
//     </div>
//   );
// };

"use client";

import Spinner from "@/components/svgs/Spinner";
import { updatePassword } from "@/http/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePassword() {
  const [state, setState] = useState<IUpdatePassword>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordsMatch = useMemo(() => {
    return (
      state.newPassword.length > 0 &&
      state.confirmPassword.length > 0 &&
      state.newPassword === state.confirmPassword
    );
  }, [state.newPassword, state.confirmPassword]);

  const passwordsDoNotMatch = useMemo(() => {
    return (
      state.confirmPassword.length > 0 &&
      state.newPassword !== state.confirmPassword
    );
  }, [state.newPassword, state.confirmPassword]);

  const mutation = useMutation({
    mutationKey: ["update-password"],
    mutationFn: updatePassword,
    onError: (error: any) => {
      if (axios.isAxiosError(error)) {
        const backendErrorMessage =
          error.response?.data?.message || error.message;
        setErrorMessage(backendErrorMessage);
      }
    },
    onSuccess() {
      toast("Password successfully updated!", { closeButton: true });
      setErrorMessage(null);
      setState({ oldPassword: "", newPassword: "", confirmPassword: "" });
    },
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!passwordsMatch) return;

    mutation.mutate({
      password: state.newPassword,
      oldPassword: state.oldPassword,
    });
  }

  return (
    <div className="w-full p-5 md:px-20 md:py-[50px] mb-24 mt-20">
      <h2 className="font-semibold text-2xl">Change password</h2>
      <p className="text-gray-600">Here you can change your password</p>

      {errorMessage && (
        <p className="text-red-600 text-sm font-semibold mt-3">
          {errorMessage}
        </p>
      )}

      <form onSubmit={onSubmit} className="space-y-8 w-full md:w-5/6 mt-6">
        {/* Old Password */}
        <div className="relative">
          <input
            type={showOld ? "text" : "password"}
            name="oldPassword"
            onChange={handleChange}
            value={state.oldPassword}
            placeholder="Old password"
            className="w-full py-4 pr-10 px-2 outline-none border-b-2 border-gray-400
                       focus:border-primary transition-colors
                       text-gray-900 font-medium placeholder:text-gray-500"
          />
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => setShowOld((prev) => !prev)}
          >
            {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* New Password */}
        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            name="newPassword"
            onChange={handleChange}
            value={state.newPassword}
            placeholder="New password"
            className="w-full py-4 pr-10 px-2 outline-none border-b-2 border-gray-400
                       focus:border-primary transition-colors
                       text-gray-900 font-medium placeholder:text-gray-500"
          />
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => setShowNew((prev) => !prev)}
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            onChange={handleChange}
            value={state.confirmPassword}
            placeholder="Confirm password"
            className={`w-full py-4 pr-10 px-2 outline-none border-b-2 transition-colors
              ${
                passwordsMatch
                  ? "border-green-500"
                  : passwordsDoNotMatch
                  ? "border-red-500"
                  : "border-gray-400"
              }
              focus:border-primary
              text-gray-900 font-medium placeholder:text-gray-500`}
          />
          <div
            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
            onClick={() => setShowConfirm((prev) => !prev)}
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {/* Match message */}
        {passwordsMatch && (
          <p className="text-green-600 text-sm font-medium">
            Passwords match ✓
          </p>
        )}

        {passwordsDoNotMatch && (
          <p className="text-red-600 text-sm font-medium">
            Passwords do not match
          </p>
        )}

        <button
          disabled={
            !state.oldPassword ||
            !state.newPassword ||
            !state.confirmPassword ||
            !passwordsMatch
          }
          className="flex items-center justify-center px-10 py-4 border border-primary rounded-full text-primary hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!mutation.isPending ? (
            <span>Change password</span>
          ) : (
            <Spinner color="red" size={25} />
          )}
        </button>
      </form>
    </div>
  );
}