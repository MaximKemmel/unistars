import styles from "./Checkbox.module.sass";

import CheckIcon from "../../assets/svg/check-mark.svg";

interface ICheckboxProps {
  isChecked: boolean;
  onChangeStatus: Function;
}

const Checkbox: React.FC<ICheckboxProps> = ({ isChecked, onChangeStatus }) => {
  return (
    <label className={styles.checkbox}>
      <input type="checkbox" onChange={() => onChangeStatus(!isChecked)} />
      <span className={`${styles.checkbox_mark} ${isChecked ? styles.active : ""}`} aria-hidden="true">
        {isChecked ? (
          <div className={styles.mark}>
            <img className={styles.icon} src={CheckIcon} alt="" />
          </div>
        ) : null}
      </span>
    </label>
  );
};
export default Checkbox;
