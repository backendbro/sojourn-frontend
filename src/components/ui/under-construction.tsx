import Image from "next/image";

export default () => {
  return (
    <div className="w-full flex flex-col items-center p-3">
      <Image
        src="/assets/imgs/coming-soon.svg"
        alt="coming soon"
        width={200}
        height={200}
        priority
      />
      <h3 className="text-xl font-semibold">Under construction</h3>
    </div>
  );
};
