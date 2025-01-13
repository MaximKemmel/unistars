import styles from "./Checkbox.module.sass";

import { CheckboxState } from "../../enums/local/checkboxState";

import { Check as CheckIcon } from "../../assets/svgComponents/Check";
import MinusIcon from "../../assets/svg/minus.svg";

interface IMultiCheckboxProps {
  checkboxState: CheckboxState;
  onChangeStatus: Function;
}

export const MultiCheckbox: React.FC<IMultiCheckboxProps> = ({ checkboxState, onChangeStatus }) => {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        onChange={() =>
          onChangeStatus(checkboxState === CheckboxState.AllChecked ? CheckboxState.NotChecked : CheckboxState.AllChecked)
        }
      />
      <span
        className={`${styles.checkbox_mark} ${checkboxState != CheckboxState.NotChecked ? styles.active : ""}`}
        aria-hidden="true"
      >
        {checkboxState === CheckboxState.AllChecked ? (
          <div className={styles.mark}>
            <CheckIcon fill="#FFFFFF" />
          </div>
        ) : null}
        {checkboxState === CheckboxState.AnyChecked ? (
          <div className={styles.mark}>
            <img src={MinusIcon} alt="" />
          </div>
        ) : null}
      </span>
    </label>
  );
};
