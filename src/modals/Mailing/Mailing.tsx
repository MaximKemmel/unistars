import React from "react";
import { useTranslation } from "react-i18next";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./MailingModal.module.sass";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import { Trash as TrashIcon } from "../../assets/svgComponents/Trash";
import ProgressIcon from "../../assets/svg/progress.svg";
import SuccessIcon from "../../assets/svg/success.svg";
import ActiveIcon from "../../assets/svg/active.svg";
import NotActiveIcon from "../../assets/svg/not_active.svg";
import FileIcon from "../../assets/svg/file.svg";

interface IMailingModalProps {
  isShow: boolean;
  mailing: any;
  onDelete: Function;
  onClose: Function;
}

export const MailingModal: React.FC<IMailingModalProps> = ({
  isShow,
  mailing,
  onDelete,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>
            {mailing !== null && mailing.name !== null ? mailing.name : ""}
          </h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        {isShow ? (
          <>
            <div className={styles.mailing_container}>
              <div className={styles.mailing_content}>
                <div className={styles.head_info}>
                  <div className={styles.info_item}>
                    <div className={styles.label}>Статус</div>
                    <div className={styles.mailing_status}>
                      {mailing !== null && mailing.status === 0 ? (
                        <>
                          <img src={ProgressIcon} alt="" />
                          <div className={styles.mailing_process}>
                            {t("mail_list.in_process")}
                          </div>
                        </>
                      ) : null}
                      {mailing !== null && mailing.status === 1 ? (
                        <>
                          <img src={SuccessIcon} alt="" />
                          <div className={styles.mailing_success}>
                            {t("mail_list.sent")}
                          </div>
                        </>
                      ) : null}
                      {mailing !== null && mailing.status === 2 ? (
                        <>
                          <img src={ActiveIcon} alt="" />
                          <div className={styles.mailing_active}>
                            {t("mail_list.active")}
                          </div>
                        </>
                      ) : null}
                      {mailing !== null && mailing.status === 3 ? (
                        <>
                          <img src={NotActiveIcon} alt="" />
                          <div className={styles.mailing_not_active}>
                            {t("mail_list.not_active")}
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className={styles.info_item}>
                    <div className={styles.label}>Дата отправки</div>
                    <div className={styles.value}>
                      {mailing !== null
                        ? new Date(mailing.date).toLocaleDateString("ru-RU", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : ""}
                    </div>
                  </div>
                  <div className={styles.info_item}>
                    <div className={styles.label}>Способ рассылки</div>
                    <div className={styles.value}>
                      {mailing !== null ? mailing.type : ""}
                    </div>
                  </div>
                </div>
                <div className={styles.info_item}>
                  <div className={styles.label}>Текст push-уведомления</div>
                  <div className={styles.value}>
                    {mailing !== null ? mailing.pushText : ""}
                  </div>
                </div>
                <div className={styles.separator} />
                <div className={styles.info_item}>
                  <div className={styles.label}>Получатели</div>
                  <div className={styles.value}>
                    {mailing !== null ? mailing.senders.join(", ") : ""}
                  </div>
                </div>
                <div className={styles.separator} />
                <div className={styles.info_item}>
                  <div className={styles.label}>Заголовок</div>
                  <div className={styles.value}>
                    {mailing !== null ? mailing.title : ""}
                  </div>
                </div>
                <div className={styles.info_item}>
                  <div className={styles.label}>Текст рассылки</div>
                  <div className={styles.value}>
                    {mailing !== null ? mailing.text : ""}
                  </div>
                </div>
                <div className={styles.info_item}>
                  <div className={styles.label}>Прикрепленные файлы</div>
                  <div className={styles.files_list}>
                    {mailing !== null
                      ? mailing.files.map((file: any, index: number) => (
                          <>
                            {index !== 0 ? (
                              <div className={styles.separator} />
                            ) : null}
                            <div className={styles.file}>
                              <img src={FileIcon} alt="" />
                              {file}
                            </div>
                          </>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
        <div className={modalStyles.actions}>
          <button
            className={`${globalStyles.small} ${globalStyles.inverted} ${globalStyles.delete} ${globalStyles.square}`}
            type="button"
            onClick={() => onDelete()}
          >
            <TrashIcon />
          </button>
          {mailing !== null && mailing.status < 2 ? (
            <></>
          ) : (
            <div className={modalStyles.buttons}>
              <button
                className={`${globalStyles.small} ${globalStyles.inverted}`}
                type="button"
              >
                <span>{t("global.edit")}</span>
              </button>
              <button className={globalStyles.small} type="button">
                <span>{mailing.status === 3 ? "Запустить" : "Остановить"}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
