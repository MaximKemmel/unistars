import React, { useEffect, useState } from "react";

import { UserCard } from "../../../cards/user/UserCard";

import globalStyles from "../../../App.module.sass";
import modalStyles from "../../Modal.module.sass";
import styles from "../StudentsModal.module.sass";

import SearchIcon from "../../../assets/svg/search.svg";
import NothingFound from "../../../assets/svg/nothing-found.svg";
import { Close as CloseIcon } from "../../../assets/svgComponents/Close";

interface IStudentsProps {
  students: any[];
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}

export const Students: React.FC<IStudentsProps> = ({ students, setActiveSection }) => {
  const [filteredStudents, setFilteredStudents] = useState(students);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue.length === 0) {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(students.filter((student) => student.name.toLowerCase().includes(searchValue.toLowerCase())));
    }
  }, [searchValue]);

  return (
    <>
      <div className={styles.students_container}>
        <div className={styles.students_content}>
          <div className={modalStyles.search_input}>
            <input
              placeholder={"Поиск по студентам"}
              type="text"
              onChange={(event) => setSearchValue(event.target.value)}
              value={searchValue}
            />
            <img className={modalStyles.search_icon} src={SearchIcon} alt="" />
            {searchValue.length > 0 ? (
              <div className={modalStyles.clear} onClick={() => setSearchValue("")}>
                <CloseIcon fill="#68778D" />
              </div>
            ) : null}
          </div>
          <div className={styles.students_count}>{`Найдено: ${filteredStudents.length}`}</div>
          {students.length === 0 ? (
            <div className={modalStyles.empty_container}>
              <img className={modalStyles.empty_image} src={NothingFound} alt="" />
              <div className={modalStyles.empty_info}>
                <div className={modalStyles.empty_title}>Ничего не найдено</div>
                <div className={modalStyles.empty_description}>У вас пока нет студентов</div>
              </div>
            </div>
          ) : (
            <>
              {filteredStudents.length === 0 ? (
                <div className={modalStyles.empty_container}>
                  <img className={modalStyles.empty_image} src={NothingFound} alt="" />
                  <div className={modalStyles.empty_info}>
                    <div className={modalStyles.empty_title}>Ничего не найдено</div>
                    <div className={modalStyles.empty_description}>Введите другие параметры поиска</div>
                  </div>
                </div>
              ) : (
                <>
                  {filteredStudents.map((item, index) => (
                    <div className={styles.student_item} key={index}>
                      <UserCard userItem={item} />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {students.length > 0 ? (
        <div className={modalStyles.actions}>
          <div />
          <button
            className={`${globalStyles.small} ${globalStyles.inverted}`}
            type="button"
            onClick={() => setActiveSection(1)}
          >
            <span>Редактировать</span>
          </button>
        </div>
      ) : null}
    </>
  );
};
