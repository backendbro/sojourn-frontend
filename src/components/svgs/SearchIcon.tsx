import { FC } from "react";

const SearchIcon: FC<{ size?: number }> = ({ size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 11C4 7.13401 7.13401 4 11 4C14.866 4 18 7.13401 18 11C18 12.8873 17.2531 14.6002 16.0388 15.8591C16.0056 15.8848 15.9737 15.9129 15.9433 15.9433C15.9129 15.9737 15.8848 16.0056 15.8591 16.0388C14.6002 17.2531 12.8873 18 11 18C7.13401 18 4 14.866 4 11ZM16.6177 18.0319C15.078 19.2635 13.125 20 11 20C6.02944 20 2 15.9706 2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 13.125 19.2635 15.078 18.0319 16.6177L21.7075 20.2933C22.098 20.6838 22.098 21.317 21.7075 21.7075C21.317 22.098 20.6838 22.098 20.2933 21.7075L16.6177 18.0319Z"
        fill="#2C2C2C"
      />
    </svg>
  );
};

export default SearchIcon;
