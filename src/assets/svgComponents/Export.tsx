interface IExportProps {
  isDisabled?: boolean;
}

export const Export: React.FC<IExportProps> = ({ isDisabled }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.9605 5.93335C13.3605 6.14002 14.3405 7.37335 14.3405 10.0733V10.16C14.3405 13.14 13.1471 14.3334 10.1671 14.3334H5.82714C2.84714 14.3334 1.65381 13.14 1.65381 10.16V10.0733C1.65381 7.39335 2.62048 6.16002 4.98048 5.94002"
        stroke={isDisabled ? "#68778D" : "#FFFFFF"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 10V2.41333" stroke={isDisabled ? "#68778D" : "#FFFFFF"} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M10.2338 3.89999L8.00042 1.66666L5.76709 3.89999"
        stroke={isDisabled ? "#68778D" : "#FFFFFF"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
