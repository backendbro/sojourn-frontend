import Image from "next/image";

type CardProps = {
  title: string;
  index: number;
  imageUrl: string;
  list: string[];
};

export default ({ title, index, imageUrl, list }: CardProps) => {
  const colors = ["bg-[#FFF1D7]", "bg-[#FFFFFF]"];
  const currentColor = colors[index % 2];
  const width = index === 1 ? 150 : index === 6 ? 300 : 100;
  const height = index === 1 ? 150 : index === 6 ? 300 : 100;

  const finalTitleCss = index === 6 ? "text-primary" : "";

  return (
    <div
      className={`w-full h-[300px]  py-7 px-10 flex flex-col rounded-[40px] ${currentColor}`}
    >
      <h4 className={`text-[16px] font-[700] ${finalTitleCss}`}>{title}</h4>
      <div className="w-full flex flex-col space-y-4 h-full py-4">
        <div className="w-full relative flex justify-center">
          <span className="absolute top-0 left-2 bg-primary rounded-full p-2 text-white w-[30px] h-[30px] flex items-center justify-center">
            {index}
          </span>
          <Image
            src={imageUrl}
            alt="how_it_works_image"
            width={width}
            height={height}
          />
        </div>
        <ul className="list-image-[url(/assets/imgs/dot.png)]">
          {list.map((item: string, idx: number) => (
            <li className="text-[12px] font-[400]" key={idx}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
