import Image from "next/image";

const FacebookButton = () => {
  return (
    <button className="w-full py-7 px-5 border border-primary my-4 rounded-full flex bg-paper ease-in duration-200 hover:bg-pink-50">
      <div className="flex items-center w-4/5 justify-around">
        <Image
          src="/assets/icons/facebook.svg"
          alt="google icon"
          width={17.64}
          height={18}
        />
        <span>Login with Facebook</span>
      </div>
    </button>
  );
};

export default FacebookButton;
