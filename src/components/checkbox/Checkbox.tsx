import styles from "./Checkbox.module.sass";

import { Check as CheckIcon } from "../../assets/svgComponents/Check";

interface ICheckboxProps {
  isChecked: boolean;
  onChangeStatus: Function;
}

export const Checkbox: React.FC<ICheckboxProps> = ({ isChecked, onChangeStatus }) => {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" onChange={() => onChangeStatus(!isChecked)} />
      <span className={`${styles.checkbox_mark} ${isChecked ? styles.active : ""}`} aria-hidden="true">
        {isChecked ? (
          <div className={styles.mark}>
            <CheckIcon fill="#FFFFFF" />
          </div>
        ) : null}
      </span>
    </label>
  );
};
