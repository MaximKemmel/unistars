import {useTranslation} from "react-i18next";

import styles from "./Toggle.module.sass";

import {IToggleItem} from "../../types/local/toggleItem";
import React from "react";

interface IToggleProps {
  selectedIndex?: number;
  items?: IToggleItem[];
  onItemSelect?: Function;
  isSettings?: boolean;
}

export const Toggle: React.FC<IToggleProps> = ({selectedIndex, items, onItemSelect, isSettings}) => {
  const {t, i18n} = useTranslation();
  const locales = {
    ru: {title: t("settings.russian")},
    en: {title: t("settings.english")},
  };

  return (
    <div className={`${styles.toggle_container} ${isSettings ? styles.settings : ""}`}>
      {isSettings ? (
        <>
          {Object.keys(locales).map((locale: string, index: number) => (
            <div
              key={index}
              className={`${styles.toggle_item} ${i18n.resolvedLanguage === locale ? styles.active : ""}`}
              onClick={() => {
                i18n.changeLanguage(locale);
              }}
            >
              {locales[locale].title}
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
              {item.text}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
