import { useEffect, useState } from "react";

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

export const EditRequestsAmbassadors: React.FC<IEditRequestsAmbassadorsProps> = ({
  requestedAmbassadors,
  onAmbassadorAccepted,
  onAmbassadorCanceled,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [checkStatuses, setCheckStatuses] = useState<any[]>();

  useEffect(() => {
    setCheckStatuses(
      Array(requestedAmbassadors.length)
        .fill(false)
        .map((_, index) => {
          return {
            id: requestedAmbassadors[index],
            isChecked: false,
          };
        })
    );
    console.log(checkStatuses);
  }, [requestedAmbassadors]);

  return (
    <>
      <div className={styles.ambassadors_content}>
        <div className={styles.ambassadors_selector}>
          <div className={styles.checkbox}>
            <MultiCheckbox
              checkboxState={isChecked ? CheckboxState.AnyChecked : CheckboxState.AllChecked}
              onChangeStatus={(status) => setIsChecked(status)}
            />
          </div>
          Выбрать все
        </div>
        {requestedAmbassadors.map((item, index) => (
          <div className={styles.requested_ambassador} key={index}>
            <div className={styles.checkbox}>
              <Checkbox
                isChecked={checkStatuses!.find((tmpItem) => tmpItem.id === item.id)!.isChecked}
                onChangeStatus={(status) =>
                  setCheckStatuses(
                    checkStatuses!.map((tmpItem) => {
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
              <div className={`${styles.button} ${styles.cancel}`} onClick={() => onAmbassadorCanceled([item])}>
                <CloseIcon fill="#FF2941" />
              </div>
              <div className={`${styles.button} ${styles.accept}`} onClick={() => onAmbassadorAccepted([item])}>
                <CheckIcon fill="#FFFFFF" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={modalStyles.actions}>
        <div />
        <button className={`${globalStyles.small} ${globalStyles.inverted}`} type="button">
          <span>Редактировать</span>
        </button>
      </div>
    </>
  );
};
