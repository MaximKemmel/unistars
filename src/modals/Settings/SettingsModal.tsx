import { useTranslation } from "react-i18next";

import { Toggle } from "../../components/toggle/Toggle";

import modalStyles from "../Modal.module.sass";
import styles from "./SettingsModal.module.sass";

import CloseIcon from "../../assets/svg/close.svg";

interface ISettingsModalProps {
  isShow: boolean;
  onClose: Function;
}

export const SettingsModal: React.FC<ISettingsModalProps> = ({ isShow, onClose }) => {
  const { t } = useTranslation();

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`} onClick={() => onClose()} />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>{t("global.settings")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <img src={CloseIcon} alt="" />
          </div>
        </div>
        <div className={styles.settings_container}>
          <div className={styles.settings_label}>{t("settings.interface_language")}</div>
          <Toggle isSettings={true} />
        </div>
      </div>
    </div>
  );
};
