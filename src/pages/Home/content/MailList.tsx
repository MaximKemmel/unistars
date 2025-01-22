import {useTranslation} from "react-i18next";

import styles from "../Home.module.sass";

export const MailList = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <div className={`${styles.events} ${styles.content_container}`}>
        <div className={styles.content_container_head}>
          <div className={styles.head_title}>
            <h4>{t("navigation.mail_list")}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}