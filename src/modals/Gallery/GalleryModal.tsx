import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

import {Gallery} from "./content/Gallery";
import {EditPhotos} from "./content/EditPhotos";
import {DeletePhotos} from "./content/DeletePhotos";

import modalStyles from "../Modal.module.sass";

import CloseIcon from "../../assets/svg/close.svg";

interface IGalleryModalProps {
  isShow: boolean;
  photos: any[];
  onUpload: Function;
  onEdit: Function;
  onClose: Function;
}

export const GalleryModal: React.FC<IGalleryModalProps> = ({isShow, photos, onUpload, onEdit, onClose}) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState(0);
  const contentSections = [
    <Gallery photos={photos} setActiveSection={setActiveSection} />,
    <EditPhotos photos={photos} setActiveSection={setActiveSection} />,
    <DeletePhotos onConfirm={() => {}} setActiveSection={setActiveSection} />,
  ] as JSX.Element[];

  useEffect(() => {
    setActiveSection(0);
  }, [isShow]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => {
          onClose();
          onEdit();
          onUpload();
        }}
      />
      <div className={`${modalStyles.modal_content} ${activeSection !== 2 ? modalStyles.wide : ""}`}>
        <div className={modalStyles.head}>
          <h4>{activeSection === 2 ? t("gallery.deleting_photos") : t("gallery.gallery")}</h4>
          <div
            className={modalStyles.close}
            onClick={() => {
              if (activeSection === 2) {
                setActiveSection(0);
              } else {
                onClose();
              }
            }}
          >
            <img src={CloseIcon} alt=""/>
          </div>
        </div>
        {contentSections[activeSection]}
      </div>
    </div>
  );
};
