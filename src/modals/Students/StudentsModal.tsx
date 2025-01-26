import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Students } from "./content/Students";
import { EditStudents } from "./content/EditStudents";

import modalStyles from "../Modal.module.sass";
import styles from "./StudentsModal.module.sass";

import { IUser } from "../../types/user/user";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";

interface IStudentsModalProps {
  isShow: boolean;
  students: IUser[];
  onClose: Function;
}

export const StudentsModal: React.FC<IStudentsModalProps> = ({
  isShow,
  students,
  onClose,
}) => {
  const { t } = useTranslation();
  const [currentStudents, setCurrentStudents] = useState(students);
  const [activeSection, setActiveSection] = useState(0);
  const contentSections = [
    <Students students={currentStudents} setActiveSection={setActiveSection} />,
    <EditStudents
      students={currentStudents}
      onSave={() => {}}
      setActiveSection={setActiveSection}
    />,
  ] as JSX.Element[];

  useEffect(() => {
    setActiveSection(0);
    setCurrentStudents(students);
  }, [isShow]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>{t("students.students")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        {contentSections[activeSection]}
      </div>
    </div>
  );
};
