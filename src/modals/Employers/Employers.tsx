﻿import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import { Input } from "../../components/input/Input";

import { UserCard } from "../../cards/user/UserCard";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./EmployersModal.module.sass";

import { IUser } from "../../types/user/user";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import NothingFound from "../../assets/svg/nothing-found.svg";
import LockIcon from "../../assets/svg/lock.svg";

interface IEmployersModalProps {
  isShow: boolean;
  onEdit: Function;
  onEditRights: Function;
  onAdd: Function;
  onClose: Function;
}

export const EmployersModal: React.FC<IEmployersModalProps> = ({
  isShow,
  onEdit,
  onEditRights,
  onAdd,
  onClose,
}) => {
  const { t } = useTranslation();
  const employers = useTypedSelector(
    (state) => state.employeeReducer.employeeList,
  );
  const [filteredEmployers, setFilteredEmployers] = useState(employers);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setFilteredEmployers(employers);
    setSearchValue("");
  }, [employers]);

  useEffect(() => {
    if (searchValue.length === 0) {
      setFilteredEmployers(employers);
    } else {
      setFilteredEmployers(
        employers.filter((employee: IUser) =>
          employee.fullName.toLowerCase().includes(searchValue.toLowerCase()),
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
          <h4>{t("employers.employers")}</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        {isShow ? (
          <div className={styles.employers_container}>
            <div className={styles.employers_content} id="employers_list">
              <div className={modalStyles.search_input}>
                <Input
                  value={searchValue}
                  onChange={(value: string) => setSearchValue(value)}
                  placeholder={t("employers.employers_search")}
                  type="text"
                  isSearch={true}
                />
              </div>
              <div
                className={styles.employers_count}
              >{`${t("global.founded")}: ${filteredEmployers.length}`}</div>
              {employers.length === 0 ? (
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
                      {t("employers.don_t_have_employers")}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {filteredEmployers.length === 0 ? (
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
                      {filteredEmployers.map(
                        (employee: IUser, index: number) => (
                          <div className={styles.employer_item} key={index}>
                            <UserCard
                              userItem={employee}
                              isWithMoreItem={true}
                              moreItems={[
                                <div
                                  className={styles.popup_item}
                                  onClick={() => onEditRights(employee)}
                                >
                                  {t("employers.rights_settings")}
                                  <img src={LockIcon} alt="" />
                                </div>,
                              ]}
                            />
                          </div>
                        ),
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        ) : null}
        {employers.length > 0 ? (
          <div className={modalStyles.actions}>
            <div />
            <div className={modalStyles.buttons}>
              <button
                className={`${globalStyles.small} ${globalStyles.inverted}`}
                type="button"
                onClick={() => onEdit()}
              >
                <span>{t("global.edit")}</span>
              </button>
              <button
                className={globalStyles.small}
                type="button"
                onClick={() => onAdd()}
              >
                {t("employers.add_employee")}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
