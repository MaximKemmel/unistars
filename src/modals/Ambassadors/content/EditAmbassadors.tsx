import { useState } from "react";

import { UserCard } from "../../../cards/user/UserCard";
import { Checkbox } from "../../../components/checkbox/Checkbox";
import { MultiCheckbox } from "../../../components/checkbox/MultiCheckbox";

import globalStyles from "../../../App.module.sass";
import modalStyles from "../../Modal.module.sass";
import styles from "../AmbassadorsModal.module.sass";

import { CheckboxState } from "../../../enums/checkboxState";

import {Trash as TrashIcon} from "../../../assets/svgComponents/Trash";

interface IEditAmbassadorsProps {
  ambassadors: any[];
  onSave: Function;
}

export const EditAmbassadors: React.FC<IEditAmbassadorsProps> = ({
  ambassadors,
  onSave,
}) => {
  const [currentAmbassadors, setCurrentAmbassadors] = useState(ambassadors);

  return (
    <>
      <div className={styles.ambassadors_content}>
        <div className={styles.ambassadors_selector}>
          <div className={styles.checkbox}>
            <MultiCheckbox
              checkboxState={
                currentAmbassadors.filter((item) => item.isChecked).length === 0
                  ? CheckboxState.NotChecked
                  : currentAmbassadors.filter((item) => item.isChecked)
                      .length === currentAmbassadors.length
                  ? CheckboxState.AllChecked
                  : CheckboxState.AnyChecked
              }
              onChangeStatus={(status) =>
                setCurrentAmbassadors(
                  currentAmbassadors.map((tmpItem) => {
                    return {
                      ...tmpItem,
                      isChecked: status === CheckboxState.AllChecked,
                    };
                  })
                )
              }
            />
          </div>
          Выбрать все
        </div>
        {currentAmbassadors.map((item, index) => (
          <div className={styles.requested_ambassador} key={index}>
            <div className={styles.checkbox}>
              <Checkbox
                isChecked={item.isChecked}
                onChangeStatus={(status) =>
                  setCurrentAmbassadors(
                    currentAmbassadors.map((tmpItem) => {
                      if (tmpItem.id === item.id) {
                        return { ...tmpItem, isChecked: status };
                      } else {
                        return tmpItem;
                      }
                    })
                  )
                }
              />
            </div>
            <div className={styles.ambassador_item}>
              <UserCard userItem={item} />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.bottom_actions}>
        <div className={styles.selected_count}>{`${
          currentAmbassadors.filter((item) => item.isChecked).length
        } выбрано`}</div>
        <button
          className={`${globalStyles.inverted} ${globalStyles.small} ${globalStyles.delete}`}
          type="button"
          disabled={currentAmbassadors.filter((item) => item.isChecked).length === 0}
          onClick={() => onSave()}
        >
          <TrashIcon isDisabled={currentAmbassadors.filter((item) => item.isChecked).length === 0} />
          Удалить
        </button>
      </div>
      <div className={modalStyles.actions}>
        <div />
        <div className={styles.buttons}>
          <button
            className={`${globalStyles.small} ${globalStyles.inverted}`}
            type="button"
            onClick={() => onSave()}
          >
            <span>Отменить</span>
          </button>
          <button
            className={globalStyles.small}
            type="button"
            onClick={() => onSave()}
          >
            <span>Сохранить изменения</span>
          </button>
        </div>
      </div>
    </>
  );
};
