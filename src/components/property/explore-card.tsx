"use client";

import Image from "next/image";
import { useState } from "react";

type ExploreCardProps = {
  title: string;
  imageUrl: string;
  description: string;
};

export default ({ title, imageUrl, description }: ExploreCardProps) => {
  const [clamp, setClamp] = useState(true);

  return (
    <div className="w-full min-h-[200px] flex flex-col p-2 items-center space-y-2">
      <div className="w-full md:w-5/6 h-[250px] md:h-[200px] relative rounded-[30px] overflow-hidden">
        <Image src={imageUrl} alt={`discover_${title}_image`} fill />
      </div>
      <h4 className="text-[16px] font-[700]">{title}</h4>
      <p
        className={`text-center w-5/6 leading-[2] text-[12px] font-[400] ${
          clamp ? "multiline-ellipsis" : ""
        }`}
      >
        {description}
      </p>
      {clamp ? (
        <div
          className="w-full md:w-5/6 flex items-center space-x-4  justify-center"
          role="button"
          onClick={() => {
            setClamp((prev) => !prev);
          }}
        >
          <hr className="w-1/4" />
          <span className="text-primary text-[12px] font-[500]">Read more</span>
          <hr className="w-1/4" />
        </div>
      ) : null}
    </div>
  );
};
