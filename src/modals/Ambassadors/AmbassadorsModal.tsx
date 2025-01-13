import React, { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";

import { Ambassadors } from "./content/Ambassadors";
import { EditRequestsAmbassadors } from "./content/EditRequestsAmbassadors";
import { EditAmbassadors } from "./content/EditAmbassadors";

import modalStyles from "../Modal.module.sass";
import styles from "./AmbassadorsModal.module.sass";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";

interface IAmbassadorsModalProps {
  isShow: boolean;
  requestedAmbassadors: any[];
  ambassadors: any[];
  onClose: Function;
}

export const AmbassadorsModal: React.FC<IAmbassadorsModalProps> = ({
  isShow,
  ambassadors,
  requestedAmbassadors,
  onClose,
}) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState(0);
  const contentSections = [
    <Ambassadors
      ambassadors={ambassadors}
      requestedAmbassadors={requestedAmbassadors}
      setActiveSection={setActiveSection}
    />,
    <EditAmbassadors ambassadors={ambassadors} onSave={() => {}} setActiveSection={setActiveSection} />,
    <EditRequestsAmbassadors
      requestedAmbassadors={requestedAmbassadors}
      onAmbassadorAccepted={() => {}}
      onAmbassadorCanceled={() => {}}
    />,
  ] as JSX.Element[];

  useEffect(() => {
    setActiveSection(0);
  }, [isShow]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`} onClick={() => onClose()} />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>{activeSection === 2 ? t("ambassadors.requests_for_ambassadorship") : t("ambassadors.ambassadors")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        {contentSections[activeSection]}
      </div>
    </div>
  );
};
