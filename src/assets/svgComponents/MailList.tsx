import React from "react";

interface IMailListProps {
  isActive?: boolean;
}

export const MailList: React.FC<IMailListProps> = ({ isActive }) => {
  return (
    <>
      {isActive ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.00065 10.8333C2.70065 10.8333 0.833984 12.6916 0.833984 14.9999C0.833984 17.3083 2.70065 19.1666 5.00065 19.1666C7.30065 19.1666 9.16732 17.2999 9.16732 14.9999C9.16732 12.6999 7.30898 10.8333 5.00065 10.8333ZM3.30065 13.2999H5.00065C5.31732 13.2999 5.56732 13.5583 5.56732 13.8666C5.56732 14.1749 5.31732 14.4333 5.00065 14.4333H3.30065C2.98398 14.4333 2.73398 14.1749 2.73398 13.8666C2.73398 13.5583 2.98398 13.2999 3.30065 13.2999ZM6.70065 16.6999H3.30065C2.98398 16.6999 2.73398 16.4416 2.73398 16.1333C2.73398 15.8249 2.99232 15.5666 3.30065 15.5666H6.70898C7.02565 15.5666 7.27565 15.8249 7.27565 16.1333C7.27565 16.4416 7.01732 16.6999 6.70065 16.6999Z" fill="#14171A"/>
          <path d="M14.166 2.5H5.83268C3.33268 2.5 1.66602 3.75 1.66602 6.66667V9.28333C1.66602 9.89167 2.29102 10.275 2.84935 10.0333C3.76602 9.63333 4.80768 9.48333 5.89935 9.65833C8.08268 10.0167 9.86602 11.7417 10.3077 13.9083C10.4327 14.5417 10.4493 15.1583 10.366 15.75C10.2993 16.2417 10.6993 16.675 11.191 16.675H14.166C16.666 16.675 18.3327 15.425 18.3327 12.5083V6.66667C18.3327 3.75 16.666 2.5 14.166 2.5ZM14.5577 7.15833L11.9493 9.24167C11.3993 9.68333 10.6993 9.9 9.99935 9.9C9.29935 9.9 8.59102 9.68333 8.04935 9.24167L5.44102 7.15833C5.17435 6.94167 5.13268 6.54167 5.34102 6.275C5.55768 6.00833 5.94935 5.95833 6.21602 6.175L8.82435 8.25833C9.45768 8.76667 10.5327 8.76667 11.166 8.25833L13.7744 6.175C14.041 5.95833 14.441 6 14.6493 6.275C14.866 6.54167 14.8243 6.94167 14.5577 7.15833Z" fill="#14171A"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.66602 7.08341C1.66602 4.16675 3.33268 2.91675 5.83268 2.91675H14.166C16.666 2.91675 18.3327 4.16675 18.3327 7.08341V12.9167C18.3327 15.8334 16.666 17.0834 14.166 17.0834H5.83268" stroke="#14171A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M14.1673 7.5L11.559 9.58333C10.7006 10.2667 9.29231 10.2667 8.43398 9.58333L5.83398 7.5" stroke="#14171A" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1.66602 13.75H6.66602" stroke="#14171A" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1.66602 10.4167H4.16602" stroke="#14171A" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </>
  );
};
