import { useEffect, useState } from "react";

import { Workers } from "./content/Workers";
import { EditWorkers } from "./content/EditWorkers";
import { EditWorkerRights } from "./content/EditWorkerRights";
import { AddWorker } from "./content/AddWorker";

import modalStyles from "../Modal.module.sass";
import styles from "./WorkersModal.module.sass";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";

interface IWorkersModalProps {
  isShow: boolean;
  workers: any[];
  onClose: Function;
}

export const WorkersModal: React.FC<IWorkersModalProps> = ({ isShow, workers, onClose }) => {
  const [activeSection, setActiveSection] = useState(0);
  const contentSections = [
    <Workers workers={workers} setActiveSection={setActiveSection} />,
    <EditWorkers workers={workers} onSave={() => {}} />,
    <EditWorkerRights worker={workers[0]} />,
    <AddWorker />,
  ] as JSX.Element[];

  useEffect(() => {
    setActiveSection(0);
  }, [isShow]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`} onClick={() => onClose()} />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>Сотрудники</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        {contentSections[activeSection]}
      </div>
    </div>
  );
};
