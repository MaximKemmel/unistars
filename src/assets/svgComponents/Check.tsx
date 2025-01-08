interface ICheckProps {
  fill?: string;
}

export const Check: React.FC<ICheckProps> = ({ fill }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.4057 4.22436C14.6499 4.44828 14.6664 4.82782 14.4425 5.07209L7.10919 13.0721C6.9986 13.1927 6.84354 13.263 6.67993 13.2665C6.51632 13.2701 6.35835 13.2066 6.24263 13.0909L2.24263 9.09092C2.00832 8.8566 2.00832 8.4767 2.24263 8.24239C2.47695 8.00808 2.85684 8.00808 3.09116 8.24239L6.64805 11.7993L13.5579 4.26122C13.7819 4.01695 14.1614 4.00045 14.4057 4.22436Z"
        fill={fill ?? "#202327"}
      />
    </svg>
  );
};
