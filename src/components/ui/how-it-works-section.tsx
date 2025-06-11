import { HOW_IT_WORKS } from "@/constants";
import HowItWorksCard from "../property/how-it-works-card";

export default () => {
  return (
    <div className="w-full flex flex-col max-w-[1400px]  mx-auto items-center">
      <h3 className="font-[500] text-[#310000] mb-10">How it works</h3>
      <div className="w-full md:w-5/6 px-5 grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {HOW_IT_WORKS.map((hiw, idx: number) => {
          return (
            <HowItWorksCard
              key={idx}
              title={hiw.title}
              list={hiw.list}
              imageUrl={hiw.imageUrl}
              index={idx + 1}
            />
          );
        })}
      </div>
    </div>
  );
};
