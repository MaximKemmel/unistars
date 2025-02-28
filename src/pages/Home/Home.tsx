import { useEffect, useState } from "react";
import { IAmbassadorId } from "src/types/ambassador/ambassadorId";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { Navigation } from "./content/Navigation";
import { Main } from "./content/Main";
import { Events } from "./content/Events";
import { Adverts } from "./content/Adverts";
import { MailList } from "./content/MailList";

import styles from "./Home.module.sass";
import { IAmbassadorRequest } from "src/types/ambassador/ambassadorRequest";

export const Home = () => {
  const {
    getUniversityProfile,
    getCountries,
    getCities,
    getSubscribersList,
    getStudents,
    clearStudents,
    getAmbassador,
    getAmbassadorRequest,
    clearAmbassadors,
    getEmployeeList,
    getBookletList,
    getEventList,
    getEventTypes,
    getAdvertList,
    getMailingList,
  } = useActions();
  const universityProfile = useTypedSelector(
    (state) => state.universityReducer.universityProfile,
  );
  const countries = useTypedSelector((state) => state.coreReducer.countries);
  const cities = useTypedSelector((state) => state.coreReducer.cities);
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
      getMailingList();

      if (!Array.isArray(countries) || countries.length === 0) {
        getCountries();
      }
      if (!Array.isArray(cities) || cities.length === 0) {
        getCities();
      }

      if (
        universityProfile.studentIds != undefined &&
        Array.isArray(universityProfile.studentIds)
      ) {
        clearStudents();
        getStudents();
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

      if (
        universityProfile.ambassadorRequests != undefined &&
        Array.isArray(universityProfile.ambassadorRequests)
      ) {
        clearAmbassadors();
        universityProfile.ambassadorRequests.forEach(
          (ambassadorRequest: IAmbassadorRequest) => {
            getAmbassadorRequest({ ambassadorId: ambassadorRequest.id! });
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
