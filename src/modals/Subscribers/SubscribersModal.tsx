import { useState } from "react";

import globalStyles from "../../App.module.sass";
import styles from "./SubscribersModal.module.sass";

import CloseIcon from "../../assets/svg/close.svg";
import ExportIcon from "../../assets/svg/export.svg";
import SearchIcon from "../../assets/svg/search.svg";

interface ISubscribersModalProps {
  isShow: boolean;
  subscribers: any[];
  onClose: Function;
}

export const SubscribersModal: React.FC<ISubscribersModalProps> = ({
  isShow,
  subscribers,
  onClose,
}) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={`${styles.modal} ${isShow ? styles.active : ""}`}>
      <div
        className={`${styles.overlay} ${isShow ? styles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={styles.modal_content}>
        <div className={styles.head}>
          <h3>Подписчики</h3>
          <div className={styles.close} onClick={() => onClose()}>
            <img src={CloseIcon} alt="" />
          </div>
        </div>
        <div className={styles.subscribers_container}>
          <div className={styles.subscribers_content}>
            <div className={styles.search_input}>
              <input
                placeholder={"Поиск по подписчикам"}
                type="text"
                onChange={(event) => setSearchValue(event.target.value)}
                value={searchValue}
              />
              <img className={styles.search_icon} src={SearchIcon} alt="" />
              {searchValue.length > 0 ? (
                <div
                  className={styles.clear}
                  onClick={() => setSearchValue("")}
                >
                  <img className={styles.clear_icon} src={CloseIcon} alt="" />
                </div>
              ) : null}
            </div>
            {subscribers.map((_, index) => (
              <div key={index}></div>
            ))}
          </div>
          <div className={styles.subscribers_actions}>
            <button
              className={globalStyles.small}
              type="button"
              onClick={() => onClose()}
            >
              <img src={ExportIcon} alt="" />
              Выгрузить данные
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
