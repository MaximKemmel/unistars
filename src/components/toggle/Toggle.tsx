import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./Toggle.module.sass";

import { IToggleItem } from "../../types/local/toggleItem";

interface IToggleProps {
  selectedIndex?: number;
  items?: IToggleItem[];
  onItemSelect?: Function;
  isSettings?: boolean;
  isShorts?: boolean;
}

export const Toggle: React.FC<IToggleProps> = ({
  selectedIndex,
  items,
  onItemSelect,
  isSettings,
  isShorts,
}) => {
  const { t, i18n } = useTranslation();
  const locales = {
    Ru: { title: t("settings.russian") },
    En: { title: t("settings.english") },
  };

  return (
    <div className={styles.toggle_container}>
      {isSettings ? (
        <>
          {Object.keys(locales).map((locale: string, index: number) => (
            <div
              key={index}
              className={`${styles.toggle_item} ${i18n.resolvedLanguage === locale.toLowerCase() ? styles.active : ""}`}
              onClick={() => {
                i18n.changeLanguage(locale.toLowerCase());
              }}
            >
              {isShorts ? <>{locale}</> : <>{locales[locale].title}</>}
            </div>
          ))}
        </>
      ) : (
        <>
          {items!.map((item: IToggleItem) => (
            <div
              key={item.id}
              className={`${styles.toggle_item} ${selectedIndex === item.id ? styles.active : ""}`}
              onClick={() => onItemSelect!(item)}
            >
              {i18n.resolvedLanguage === "ru" ? item.text : item.text_eng}
              {item.count != undefined ? <span>{item.count}</span> : null}
            </div>
          ))}
        </>
      )}
      {isSettings ? (
        <div
          className={`${styles.plate} ${i18n.resolvedLanguage === "ru" ? styles.left : styles.right}`}
        />
      ) : (
        <div
          className={`${styles.plate} ${selectedIndex === 0 ? styles.left : styles.right}`}
        />
      )}
    </div>
  );
};
