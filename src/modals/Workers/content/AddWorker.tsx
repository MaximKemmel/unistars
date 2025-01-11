import React, { useState } from "react";
import globalStyles from "../../../App.module.sass";
import modalStyles from "../../Modal.module.sass";
import styles from "../WorkersModal.module.sass";

interface IAddWorkerProps {
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}

export const AddWorker: React.FC<IAddWorkerProps> = ({ setActiveSection }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  return (
    <>
      <div className={styles.workers_container}>
        <div className={styles.workers_content}>
          <form>
            <div className={styles.form_info}>
              Заполните форму, чтобы добавить сотрудника. Сотрудником можно сделать пользователя, который не имеет статусы
              «Студент» или «Амбассадор»
            </div>
            <input
              placeholder={"Почта"}
              type="text"
              required
              onChange={(event) => setEmail(event.target.value.trim())}
              value={email}
            />
            <input
              placeholder={"Должность"}
              type="text"
              required
              onChange={(event) => setRole(event.target.value.trim())}
              value={role}
              maxLength={56}
            />
            <div className={styles.role_length}>{`${role.length}/56`}</div>
          </form>
        </div>
      </div>
      <div className={modalStyles.actions}>
        <div />
        <div className={modalStyles.buttons}>
          <button className={`${globalStyles.small} ${globalStyles.inverted}`} type="button" onClick={() => setActiveSection(0)}>
            <span>Отменить</span>
          </button>
          <button className={globalStyles.small} type="button">
            <span>Добавить сотрудника</span>
          </button>
        </div>
      </div>
    </>
  );
};
