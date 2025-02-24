import React from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import { BookletCard } from "../../cards/booklet/BookletCard";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./BookletsModal.module.sass";

import { IBooklet } from "../../types/booklet/booklet";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import PlusIcon from "../../assets/svg/plus.svg";

interface IBookletsModalProps {
  isShow: boolean;
  onEdit: Function;
  onCreate: Function;
  onClose: Function;
}

export const BookletsModal: React.FC<IBookletsModalProps> = ({
  isShow,
  onEdit,
  onCreate,
  onClose,
}) => {
  const { t } = useTranslation();
  const booklets = useTypedSelector((state) => state.bookletReducer.booklets);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={`${modalStyles.modal_content} ${modalStyles.wide}`}>
        <div className={modalStyles.head}>
          <h4>{t("booklets.booklets")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        {isShow ? (
          <div className={styles.booklets_container}>
            <div className={styles.booklets_content}>
              {booklets.map((booklet: IBooklet) => {
                return (
                  <div className={styles.booklet_item} key={booklet.id}>
                    <BookletCard
                      bookletItem={booklet}
                      onEdit={() => onEdit(booklet)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
        <div className={modalStyles.actions}>
          <div />
          <button
            className={globalStyles.small}
            type="button"
            onClick={() => onCreate()}
          >
            {t("booklets.create_booklet")}
            <img src={PlusIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
