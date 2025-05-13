import { useEffect, useState } from "react";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { Navigation } from "./content/Navigation";
import { Main } from "./content/Main";
import { Profiles } from "./content/Profiles";
import { Events } from "./content/Events";
import { Adverts } from "./content/Adverts";
import { MailingList } from "./content/MailingList";

import styles from "./Home.module.sass";

export const Home = () => {
  const {
    getUniversityProfile,
    getCountries,
    getCities,
    getLanguages,
    getSubscribersList,
    getStudents,
    clearStudents,
    getAmbassadorList,
    getAmbassadorRequestList,
    getEmployeeList,
    getBookletList,
    getEventList,
    getEventTypes,
    getAdvertList,
    getProfilesList,
  } = useActions();
  const universityProfile = useTypedSelector(
    (state) => state.universityReducer.universityProfile,
  );
  const countries = useTypedSelector((state) => state.coreReducer.countries);
  const cities = useTypedSelector((state) => state.coreReducer.cities);
  const languages = useTypedSelector((state) => state.coreReducer.languages);
  const [activeSection, setActiveSection] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const contentSections = [
    <Main />,
    <Profiles />,
    <Events />,
    <Adverts />,
    <MailingList />,
  ] as JSX.Element[];

  useEffect(() => {
    getUniversityProfile();
  }, []);

  useEffect(() => {
    if (universityProfile != undefined && universityProfile.id) {
      getSubscribersList({ universityId: universityProfile.id });
      getAmbassadorList();
      getAmbassadorRequestList();
      getEmployeeList();
      getBookletList({ universityId: universityProfile.id });
      getEventList();
      getEventTypes();
      getAdvertList();
      getProfilesList();

      if (!Array.isArray(countries) || countries.length === 0) {
        getCountries();
      }
      if (!Array.isArray(cities) || cities.length === 0) {
        getCities();
      }
      if (!Array.isArray(languages) || languages.length === 0) {
        getLanguages();
      }

      if (
        universityProfile.studentIds != undefined &&
        Array.isArray(universityProfile.studentIds)
      ) {
        clearStudents();
        getStudents();
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
