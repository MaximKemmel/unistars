import React, { useState } from "react";
import {useTranslation} from "react-i18next";

import { UserCard } from "../../../cards/user/UserCard";
import { MultiCheckbox } from "../../../components/checkbox/MultiCheckbox";

import globalStyles from "../../../App.module.sass";
import modalStyles from "../../Modal.module.sass";
import styles from "../AmbassadorsModal.module.sass";

import { CheckboxState } from "../../../enums/local/checkboxState";

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
  const { t } = useTranslation();
  const [currentRequests, setCurrentRequests] = useState(requestedAmbassadors);

  return (
    <>
      <div className={styles.ambassadors_container}>
        <div className={styles.ambassadors_content}>
          <div className={styles.ambassadors_selector}>
            <div className={styles.checkbox}>
              <MultiCheckbox
                checkboxState={
                  currentRequests.filter((item) => item.isChecked).length === 0
                    ? CheckboxState.NotChecked
                    : currentRequests.filter((item) => item.isChecked).length === currentRequests.length
                    ? CheckboxState.AllChecked
                    : CheckboxState.AnyChecked
                }
                onChangeStatus={(status: CheckboxState) =>
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
            {t("global.select_all")}
          </div>
          {currentRequests.map((item, index) => (
            <div className={styles.ambassador_item} key={index}>
              <UserCard
                userItem={item}
                isCheckedItem={true}
                isRequestItem={true}
                onCheckedChange={(status: boolean) =>
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
                onCancelRequest={() => onAmbassadorCanceled([item])}
                onAcceptRequest={() => onAmbassadorAccepted([item])}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={modalStyles.actions}>
        <div className={styles.selected_count}>{`${currentRequests.filter((item) => item.isChecked).length} ${t("global.selected")}`}</div>
        <div className={modalStyles.buttons}>
          <button
            className={`${globalStyles.small} ${globalStyles.inverted}`}
            type="button"
            disabled={currentRequests.filter((item) => item.isChecked).length === 0}
            onClick={() => onAmbassadorCanceled(currentRequests.filter((item) => item.isChecked))}
          >
            <span>{t("ambassadors.reject")}</span>
          </button>
          <button
            className={globalStyles.small}
            type="button"
            disabled={currentRequests.filter((item) => item.isChecked).length === 0}
            onClick={() => onAmbassadorAccepted(currentRequests.filter((item) => item.isChecked))}
          >
            <span>{t("ambassadors.approve")}</span>
          </button>
        </div>
      </div>
    </>
  );
};
