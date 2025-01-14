import React, { useState } from "react";
import {useTranslation} from "react-i18next";

import { UserCard } from "../../../cards/user/UserCard";
import { MultiCheckbox } from "../../../components/checkbox/MultiCheckbox";

import globalStyles from "../../../App.module.sass";
import modalStyles from "../../Modal.module.sass";
import styles from "../StudentsModal.module.sass";

import { CheckboxState } from "../../../enums/local/checkboxState";

import { Trash as TrashIcon } from "../../../assets/svgComponents/Trash";

interface IEditStudentsProps {
  students: any[];
  onSave: Function;
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}

export const EditStudents: React.FC<IEditStudentsProps> = ({ students, onSave, setActiveSection }) => {
  const { t } = useTranslation();
  const [currentStudents, setCurrentStudents] = useState(students);

  return (
    <>
      <div className={styles.students_container}>
        <div className={styles.students_content}>
          <div className={styles.students_selector}>
            <div className={styles.checkbox}>
              <MultiCheckbox
                checkboxState={
                  currentStudents.filter((item) => item.isChecked).length === 0
                    ? CheckboxState.NotChecked
                    : currentStudents.filter((item) => item.isChecked).length === currentStudents.length
                    ? CheckboxState.AllChecked
                    : CheckboxState.AnyChecked
                }
                onChangeStatus={(status: CheckboxState) =>
                  setCurrentStudents(
                    currentStudents.map((tmpItem) => {
                      return {
                        ...tmpItem,
                        isChecked: status === CheckboxState.AllChecked,
                      };
                    })
                  )
                }
              />
            </div>
            {t("global.select_all")}
          </div>
          {currentStudents.map((item, index) => (
            <div className={styles.student_item} key={index}>
              <UserCard
                userItem={item}
                isCheckedItem={true}
                onCheckedChange={(status: boolean) =>
                  setCurrentStudents(
                    currentStudents.map((tmpItem) => {
                      if (tmpItem.id === item.id) {
                        return { ...tmpItem, isChecked: status };
                      } else {
                        return tmpItem;
                      }
                    })
                  )
                }
              />
            </div>
          ))}
        </div>
        <div className={styles.bottom_actions}>
          <div className={styles.selected_count}>{`${currentStudents.filter((item) => item.isChecked).length} ${t("global.selected")}`}</div>
          <button
            className={`${globalStyles.inverted} ${globalStyles.small} ${globalStyles.delete}`}
            type="button"
            disabled={currentStudents.filter((item) => item.isChecked).length === 0}
            onClick={() => onSave()}
          >
            <TrashIcon isDisabled={currentStudents.filter((item) => item.isChecked).length === 0} />
            {t("global.delete")}
          </button>
        </div>
      </div>
      <div className={modalStyles.actions}>
        <div />
        <div className={modalStyles.buttons}>
          <button className={`${globalStyles.small} ${globalStyles.inverted}`} type="button" onClick={() => setActiveSection(0)}>
            <span>{t("global.cancel")}</span>
          </button>
          <button className={globalStyles.small} type="button" onClick={() => onSave()}>
            <span>{t("global.save_changes")}</span>
          </button>
        </div>
      </div>
    </>
  );
};
