import React from "react";

import { useTranslation } from "react-i18next";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./ConfirmDeleteModal.module.sass";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";

interface IConfirmDeleteModalProps {
  isShow: boolean;
  head: string;
  title: string;
  message: any;
  onConfirm: Function;
  onClose: Function;
}

export const ConfirmDeleteModal: React.FC<IConfirmDeleteModalProps> = ({
  isShow,
  head,
  title,
  message,
  onConfirm,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={modalStyles.modal_content}>
        <div className={modalStyles.head}>
          <h4>{head}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        <div className={modalStyles.delete_container}>
          <div className={modalStyles.delete_title}>{title}</div>
          {message.trim().length > 0 ? (
            <div className={modalStyles.delete_description}>{message}</div>
          ) : null}
        </div>
        <div className={modalStyles.actions}>
          <div />
          <div className={styles.actions}>
            <button
              className={`${globalStyles.inverted} ${globalStyles.small}`}
              type="button"
              onClick={() => onClose()}
            >
              <span>{t("global.back")}</span>
            </button>
            <button
              className={`${globalStyles.small} ${globalStyles.delete}`}
              type="button"
              onClick={() => onConfirm()}
            >
              {t("global.delete")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
