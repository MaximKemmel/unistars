import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./AdvertCard.module.sass";

import { IAdvert } from "../../types/advert/advert";

import TimeIcon from "../../assets/svg/time.svg";
import ViewIcon from "../../assets/svg/view.svg";
import ClickIcon from "../../assets/svg/click.svg";

interface IAdvertCardProps {
  advertItem: IAdvert;
}

//TODO: Статус рекламы (на модерации, опубликовано)
export const AdvertCard: React.FC<IAdvertCardProps> = ({ advertItem }) => {
  const { i18n, t } = useTranslation();

  const advertState = 0;

  return (
    <div className={styles.advert_container}>
      <div className={styles.advert_head}>
        {advertItem.imageUrl.trim().length > 5 ? (
          <img src={advertItem.imageUrl} alt="" />
        ) : null}
        <div className={styles.photo_overlay} />
        <div className={styles.advert_info}>
          <div className={styles.advert_name}>{advertItem.title}</div>
          <div className={styles.advert_description}>{advertItem.subtitle}</div>
        </div>
        <div
          className={`${styles.advert_status} ${advertState === 0 ? styles.moderation : styles.published}`}
        >
          {advertState === 0
            ? t("advertisements.moderation")
            : t("advertisements.published")}
        </div>
      </div>
      <div className={styles.additional_info}>
        <div className={styles.info_item}>
          <img className={styles.item_icon} src={TimeIcon} alt="" />
          {`${t("advertisements.until")} ${new Date(advertItem.endDate!)
            .toLocaleDateString(
              `${i18n.resolvedLanguage}-${i18n.resolvedLanguage?.toUpperCase()}`,
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              },
            )
            .replace(/\s*г\./, "")}`}
        </div>
        <div className={styles.info_progress_item}>
          <div className={styles.progress_head}>
            <div className={styles.info_item}>
              <img className={styles.item_icon} src={ViewIcon} alt="" />
              <div>{`${advertItem.allShows!} ${t("advertisements.views")}`}</div>
            </div>
            <div
              className={styles.info_limit}
            >{`${advertItem.showsLimit!} ${t("advertisements.limit")}`}</div>
          </div>
          <div className={styles.progress_bar}>
            <div
              className={styles.progress}
              style={{
                width: `${advertItem.allShows === 0 ? "0" : (advertItem.allShows! * 100) / advertItem.showsLimit!}%`,
              }}
            />
          </div>
        </div>
        <div className={styles.info_progress_item}>
          <div className={styles.progress_head}>
            <div className={styles.info_item}>
              <img className={styles.item_icon} src={ClickIcon} alt="" />
              <div>{`${advertItem.allClicks} ${t("advertisements.clicks")}`}</div>
            </div>
            <div
              className={styles.info_limit}
            >{`${advertItem.clickLimit} ${t("advertisements.limit")}`}</div>
          </div>
          <div className={styles.progress_bar}>
            <div
              className={styles.progress}
              style={{
                width: `${advertItem.allClicks === 0 ? "0" : (advertItem.allClicks! * 100) / advertItem.clickLimit!}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
