import React from "react";

import styles from "./Textarea.module.sass";

interface ITextareaProps {
  value: string;
  onChange: Function;
  placeholder: string;
  maxLength?: number;
  isRequired?: boolean;
  isWrong?: boolean;
}

export const Textarea: React.FC<ITextareaProps> = ({
  value,
  onChange,
  placeholder,
  maxLength,
  isRequired,
  isWrong,
}) => {
  return (
    <div
      className={`${styles.textarea_container} ${isWrong ? styles.wrong : ""}`}
    >
      <textarea
        placeholder={placeholder}
        required={isRequired}
        onChange={(event) => onChange(event.target.value)}
        value={value}
        maxLength={maxLength ?? 1000000}
      />
    </div>
  );
};
