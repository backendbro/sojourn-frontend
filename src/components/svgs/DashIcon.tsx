import { FC } from "react";

const DashIcon: FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 24H32"
      stroke="#2C2C2C"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DashIcon;
