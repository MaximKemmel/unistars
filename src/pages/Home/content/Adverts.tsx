import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { AdvertModal } from "../../../modals/Advert/Advert";
import { StatusInfoModal } from "../../../modals/StatusInfo/StatusInfo";

import { AdvertCard } from "../../../cards/advert/AdvertCard";

import globalStyles from "../../../App.module.sass";
import styles from "../Home.module.sass";

import { IAdvert } from "../../../types/advert/advert";
import { ApiStatusType } from "../../../enums/local/apiStatusType";
import { initApiStatus } from "../../../types/local/apiStatus";

import PlusIcon from "../../../assets/svg/plus.svg";

export const Adverts = () => {
  const { t } = useTranslation();
  const {
    getAdvertList,
    getAdvertRequestList,
    postAdvert,
    setGetAdvertsStatus,
    setPostAdvertStatus,
  } = useActions();
  const adverts = useTypedSelector((state) => state.advertReducer.adverts);
  const getStatus = useTypedSelector((state) => state.advertReducer.getStatus);
  const postStatus = useTypedSelector(
    (state) => state.advertReducer.postStatus,
  );
  const [isAdvertModalShow, setIsAdvertModalShow] = useState(false);
  const [isStatusInfoModalShow, setIsStatusInfoModalShow] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusSuccess, setIsStatusSuccess] = useState(true);

  useEffect(() => {
    switch (getStatus.status) {
      case ApiStatusType.SUCCESS:
        setGetAdvertsStatus(initApiStatus());
        getAdvertRequestList();
        break;
    }
  }, [getStatus]);

  useEffect(() => {
    switch (postStatus.status) {
      case ApiStatusType.SUCCESS:
        setPostAdvertStatus(initApiStatus());
        getAdvertList();
        setIsAdvertModalShow(false);
        setStatusMessage(t("advertisements.advert_was_added"));
        setIsStatusInfoModalShow(true);
        setIsStatusSuccess(true);
        break;
      case ApiStatusType.ERROR:
        setPostAdvertStatus(initApiStatus());
        setIsAdvertModalShow(false);
        break;
    }
  }, [postStatus]);

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
            {adverts.map((advert: IAdvert, index: number) => {
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
            <button
              className={globalStyles.small}
              type="button"
              onClick={() => setIsAdvertModalShow(true)}
            >
              {t("advertisements.launch_an_ad")}
              <img src={PlusIcon} alt="" />
            </button>
          </div>
        )}
        {adverts.length > 0 ? (
          <button
            className={globalStyles.small}
            type="button"
            onClick={() => setIsAdvertModalShow(true)}
          >
            {t("advertisements.launch_an_ad")}
            <img src={PlusIcon} alt="" />
          </button>
        ) : null}
      </div>
      <AdvertModal
        isShow={isAdvertModalShow}
        onSave={(editedAdvert: IAdvert) => postAdvert({ advert: editedAdvert })}
        onClose={() => setIsAdvertModalShow(false)}
      />
      <StatusInfoModal
        isShow={isStatusInfoModalShow}
        message={statusMessage}
        isSuccess={isStatusSuccess}
        onClose={() => setIsStatusInfoModalShow(false)}
        isRestore={false}
        onRestore={() => setIsStatusInfoModalShow(false)}
      />
    </div>
  );
};
