import React, { useEffect, useState } from "react";
import {useTranslation} from "react-i18next";

import { UserCard } from "../../../cards/user/UserCard";
import { Dropdown } from "../../../components/dropdown/Dropdown";

import modalStyles from "../../Modal.module.sass";
import styles from "../SubscribersModal.module.sass";

import { IDropdownItem } from "../../../types/local/dropdownItem";
import { DropdownType } from "../../../enums/dropdownType";
import { periods } from "../../../data/periods";
import { IPeriod } from "../../../types/local/period";

import SearchIcon from "../../../assets/svg/search.svg";
import NothingFound from "../../../assets/svg/nothing-found.svg";
import { Close as CloseIcon } from "../../../assets/svgComponents/Close";

interface ISubscribersProps {
  subscribers: any[];
}

export const Subscribers: React.FC<ISubscribersProps> = ({ subscribers }) => {
  const { t } = useTranslation();
  const [filteredSubscribers, setFilteredSubscribers] = useState(subscribers);
  const [searchValue, setSearchValue] = useState("");
  const [activePeriod, setActivePeriod] = useState(-1);
  const [activeComponent, setActiveComponent] = useState(DropdownType.None);

  useEffect(() => {
    if (searchValue.length === 0) {
      setFilteredSubscribers(subscribers);
    } else {
      setFilteredSubscribers(
        subscribers.filter((subscriber) => subscriber.name.toLowerCase().includes(searchValue.toLowerCase()))
      );
    }
  }, [searchValue]);

  return (
    <div className={styles.subscribers_content}>
      <div className={modalStyles.search_input}>
        <input
          placeholder={t("subscribers.subscriber_search")}
          type="text"
          onChange={(event) => setSearchValue(event.target.value)}
          value={searchValue}
        />
        <img className={modalStyles.search_icon} src={SearchIcon} alt="" />
        {searchValue.length > 0 ? (
          <div className={modalStyles.clear} onClick={() => setSearchValue("")}>
            <CloseIcon fill="#68778D" />
          </div>
        ) : null}
      </div>
      <div className={styles.dropdown_input}>
        <Dropdown
          placeholder={t("subscribers.time_period")}
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
          dropdownIndex={DropdownType.EventType}
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
            setActiveComponent(DropdownType.None);
          }}
        />
      </div>
      <div className={styles.subscribers_count}>{`${t("global.founded")}: ${filteredSubscribers.length}`}</div>
      {subscribers.length === 0 ? (
        <div className={modalStyles.empty_container}>
          <img className={modalStyles.empty_image} src={NothingFound} alt="" />
          <div className={styles.empty_info}>
            <div className={styles.empty_title}>{t("global.nothing_was_found")}</div>
            <div className={styles.empty_description}>{t("subscribers.don_t_have_subscribers")}</div>
          </div>
        </div>
      ) : (
        <>
          {filteredSubscribers.length === 0 ? (
            <div className={modalStyles.empty_container}>
              <img className={modalStyles.empty_image} src={NothingFound} alt="" />
              <div className={modalStyles.empty_info}>
                <div className={modalStyles.empty_title}>{t("global.nothing_was_found")}</div>
                <div className={modalStyles.empty_description}>{t("global.enter_other_params")}</div>
              </div>
            </div>
          ) : (
            <>
              {filteredSubscribers.map((item, index) => (
                <div className={styles.subscriber_item} key={index}>
                  <UserCard userItem={item} />
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};
