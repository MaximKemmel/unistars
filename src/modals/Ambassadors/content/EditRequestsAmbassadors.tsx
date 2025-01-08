import { useState } from "react";

import { UserCard } from "../../../cards/user/UserCard";
import { Checkbox } from "../../../components/checkbox/Checkbox";
import { MultiCheckbox } from "../../../components/checkbox/MultiCheckbox";

import globalStyles from "../../../App.module.sass";
import modalStyles from "../../Modal.module.sass";
import styles from "../AmbassadorsModal.module.sass";

import { CheckboxState } from "../../../enums/checkboxState";

import { Close as CloseIcon } from "../../../assets/svgComponents/Close";
import { Check as CheckIcon } from "../../../assets/svgComponents/Check";

interface IEditRequestsAmbassadorsProps {
  requestedAmbassadors: any[];
  onAmbassadorAccepted: Function;
  onAmbassadorCanceled: Function;
}

export const EditRequestsAmbassadors: React.FC<
  IEditRequestsAmbassadorsProps
> = ({ requestedAmbassadors, onAmbassadorAccepted, onAmbassadorCanceled }) => {
  const [currentRequests, setCurrentRequests] = useState(requestedAmbassadors);

  return (
    <>
      <div className={styles.ambassadors_content}>
        <div className={styles.ambassadors_selector}>
          <div className={styles.checkbox}>
            <MultiCheckbox
              checkboxState={
                currentRequests.filter((item) => item.isChecked).length === 0
                  ? CheckboxState.NotChecked
                  : currentRequests.filter((item) => item.isChecked).length ===
                    currentRequests.length
                  ? CheckboxState.AllChecked
                  : CheckboxState.AnyChecked
              }
              onChangeStatus={(status) =>
                setCurrentRequests(
                  currentRequests.map((tmpItem) => {
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
        {currentRequests.map((item, index) => (
          <div className={styles.requested_ambassador} key={index}>
            <div className={styles.checkbox}>
              <Checkbox
                isChecked={item.isChecked}
                onChangeStatus={(status) =>
                  setCurrentRequests(
                    currentRequests.map((tmpItem) => {
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
            <div className={styles.ambassador_item_actions}>
              <div
                className={`${styles.button} ${styles.cancel}`}
                onClick={() => onAmbassadorCanceled([item])}
              >
                <CloseIcon fill="#FF2941" />
              </div>
              <div
                className={`${styles.button} ${styles.accept}`}
                onClick={() => onAmbassadorAccepted([item])}
              >
                <CheckIcon fill="#FFFFFF" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={modalStyles.actions}>
        <div className={styles.selected_count}>{`${
          currentRequests.filter((item) => item.isChecked).length
        } выбрано`}</div>
        <div className={styles.buttons}>
          <button
            className={`${globalStyles.small} ${globalStyles.inverted}`}
            type="button"
            disabled={
              currentRequests.filter((item) => item.isChecked).length === 0
            }
            onClick={() =>
              onAmbassadorCanceled(
                currentRequests.filter((item) => item.isChecked)
              )
            }
          >
            <span>Отклонить</span>
          </button>
          <button
            className={globalStyles.small}
            type="button"
            disabled={
              currentRequests.filter((item) => item.isChecked).length === 0
            }
            onClick={() =>
              onAmbassadorAccepted(
                currentRequests.filter((item) => item.isChecked)
              )
            }
          >
            <span>Одобрить</span>
          </button>
        </div>
      </div>
    </>
  );
};
