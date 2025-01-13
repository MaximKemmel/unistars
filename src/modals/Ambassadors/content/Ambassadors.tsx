import React, { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";

import { UserCard } from "../../../cards/user/UserCard";

import globalStyles from "../../../App.module.sass";
import modalStyles from "../../Modal.module.sass";
import styles from "../AmbassadorsModal.module.sass";

import NothingFound from "../../../assets/svg/nothing-found.svg";

interface IAmbassadorsProps {
  ambassadors: any[];
  requestedAmbassadors: any[];
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}

export const Ambassadors: React.FC<IAmbassadorsProps> = ({ ambassadors, requestedAmbassadors, setActiveSection }) => {
  const { t } = useTranslation();
  const [currentAmbassadors, setCurrentAmbassadors] = useState(ambassadors);
  const [currentRequestedAmbassadors, setCurrentRequestedAmbassadors] = useState(requestedAmbassadors);

  useEffect(() => {
    setCurrentAmbassadors(ambassadors);
    setCurrentRequestedAmbassadors(requestedAmbassadors);
  }, []);

  return (
    <>
      <div className={styles.ambassadors_container}>
        <div className={styles.ambassadors_content}>
          {ambassadors.length + requestedAmbassadors.length === 0 ? (
            <div className={modalStyles.empty_container}>
              <img className={modalStyles.empty_image} src={NothingFound} alt="" />
              <div className={modalStyles.empty_info}>
                <div className={modalStyles.empty_title}>{t("global.nothing_not_found")}</div>
                <div className={modalStyles.empty_description}>{t("ambassadors.don_t_have_ambassadors")}</div>
              </div>
            </div>
          ) : (
            <>
              {currentRequestedAmbassadors.length > 0 ? (
                <>
                  <div className={styles.head}>
                    <h4>
                      Заявки<span>{currentRequestedAmbassadors.length}</span>
                    </h4>
                    {currentRequestedAmbassadors.length > 3 ? (
                      <div className={styles.head_action} onClick={() => setActiveSection(2)}>
                        {t("global.show_all")}
                      </div>
                    ) : null}
                  </div>
                  {currentRequestedAmbassadors
                    .slice(0, currentRequestedAmbassadors.length > 3 ? 3 : currentRequestedAmbassadors.length)
                    .map((item, index) => (
                      <div className={styles.ambassador_item} key={index}>
                        <UserCard
                          userItem={item}
                          isRequestItem={true}
                          onCancelRequest={() =>
                            setCurrentRequestedAmbassadors(
                              currentRequestedAmbassadors.filter((ambassador) => ambassador.id !== item.id)
                            )
                          }
                          onAcceptRequest={() => {
                            setCurrentAmbassadors([...currentAmbassadors, item]);
                            setCurrentRequestedAmbassadors(
                              currentRequestedAmbassadors.filter((ambassador) => ambassador.id !== item.id)
                            );
                          }}
                        />
                      </div>
                    ))}
                  <div className={styles.ambassadors_separator} />
                </>
              ) : null}
              <h4>
                {t("ambassadors.ambassadors")}<span>{currentAmbassadors.length}</span>
              </h4>
              {currentAmbassadors.map((item, index) => (
                <div className={styles.ambassador_item} key={index}>
                  <UserCard userItem={item} />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {ambassadors.length > 0 ? (
        <div className={modalStyles.actions}>
          <div />
          <button
            className={`${globalStyles.small} ${globalStyles.inverted}`}
            type="button"
            onClick={() => setActiveSection(1)}
          >
            <span>{t("global.edit")}</span>
          </button>
        </div>
      ) : null}
    </>
  );
};
