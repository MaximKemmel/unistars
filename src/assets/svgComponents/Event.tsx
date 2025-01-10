interface IEventProps {
  isActive?: boolean;
}

export const Event: React.FC<IEventProps> = ({ isActive }) => {
  return (
    <>
      {isActive ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.2502 3.56V4.01584L16.7041 4.05787C17.9609 4.17424 18.8398 4.60009 19.4288 5.22534C20.0189 5.8518 20.3661 6.72969 20.461 7.83991C20.4606 7.84 20.4604 7.84 20.4602 7.84H20.4602H3.54185C3.54122 7.83968 3.54042 7.83919 3.5396 7.83853C3.6346 6.72896 3.98181 5.85155 4.57168 5.22534C5.16066 4.60009 6.03955 4.17424 7.29633 4.05787L7.75023 4.01584V3.56V2C7.75023 1.86614 7.86637 1.75 8.00023 1.75C8.13409 1.75 8.25023 1.86614 8.25023 2V3.5V4H8.75023H15.2502H15.7502V3.5V2C15.7502 1.86614 15.8664 1.75 16.0002 1.75C16.1341 1.75 16.2502 1.86614 16.2502 2V3.56Z"
            fill="#202327"
            stroke="#202327"
          />
          <path
            d="M9.52235 18.6004L9.54927 18.5789L9.57298 18.5539C9.83498 18.2773 10 17.8964 10 17.5C10 17.1036 9.83498 16.7227 9.57298 16.4461L9.54927 16.4211L9.52235 16.3996L9.44735 16.3396L9.37235 16.2796L9.3554 16.266L9.33735 16.254C9.25521 16.1992 9.16679 16.1525 9.07213 16.1176C8.98364 16.0764 8.88961 16.0456 8.79064 16.0282C8.50137 15.9718 8.20281 15.999 7.92867 16.1179C7.73162 16.1957 7.58367 16.303 7.45552 16.4184L7.44072 16.4317L7.42702 16.4461C7.16502 16.7227 7 17.1036 7 17.5C7 17.8964 7.16502 18.2773 7.42702 18.5539L7.44072 18.5683L7.45552 18.5816C7.58483 18.698 7.73429 18.8063 7.93401 18.8842C8.10363 18.954 8.29668 19 8.5 19C8.60112 19 8.69236 18.9865 8.75032 18.978C8.75767 18.9769 8.76448 18.9759 8.77071 18.975L8.77073 18.9751L8.7822 18.9732C8.88427 18.9562 8.98114 18.9247 9.07214 18.8824C9.16355 18.8487 9.24913 18.804 9.32888 18.7516C9.38575 18.7162 9.43216 18.6774 9.45883 18.6547C9.47736 18.639 9.48841 18.6293 9.49667 18.6221C9.50657 18.6135 9.51244 18.6084 9.52235 18.6004ZM9.55387 15.073L9.56368 15.0637L9.57298 15.0539C9.83498 14.7773 10 14.3964 10 14C10 13.6036 9.83498 13.2227 9.57298 12.9461L9.57311 12.946L9.56355 12.9364C9.42198 12.7949 9.25426 12.6896 9.06892 12.617C8.50914 12.3796 7.85619 12.5167 7.43645 12.9364L7.43632 12.9363L7.42702 12.9461C7.16502 13.2227 7 13.6036 7 14C7 14.3964 7.16502 14.7773 7.42702 15.0539L7.43632 15.0637L7.44613 15.073C7.72269 15.335 8.10363 15.5 8.5 15.5C8.89637 15.5 9.27731 15.335 9.55387 15.073ZM13.0539 18.573L13.0637 18.5637L13.073 18.5539C13.335 18.2773 13.5 17.8964 13.5 17.5C13.5 17.1036 13.335 16.7227 13.073 16.4461L13.0731 16.446L13.0636 16.4364C12.7704 16.1433 12.3733 16.0125 12 16.0125C11.6267 16.0125 11.2296 16.1433 10.9364 16.4364L10.9363 16.4363L10.927 16.4461C10.665 16.7227 10.5 17.1036 10.5 17.5C10.5 17.8964 10.665 18.2773 10.927 18.5539L10.9363 18.5637L10.9461 18.573C11.2227 18.835 11.6036 19 12 19C12.3964 19 12.7773 18.835 13.0539 18.573ZM13.0223 15.1004L13.0493 15.0789L13.073 15.0539C13.335 14.7773 13.5 14.3964 13.5 14C13.5 13.6036 13.335 13.2227 13.073 12.9461L13.0731 12.946L13.0636 12.9364C12.6438 12.5167 11.9909 12.3796 11.4311 12.617C11.2457 12.6896 11.078 12.7949 10.9364 12.9364L10.9363 12.9363L10.927 12.9461C10.665 13.2227 10.5 13.6036 10.5 14C10.5 14.3964 10.665 14.7773 10.927 15.0539L10.9363 15.0637L10.9461 15.073C11.2227 15.335 11.6036 15.5 12 15.5C12.1011 15.5 12.1924 15.4865 12.2503 15.478C12.2577 15.4769 12.2645 15.4759 12.2707 15.475L12.2707 15.4751L12.2822 15.4732C12.3843 15.4562 12.4811 15.4247 12.5721 15.3824C12.6668 15.3475 12.7552 15.3008 12.8373 15.246L12.8554 15.234L12.8723 15.2204L12.9473 15.1604L13.0223 15.1004ZM16.5539 18.573L16.5637 18.5637L16.573 18.5539C16.835 18.2773 17 17.8964 17 17.5C17 17.1036 16.835 16.7227 16.573 16.4461L16.5731 16.446L16.5636 16.4364C16.2704 16.1433 15.8733 16.0125 15.5 16.0125C15.1267 16.0125 14.7296 16.1433 14.4364 16.4364L14.4363 16.4363L14.427 16.4461C14.165 16.7227 14 17.1036 14 17.5C14 17.8964 14.165 18.2773 14.427 18.5539L14.4363 18.5637L14.4461 18.573C14.7227 18.835 15.1036 19 15.5 19C15.8964 19 16.2773 18.835 16.5539 18.573ZM16.5223 15.1004L16.5493 15.0789L16.573 15.0539C16.835 14.7773 17 14.3964 17 14C17 13.6036 16.835 13.2227 16.573 12.9461L16.5493 12.9211L16.5223 12.8996L16.4473 12.8396L16.3723 12.7796L16.3554 12.766L16.3373 12.754C16.2552 12.6992 16.1668 12.6525 16.0721 12.6176C15.9836 12.5764 15.8896 12.5456 15.7906 12.5282C15.5014 12.4718 15.2028 12.499 14.9287 12.6179C14.7316 12.6957 14.5837 12.803 14.4555 12.9183L14.4407 12.9317L14.427 12.9461C14.165 13.2227 14 13.6036 14 14C14 14.3964 14.165 14.7773 14.427 15.0539L14.4363 15.0637L14.4461 15.073C14.7227 15.335 15.1036 15.5 15.5 15.5C15.5967 15.5 15.6981 15.4854 15.7596 15.4766C15.7635 15.476 15.7672 15.4755 15.7707 15.475L15.7707 15.4751L15.7822 15.4732C15.8843 15.4562 15.9811 15.4247 16.0721 15.3824C16.1668 15.3475 16.2552 15.3008 16.3373 15.246L16.3554 15.234L16.3723 15.2204L16.4473 15.1604L16.5223 15.1004ZM4 10.34H20C20.2739 10.34 20.5 10.5661 20.5 10.84V17C20.5 18.4233 20.1441 19.5331 19.4461 20.2848C18.7543 21.0297 17.6547 21.5 16 21.5H8C6.3453 21.5 5.24565 21.0297 4.5539 20.2848C3.85591 19.5331 3.5 18.4233 3.5 17V10.84C3.5 10.5661 3.72614 10.34 4 10.34Z"
            fill="#202327"
            stroke="#202327"
          />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 2V5"
            stroke="#202327"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 2V5"
            stroke="#202327"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.5 9.09H20.5"
            stroke="#202327"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
            stroke="#202327"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M15.6937 13.7H15.7027" stroke="#202327" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.6937 16.7H15.7027" stroke="#202327" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.9945 13.7H12.0035" stroke="#202327" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.9945 16.7H12.0035" stroke="#202327" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.29529 13.7H8.30427" stroke="#202327" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.29529 16.7H8.30427" stroke="#202327" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );
};
