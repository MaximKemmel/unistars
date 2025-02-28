import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import { Input } from "../../components/input/Input";

import { UserCard } from "../../cards/user/UserCard";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./StudentsModal.module.sass";

import { IUser } from "../../types/user/user";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import NothingFound from "../../assets/svg/nothing-found.svg";

interface IStudentsModalProps {
  isShow: boolean;
  onEdit: Function;
  onClose: Function;
}

export const StudentsModal: React.FC<IStudentsModalProps> = ({
  isShow,
  onEdit,
  onClose,
}) => {
  const { t } = useTranslation();
  const students = useTypedSelector(
    (state) => state.studentReducer.studentList,
  );
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setFilteredStudents(students);
    setSearchValue("");
  }, [students]);

  useEffect(() => {
    if (searchValue.length === 0) {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(
        students.filter((student: IUser) =>
          student.fullName.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
    }
  }, [searchValue]);

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
            <div className={styles.students_content} id="students_content">
              <div className={modalStyles.search_input}>
                <Input
                  value={searchValue}
                  onChange={(value: string) => setSearchValue(value)}
                  placeholder={t("students.students_search")}
                  type="text"
                  isSearch={true}
                />
              </div>
              <div
                className={styles.students_count}
              >{`${t("global.founded")}: ${filteredStudents.length}`}</div>
              {students.length === 0 ? (
                <div className={modalStyles.empty_container}>
                  <img
                    className={modalStyles.empty_image}
                    src={NothingFound}
                    alt=""
                  />
                  <div className={modalStyles.empty_info}>
                    <div className={modalStyles.empty_title}>
                      {t("global.nothing_was_found")}
                    </div>
                    <div className={modalStyles.empty_description}>
                      {t("students.don_t_have_students")}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {filteredStudents.length === 0 ? (
                    <div className={modalStyles.empty_container}>
                      <img
                        className={modalStyles.empty_image}
                        src={NothingFound}
                        alt=""
                      />
                      <div className={modalStyles.empty_info}>
                        <div className={modalStyles.empty_title}>
                          {t("global.nothing_was_found")}
                        </div>
                        <div className={modalStyles.empty_description}>
                          {t("global.enter_other_params")}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {filteredStudents.map((student: IUser, index: number) => (
                        <div className={styles.student_item} key={index}>
                          <UserCard userItem={student} />
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        ) : null}
        {students.length > 0 ? (
          <div className={modalStyles.actions}>
            <div />
            <button
              className={`${globalStyles.small} ${globalStyles.inverted}`}
              type="button"
              onClick={() => onEdit()}
            >
              <span>{t("global.edit")}</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
