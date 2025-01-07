import styles from "./BookletCard.module.sass";

import EditIcon from "../../assets/svg/edit.svg";

interface IBookletCardProps {
  bookletItem: any;
}

export const BookletCard: React.FC<IBookletCardProps> = ({ bookletItem }) => {
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
