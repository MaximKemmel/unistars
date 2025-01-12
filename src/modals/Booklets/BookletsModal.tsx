import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {Booklets} from "./content/Booklets";
import {AddBooklet} from "./content/AddBooklet";

import modalStyles from "../Modal.module.sass";

import CloseIcon from "../../assets/svg/close.svg";

interface IBookletsModalProps {
  isShow: boolean;
  booklets: any[];
  onClose: Function;
  section: number;
  booklet: any;
}

export const BookletsModal: React.FC<IBookletsModalProps> = ({ isShow, booklets, onClose, section, booklet }) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState(section);
  const [currentBooklet, setCurrentBooklet] = useState(booklet);
  const contentSections = [
    <Booklets booklets={booklets} setActiveSection={setActiveSection} setCurrentBooklet={setCurrentBooklet} />,
    <AddBooklet booklet={currentBooklet} setActiveSection={setActiveSection} />
  ] as JSX.Element[];

  useEffect(() => {
    setActiveSection(section);
    setCurrentBooklet(booklet);
  }, [isShow]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={`${modalStyles.modal_content} ${activeSection === 0 ? modalStyles.wide : ""}`}>
        <div className={modalStyles.head}>
          <h4>{
            activeSection === 0
            ? t("booklets.booklets")
            : currentBooklet.id === -1
              ? t("booklets.creating_a_booklet")
              : t("booklets.editing_a_booklet")
          }</h4>
          <div
            className={modalStyles.close}
            onClick={() => onClose()}
          >
            <img src={CloseIcon} alt=""/>
          </div>
        </div>
        {contentSections[activeSection]}
      </div>
    </div>
  );
};
