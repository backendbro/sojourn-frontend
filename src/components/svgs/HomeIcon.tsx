import { FC } from "react";

const HomeIcon: FC<{ size?: number }> = ({ size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0,0,256,256"
      width={size}
      height={size}
    >
      <g
        fill="#FFFFFF"
        fillRule="nonzero"
        stroke="none"
        strokeWidth="1"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        strokeDasharray=""
        strokeDashoffset="0"
        fontFamily="none"
        fontWeight="none"
        fontSize="none"
        textAnchor="none"
        style={{
          mixBlendMode: "normal",
        }}
      >
        <g transform="scale(8.53333,8.53333)">
          <path d="M15,2c-0.26138,0.00002 -0.51237,0.10237 -0.69922,0.28516l-10.9082,8.92187c-0.0126,0.00947 -0.02497,0.01924 -0.03711,0.0293l-0.03711,0.03125v0.00195c-0.20274,0.18887 -0.31802,0.45339 -0.31836,0.73047c0,0.55228 0.44772,1 1,1h1v11c0,1.105 0.895,2 2,2h16c1.105,0 2,-0.895 2,-2v-11h1c0.55228,0 1,-0.44772 1,-1c0.0002,-0.27776 -0.11513,-0.54309 -0.31836,-0.73242l-0.01562,-0.01172c-0.02194,-0.01988 -0.04475,-0.03878 -0.06836,-0.05664l-1.59766,-1.30664v-3.89258c0,-0.552 -0.448,-1 -1,-1h-1c-0.552,0 -1,0.448 -1,1v1.43945l-6.32227,-5.17187c-0.18422,-0.17125 -0.42621,-0.26679 -0.67773,-0.26758zM18,15h4v8h-4z"></path>
        </g>
      </g>
    </svg>
  );
};

export default HomeIcon;
