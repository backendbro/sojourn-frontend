import { OverridableTokenClientConfig } from "@react-oauth/google";
import Image from "next/image";

const GoogleButton: React.FC<{
  onClick: (overrideConfig?: OverridableTokenClientConfig | undefined) => void;
}> = ({ onClick }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="w-full py-7 px-5 border border-primary my-4 rounded-full flex bg-paper ease-in duration-200 hover:bg-pink-50"
    >
      <div className="flex items-center w-4/5 justify-around">
        <Image
          src="/assets/icons/google.svg"
          alt="google icon"
          width={17.64}
          height={18}
        />
        <span>Continue with Google</span>
      </div>
    </button>
  );
};

export default GoogleButton;
