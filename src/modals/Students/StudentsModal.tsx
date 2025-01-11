import React, { useEffect, useState } from "react";

import { Students } from "./content/Students";
import { EditStudents } from "./content/EditStudents";

import modalStyles from "../Modal.module.sass";
import styles from "./StudentsModal.module.sass";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";

interface IStudentsModalProps {
  isShow: boolean;
  students: any[];
  onClose: Function;
}

export const StudentsModal: React.FC<IStudentsModalProps> = ({ isShow, students, onClose }) => {
  const [activeSection, setActiveSection] = useState(0);
  const contentSections = [
    <Students students={students} setActiveSection={setActiveSection} />,
    <EditStudents students={students} onSave={() => {}} setActiveSection={setActiveSection} />,
  ] as JSX.Element[];

  useEffect(() => {
    setActiveSection(0);
  }, [isShow]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`} onClick={() => onClose()} />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>Студенты</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        {contentSections[activeSection]}
      </div>
    </div>
  );
};
