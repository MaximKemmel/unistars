import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { UserCard } from "../../cards/user/UserCard";
import { Dropdown } from "../../components/dropdown/Dropdown";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./SubscribersModal.module.sass";

import { IUser } from "../../types/user/user";
import { IDropdownItem } from "../../types/local/dropdownItem";
import { periods } from "../../data/periods";
import { IPeriod } from "../../types/local/period";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import { Export as ExportIcon } from "../../assets/svgComponents/Export";
import SearchIcon from "../../assets/svg/search.svg";
import NothingFound from "../../assets/svg/nothing-found.svg";

interface ISubscribersModalProps {
  subscribers: IUser[];
  isShow: boolean;
  onDownload: Function;
  onClose: Function;
}

export const SubscribersModal: React.FC<ISubscribersModalProps> = ({
  subscribers,
  isShow,
  onDownload,
  onClose,
}) => {
  const { t } = useTranslation();
  const [filteredSubscribers, setFilteredSubscribers] = useState(subscribers);
  const [searchValue, setSearchValue] = useState("");
  const [activePeriod, setActivePeriod] = useState(-1);

  useEffect(() => {
    const contentDiv = document.getElementById("subscribers_content");
    contentDiv?.scrollTo({ top: 0, behavior: "smooth" });
    setFilteredSubscribers(subscribers);
  }, [isShow]);

  useEffect(() => {
    if (searchValue.length === 0) {
      setFilteredSubscribers(subscribers);
    } else {
      setFilteredSubscribers(
        subscribers.filter((subscriber: IUser) =>
          subscriber.fullName.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
    }
  }, [searchValue]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>{t("subscribers.subscribers")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.subscribers_container}>
          <div className={styles.subscribers_content} id="subscribers_content">
            <div className={modalStyles.search_input}>
              <input
                placeholder={t("subscribers.subscriber_search")}
                type="text"
                onChange={(event) => setSearchValue(event.target.value)}
                value={searchValue}
              />
              <img
                className={modalStyles.search_icon}
                src={SearchIcon}
                alt=""
              />
              {searchValue.length > 0 ? (
                <div
                  className={modalStyles.clear}
                  onClick={() => setSearchValue("")}
                >
                  <CloseIcon fill="#68778D" />
                </div>
              ) : null}
            </div>
            <div className={styles.dropdown_input}>
              <Dropdown
                placeholder={t("subscribers.time_period")}
                items={[
                  {
                    id: -1,
                    text: t("global.not_selected"),
                    text_eng: t("global.not_selected"),
                    is_selected: activePeriod === -1,
                  } as IDropdownItem,
                  ...(periods.map((periodItem: IPeriod) => {
                    return {
                      id: periodItem.id,
                      text: periodItem.period,
                      text_eng: periodItem.period_eng,
                      is_selected: activePeriod === periodItem.id,
                    } as IDropdownItem;
                  }) as IDropdownItem[]),
                ]}
                onItemSelect={(item: IDropdownItem) => {
                  setActivePeriod(item.id);
                }}
              />
            </div>
            <div
              className={styles.subscribers_count}
            >{`${t("global.founded")}: ${filteredSubscribers.length}`}</div>
            {subscribers.length === 0 ? (
              <div className={modalStyles.empty_container}>
                <img
                  className={modalStyles.empty_image}
                  src={NothingFound}
                  alt=""
                />
                <div className={styles.empty_info}>
                  <div className={styles.empty_title}>
                    {t("global.nothing_was_found")}
                  </div>
                  <div className={styles.empty_description}>
                    {t("subscribers.don_t_have_subscribers")}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {filteredSubscribers.length === 0 ? (
                  <div className={modalStyles.empty_container}>
                    <img
                      className={modalStyles.empty_image}
                      src={NothingFound}
                      alt=""
                    />
                    <div className={modalStyles.empty_info}>
                      <div className={modalStyles.empty_title}>
                        {t("global.nothing_was_found")}
                      </div>
                      <div className={modalStyles.empty_description}>
                        {t("global.enter_other_params")}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {filteredSubscribers.map((subscriber: IUser) => (
                      <div
                        className={styles.subscriber_item}
                        key={subscriber.id}
                      >
                        <UserCard
                          userItem={{
                            name: subscriber.fullName,
                            description: subscriber.description,
                            photo: subscriber.avatarUrl,
                          }}
                        />
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className={modalStyles.actions}>
          <div />
          <button
            className={globalStyles.small}
            type="button"
            disabled={subscribers.length === 0}
            onClick={() => onDownload()}
          >
            <ExportIcon isDisabled={subscribers.length === 0} />
            {t("subscribers.upload_data")}
          </button>
        </div>
      </div>
    </div>
  );
};
