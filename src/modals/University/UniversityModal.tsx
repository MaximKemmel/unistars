import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import { Input } from "../../components/input/Input";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { Calendar } from "../../components/calendar/Calendar";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";

import { IUniversity } from "../../types/university/university";
import { ICountry } from "../../types/core/country";
import { ICity } from "../../types/core/city";
import { IDropdownItem } from "../../types/local/dropdownItem";

import CloseIcon from "../../assets/svg/close.svg";

interface IUniversityModalProps {
  isShow: boolean;
  universityInfo: IUniversity;
  onSave: Function;
  onClose: Function;
}

export const UniversityModal: React.FC<IUniversityModalProps> = ({
  isShow,
  universityInfo,
  onSave,
  onClose,
}) => {
  const { t } = useTranslation();
  const countries = useTypedSelector((state) => state.coreReducer.countries);
  const cities = useTypedSelector((state) => state.coreReducer.cities);
  const [currentUniversityProfile, setCurrentUniversityProfile] =
    useState(universityInfo);
  const [date, setDate] = useState(
    new Date(
      currentUniversityProfile.foundation != null
        ? currentUniversityProfile.foundation
        : "01.01.0001",
    ),
  );
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    if (isShow) {
      setCurrentUniversityProfile(universityInfo);
      setDate(
        new Date(
          currentUniversityProfile.foundation != null
            ? currentUniversityProfile.foundation
            : "01.01.0001",
        ),
      );
      const formDiv = document.getElementById("form");
      formDiv?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isShow]);

  useEffect(() => {
    setIsButtonEnabled(
      currentUniversityProfile.name.trim().length > 0 &&
        currentUniversityProfile.description.trim().length > 0 &&
        currentUniversityProfile.foundation.trim().length > 0,
    );
  }, [currentUniversityProfile]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={`${modalStyles.modal_content} ${modalStyles.wide}`}>
        <div className={modalStyles.head}>
          <h4>
            {universityInfo
              ? t("university.editing_university_data")
              : t("university.about_university")}
          </h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <img src={CloseIcon} alt="" />
          </div>
        </div>
        <form className={modalStyles.form}>
          <div className={modalStyles.form_content} id="form">
            <div className={modalStyles.part_container}>
              <div className={modalStyles.part_container_title}>
                {t("university.main")}
              </div>
              <div
                className={`${modalStyles.part_multi} ${modalStyles.double}`}
              >
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.full_name")}
                  </div>
                  <div className={modalStyles.input}>
                    <Input
                      value={currentUniversityProfile.name}
                      onChange={(value: string) =>
                        setCurrentUniversityProfile({
                          ...currentUniversityProfile,
                          name: value,
                        })
                      }
                      placeholder={t("university.enter_a_heading")}
                      type="text"
                      isRequired={true}
                    />
                  </div>
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.date_of_foundation")}
                  </div>
                  {isShow ? <Calendar date={date} setDate={setDate} /> : null}
                </div>
              </div>
              <div className={modalStyles.part}>
                <div className={modalStyles.part_label}>
                  {t("university.description")}
                </div>
                <textarea
                  placeholder={t("university.description_displayed")}
                  onChange={(event) =>
                    setCurrentUniversityProfile({
                      ...currentUniversityProfile,
                      description: event.target.value.trim(),
                    })
                  }
                  required
                  value={currentUniversityProfile.description}
                />
              </div>
              <div
                className={`${modalStyles.part_multi} ${modalStyles.double}`}
              >
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.country")}
                  </div>
                  {
                    <Dropdown
                      placeholder={t("university.choose_your_country")}
                      items={[
                        {
                          id: -1,
                          text: t("global.not_selected"),
                          text_eng: t("global.not_selected"),
                          is_selected:
                            currentUniversityProfile.userCountries ==
                              undefined ||
                            !Array.isArray(
                              currentUniversityProfile.userCountries,
                            ) ||
                            currentUniversityProfile.userCountries.length === 0,
                        } as IDropdownItem,
                        ...(countries.map((country: ICountry) => {
                          return {
                            id: country.id,
                            text: country.name,
                            text_eng: country.nameEnglish,
                            is_selected:
                              currentUniversityProfile.userCountries !=
                                undefined &&
                              Array.isArray(
                                currentUniversityProfile.userCountries,
                              ) &&
                              currentUniversityProfile.userCountries.length >
                                0 &&
                              currentUniversityProfile.userCountries[0].id ===
                                country.id,
                          } as IDropdownItem;
                        }) as IDropdownItem[]),
                      ]}
                      onItemSelect={(item: IDropdownItem) => {
                        setCurrentUniversityProfile({
                          ...currentUniversityProfile,
                          userCountries:
                            item.id === -1
                              ? []
                              : countries.filter(
                                  (country: ICountry) => country.id === item.id,
                                ),
                        });
                      }}
                    />
                  }
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.city")}
                  </div>
                  {cities != undefined && Array.isArray(cities) && (
                    <Dropdown
                      placeholder={t("university.choose_your_city")}
                      items={[
                        {
                          id: -1,
                          text: t("global.not_selected"),
                          text_eng: t("global.not_selected"),
                          is_selected:
                            currentUniversityProfile.userCity === null ||
                            currentUniversityProfile.userCity === undefined,
                        } as IDropdownItem,
                        ...(cities.map((city: ICity) => {
                          return {
                            id: city.id,
                            text: city.name,
                            text_eng: city.nameEnglish,
                            is_selected:
                              currentUniversityProfile.userCity != null &&
                              currentUniversityProfile.userCity.id === city.id,
                          } as IDropdownItem;
                        }) as IDropdownItem[]),
                      ]}
                      onItemSelect={(item: IDropdownItem) => {
                        setCurrentUniversityProfile({
                          ...currentUniversityProfile,
                          userCity: cities.find(
                            (city: ICity) => city.id === item.id,
                          )!,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <div
                className={`${modalStyles.part_multi} ${modalStyles.triple}`}
              >
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.street")}
                  </div>
                  <div className={modalStyles.input}>
                    <Input
                      value={currentUniversityProfile.street ?? ""}
                      onChange={(value: string) =>
                        setCurrentUniversityProfile({
                          ...currentUniversityProfile,
                          street: value,
                        })
                      }
                      placeholder={t("university.choose_your_street")}
                      type="text"
                    />
                  </div>
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.house")}
                  </div>
                  <div className={modalStyles.input}>
                    <Input
                      value={
                        currentUniversityProfile.houseNumber != undefined
                          ? currentUniversityProfile.houseNumber === 0
                            ? ""
                            : currentUniversityProfile.houseNumber.toString()
                          : ""
                      }
                      onChange={(value: string) =>
                        setCurrentUniversityProfile({
                          ...currentUniversityProfile,
                          houseNumber:
                            value.trim().length !== 0 ? Number(value) : 0,
                        })
                      }
                      placeholder={t("university.home_number")}
                      type="number"
                    />
                  </div>
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.corpus")}
                  </div>
                  <div className={modalStyles.input}>
                    <Input
                      value={
                        currentUniversityProfile.houseNumber != undefined
                          ? currentUniversityProfile.houseNumber === 0
                            ? ""
                            : currentUniversityProfile.houseNumber.toString()
                          : ""
                      }
                      onChange={(value: string) =>
                        setCurrentUniversityProfile({
                          ...currentUniversityProfile,
                          houseNumber:
                            value.trim().length !== 0 ? Number(value) : 0,
                        })
                      }
                      placeholder={t("university.corpus_number")}
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={modalStyles.form_separator} />
            <div className={modalStyles.part_container}>
              <div className={modalStyles.part_container_title}>
                {t("university.contacts")}
              </div>
              <div
                className={`${modalStyles.part_multi} ${modalStyles.double}`}
              >
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.phone")}
                  </div>
                  <div className={modalStyles.phone_input}>
                    <div className={modalStyles.phone_code}>
                      <Dropdown
                        placeholder={""}
                        items={[
                          {
                            id: 0,
                            text: "+7",
                            text_eng: "+7",
                            is_selected:
                              currentUniversityProfile.phoneNumberCountryPrefix ===
                              "+7",
                          } as IDropdownItem,
                          {
                            id: 1,
                            text: "+373",
                            text_eng: "+373",
                            is_selected:
                              currentUniversityProfile.phoneNumberCountryPrefix ===
                              "+373",
                          } as IDropdownItem,
                        ]}
                        onItemSelect={(item: IDropdownItem) => {
                          setCurrentUniversityProfile({
                            ...currentUniversityProfile,
                            phoneNumberCountryPrefix: item.text,
                          });
                        }}
                      />
                    </div>
                    <div className={modalStyles.input}>
                      <Input
                        value={currentUniversityProfile.phoneNumberBody ?? ""}
                        onChange={(value: string) =>
                          setCurrentUniversityProfile({
                            ...currentUniversityProfile,
                            phoneNumberBody: value,
                          })
                        }
                        placeholder={"(___) ___-__-__"}
                        type="phone"
                      />
                    </div>
                  </div>
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>E-mail</div>
                  <div className={modalStyles.input}>
                    <Input
                      value={currentUniversityProfile.userEmail ?? ""}
                      onChange={(value: string) =>
                        setCurrentUniversityProfile({
                          ...currentUniversityProfile,
                          userEmail: value,
                        })
                      }
                      placeholder={t("university.enter_email")}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div
                className={`${modalStyles.part_multi} ${modalStyles.triple}`}
              >
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.official_site")}
                  </div>
                  <div className={modalStyles.input}>
                    <Input
                      value={currentUniversityProfile.universityLink ?? ""}
                      onChange={(value: string) =>
                        setCurrentUniversityProfile({
                          ...currentUniversityProfile,
                          universityLink: value,
                        })
                      }
                      placeholder={t("university.enter_website_address")}
                      type="text"
                    />
                  </div>
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>Telegram</div>
                  <div className={modalStyles.input}>
                    <Input
                      value={currentUniversityProfile.linksSocialNetwork![0]}
                      onChange={(value: string) =>
                        setCurrentUniversityProfile({
                          ...currentUniversityProfile,
                          linksSocialNetwork:
                            currentUniversityProfile.linksSocialNetwork!.map(
                              (link: string, index: number) => {
                                return index === 0 ? value : link;
                              },
                            ),
                        })
                      }
                      placeholder={t("university.telegram_link")}
                      type="text"
                    />
                  </div>
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.vk")}
                  </div>
                  <div className={modalStyles.input}>
                    <Input
                      value={currentUniversityProfile.linksSocialNetwork![1]}
                      onChange={(value: string) =>
                        setCurrentUniversityProfile({
                          ...currentUniversityProfile,
                          linksSocialNetwork:
                            currentUniversityProfile.linksSocialNetwork!.map(
                              (link: string, index: number) => {
                                return index === 1 ? value : link;
                              },
                            ),
                        })
                      }
                      placeholder={t("university.vk_link")}
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className={modalStyles.actions}>
          <div />
          <div className={modalStyles.buttons}>
            <button
              className={`${globalStyles.inverted} ${globalStyles.small}`}
              type="button"
              onClick={() => onClose()}
            >
              <span>{t("global.cancel")}</span>
            </button>
            <button
              className={globalStyles.small}
              type="button"
              disabled={!isButtonEnabled}
              onClick={() => onSave(currentUniversityProfile)}
            >
              {t("global.save_changes")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
