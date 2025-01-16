import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { BookletCard } from "../../cards/booklet/BookletCard";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./BookletsModal.module.sass";

import { IBooklet } from "../../types/booklet/booklet";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import PlusIcon from "../../assets/svg/plus.svg";

interface IBookletsModalProps {
  isShow: boolean;
  booklets: IBooklet[];
  onEdit: Function;
  onCreate: Function;
  onClose: Function;
}

export const BookletsModal: React.FC<IBookletsModalProps> = ({ isShow, booklets, onEdit, onCreate, onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const contentDiv = document.getElementById("booklets_content");
    contentDiv?.scrollTo({ top: 0, behavior: "smooth" });
  }, [isShow]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`} onClick={() => onClose()} />
      <div className={`${modalStyles.modal_content} ${modalStyles.wide}`}>
        <div className={modalStyles.head}>
          <h4>{t("booklets.booklets")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.booklets_container}>
          <div className={styles.booklets_content} id="booklets_content">
            {booklets.map((booklet: IBooklet) => {
              return (
                <div className={styles.booklet_item} key={booklet.id}>
                  <BookletCard bookletItem={booklet} onEdit={() => onEdit(booklet)} />
                </div>
              );
            })}
          </div>
        </div>
        <div className={modalStyles.actions}>
          <div />
          <button className={globalStyles.small} type="button" onClick={() => onCreate()}>
            {t("booklets.create_booklet")}
            <img src={PlusIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
