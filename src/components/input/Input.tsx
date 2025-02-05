import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";

import styles from "./Input.module.sass";

import SearchIcon from "../../assets/svg/search.svg";
import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import { Eye as EyeIcon } from "../../assets/svgComponents/Eye";

interface IInputProps {
  value: string;
  onChange: Function;
  placeholder: string;
  type: string;
  maxLength?: number;
  isSearch?: boolean;
  isRequired?: boolean;
  isWrong?: boolean;
  isPassword?: boolean;
}

export const Input: React.FC<IInputProps> = ({
  value,
  onChange,
  placeholder,
  type,
  maxLength,
  isSearch,
  isRequired,
  isWrong,
  isPassword,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    setIsPasswordVisible(false);
  }, []);

  return (
    <div
      className={`${styles.input_container} ${isWrong ? styles.wrong : ""} ${isSearch ? styles.search : ""} ${isPassword ? styles.password : ""}`}
    >
      {type !== "phone" ? (
        <>
          <input
            placeholder={placeholder}
            onChange={(event) => onChange(event.target.value)}
            value={value}
            type={isPassword && !isPasswordVisible ? "password" : type}
            required={isRequired}
            maxLength={maxLength ?? 1000000}
            minLength={isPassword ? 3 : 0}
          />
          {isSearch ? (
            <img className={styles.search_icon} src={SearchIcon} alt="" />
          ) : null}
          {isSearch && value.length > 0 ? (
            <div className={styles.clear} onClick={() => onChange("")}>
              <CloseIcon fill="#68778D" />
            </div>
          ) : null}
          {isPassword ? (
            <div
              className={styles.eye_icon}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <EyeIcon isOpened={!isPasswordVisible} />
            </div>
          ) : null}
        </>
      ) : (
        <InputMask
          placeholder={placeholder}
          type="text"
          mask="(999) 999-99-99"
          maskChar={""}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
    </div>
  );
};
