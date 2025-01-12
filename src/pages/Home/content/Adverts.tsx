import { useState } from "react";
import {useTranslation} from "react-i18next";

import { AdvertModal } from "../../../modals/Advert/AdvertModal";

import { AdvertCard } from "../../../cards/advert/AdvertCard";

import globalStyles from "../../../App.module.sass";
import styles from "../Home.module.sass";

import TestPhoto from "../../../assets/png/test-advert.png";
import PlusIcon from "../../../assets/svg/plus.svg";

export const Adverts = () => {
  const { t } = useTranslation();
  const [isAdvertModalShow, setIsAdvertModalShow] = useState(false);

  const adverts = Array(7)
    .fill(1)
    .map((_item, index) => {
      return {
        id: index,
        photo: TestPhoto,
        name: "Study in Russia!",
        description:
          "Apply TODAY to get Admission at Kazan Innovative University",
        state: index === 0 || index % 2 === 0 ? 0 : 1,
        endDate: "до 30 сентября",
        views: 767,
        viewsLimit: 1000,
        clicks: 35,
        clicksLimit: 100,
      };
    });

  return (
    <div className={styles.content}>
      <div className={`${styles.adverts} ${styles.content_container}`}>
        <div className={styles.content_container_head}>
          <div className={styles.head_title}>
            <h4>{t("navigation.advertisements")}</h4>
            <div className={styles.count}>{adverts.length}</div>
          </div>
        </div>
        {adverts.length > 0 ? (
          <div className={styles.adverts_container}>
            {adverts.map((advert, index) => {
              return (
                <div className={styles.advert_item} key={index}>
                  <AdvertCard advertItem={advert} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.empty_info}>
            <div className={styles.empty_message}>
              {t("advertisements.no_advertisements")}
            </div>
            <button className={globalStyles.small} type="button" onClick={() => setIsAdvertModalShow(true)}>
              {t("advertisements.launch_an_ad")}
              <img src={PlusIcon} alt="" />
            </button>
          </div>
        )}
        {adverts.length > 0 ? (
          <button className={globalStyles.small} type="button" onClick={() => setIsAdvertModalShow(true)}>
            {t("advertisements.launch_an_ad")}
            <img src={PlusIcon} alt="" />
          </button>
        ) : null}
      </div>
      <AdvertModal
        isShow={isAdvertModalShow}
        onSave={() => setIsAdvertModalShow(false)}
        onClose={() => setIsAdvertModalShow(false)}
      />
    </div>
  );
};
