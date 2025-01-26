import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import { UniversityModal } from "../../../../modals/University/UniversityModal";

import globalStyles from "../../../../App.module.sass";
import styles from "../../Home.module.sass";

import { ICountry } from "../../../../types/core/country";

import { Chevron as ChevronIcon } from "../../../../assets/svgComponents/Chevron";

export const UniversityInfoContainer = () => {
  const { t, i18n } = useTranslation();
  const universityProfile = useTypedSelector(
    (state) => state.universityReducer.universityProfile,
  );
  const [isAboutInfoFull, setIsAboutInfoFull] = useState(false);
  const [isAboutModalShow, setIsAboutModalShow] = useState(false);

  return (
    <>
      <div
        className={`${styles.main_about} ${styles.content_container} ${isAboutInfoFull ? styles.full : ""}`}
      >
        <div className={styles.content_container_head}>
          <div className={styles.head_title}>
            <h4>{t("university.about_university")}</h4>
          </div>
          {universityProfile.name != undefined &&
          universityProfile.name.trim().length > 0 &&
          universityProfile.description != undefined &&
          universityProfile.description.trim().length > 0 ? (
            <div
              className={styles.head_action}
              onClick={() => setIsAboutModalShow(true)}
            >
              {t("global.edit")}
            </div>
          ) : null}
        </div>
        {universityProfile ? (
          <div className={styles.main_about_container}>
            <div className={styles.main_about_part}>
              <div className={styles.part_title}>{t("university.main")}</div>
              <div className={styles.part_container}>
                <div className={styles.part_item}>
                  <div className={styles.part_item_label}>
                    {t("university.full_name")}
                  </div>
                  <div className={styles.part_item_value}>
                    {universityProfile.name != undefined
                      ? universityProfile.name
                      : ""}
                  </div>
                </div>
                <div className={styles.part_item}>
                  <div className={styles.part_item_label}>
                    {t("university.description")}
                  </div>
                  <div className={styles.part_item_value}>
                    {universityProfile.description != undefined
                      ? universityProfile.description
                      : ""}
                  </div>
                </div>
                <div className={styles.part_item}>
                  <div className={styles.part_item_label}>
                    {t("university.date_of_foundation")}
                  </div>
                  <div className={styles.part_item_value}>
                    {universityProfile.foundation != undefined
                      ? new Date(
                          universityProfile.foundation,
                        ).toLocaleDateString("ru-RU", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : ""}
                  </div>
                </div>
                <div className={styles.part_item}>
                  <div className={styles.part_item_label}>
                    {t("university.country")}
                  </div>
                  <div className={styles.part_item_value}>
                    {universityProfile.userCountries != undefined &&
                    Array.isArray(universityProfile.userCountries)
                      ? universityProfile.userCountries
                          .map((country: ICountry) =>
                            i18n.resolvedLanguage === "ru"
                              ? country.name
                              : country.nameEnglish,
                          )
                          .join(", ")
                      : ""}
                  </div>
                </div>
                <div className={styles.part_item}>
                  <div className={styles.part_item_label}>
                    {t("university.city")}
                  </div>
                  <div className={styles.part_item_value}>
                    {universityProfile.userCity != undefined ? (
                      <>
                        {i18n.resolvedLanguage === "ru"
                          ? universityProfile.userCity.name
                          : universityProfile.userCity.nameEnglish}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className={styles.part_item_double}>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>
                      {t("university.house")}
                    </div>
                    <div className={styles.part_item_value}>
                      {universityProfile.houseNumber != undefined
                        ? universityProfile.houseNumber
                        : ""}
                    </div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>
                      {t("university.corpus")}
                    </div>
                    <div className={styles.part_item_value} />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.main_about_separator} />
            <div className={styles.main_about_part_multi}>
              <div className={styles.main_about_part}>
                <div className={styles.part_title}>
                  {t("university.contacts")}
                </div>
                <div className={styles.part_container}>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>
                      {t("university.phone")}
                    </div>
                    <div className={styles.part_item_value}>
                      {universityProfile.phoneNumberCountryPrefix !=
                        undefined &&
                      universityProfile.phoneNumberBody != undefined ? (
                        <>{`${universityProfile.phoneNumberCountryPrefix} ${universityProfile.phoneNumberBody}`}</>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>
                      {t("university.site")}
                    </div>
                    <div className={styles.part_item_value}>
                      {universityProfile.universityLink != undefined
                        ? universityProfile.universityLink
                        : ""}
                    </div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>E-mail</div>
                    <div className={styles.part_item_value}>
                      {universityProfile.userEmail != undefined
                        ? universityProfile.userEmail
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.main_part_separator} />
              <div className={styles.main_about_part}>
                <div className={styles.part_title}>
                  {t("university.links_to_sections")}
                </div>
                <div className={styles.part_container}>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>
                      {t("university.admission")}
                    </div>
                    <div className={styles.part_item_value}>
                      {universityProfile.admission != undefined
                        ? universityProfile.admission
                        : ""}
                    </div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>
                      {t("university.career")}
                    </div>
                    <div className={styles.part_item_value}>
                      {universityProfile.careers != undefined
                        ? universityProfile.careers
                        : ""}
                    </div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>
                      {t("university.faq")}
                    </div>
                    <div className={styles.part_item_value}>
                      {universityProfile.faqLink != undefined
                        ? universityProfile.faqLink
                        : ""}
                    </div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>
                      {t("university.preparatory_courses")}
                    </div>
                    <div className={styles.part_item_value}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.empty_info}>
            <div className={styles.empty_message}>
              {t("university.empty_profile")}
            </div>
            <button
              className={globalStyles.small}
              type="button"
              onClick={() => setIsAboutModalShow(true)}
            >
              {t("university.complete_profile")}
            </button>
          </div>
        )}
        {universityProfile ? (
          <div
            className={`${styles.overlay} ${!isAboutInfoFull ? styles.active : ""}`}
          >
            <div
              className={styles.overlay_button}
              onClick={() => setIsAboutInfoFull(!isAboutInfoFull)}
            >
              <ChevronIcon fill="#FFFFFF" />
            </div>
          </div>
        ) : null}
      </div>
      <UniversityModal
        isShow={isAboutModalShow}
        universityInfo={universityProfile}
        onClose={() => {
          setIsAboutModalShow(false);
        }}
        onSave={() => {
          setIsAboutModalShow(false);
        }}
      />
    </>
  );
};
