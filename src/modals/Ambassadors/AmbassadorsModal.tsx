import { useEffect, useState } from "react";

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
  const [activeSection, setActiveSection] = useState(0);
  const contentSections = [
    <Ambassadors
      ambassadors={ambassadors}
      requestedAmbassadors={requestedAmbassadors}
      setActiveSection={setActiveSection}
    />,
    <EditAmbassadors ambassadors={ambassadors} onSave={() => {}} />,
    <EditRequestsAmbassadors
      requestedAmbassadors={requestedAmbassadors}
      onAmbassadorAccepted={() => {}}
      onAmbassadorCanceled={() => {}}
    />,
  ] as JSX.Element[];
  const sectionsTitles = ["Амбассадоры", "Амбассадоры", "Заявки на амбассадорство"];

  useEffect(() => {
    setActiveSection(0);
  }, [isShow]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`} onClick={() => onClose()} />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>{sectionsTitles[activeSection]}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        {contentSections[activeSection]}
      </div>
    </div>
  );
};
