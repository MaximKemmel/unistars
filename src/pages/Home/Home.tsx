import { useEffect, useState } from "react";

import { useActions } from "../../hooks/useActions";

import { Navigation } from "./content/Navigation";
import { Main } from "./content/Main";
import { Events } from "./content/Events";
import { Adverts } from "./content/Adverts";
import { MailList } from "./content/MailList";

import styles from "./Home.module.sass";

export const Home = () => {
  const { getUniversityProfile } = useActions();
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
