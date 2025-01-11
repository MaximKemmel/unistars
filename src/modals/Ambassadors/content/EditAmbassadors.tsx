import React, { useState } from "react";

import { UserCard } from "../../../cards/user/UserCard";
import { MultiCheckbox } from "../../../components/checkbox/MultiCheckbox";

import globalStyles from "../../../App.module.sass";
import modalStyles from "../../Modal.module.sass";
import styles from "../AmbassadorsModal.module.sass";

import { CheckboxState } from "../../../enums/checkboxState";

import { Trash as TrashIcon } from "../../../assets/svgComponents/Trash";

interface IEditAmbassadorsProps {
  ambassadors: any[];
  onSave: Function;
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}

export const EditAmbassadors: React.FC<IEditAmbassadorsProps> = ({ ambassadors, onSave, setActiveSection }) => {
  const [currentAmbassadors, setCurrentAmbassadors] = useState(ambassadors);

  return (
    <>
      <div className={styles.ambassadors_container}>
        <div className={styles.ambassadors_content}>
          <div className={styles.ambassadors_selector}>
            <div className={styles.checkbox}>
              <MultiCheckbox
                checkboxState={
                  currentAmbassadors.filter((item) => item.isChecked).length === 0
                    ? CheckboxState.NotChecked
                    : currentAmbassadors.filter((item) => item.isChecked).length === currentAmbassadors.length
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
            <div className={styles.ambassador_item} key={index}>
              <UserCard
                userItem={item}
                isCheckedItem={true}
                onCheckedChange={(status) =>
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
      </div>
      <div className={modalStyles.actions}>
        <div />
        <div className={modalStyles.buttons}>
          <button className={`${globalStyles.small} ${globalStyles.inverted}`} type="button" onClick={() => setActiveSection(0)}>
            <span>Отменить</span>
          </button>
          <button className={globalStyles.small} type="button" onClick={() => onSave()}>
            <span>Сохранить изменения</span>
          </button>
        </div>
      </div>
    </>
  );
};
