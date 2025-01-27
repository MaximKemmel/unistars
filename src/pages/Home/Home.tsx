import { useEffect, useState } from "react";
import { IAmbassadorId } from "src/types/local/ambassadorId";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { Navigation } from "./content/Navigation";
import { Main } from "./content/Main";
import { Events } from "./content/Events";
import { Adverts } from "./content/Adverts";
import { MailList } from "./content/MailList";

import styles from "./Home.module.sass";

export const Home = () => {
  const {
    getUniversityProfile,
    getSubscribersList,
    getStudent,
    clearStudents,
    getAmbassador,
    clearAmbassadors,
    getEmployeeList,
    getBookletList,
    getEventList,
    getEventTypes,
    getAdvertList,
  } = useActions();
  const universityProfile = useTypedSelector(
    (state) => state.universityReducer.universityProfile,
  );
  const [activeSection, setActiveSection] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const contentSections = [
    <Main />,
    <Events />,
    <Adverts />,
    <MailList />,
  ] as JSX.Element[];

  useEffect(() => {
    getUniversityProfile();
  }, []);

  useEffect(() => {
    if (universityProfile != undefined && universityProfile.id) {
      getSubscribersList({ universityId: universityProfile.id });
      getEmployeeList();
      getBookletList({ universityId: universityProfile.id });
      getEventList();
      getEventTypes();
      getAdvertList();

      if (
        universityProfile.studentIds != undefined &&
        Array.isArray(universityProfile.studentIds)
      ) {
        clearStudents();
        universityProfile.studentIds.forEach((id: number) => {
          getStudent({ studentId: id });
        });
      }

      if (
        universityProfile.ambassadorIds != undefined &&
        Array.isArray(universityProfile.ambassadorIds)
      ) {
        clearAmbassadors();
        universityProfile.ambassadorIds.forEach(
          (ambassadorId: IAmbassadorId) => {
            getAmbassador({ ambassadorId: ambassadorId.studentId! });
          },
        );
      }
    }
  }, [universityProfile]);

  return (
    <div className={styles.container}>
      <Navigation
        activeNav={activeSection}
        setActiveNav={setActiveSection}
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
      />
      {contentSections[activeSection]}
    </div>
  );
};
