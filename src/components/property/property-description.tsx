import { Bath, Bed, CookingPot, Sofa } from "lucide-react";

export default ({ type }: { type: string }) => {
  const TownHouse = () => {
    return (
      <div className="w-full flex flex-col space-y-6">
        <div className="w-full border-b-2 border-b-secondary py-2">
          <h3 className="text-xl font-[600] capitalize m-0">{type}</h3>
        </div>
        <div className="flex  space-x-2">
          <Bed size={20} />
          <p className="text-sm">
            Cozy private bedroom with ample natural light for a restful stay.
          </p>
        </div>
        <div className="flex  space-x-2">
          <CookingPot size={20} />
          <p className="text-sm">
            Modern kitchen with updated appliances for easy meal prep
          </p>
        </div>
        <div className="flex  space-x-2">
          <Bath size={20} />
          <p className="text-sm">
            Clean, well-lit bathroom with a spacious shower, fresh towels, and
            essential toiletries.
          </p>
        </div>
        <div className="flex  space-x-2">
          <Sofa size={20} />
          <p className="text-sm">
            Spacious living room with comfortable seating and plenty of natural
            light.
          </p>
        </div>
      </div>
    );
  };

  return <TownHouse />;
};
