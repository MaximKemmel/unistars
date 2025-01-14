import React from "react";

import styles from "./BookletCard.module.sass";

import { IBooklet } from "../../types/booklet/booklet";

import EditIcon from "../../assets/svg/edit.svg";

interface IBookletCardProps {
  bookletItem: IBooklet;
  onEdit: Function;
}

export const BookletCard: React.FC<IBookletCardProps> = ({ bookletItem, onEdit }) => {
  return (
    <div className={styles.booklet_container}>
      <div className={styles.booklet_photo}>
        <img src={bookletItem.imageUrl} alt="" />
      </div>
      <div className={styles.booklet_info}>
        <div className={styles.booklet_name}>{bookletItem.title}</div>
        <div className={styles.booklet_description}>{bookletItem.description}</div>
      </div>
      <div className={styles.booklet_edit} onClick={() => onEdit()}>
        <img src={EditIcon} alt="" />
      </div>
    </div>
  );
};
