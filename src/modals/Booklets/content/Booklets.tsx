import React from "react";
import {useTranslation} from "react-i18next";

import {BookletCard} from "../../../cards/booklet/BookletCard";

import globalStyles from "../../../App.module.sass";
import modalStyles from '../../Modal.module.sass';
import styles from '../BookletsModal.module.sass';

import PlusIcon from "../../../assets/svg/plus.svg";

interface IBookletsProps {
  booklets: any[];
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
  setCurrentBooklet: React.Dispatch<React.SetStateAction<any>>;
}

export const Booklets: React.FC<IBookletsProps> = ({ booklets, setActiveSection, setCurrentBooklet }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.booklets_container}>
        <div className={styles.booklets_content}>
          {booklets.map((booklet, index) => {
            return (
              <div className={styles.booklet_item} key={index}>
                <BookletCard
                  bookletItem={booklet}
                  onEdit={() => {
                    setCurrentBooklet(booklet);
                    setActiveSection(1);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={modalStyles.actions}>
        <div />
        <button className={globalStyles.small} type="button" onClick={() => setActiveSection(1)}>
          {t("booklets.create_booklet")}
          <img src={PlusIcon} alt=""/>
        </button>
      </div>
    </>
  );
}