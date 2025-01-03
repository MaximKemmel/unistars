import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Home.module.sass";

import Logo from "../../assets/svg/logo-black.svg";
import LogoMinimized from "../../assets/svg/logo-minimized.svg";
import HomeIcon from "../../assets/svg/home-inactive.svg";
import HomeActiveIcon from "../../assets/svg/home-active.svg";
import EventsIcon from "../../assets/svg/events-inactive.svg";
import EventsActiveIcon from "../../assets/svg/events-active.svg";
import AdvertIcon from "../../assets/svg/advert-inactive.svg";
import AdvertActiveIcon from "../../assets/svg/advert-active.svg";
import SettingsIcon from "../../assets/svg/settings.svg";
import LogoutIcon from "../../assets/svg/logout.svg";
import CarretLeftIcon from "../../assets/svg/carret-left.svg";

export const Home = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState(0);
  const [isMimimized, setIsMinimized] = useState(false);
  const navItems = [
    {
      id: 0,
      text: "Главная",
      icon: HomeIcon,
      activeIcon: HomeActiveIcon,
    },
    {
      id: 1,
      text: "Ивенты",
      icon: EventsIcon,
      activeIcon: EventsActiveIcon,
    },
    {
      id: 2,
      text: "Реклама",
      icon: AdvertIcon,
      activeIcon: AdvertActiveIcon,
    },
  ];

  return (
    <div className={styles.container}>
      <div
        className={`${styles.navigation} ${
          isMimimized ? styles.minimized : ""
        }`}
      >
        <div className={styles.part}>
          <img
            className={styles.logo}
            src={isMimimized ? LogoMinimized : Logo}
            alt=""
          />
        </div>
        <nav>
          {navItems.map((item) => {
            return (
              <div className={styles.nav_item_container}>
                <div
                  className={`${styles.nav_item} ${activeNav === item.id ? styles.active : ""}`}
                  onClick={() => setActiveNav(item.id)}
                >
                  <img
                    src={activeNav === item.id ? item.activeIcon : item.icon}
                    alt=""
                  />
                  {!isMimimized ? item.text : ""}
                </div>
                <div className={styles.hidden}>{item.text}</div>
              </div>
            );
          })}
        </nav>
        <div className={`${styles.part} ${styles.bottom}`}>
          <div className={styles.nav_item_container}>
            <div className={styles.nav_item}>
              <img src={SettingsIcon} alt="" />
              {!isMimimized ? "Настройки" : ""}
            </div>
            <div className={styles.hidden}>Настройки</div>
          </div>
          <div className={styles.nav_item_container}>
            <div
              className={`${styles.nav_item} ${styles.logout}`}
              onClick={() => navigate("/auth")}
            >
              <img src={LogoutIcon} alt="" />
              {!isMimimized ? "Выход" : ""}
            </div>
            <div className={styles.hidden}>Выход</div>
          </div>
          <div className={styles.separator} />
          <div className={styles.nav_item_container}>
            <div
              className={`${styles.nav_item} ${styles.minimize}`}
              onClick={() => setIsMinimized(!isMimimized)}
            >
              <img
                className={isMimimized ? styles.minimized : ""}
                src={CarretLeftIcon}
                alt=""
              />
              <div className={isMimimized ? styles.hidden : ""}>
                {!isMimimized ? "Скрыть" : ""}
              </div>
            </div>            
            <div className={styles.hidden}>Показать</div>
          </div>
        </div>
      </div>
      <div className={styles.content}></div>
    </div>
  );
};
