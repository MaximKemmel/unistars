interface IHomeProps {
  isActive?: boolean;
}

export const Home: React.FC<IHomeProps> = ({ isActive }) => {
  return (
    <>
      {isActive ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.0402 6.82L14.2802 2.79C12.7102 1.69 10.3002 1.75 8.79023 2.92L3.78023 6.83C2.78023 7.61 1.99023 9.21 1.99023 10.47V17.37C1.99023 19.92 4.06023 22 6.61023 22H17.3902C19.9402 22 22.0102 19.93 22.0102 17.38V10.6C22.0102 9.25 21.1402 7.59 20.0402 6.82ZM12.7502 18C12.7502 18.41 12.4102 18.75 12.0002 18.75C11.5902 18.75 11.2502 18.41 11.2502 18V15C11.2502 14.59 11.5902 14.25 12.0002 14.25C12.4102 14.25 12.7502 14.59 12.7502 15V18Z"
            fill="#202327"
          />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 18V15" stroke="#202327" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M10.0703 2.82L3.14027 8.37C2.36027 8.99 1.86027 10.3 2.03027 11.28L3.36027 19.24C3.60027 20.66 4.96027 21.81 6.40027 21.81H17.6003C19.0303 21.81 20.4003 20.65 20.6403 19.24L21.9703 11.28C22.1303 10.3 21.6303 8.99 20.8603 8.37L13.9303 2.83C12.8603 1.97 11.1303 1.97 10.0703 2.82Z"
            stroke="#202327"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
    </>
  );
};
