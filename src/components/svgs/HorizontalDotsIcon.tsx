import { FC } from "react";

const HorizontalDotsIcon: FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="14" cy="2" r="2" transform="rotate(90 14 2)" fill="#8F989B" />
    <circle cx="8" cy="2" r="2" transform="rotate(90 8 2)" fill="#8F989B" />
    <circle cx="2" cy="2" r="2" transform="rotate(90 2 2)" fill="#8F989B" />
  </svg>
);

export default HorizontalDotsIcon;
