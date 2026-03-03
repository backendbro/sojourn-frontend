// "use client";

// import Image from "next/image";
// import { useState } from "react";

// type ExploreCardProps = {
//   title: string;
//   imageUrl: string;
//   description: string;
// };

// export default ({ title, imageUrl, description }: ExploreCardProps) => {
//   const [clamp, setClamp] = useState(true);

//   return (
//     <div className="w-full min-h-[200px] flex flex-col p-2 items-center space-y-2">
//       <div className="w-full md:w-5/6 h-[250px] md:h-[200px] relative rounded-[30px] overflow-hidden">
//         <Image src={imageUrl} alt={`discover_${title}_image`} fill />
//       </div>
//       <h4 className="text-[16px] font-[700]">{title}</h4>
//       <p
//         className={`text-center w-5/6 leading-[2] text-[12px] font-[400] ${
//           clamp ? "multiline-ellipsis" : ""
//         }`}
//       >
//         {description}
//       </p>
//       {clamp ? (
//         <div
//           className="w-full md:w-5/6 flex items-center space-x-4  justify-center"
//           role="button"
//           onClick={() => {
//             setClamp((prev) => !prev);
//           }}
//         >
//           <hr className="w-1/4" />
//           <span className="text-primary text-[12px] font-[500]">Read more</span>
//           <hr className="w-1/4" />
//         </div>
//       ) : null}
//     </div>
//   );
// };


"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ExploreCardProps = {
  title: string;
  imageUrl: string;
  description: string;
};

export default ({ title, imageUrl, description }: ExploreCardProps) => {
  const [clamp, setClamp] = useState(true);
  const [imgError, setImgError] = useState(false);

  const citySlug = title.toLowerCase().replace(/\s+/g, "");

  return (
    <div className="w-full min-h-[180px] flex flex-col p-1 sm:p-2 items-center space-y-1.5 sm:space-y-2">
      <Link
        href={`/properties?city=${citySlug}&adults=1&children=0`}
        className="w-full h-[150px] sm:h-[180px] md:h-[200px] lg:h-[220px] relative rounded-xl sm:rounded-2xl md:rounded-[30px] overflow-hidden bg-neutral-200 border-[3px] border-white shadow-md group block"
      >
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center text-neutral-500 text-4xl font-bold">
            {title.charAt(0)}
          </div>
        ) : (
          <>
            <Image
              src={imageUrl}
              alt={`${title} - Explore Nigeria`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end p-3">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs font-semibold bg-black/50 px-2 py-1 rounded-full">
                Explore {title} →
              </span>
            </div>
          </>
        )}
      </Link>
      <h4 className="text-[13px] sm:text-[14px] md:text-[16px] font-[700]">{title}</h4>
      <p
        className={`text-center w-full px-1 sm:w-5/6 leading-[1.8] sm:leading-[2] text-[11px] sm:text-[12px] font-[400] ${
          clamp ? "multiline-ellipsis" : ""
        }`}
      >
        {description}
      </p>
      {clamp ? (
        <div
          className="w-full flex items-center space-x-3 sm:space-x-4 justify-center"
          role="button"
          onClick={() => {
            setClamp((prev) => !prev);
          }}
        >
          <hr className="w-1/5 sm:w-1/4" />
          <span className="text-primary text-[11px] sm:text-[12px] font-[500] whitespace-nowrap">Read more</span>
          <hr className="w-1/5 sm:w-1/4" />
        </div>
      ) : null}
    </div>
  );
};
