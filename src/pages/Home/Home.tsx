import { useState } from "react";

import { Navigation } from "./content/Navigation";
import { Main } from "./content/Main";
import { Events } from "./content/Events";
import { Adverts } from "./content/Adverts";
import { MailList } from "./content/MailList";

import styles from "./Home.module.sass";

export const Home = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const contentSections = [<Main />, <Events />, <Adverts />, <MailList />] as JSX.Element[];

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
