import { useState } from "react";

import { UserCard } from "../../../cards/user/UserCard";
import { MultiCheckbox } from "../../../components/checkbox/MultiCheckbox";

import globalStyles from "../../../App.module.sass";
import modalStyles from "../../Modal.module.sass";
import styles from "../WorkersModal.module.sass";

import { CheckboxState } from "../../../enums/checkboxState";

import { Trash as TrashIcon } from "../../../assets/svgComponents/Trash";

interface IEditWorkersProps {
  workers: any[];
  onSave: Function;
}

export const EditWorkers: React.FC<IEditWorkersProps> = ({ workers, onSave }) => {
  const [currentWorkers, setCurrentWorkers] = useState(workers);

  return (
    <>
      <div className={styles.workers_container}>
        <div className={styles.workers_content}>
          <div className={styles.workers_selector}>
            <div className={styles.checkbox}>
              <MultiCheckbox
                checkboxState={
                  currentWorkers.filter((item) => item.isChecked).length === 0
                    ? CheckboxState.NotChecked
                    : currentWorkers.filter((item) => item.isChecked).length === currentWorkers.length
                    ? CheckboxState.AllChecked
                    : CheckboxState.AnyChecked
                }
                onChangeStatus={(status) =>
                  setCurrentWorkers(
                    currentWorkers.map((tmpItem) => {
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
          {currentWorkers.map((item, index) => (
            <div className={styles.worker_item} key={index}>
              <UserCard
                userItem={item}
                isCheckedItem={true}
                onCheckedChange={(status) =>
                  setCurrentWorkers(
                    currentWorkers.map((tmpItem) => {
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
          <div className={styles.selected_count}>{`${currentWorkers.filter((item) => item.isChecked).length} выбрано`}</div>
          <button
            className={`${globalStyles.inverted} ${globalStyles.small} ${globalStyles.delete}`}
            type="button"
            disabled={currentWorkers.filter((item) => item.isChecked).length === 0}
            onClick={() => onSave()}
          >
            <TrashIcon isDisabled={currentWorkers.filter((item) => item.isChecked).length === 0} />
            Удалить
          </button>
        </div>
      </div>
      <div className={modalStyles.actions}>
        <div />
        <div className={modalStyles.buttons}>
          <button className={`${globalStyles.small} ${globalStyles.inverted}`} type="button" onClick={() => onSave()}>
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
