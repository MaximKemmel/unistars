import React from "react";

interface IChevronProps {
  fill?: string;
}

export const Chevron: React.FC<IChevronProps> = ({ fill }) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.3652 5.613C2.56046 5.41774 2.87704 5.41774 3.0723 5.613L7.41897 9.95967C7.73704 10.2777 8.26046 10.2777 8.57853 9.95967L12.9252 5.613C13.1205 5.41774 13.437 5.41774 13.6323 5.613C13.8276 5.80826 13.8276 6.12484 13.6323 6.32011L9.28564 10.6668C8.57704 11.3754 7.42046 11.3754 6.71186 10.6668L2.3652 6.32011C2.16993 6.12484 2.16993 5.80826 2.3652 5.613Z"
        fill={fill ?? "#8496AE"}
      />
    </svg>
  );
};
