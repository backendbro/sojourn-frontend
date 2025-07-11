import { FC } from "react";

const PlusIcon: FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 1C10 0.447715 9.55229 0 9 0C8.44771 0 8 0.447715 8 1V8H1C0.447715 8 0 8.44771 0 9C0 9.55229 0.447715 10 1 10H8V17C8 17.5523 8.44771 18 9 18C9.55229 18 10 17.5523 10 17V10H17C17.5523 10 18 9.55229 18 9C18 8.44771 17.5523 8 17 8H10V1Z"
      fill="#2B2929"
    />
  </svg>
);

export default PlusIcon;
