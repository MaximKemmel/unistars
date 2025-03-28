import React from "react";

interface IPauseProps {
  isActive?: boolean;
}

export const Pause: React.FC<IPauseProps> = ({ isActive }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.1 12.74V3.26C7.1 2.36 6.72 2 5.76 2H3.34C2.38 2 2 2.36 2 3.26V12.74C2 13.64 2.38 14 3.34 14H5.76C6.72 14 7.1 13.64 7.1 12.74Z"
        fill={isActive ? "#DC6803" : "#FFFFFF"}
      />
      <path
        d="M13.9984 12.74V3.26C13.9984 2.36 13.6184 2 12.6584 2H10.2384C9.2851 2 8.89844 2.36 8.89844 3.26V12.74C8.89844 13.64 9.27844 14 10.2384 14H12.6584C13.6184 14 13.9984 13.64 13.9984 12.74Z"
        fill={isActive ? "#DC6803" : "#FFFFFF"}
      />
    </svg>
  );
};
