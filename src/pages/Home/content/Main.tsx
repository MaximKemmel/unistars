import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { UniversityInfoContainer } from "./mainContainers/UniversityInfoContainer";
import { GalleryContainer } from "./mainContainers/GalleryContainer";
import { BookletsContainer } from "./mainContainers/BookletsContainer";
import { SubscribersModal } from "../../../modals/Subscribers/SubscribersModal";
import { SubscribersDownloadModal } from "../../../modals/Subscribers/SubscribersDownload";
import { StudentsModal } from "../../../modals/Students/StudentsModal";
import { AmbassadorsModal } from "../../../modals/Ambassadors/AmbassadorsModal";
import { WorkersModal } from "../../../modals/Workers/WorkersModal";

import styles from "../Home.module.sass";

import VerifiedIcon from "../../../assets/svg/verified.svg";
import TestAvatar from "../../../assets/png/test-avatar.png";

export const Main = () => {
  const { t } = useTranslation();
  const universityProfile = useTypedSelector(
    (state) => state.universityReducer.universityProfile,
  );
  const subscribers = useTypedSelector(
    (state) => state.subscriberReducer.allSubscribers,
  );
  const students = useTypedSelector(
    (state) => state.studentReducer.studentList,
  );
  const ambassadors = useTypedSelector(
    (state) => state.ambassadorReducer.ambassadorList,
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

  const requestedAmbassadors = Array(11)
    .fill(1)
    .map((_item, index) => {
      return {
        id: index + 100,
        photo: TestAvatar,
        name: "Tom Smith",
        description: "Ural Federal University",
        isChecked: false,
      };
    });

  const [isSubscribersModalShow, setIsSubscribersModalShow] = useState(false);
  const [isSubscribersDownloadModalShow, setIsSubscribersDownloadModalShow] =
    useState(false);
  const [isStudentsModalShow, setIsStudentsModalShow] = useState(false);
  const [isAmbassadorsModalShow, setIsAmbassadorsModalShow] = useState(false);
  const [isWorkersModalShow, setIsWorkersModalShow] = useState(false);

  return (
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
      <SubscribersModal
        subscribers={subscribers}
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
        students={students}
        onClose={() => {
          setIsStudentsModalShow(false);
        }}
      />
      <AmbassadorsModal
        isShow={isAmbassadorsModalShow}
        ambassadors={ambassadors}
        requestedAmbassadors={requestedAmbassadors}
        onClose={() => {
          setIsAmbassadorsModalShow(false);
        }}
      />
      <WorkersModal
        isShow={isWorkersModalShow}
        workers={employees}
        onClose={() => {
          setIsWorkersModalShow(false);
        }}
      />
    </div>
  );
};
