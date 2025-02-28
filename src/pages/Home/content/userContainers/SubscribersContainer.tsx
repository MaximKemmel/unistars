import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import { SubscribersModal } from "../../../../modals/Subscribers/Subscribers";
import { SubscribersDownloadModal } from "../../../../modals/Subscribers/SubscribersDownload";

import styles from "../../Home.module.sass";

export const SubscribersContainer = () => {
  const { t } = useTranslation();
  const subscribers = useTypedSelector(
    (state) => state.subscriberReducer.subscriberList,
  );
  const [isSubscribersModalShow, setIsSubscribersModalShow] = useState(false);
  const [isDownloadSubscribersModalShow, setIsDownloadSubscribersModalShow] =
    useState(false);

  return (
    <>
      <div
        className={styles.main_socials_item}
        onClick={() => setIsSubscribersModalShow(true)}
      >
        <div className={styles.item_value}>{subscribers.length}</div>
        <div className={styles.item_label}>{t("home.subscribers")}</div>
      </div>
      <SubscribersModal
        isShow={isSubscribersModalShow}
        onDownload={() => {
          setIsSubscribersModalShow(false);
          setIsDownloadSubscribersModalShow(true);
        }}
        onClose={() => setIsSubscribersModalShow(false)}
      />
      <SubscribersDownloadModal
        isShow={isDownloadSubscribersModalShow}
        onClose={() => setIsDownloadSubscribersModalShow(false)}
      />
    </>
  );
};
