import React from "react";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";

interface IProfilesFiltersModalProps {
  isShow: boolean;
  onSave: Function;
  onClose: Function;
}

export const ProfilesFiltersModal: React.FC<IProfilesFiltersModalProps> = ({
  isShow,
  onSave,
  onClose,
}) => {
  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      ></div>
      <div className={modalStyles.modal_content}>
        <div className={modalStyles.head}>
          <h4>Фильтры абитуриентов</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
      </div>
      {isShow ? (
        <div className={modalStyles.form}>
          <div className={modalStyles.form_content}>
            <button
              type="button"
              className={`${globalStyles.inverted} ${globalStyles.small}`}
              onClick={() => onSave()}
            >
              Применить фильтры
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
