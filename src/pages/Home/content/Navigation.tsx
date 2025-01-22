import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SettingsModal } from "../../../modals/Settings/SettingsModal";

import styles from "../Home.module.sass";

import Logo from "../../../assets/svg/logo-black.svg";
import LogoMinimized from "../../../assets/svg/logo-minimized.svg";
import { Home as HomeIcon } from "../../../assets/svgComponents/Home";
import { Event as EventIcon } from "../../../assets/svgComponents/Event";
import { Advert as AdvertIcon } from "../../../assets/svgComponents/Advert";
import SettingsIcon from "../../../assets/svg/settings.svg";
import LogoutIcon from "../../../assets/svg/logout.svg";
import CarretLeftIcon from "../../../assets/svg/carret-left.svg";
import { useTranslation } from "react-i18next";

interface INavigationProps {
  activeNav: number;
  setActiveNav: React.Dispatch<React.SetStateAction<number>>;
  isMinimized: boolean;
  setIsMinimized: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navigation: React.FC<INavigationProps> = ({ activeNav, setActiveNav, isMinimized, setIsMinimized }) => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [isSettingsModalShow, setIsSettingsModalShow] = useState(false);

  const navItems = [
    {
      id: 0,
      text: t("navigation.home"),
      icon: <HomeIcon />,
      activeIcon: <HomeIcon isActive={true} />,
    },
    {
      id: 1,
      text: t("navigation.events"),
      icon: <EventIcon />,
      activeIcon: <EventIcon isActive={true} />,
    },
    {
      id: 2,
      text: t("navigation.advertisements"),
      icon: <AdvertIcon />,
      activeIcon: <AdvertIcon isActive={true} />,
    },
    {
      id: 3,
      text: t("navigation.mail_list"),
      icon: <AdvertIcon />,
      activeIcon: <AdvertIcon isActive={true} />,
    },
  ];

  return (
    <>
      <div className={`${styles.navigation} ${isMinimized ? styles.minimized : i18n.resolvedLanguage === "en" ? styles.wide : ""}`}>
        <div className={styles.part}>
          <img className={styles.logo} src={isMinimized ? LogoMinimized : Logo} alt="" />
        </div>
        <nav>
          {navItems.map((item) => {
            return (
              <div className={styles.nav_item_container} key={item.id}>
                <div
                  className={`${styles.nav_item} ${activeNav === item.id ? styles.active : ""}`}
                  onClick={() => setActiveNav(item.id)}
                >
                  {activeNav === item.id ? item.activeIcon : item.icon}
                  {!isMinimized ? item.text : ""}
                </div>
                <div className={styles.hidden}>{item.text}</div>
              </div>
            );
          })}
        </nav>
        <div className={`${styles.part} ${styles.bottom}`}>
          <div className={styles.nav_item_container}>
            <div className={styles.nav_item} onClick={() => setIsSettingsModalShow(true)}>
              <img src={SettingsIcon} alt="" />
              {!isMinimized ? t("global.settings") : ""}
            </div>
            <div className={styles.hidden}>{t("global.settings")}</div>
          </div>
          <div className={styles.nav_item_container}>
            <div className={`${styles.nav_item} ${styles.logout}`} onClick={() => navigate("/")}>
              <img src={LogoutIcon} alt="" />
              {!isMinimized ? t("navigation.logout") : ""}
            </div>
            <div className={styles.hidden}>{t("navigation.logout")}</div>
          </div>
          <div className={styles.separator} />
          <div className={styles.nav_item_container}>
            <div className={`${styles.nav_item} ${styles.minimize}`} onClick={() => setIsMinimized(!isMinimized)}>
              <img className={isMinimized ? styles.minimized : ""} src={CarretLeftIcon} alt="" />
              <div className={isMinimized ? styles.hidden : ""}>{!isMinimized ? t("navigation.hide") : ""}</div>
            </div>
            <div className={styles.hidden}>{t("navigation.show")}</div>
          </div>
        </div>
      </div>
      <SettingsModal isShow={isSettingsModalShow} onClose={() => setIsSettingsModalShow(false)} />
    </>
  );
};
