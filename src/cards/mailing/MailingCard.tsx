import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./MailingCard.module.sass";

import ProgressIcon from "../../assets/svg/progress.svg";
import SuccessIcon from "../../assets/svg/success.svg";
import { Start as StartIcon } from "../../assets/svgComponents/Start";
import { Pause as PauseIcon } from "../../assets/svgComponents/Pause";

interface IMailingCardProps {
  mailingItem: any;
  onView: Function;
}

export const MailingCard: React.FC<IMailingCardProps> = ({
  mailingItem,
  onView,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.mailing_container} onClick={() => onView()}>
      <div className={styles.mailing_status}>
        {mailingItem.status === 0 ? (
          <>
            <img src={ProgressIcon} alt="" />
            <div className={styles.mailing_process}>
              {t("mail_list.in_process")}
            </div>
          </>
        ) : null}
        {mailingItem.status === 1 ? (
          <>
            <img src={SuccessIcon} alt="" />
            <div className={styles.mailing_success}>{t("mail_list.sent")}</div>
          </>
        ) : null}
        {mailingItem.status === 2 ? (
          <>
            <StartIcon isActive={true} />
            <div className={styles.mailing_active}>{t("mail_list.active")}</div>
          </>
        ) : null}
        {mailingItem.status === 3 ? (
          <>
            <PauseIcon isActive={true} />
            <div className={styles.mailing_not_active}>
              {t("mail_list.not_active")}
            </div>
          </>
        ) : null}
      </div>
      <div className={styles.mailing_body}>
        <div className={styles.mailing_name}>{mailingItem.name}</div>
        <div className={styles.mailing_description}>
          {`${new Date(mailingItem.date)
            .toLocaleDateString("ru-RU", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .replace(
              /\s*г\./,
              "",
            )} • ${mailingItem.type}${mailingItem.status < 2 ? ` • ${mailingItem.recipients} получателей` : ""}`}
        </div>
      </div>
    </div>
  );
};
