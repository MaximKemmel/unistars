import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import InputMask from "react-input-mask";

import { Dropdown } from "../../components/dropdown/Dropdown";
import { Calendar } from "../../components/calendar/Calendar";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";

import { IUniversity } from "../../types/university/university";
import { IDropdownItem } from "../../types/local/dropdownItem";

import CloseIcon from "../../assets/svg/close.svg";
import LocationIcon from "../../assets/svg/location.svg";
import InfoIcon from "../../assets/svg/info.svg";

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
  const [currentUniversityProfile, setCurrentUniversityProfile] =
    useState(universityInfo);
  const [date, setDate] = useState(
    new Date(
      currentUniversityProfile.foundation != null
        ? currentUniversityProfile.foundation
        : "01.01.2025",
    ),
  );

  useEffect(() => {
    setCurrentUniversityProfile(universityInfo);
    const formDiv = document.getElementById("form");
    formDiv?.scrollTo({ top: 0, behavior: "smooth" });
  }, [isShow]);

  /*useEffect(() => {
    if (activeComponent !== DropdownType.None) {
      const activeDropdownDiv = document.getElementById("active_dropdown");
      if (activeDropdownDiv) {
        const formDiv = document.getElementById("form");
        formDiv?.scrollTo({
          top: activeDropdownDiv.offsetTop - formDiv?.offsetTop - 45,
          behavior: "smooth",
        });
      }
    }
  }, [activeComponent]);*/

  useEffect(() => {
    setCurrentUniversityProfile({
      ...currentUniversityProfile,
      foundation: date,
    });
  }, [date]);

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    onSave();
  };

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
        <form onSubmit={handleOnSubmit} className={modalStyles.form}>
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
                  <input
                    placeholder={t("university.enter_a_heading")}
                    type="text"
                    onChange={(event) =>
                      setCurrentUniversityProfile({
                        ...currentUniversityProfile,
                        name: event.target.value.trim(),
                      })
                    }
                    value={currentUniversityProfile.name}
                  />
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.date_of_foundation")}
                  </div>
                  <Calendar date={date} setDate={setDate} />
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
                  value={currentUniversityProfile.description}
                />
              </div>
              <div
                className={`${modalStyles.part_multi} ${modalStyles.triple}`}
              >
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.country")}
                  </div>
                  {/*<Dropdown
                    placeholder={t("university.choose_your_country")}
                    items={[
                      {
                        id: -1,
                        text: t("global.not_selected"),
                        text_eng: t("global.not_selected"),
                        is_selected: currentInfo.country_id === -1,
                      } as IDropdownItem,
                      ...(countries.map((country: ICountry) => {
                        return {
                          id: country.id,
                          text: country.name,
                          text_eng: country.nameEnglish,
                          is_selected: currentInfo.country_id === country.id,
                        } as IDropdownItem;
                      }) as IDropdownItem[]),
                    ]}
                    onItemSelect={(item: IDropdownItem) => {
                      setCurrentInfo({ ...currentInfo, country_id: item.id });
                      setActiveComponent(DropdownType.None);
                    }}
                  />*/}
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.city")}
                  </div>
                  {/*<Dropdown
                    placeholder={t("university.choose_your_city")}
                    items={[
                      {
                        id: -1,
                        text: t("global.not_selected"),
                        text_eng: t("global.not_selected"),
                        is_selected: currentInfo.city_id === -1,
                      } as IDropdownItem,
                      ...(cities.map((city: ICity) => {
                        return {
                          id: city.id,
                          text: city.name,
                          text_eng: city.nameEnglish,
                          is_selected: currentInfo.city_id === city.id,
                        } as IDropdownItem;
                      }) as IDropdownItem[]),
                    ]}
                    onItemSelect={(item: IDropdownItem) => {
                      setCurrentInfo({ ...currentInfo, city_id: item.id });
                      setActiveComponent(DropdownType.None);
                    }}
                  />*/}
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.location")}
                  </div>
                  <div className={modalStyles.location_selector}>
                    <img src={LocationIcon} alt="" />
                    <div className={modalStyles.selector_label}>
                      {t("university.locate")}
                    </div>
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
                className={`${modalStyles.part_multi} ${modalStyles.triple}`}
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
                    <div className={modalStyles.phone_number}>
                      <InputMask
                        placeholder={"(___) ___-__-__"}
                        type="text"
                        mask="(999) 999-99-99"
                        maskChar={""}
                        value={currentUniversityProfile.phoneNumberBody}
                        onChange={(event) =>
                          setCurrentUniversityProfile({
                            ...currentUniversityProfile,
                            phoneNumberBody: event.target.value.trim(),
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.site")}
                  </div>
                  <input
                    placeholder={t("university.enter_website_address")}
                    type="text"
                    onChange={(event) =>
                      setCurrentUniversityProfile({
                        ...currentUniversityProfile,
                        universityLink: event.target.value.trim(),
                      })
                    }
                    value={currentUniversityProfile.universityLink}
                  />
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>E-mail</div>
                  <input
                    placeholder={t("university.enter_email")}
                    type="text"
                    onChange={(event) =>
                      setCurrentUniversityProfile({
                        ...currentUniversityProfile,
                        userEmail: event.target.value.trim(),
                      })
                    }
                    value={currentUniversityProfile.userEmail}
                  />
                </div>
              </div>
            </div>
            <div className={modalStyles.form_separator} />
            <div className={modalStyles.part_container}>
              <div className={modalStyles.part_container_title}>
                {t("university.links_to_sections")}
              </div>
              <div
                className={`${modalStyles.part_multi} ${modalStyles.double}`}
              >
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.admission")}
                    <div className={modalStyles.more_info_container}>
                      <img src={InfoIcon} alt="" />
                      <div className={modalStyles.more_info_content}>
                        <div className={modalStyles.more_info}>
                          <div className={modalStyles.more_info_text}>
                            {t("university.add_admission")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    placeholder={t("university.enter_website_address")}
                    type="text"
                    onChange={(event) =>
                      setCurrentUniversityProfile({
                        ...currentUniversityProfile,
                        admission: event.target.value.trim(),
                      })
                    }
                    value={currentUniversityProfile.admission}
                  />
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.career")}
                    <div className={modalStyles.more_info_container}>
                      <img src={InfoIcon} alt="" />
                      <div className={modalStyles.more_info_content}>
                        <div className={modalStyles.more_info}>
                          <div className={modalStyles.more_info_text}>
                            {t("university.add_career")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    placeholder={t("university.enter_website_address")}
                    type="text"
                    onChange={(event) =>
                      setCurrentUniversityProfile({
                        ...currentUniversityProfile,
                        careers: event.target.value.trim(),
                      })
                    }
                    value={currentUniversityProfile.careers}
                  />
                </div>
              </div>
              <div
                className={`${modalStyles.part_multi} ${modalStyles.double}`}
              >
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.faq")}
                    <div className={modalStyles.more_info_container}>
                      <img src={InfoIcon} alt="" />
                      <div className={modalStyles.more_info_content}>
                        <div className={modalStyles.more_info}>
                          <div className={modalStyles.more_info_text}>
                            {t("university.add_faq")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    placeholder={t("university.enter_website_address")}
                    type="text"
                    onChange={(event) =>
                      setCurrentUniversityProfile({
                        ...currentUniversityProfile,
                        faqLink: event.target.value.trim(),
                      })
                    }
                    value={currentUniversityProfile.faqLink}
                  />
                </div>
                <div className={modalStyles.part}>
                  <div className={modalStyles.part_label}>
                    {t("university.preparatory_courses")}
                    <div className={modalStyles.more_info_container}>
                      <img src={InfoIcon} alt="" />
                      <div className={modalStyles.more_info_content}>
                        <div className={modalStyles.more_info}>
                          <div className={modalStyles.more_info_text}>
                            {t("university.add_courses")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    placeholder={t("university.enter_website_address")}
                    type="text"
                    value={""}
                  />
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
            <button className={globalStyles.small} type="submit">
              {t("global.save_changes")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
