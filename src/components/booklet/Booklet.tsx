import styles from "./Booklet.module.sass";

import EditIcon from "../../assets/svg/edit.svg";

interface IBookletProps {
  bookletItem: any;
}

export const Booklet: React.FC<IBookletProps> = ({ bookletItem }) => {
  return (
    <div className={styles.booklet_container}>
      <img src={bookletItem.photo}  alt="" />
      <div className={styles.booklet_info}>
        <div className={styles.booklet_name}>{bookletItem.name}</div>
        <div className={styles.booklet_description}>
          {bookletItem.description}
        </div>
      </div>
      <div className={styles.booklet_edit}>
        <img src={EditIcon} alt="" />
      </div>
    </div>
  );
};
