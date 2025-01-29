import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { UniversityInfoContainer } from "./mainContainers/UniversityInfoContainer";
import { GalleryContainer } from "./mainContainers/GalleryContainer";
import { BookletsContainer } from "./mainContainers/BookletsContainer";

import { SubscribersModal } from "../../../modals/Subscribers/Subscribers";
import { SubscribersDownloadModal } from "../../../modals/Subscribers/SubscribersDownload";
import { StudentsModal } from "../../../modals/Students/Students";
import { EditStudentsModal } from "../../../modals/Students/EditStudents";
import { AmbassadorsModal } from "../../../modals/Ambassadors/Ambassadors";
import { EditAmbassadorsModal } from "../../../modals/Ambassadors/EditAmbassadors";
import { EditAmbassadorRequestsModal } from "../../../modals/Ambassadors/EditAmbassadorRequests";
import { WorkersModal } from "../../../modals/Workers/WorkersModal";
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
  const employees = useTypedSelector(
    (state) => state.employeeReducer.employeeList,
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
    {
      id: 2,
      value:
        universityProfile.ambassadorIds !== undefined &&
        Array.isArray(universityProfile.ambassadorIds)
          ? universityProfile.ambassadorIds.length
          : 0,
      label: t("home.ambassadors"),
    },
    {
      id: 3,
      value: employees.length,
      label: t("home.employers"),
    },
  ];

  const [isSubscribersModalShow, setIsSubscribersModalShow] = useState(false);
  const [isSubscribersDownloadModalShow, setIsSubscribersDownloadModalShow] =
    useState(false);
  const [isStudentsModalShow, setIsStudentsModalShow] = useState(false);
  const [isStudentsEditModalShow, setIsStudentsEditModalShow] = useState(false);
  const [isAmbassadorsModalShow, setIsAmbassadorsModalShow] = useState(false);
  const [isAmbassadorsEditModalShow, setIsAmbassadorsEditModalShow] =
    useState(false);
  const [
    isAmbassadorRequestsEditModalShow,
    setIsAmbassadorRequestsEditModalShow,
  ] = useState(false);
  const [isWorkersModalShow, setIsWorkersModalShow] = useState(false);
  const [isConfirmDeleteModalShow, setIsConfirmDeleteModalShow] =
    useState(false);
  const [confirmDeleteHead, setConfirmDeleteHead] = useState("");
  const [confirmDeleteTitle, setConfirmDeleteTitle] = useState("");
  const [isStatusInfoModalShow, setIsStatusInfoModalShow] = useState(false);
  const [deleteMode, setDeleteMode] = useState("");

  const handleOnDeleteAmbassadors = (ambassadors: IUser[]) => {
    setDeleteMode("AMBASSADORS");
    console.log(ambassadors);
    setIsAmbassadorsEditModalShow(false);
    setConfirmDeleteHead(t("ambassadors.deleting_ambassadors"));
    setConfirmDeleteTitle(t("ambassadors.delete_description"));
    setIsConfirmDeleteModalShow(true);
  };

  const handleOnConfirmDeleteAmbassadors = () => {
    setIsConfirmDeleteModalShow(false);
    setIsStatusInfoModalShow(true);
  };

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
                    if (item.id === 2) {
                      setIsAmbassadorsModalShow(true);
                    }
                    if (item.id === 3) {
                      setIsWorkersModalShow(true);
                    }
                  }}
                >
                  <div className={styles.item_value}>{item.value}</div>
                  <div className={styles.item_label}>{item.label}</div>
                </div>
              );
            })}
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
      <AmbassadorsModal
        isShow={isAmbassadorsModalShow}
        onAmbassadorsEdit={() => {
          setIsAmbassadorsModalShow(false);
          setIsAmbassadorsEditModalShow(true);
        }}
        onAmbassadorRequestsEdit={() => {
          setIsAmbassadorsModalShow(false);
          setIsAmbassadorRequestsEditModalShow(true);
        }}
        onClose={() => {
          setIsAmbassadorsModalShow(false);
        }}
      />
      <EditAmbassadorsModal
        isShow={isAmbassadorsEditModalShow}
        onDelete={handleOnDeleteAmbassadors}
        onCancel={() => {
          setIsAmbassadorsEditModalShow(false);
          setIsAmbassadorsModalShow(true);
        }}
        onClose={() => setIsAmbassadorsEditModalShow(false)}
      />
      <EditAmbassadorRequestsModal
        isShow={isAmbassadorRequestsEditModalShow}
        onClose={() => setIsAmbassadorRequestsEditModalShow(false)}
      />
      <WorkersModal
        isShow={isWorkersModalShow}
        workers={employees}
        onClose={() => {
          setIsWorkersModalShow(false);
        }}
      />
      <ConfirmDeleteModal
        isShow={isConfirmDeleteModalShow}
        head={confirmDeleteHead}
        title={confirmDeleteTitle}
        message={""}
        onConfirm={() => {
          switch (deleteMode) {
            case "AMBASSADORS":
              handleOnConfirmDeleteAmbassadors();
              break;
            case "STUDENTS":
              handleOnConfirmDeleteStudents();
              break;
          }
        }}
        onClose={() => {
          setIsConfirmDeleteModalShow(false);
          setIsAmbassadorsEditModalShow(true);
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
