import React, { useEffect, useState } from "react";

import { UserCard } from "../../../cards/user/UserCard";

import globalStyles from "../../../App.module.sass";
import modalStyles from "../../Modal.module.sass";
import styles from "../WorkersModal.module.sass";

import SearchIcon from "../../../assets/svg/search.svg";
import NothingFound from "../../../assets/svg/nothing-found.svg";
import { Close as CloseIcon } from "../../../assets/svgComponents/Close";
import LockIcon from "../../../assets/svg/lock.svg";

interface IWorkersProps {
  workers: any[];
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
}

export const Workers: React.FC<IWorkersProps> = ({ workers, setActiveSection }) => {
  const [filteredWorkers, setFilteredWorkers] = useState(workers);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue.length === 0) {
      setFilteredWorkers(workers);
    } else {
      setFilteredWorkers(workers.filter((worker) => worker.name.toLowerCase().includes(searchValue.toLowerCase())));
    }
  }, [searchValue]);

  return (
    <>
      <div className={styles.workers_container}>
        <div className={styles.workers_content}>
          <div className={modalStyles.search_input}>
            <input
              placeholder={"Поиск по сотрудникам"}
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
          <div className={styles.workers_count}>{`Найдено: ${filteredWorkers.length}`}</div>
          {workers.length === 0 ? (
            <div className={modalStyles.empty_container}>
              <img className={modalStyles.empty_image} src={NothingFound} alt="" />
              <div className={styles.empty_info}>
                <div className={styles.empty_title}>Ничего не найдено</div>
                <div className={styles.empty_description}>У вас пока нет сотрудников</div>
              </div>
            </div>
          ) : (
            <>
              {filteredWorkers.length === 0 ? (
                <div className={modalStyles.empty_container}>
                  <img className={modalStyles.empty_image} src={NothingFound} alt="" />
                  <div className={styles.empty_info}>
                    <div className={styles.empty_title}>Ничего не найдено</div>
                    <div className={styles.empty_description}>Введите другие параметры поиска</div>
                  </div>
                </div>
              ) : (
                <>
                  {filteredWorkers.map((item, index) => (
                    <div className={styles.worker_item} key={index}>
                      <UserCard
                        userItem={item}
                        isWithMoreItem={true}
                        moreItems={[
                          <div className={styles.popup_item} onClick={() => setActiveSection(2)}>
                            Настройка прав
                            <img src={LockIcon} alt="" />
                          </div>,
                        ]}
                      />
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {workers.length > 0 ? (
        <div className={modalStyles.actions}>
          <div />
          <div className={modalStyles.buttons}>
            <button
              className={`${globalStyles.small} ${globalStyles.inverted}`}
              type="button"
              onClick={() => setActiveSection(1)}
            >
              <span>Редактировать</span>
            </button>
            <button className={globalStyles.small} type="button" onClick={() => setActiveSection(3)}>
              Добавить сотрудника
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
