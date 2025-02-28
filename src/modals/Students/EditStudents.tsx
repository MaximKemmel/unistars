import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import { UserCard } from "../../cards/user/UserCard";
import { MultiCheckbox } from "../../components/checkbox/MultiCheckbox";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./StudentsModal.module.sass";

import { IUser } from "../../types/user/user";
import { CheckboxState } from "../../enums/local/checkboxState";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import { Trash as TrashIcon } from "../../assets/svgComponents/Trash";

interface IEditStudentsModalProps {
  isShow: boolean;
  onDelete: Function;
  onCancel: Function;
  onClose: Function;
}

export const EditStudentsModal: React.FC<IEditStudentsModalProps> = ({
  isShow,
  onDelete,
  onCancel,
  onClose,
}) => {
  const { t } = useTranslation();
  const students = useTypedSelector(
    (state) => state.studentReducer.studentList,
  );
  const [currentStudents, setCurrentStudents] = useState(students);

  useEffect(() => {
    setCurrentStudents(students);
  }, [students]);

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
        {isShow ? (
          <div className={styles.students_container}>
            <div className={styles.students_content}>
              <div className={styles.students_selector}>
                <div className={styles.checkbox}>
                  <MultiCheckbox
                    checkboxState={
                      currentStudents.filter(
                        (student: IUser) => student.isSelected,
                      ).length === 0
                        ? CheckboxState.NotChecked
                        : currentStudents.filter(
                              (student: IUser) => student.isSelected,
                            ).length === currentStudents.length
                          ? CheckboxState.AllChecked
                          : CheckboxState.AnyChecked
                    }
                    onChangeStatus={(status: CheckboxState) =>
                      setCurrentStudents(
                        currentStudents.map((student: IUser) => {
                          return {
                            ...student,
                            isSelected: status === CheckboxState.AllChecked,
                          };
                        }),
                      )
                    }
                  />
                </div>
                {t("global.select_all")}
              </div>
              {currentStudents.map((student: IUser, index: number) => (
                <div className={styles.student_item} key={index}>
                  <UserCard
                    userItem={student}
                    isCheckedItem={true}
                    onCheckedChange={(status: boolean) =>
                      setCurrentStudents(
                        currentStudents.map((tmpStudent: IUser) => {
                          if (tmpStudent.id === student.id) {
                            return { ...tmpStudent, isSelected: status };
                          } else {
                            return tmpStudent;
                          }
                        }),
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <div className={styles.bottom_actions}>
              <div
                className={styles.selected_count}
              >{`${currentStudents.filter((student: IUser) => student.isSelected).length} ${t("global.selected")}`}</div>
              <button
                className={`${globalStyles.inverted} ${globalStyles.small} ${globalStyles.delete}`}
                type="button"
                disabled={
                  currentStudents.filter((student: IUser) => student.isSelected)
                    .length === 0
                }
                onClick={() =>
                  onDelete(
                    currentStudents.filter(
                      (student: IUser) => student.isSelected,
                    ),
                  )
                }
              >
                <TrashIcon
                  isDisabled={
                    currentStudents.filter(
                      (student: IUser) => student.isSelected,
                    ).length === 0
                  }
                />
                {t("global.delete")}
              </button>
            </div>
          </div>
        ) : null}
        <div className={modalStyles.actions}>
          <div />
          <div className={modalStyles.buttons}>
            <button
              className={`${globalStyles.small} ${globalStyles.inverted}`}
              type="button"
              onClick={() => onCancel()}
            >
              <span>{t("global.cancel")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
