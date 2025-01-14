import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {Workers} from "./content/Workers";
import {EditWorkers} from "./content/EditWorkers";
import {EditWorkerRights} from "./content/EditWorkerRights";
import {AddWorker} from "./content/AddWorker";

import modalStyles from "../Modal.module.sass";
import styles from "./WorkersModal.module.sass";

import {Close as CloseIcon} from "../../assets/svgComponents/Close";

interface IWorkersModalProps {
  isShow: boolean;
  workers: any[];
  onClose: Function;
}

export const WorkersModal: React.FC<IWorkersModalProps> = ({isShow, workers, onClose}) => {
  const {t} = useTranslation();
  const [activeSection, setActiveSection] = useState(0);
  const contentSections = [
    <Workers workers={workers} setActiveSection={setActiveSection}/>,
    <EditWorkers workers={workers} onSave={() => {
    }} setActiveSection={setActiveSection}/>,
    <EditWorkerRights worker={workers[0]} setActiveSection={setActiveSection}/>,
    <AddWorker setActiveSection={setActiveSection}/>,
  ] as JSX.Element[];

  useEffect(() => {
    setActiveSection(0);
  }, [isShow]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`} onClick={() => onClose()}/>
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>{activeSection === 2 ? t("employers.employees_rights_settings") : activeSection === 3 ? t("employers.adding_employee") : t("employers.employers")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon/>
          </div>
        </div>
        {contentSections[activeSection]}
      </div>
    </div>
  );
};
