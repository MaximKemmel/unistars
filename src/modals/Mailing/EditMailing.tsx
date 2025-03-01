import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import { Trash as TrashIcon } from "../../assets/svgComponents/Trash";

interface IEditMailingModalProps {
  isShow: boolean;
  mailing: any;
  onClose: Function;
}

export const EditMailingModal: React.FC<IEditMailingModalProps> = ({
  isShow,
  mailing,
  onClose,
}) => {
  const { t } = useTranslation();
  const [currentMailing, setCurrentMailing] = useState(mailing);

  useEffect(() => {
    setCurrentMailing(mailing);
    console.log(currentMailing);
  }, [mailing]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={modalStyles.modal_content}>
        <div className={modalStyles.head}>
          <h4>{t("booklets.creating_a_booklet")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        {isShow ? <></> : null}
        <div className={modalStyles.actions}>
          <button
            className={`${globalStyles.small} ${globalStyles.inverted} ${globalStyles.delete} ${globalStyles.square}`}
            type="button"
            onClick={() => onClose()}
          >
            <TrashIcon />
          </button>
          {!isShow ? (
            <></>
          ) : (
            <div className={modalStyles.buttons}>
              <button
                className={`${globalStyles.small} ${globalStyles.inverted}`}
                type="button"
              >
                <span>{t("global.edit")}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
