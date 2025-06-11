type DiscoverPropertyCardProps = {
  bgImage: string;
  type: string;
  heading: string;
  list?: { icon: any; text: string }[];
};

export default ({
  bgImage,
  type,
  heading,
  list,
}: DiscoverPropertyCardProps) => {
  const bgCss = `w-full bg-cover bg-no-repeat ${bgImage}`;
  return (
    <div
      className={`min-h-[500px] md:min-h-[550px] flex flex-col relative justify-between relative overflow-hidden rounded-2xl ${bgCss}`}
    >
      <div className="w-full flex items-center p-10">
        <div className="p-1 flex flex-col justify-center bg-primary discover-blur-2 opacity-90">
          <span className="text-white font-[700] text-[14px] isolate capitalize">
            {type}
          </span>
          <span className="text-white font-[400] text-[12px] isolate">
            Apartments
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col absolute top-[340px] md:top-[400px] h-[70px] left-0 z-[999] px-5">
        <h4 className="font-[700] text-white text-[16px] ">{heading}</h4>
        <ul className="w-full mt-2 space-y-2">
          {list?.map((item: { icon: any; text: string }, idx: number) => {
            return (
              <li
                key={idx}
                className="w-full flex items-center space-x-2 text-xs text-white font-[400]"
              >
                <item.icon size={20} />
                <span className="text-[14px]">{item.text}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full h-[130px] bg-[#C40A0D] opacity-50 discover-blur flex flex-col"></div>
    </div>
  );
};
