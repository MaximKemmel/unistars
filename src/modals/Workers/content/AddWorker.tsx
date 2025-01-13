import React, { useState } from "react";
import {useTranslation} from "react-i18next";

import globalStyles from "../../../App.module.sass";
import modalStyles from "../../Modal.module.sass";
import styles from "../WorkersModal.module.sass";

interface IAddWorkerProps {
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}

export const AddWorker: React.FC<IAddWorkerProps> = ({ setActiveSection }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  return (
    <>
      <div className={styles.workers_container}>
        <div className={styles.workers_content}>
          <form>
            <div className={styles.form_info}>
              {t("employers.adding_description")}
            </div>
            <input
              placeholder={"E-mail"}
              type="text"
              required
              onChange={(event) => setEmail(event.target.value.trim())}
              value={email}
            />
            <input
              placeholder={t("employers.post")}
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
            <span>{t("global.cancel")}</span>
          </button>
          <button className={globalStyles.small} type="button">
            <span>{t("employers.add_employee")}</span>
          </button>
        </div>
      </div>
    </>
  );
};
