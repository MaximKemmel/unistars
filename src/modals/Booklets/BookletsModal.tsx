import { BookletCard } from "../../cards/booklet/BookletCard";

import globalStyles from "../../App.module.sass";
import styles from "./BookletsModal.module.sass";

import CloseIcon from "../../assets/svg/close.svg";
import PlusIcon from "../../assets/svg/plus.svg";

interface IBookletsModalProps {
  isShow: boolean;
  booklets: any[];
  onClose: Function;
}

export const BookletsModal: React.FC<IBookletsModalProps> = ({ isShow, booklets, onClose }) => {
  return (
    <div className={`${styles.modal} ${isShow ? styles.active : ""}`}>
      <div className={`${styles.overlay} ${isShow ? styles.active : ""}`} onClick={() => onClose()} />
      <div className={styles.modal_content}>
        <div className={styles.head}>
          <h4>Буклеты</h4>
          <div className={styles.close} onClick={() => onClose()}>
            <img src={CloseIcon} alt="" />
          </div>
        </div>
        <div className={styles.booklets_container}>
          <div className={styles.booklets_content}>
            {booklets.map((booklet, index) => (
              <div className={styles.booklet_item} key={index}>
                <BookletCard bookletItem={booklet} />
              </div>
            ))}
          </div>
          <div className={styles.booklets_actions}>
            <button className={globalStyles.small} type="button" onClick={() => onClose()}>
              Создать буклет
              <img src={PlusIcon} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
