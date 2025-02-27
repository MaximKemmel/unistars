import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { UniversityInfoContainer } from "./mainContainers/UniversityInfoContainer";
import { GalleryContainer } from "./mainContainers/GalleryContainer";
import { BookletsContainer } from "./mainContainers/BookletsContainer";
import { AmbassadorsContainer } from "./userContainers/AmbassadorsContainer";
import { EmployersContainer } from "./userContainers/EmployersContainer";

import { SubscribersModal } from "../../../modals/Subscribers/Subscribers";
import { SubscribersDownloadModal } from "../../../modals/Subscribers/SubscribersDownload";
import { StudentsModal } from "../../../modals/Students/Students";
import { EditStudentsModal } from "../../../modals/Students/EditStudents";
import { ConfirmDeleteModal } from "../../../modals/ConfirmDelete/ConfirmDelete";
import { StatusInfoModal } from "../../../modals/StatusInfo/StatusInfo";

import styles from "../Home.module.sass";

import { IUser } from "../../../types/user/user";

import VerifiedIcon from "../../../assets/svg/verified.svg";

export const Main = () => {
  const { t } = useTranslation();
  const universityProfile = useTypedSelector(
    (state) => state.universityReducer.universityProfile,
  );
  const subscribers = useTypedSelector(
    (state) => state.subscriberReducer.subscriberList,
  );

  const socialsInfo = [
    {
      id: 0,
      value: subscribers.length,
      label: t("home.subscribers"),
    },
    {
      id: 1,
      value:
        universityProfile.studentIds !== undefined &&
        Array.isArray(universityProfile.studentIds)
          ? universityProfile.studentIds.length
          : 0,
      label: t("home.students"),
    },
  ];

  const [isSubscribersModalShow, setIsSubscribersModalShow] = useState(false);
  const [isSubscribersDownloadModalShow, setIsSubscribersDownloadModalShow] =
    useState(false);
  const [isStudentsModalShow, setIsStudentsModalShow] = useState(false);
  const [isStudentsEditModalShow, setIsStudentsEditModalShow] = useState(false);
  const [isConfirmDeleteModalShow, setIsConfirmDeleteModalShow] =
    useState(false);
  const [confirmDeleteHead, setConfirmDeleteHead] = useState("");
  const [confirmDeleteTitle, setConfirmDeleteTitle] = useState("");
  const [isStatusInfoModalShow, setIsStatusInfoModalShow] = useState(false);
  const [deleteMode, setDeleteMode] = useState("");

  const handleOnDeleteStudents = (students: IUser[]) => {
    setDeleteMode("STUDENTS");
    console.log(students);
    setIsStudentsEditModalShow(false);
    setConfirmDeleteHead(t("students.deleting_students"));
    setConfirmDeleteTitle(t("students.delete_description"));
    setIsConfirmDeleteModalShow(true);
  };

  const handleOnConfirmDeleteStudents = () => {
    setIsConfirmDeleteModalShow(false);
    setIsStatusInfoModalShow(true);
  };

  return (
    <>
      <div className={styles.content}>
        <div className={`${styles.main_header} ${styles.content_container}`}>
          <div className={styles.main_univ_info}>
            <div className={styles.main_logo}>
              {universityProfile.logoUrl != undefined &&
              universityProfile.logoUrl.trim().length > 0 ? (
                <img src={universityProfile.logoUrl} alt="" />
              ) : null}
              {universityProfile.verified ? (
                <div className={styles.main_verified}>
                  <img src={VerifiedIcon} alt="" />
                </div>
              ) : null}
            </div>
            <h3 className={styles.main_univ_name}>
              {`${universityProfile.name} (${universityProfile.shortName})`}
            </h3>
          </div>
          <div className={styles.main_socials}>
            {socialsInfo.map((item, index) => {
              return (
                <div
                  className={styles.main_socials_item}
                  key={index}
                  onClick={() => {
                    if (item.id === 0) {
                      setIsSubscribersModalShow(true);
                    }
                    if (item.id === 1) {
                      setIsStudentsModalShow(true);
                    }
                  }}
                >
                  <div className={styles.item_value}>{item.value}</div>
                  <div className={styles.item_label}>{item.label}</div>
                </div>
              );
            })}
            <AmbassadorsContainer />
            <EmployersContainer />
          </div>
        </div>
        <UniversityInfoContainer />
        <div className={styles.content_container_multi}>
          <GalleryContainer />
          <BookletsContainer />
        </div>
      </div>
      <SubscribersModal
        isShow={isSubscribersModalShow}
        onDownload={() => {
          setIsSubscribersModalShow(false);
          setIsSubscribersDownloadModalShow(true);
        }}
        onClose={() => setIsSubscribersModalShow(false)}
      />
      <SubscribersDownloadModal
        isShow={isSubscribersDownloadModalShow}
        onClose={() => setIsSubscribersDownloadModalShow(false)}
      />
      <StudentsModal
        isShow={isStudentsModalShow}
        onEdit={() => {
          setIsStudentsModalShow(false);
          setIsStudentsEditModalShow(true);
        }}
        onClose={() => {
          setIsStudentsModalShow(false);
        }}
      />
      <EditStudentsModal
        isShow={isStudentsEditModalShow}
        onDelete={handleOnDeleteStudents}
        onCancel={() => {
          setIsStudentsEditModalShow(false);
          setIsStudentsModalShow(true);
        }}
        onClose={() => {
          setIsStudentsEditModalShow(false);
        }}
      />
      <ConfirmDeleteModal
        isShow={isConfirmDeleteModalShow}
        head={confirmDeleteHead}
        title={confirmDeleteTitle}
        message={""}
        onConfirm={() => {
          switch (deleteMode) {
            case "STUDENTS":
              handleOnConfirmDeleteStudents();
              break;
          }
        }}
        onClose={() => {
          setIsConfirmDeleteModalShow(false);
        }}
      />
      <StatusInfoModal
        isShow={isStatusInfoModalShow}
        message={t("booklets.booklet_was_deleted")}
        isSuccess={true}
        onClose={() => setIsStatusInfoModalShow(false)}
        isRestore={true}
        onRestore={() => setIsStatusInfoModalShow(false)}
      />
    </>
  );
};
