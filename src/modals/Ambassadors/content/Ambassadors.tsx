import { useEffect, useState } from "react";

import { UserCard } from "../../../cards/user/UserCard";

import globalStyles from "../../../App.module.sass";
import modalStyles from "../../Modal.module.sass";
import styles from "../AmbassadorsModal.module.sass";

import NothingFound from "../../../assets/svg/nothing-found.svg";
import { Close as CloseIcon } from "../../../assets/svgComponents/Close";
import { Check as CheckIcon } from "../../../assets/svgComponents/Check";

interface IAmbassadorsProps {
  ambassadors: any[];
  requestedAmbassadors: any[];
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}

export const Ambassadors: React.FC<IAmbassadorsProps> = ({ ambassadors, requestedAmbassadors, setActiveSection }) => {
  const [currentAmbassadors, setCurrentAmbassadors] = useState(ambassadors);
  const [currentRequestedAmbassadors, setCurrentRequestedAmbassadors] = useState(requestedAmbassadors);

  useEffect(() => {
    setCurrentAmbassadors(ambassadors);
    setCurrentRequestedAmbassadors(requestedAmbassadors);
  }, []);

  return (
    <>
      <div className={styles.ambassadors_content}>
        {ambassadors.length + requestedAmbassadors.length === 0 ? (
          <div className={styles.empty_ambassadors}>
            <img src={NothingFound} alt="" />
            <div className={styles.empty_info}>
              <div className={styles.empty_title}>Ничего не найдено</div>
              <div className={styles.empty_description}>У вас пока нет амбассадоров</div>
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
                      Показать все
                    </div>
                  ) : null}
                </div>
                {currentRequestedAmbassadors
                  .slice(0, currentRequestedAmbassadors.length > 3 ? 3 : currentRequestedAmbassadors.length)
                  .map((item, index) => (
                    <div className={styles.requested_ambassador} key={index}>
                      <div className={styles.ambassador_item}>
                        <UserCard userItem={item} />
                      </div>
                      <div className={styles.ambassador_item_actions}>
                        <div
                          className={`${styles.button} ${styles.cancel}`}
                          onClick={() =>
                            setCurrentRequestedAmbassadors(
                              currentRequestedAmbassadors.filter((ambassador) => ambassador.id !== item.id)
                            )
                          }
                        >
                          <CloseIcon fill="#FF2941" />
                        </div>
                        <div
                          className={`${styles.button} ${styles.accept}`}
                          onClick={() => {
                            setCurrentAmbassadors([...currentAmbassadors, item]);
                            setCurrentRequestedAmbassadors(
                              currentRequestedAmbassadors.filter((ambassador) => ambassador.id !== item.id)
                            );
                          }}
                        >
                          <CheckIcon fill="#FFFFFF" />
                        </div>
                      </div>
                    </div>
                  ))}
                <div className={styles.ambassadors_separator} />
              </>
            ) : null}
            <h4>
              Амбассодоры<span>{currentAmbassadors.length}</span>
            </h4>
            {currentAmbassadors.map((item, index) => (
              <div className={styles.ambassador_item} key={index}>
                <UserCard userItem={item} />
              </div>
            ))}
          </>
        )}
      </div>
      {ambassadors.length > 0 ? (
        <div className={modalStyles.actions}>
          <div />
          <button
            className={`${globalStyles.small} ${globalStyles.inverted}`}
            type="button"
            onClick={() => setActiveSection(1)}
          >
            <span>Редактировать</span>
          </button>
        </div>
      ) : null}
    </>
  );
};
