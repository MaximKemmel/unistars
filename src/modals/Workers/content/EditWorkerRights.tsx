import React, { useState } from "react";

import { UserCard } from "../../../cards/user/UserCard";
import { Checkbox } from "../../../components/checkbox/Checkbox";

import globalStyles from "../../../App.module.sass";
import modalStyles from "../../Modal.module.sass";
import styles from "../WorkersModal.module.sass";

interface IEditWorkerRightsProps {
  worker: any;
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}

export const EditWorkerRights: React.FC<IEditWorkerRightsProps> = ({ worker, setActiveSection }) => {
  const [rights, setRights] = useState([
    {
      id: 0,
      text: "Редактирование профиля организации",
      isChecked: false,
    },
    {
      id: 1,
      text: "Создание и редактирование мероприятий",
      isChecked: false,
    },
    {
      id: 2,
      text: "Создание и редактирование статей",
      isChecked: false,
    },
    {
      id: 3,
      text: "Принимать личные сообщения из списка сотрудников",
      isChecked: false,
    },
  ]);

  return (
    <>
      <div className={styles.workers_container}>
        <div className={styles.workers_content}>
          <div className={`${styles.worker_item} ${styles.bordered}`}>
            <UserCard userItem={worker} />
          </div>
          <div className={styles.rights_options}>
            {rights.map((item, index) => (
              <div className={styles.rights_option} key={index}>
                <div className={styles.checkbox}>
                  <Checkbox
                    isChecked={item.isChecked}
                    onChangeStatus={(status) =>
                      setRights(
                        rights.map((tmpItem) => {
                          if (item.id === tmpItem.id) {
                            return { ...tmpItem, isChecked: status };
                          } else {
                            return tmpItem;
                          }
                        })
                      )
                    }
                  />
                </div>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={modalStyles.actions}>
        <div />
        <div className={modalStyles.buttons}>
          <button className={`${globalStyles.small} ${globalStyles.inverted}`} type="button" onClick={() => setActiveSection(1)}>
            <span>Отменить</span>
          </button>
          <button className={globalStyles.small} type="button">
            <span>Сохранить изменения</span>
          </button>
        </div>
      </div>
    </>
  );
};
