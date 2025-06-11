import { FC } from "react";

const StarIcon: FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 13 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.13181 0.336914L7.95049 4.02137L12.0175 4.61583L9.07467 7.48217L9.76918 11.5315L6.13181 9.61869L2.49444 11.5315L3.18895 7.48217L0.246094 4.61583L4.31312 4.02137L6.13181 0.336914Z"
      fill="#003049"
    />
  </svg>
);

export default StarIcon;
