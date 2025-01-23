import { useState } from "react";
import { useTranslation } from "react-i18next";

import { MailingCard } from "../../../cards/mailing/MailingCard";
import { Toggle } from "../../../components/toggle/Toggle";

import globalStyles from "../../../App.module.sass";
import styles from "../Home.module.sass";

import { IToggleItem } from "../../../types/local/toggleItem";

import PlusIcon from "../../../assets/svg/plus.svg";

export const MailList = () => {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState(0);

  const standardMailList = Array(8)
    .fill(1)
    .map((_item, index) => {
      return {
        id: index,
        status: index < 3 ? 0 : 1,
        name: "Заголовок",
        date: new Date(Date.UTC(2025, 0, index + 1)),
        type: index !== 0 && index % 2 === 0 ? "чат" : "e-mail",
        recipients: index * 248 + 5,
      };
    });

  const automaticMailList = Array(8)
    .fill(1)
    .map((_item, index) => {
      return {
        id: index,
        status: index < 3 ? 2 : 3,
        name: "Заголовок",
        date: new Date(Date.UTC(2025, 0, index + 1)),
        type: index !== 0 && index % 2 === 0 ? "чат" : "e-mail",
      };
    });

  return (
    <div className={styles.content}>
      <div className={`${styles.mail_list} ${styles.content_container}`}>
        <div className={styles.content_container_head}>
          <div className={styles.head_title}>
            <h4>{t("navigation.mail_list")}</h4>
          </div>
        </div>
        <div className={styles.mail_list_modes}>
          <Toggle
            selectedIndex={viewMode}
            items={
              [
                {
                  id: 0,
                  text: "Стандартные",
                  text_eng: "Standard",
                  count: standardMailList.length,
                } as IToggleItem,
                {
                  id: 1,
                  text: "Автоматические",
                  text_eng: "Automatic",
                  count: automaticMailList.length,
                } as IToggleItem,
              ] as IToggleItem[]
            }
            onItemSelect={(item: IToggleItem) => setViewMode(item.id)}
          />
        </div>
        <>
          {viewMode === 0 ? (
            <>
              {standardMailList.length > 0 ? (
                <div className={styles.mail_list_container}>
                  {standardMailList.map((mailing, index: number) => (
                    <div className={styles.mailing_item} key={index}>
                      <MailingCard mailingItem={mailing} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.empty_info}>
                  <div className={styles.empty_message}>
                    {t("mail_list.no_standard_mail_list")}
                  </div>
                </div>
              )}
              <button className={globalStyles.small} type="button">
                {t("mail_list.create_mail_list")}
                <img src={PlusIcon} alt="" />
              </button>
            </>
          ) : (
            <>
              {automaticMailList.length > 0 ? (
                <div className={styles.mail_list_container}>
                  {automaticMailList.map((mailing, index: number) => (
                    <div className={styles.mailing_item} key={index}>
                      <MailingCard mailingItem={mailing} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.empty_info}>
                  <div className={styles.empty_message}>
                    {t("mail_list.no_automatic_mail_list")}
                  </div>
                </div>
              )}
              <button className={globalStyles.small} type="button">
                {t("mail_list.create_mail_list")}
                <img src={PlusIcon} alt="" />
              </button>
            </>
          )}
        </>
      </div>
    </div>
  );
};
