import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { UniversityInfoContainer } from "./mainContainers/UniversityInfoContainer";
import { GalleryContainer } from "./mainContainers/GalleryContainer";
import { BookletsContainer } from "./mainContainers/BookletsContainer";
import { SubscribersContainer } from "./userContainers/SubscribersContainer";
import { StudentsContainer } from "./userContainers/StudentsContainer";
import { AmbassadorsContainer } from "./userContainers/AmbassadorsContainer";
import { EmployersContainer } from "./userContainers/EmployersContainer";

import styles from "../Home.module.sass";

import VerifiedIcon from "../../../assets/svg/verified.svg";

export const Main = () => {
  const universityProfile = useTypedSelector(
    (state) => state.universityReducer.universityProfile,
  );

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
            <SubscribersContainer />
            <StudentsContainer />
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
    </>
  );
};
