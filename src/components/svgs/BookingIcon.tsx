import { FC } from "react";

const BookingIcon: FC<{ size?: number; color?: string }> = ({
  size = 24,
  color = "#677073",
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0C8.20435 0 7.44129 0.31607 6.87868 0.87868C6.31607 1.44129 6 2.20435 6 3V4H3C1.34315 4 0 5.34315 0 7V17C0 18.6569 1.34315 20 3 20H7H15H19C20.6569 20 22 18.6569 22 17V7C22 5.34315 20.6569 4 19 4H16V3C16 2.20435 15.6839 1.44129 15.1213 0.87868C14.5587 0.31607 13.7956 0 13 0H9ZM14 4V3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2H9C8.73478 2 8.48043 2.10536 8.29289 2.29289C8.10536 2.48043 8 2.73478 8 3V4H14ZM8 6H14V18H8V6ZM6 6H3C2.44772 6 2 6.44772 2 7V17C2 17.5523 2.44772 18 3 18H6V6ZM16 18V6H19C19.5523 6 20 6.44772 20 7V17C20 17.5523 19.5523 18 19 18H16Z"
        fill={color}
      />
    </svg>
  );
};

export default BookingIcon;
