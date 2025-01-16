import { useState } from "react";
import { useTranslation } from "react-i18next";

import { BookletsContainer } from "./mainContainers/BookletsContainer";
import { UniversityModal } from "../../../modals/University/UniversityModal";
import { GalleryModal } from "../../../modals/Gallery/GalleryModal";
import { SubscribersModal } from "../../../modals/Subscribers/SubscribersModal";
import { SubscribersDownloadModal } from "../../../modals/Subscribers/SubscribersDownload";
import { StudentsModal } from "../../../modals/Students/StudentsModal";
import { AmbassadorsModal } from "../../../modals/Ambassadors/AmbassadorsModal";
import { WorkersModal } from "../../../modals/Workers/WorkersModal";

import globalStyles from "../../../App.module.sass";
import styles from "../Home.module.sass";

import { countries } from "../../../data/countries";
import { ICountry } from "../../../types/core/country";
import { cities } from "../../../data/cities";
import { ICity } from "../../../types/core/city";

import TestImage from "../../../assets/png/test_image.png";
import AwardIcon from "../../../assets/svg/award.svg";
import TestPhoto from "../../../assets/jpg/test_photo.jpg";
import TestAvatar from "../../../assets/png/test-avatar.png";
import { Chevron as ChevronIcon } from "../../../assets/svgComponents/Chevron";

export const Main = () => {
  const { t, i18n } = useTranslation();

  const socialsInfo = [
    {
      id: 0,
      value: "2,6k",
      label: t("home.subscribers"),
    },
    {
      id: 1,
      value: "768",
      label: t("home.students"),
    },
    {
      id: 2,
      value: "92",
      label: t("home.ambassadors"),
    },
    {
      id: 3,
      value: "92",
      label: t("home.employers"),
    },
  ];

  const aboutInfo = {
    fullName: "Уральский федеральный университет",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ac porttitor et lectus magna mi adipiscing viverra urna. Adipiscing purus lacinia cras augue. Diam amet vitae auctor id facilisis enim volutpat. Vulputate at massa penatibus sed morbi viverra et aliquet fames.",
    birthDate: "05.03.2011",
    country_id: 0,
    city_id: 0,
    street: "Streets",
    house: 15,
    korpus: 18,
    phone: "(999) 999-99-99",
    phone_code: "+7",
    site: "urfu.ru/ru/",
    email: "example@mail.ru",
    postupUrl: "urfu.ru/ru/",
    careerUrl: "urfu.ru/ru/",
    faqUrl: "urfu.ru/ru/",
    coursesUrl: "urfu.ru/ru/",
  };

  const gallery = Array(32)
    .fill(1)
    .map((_item, index) => {
      return {
        id: index,
        url: TestPhoto,
        isChecked: false,
      };
    });

  const ambassadors = Array(29)
    .fill(1)
    .map((_item, index) => {
      return {
        id: index,
        photo: TestAvatar,
        name: "Tom Smith",
        description: "Ural Federal University",
        isChecked: false,
      };
    });

  const requestedAmbassadors = Array(11)
    .fill(1)
    .map((_item, index) => {
      return {
        id: index + 100,
        photo: TestAvatar,
        name: "Tom Smith",
        description: "Ural Federal University",
        isChecked: false,
      };
    });

  const students = Array(29)
    .fill(1)
    .map((_item, index) => {
      return {
        id: index,
        photo: TestAvatar,
        name: "Tom Smith",
        description: "Ural Federal University",
        isChecked: false,
      };
    });

  const workers = Array(29)
    .fill(1)
    .map((_item, index) => {
      return {
        id: index,
        photo: TestAvatar,
        name: "Tom Smith",
        description: "Ural Federal University",
        isChecked: false,
      };
    });

  const [isAboutInfoFull, setIsAboutInfoFull] = useState(false);
  const [isAboutModalShow, setIsAboutModalShow] = useState(false);
  const [isGalleryModalShow, setIsGalleryModalShow] = useState(false);
  const [isSubscribersModalShow, setIsSubscribersModalShow] = useState(false);
  const [isSubscribersDownloadModalShow, setIsSubscribersDownloadModalShow] = useState(false);
  const [isStudentsModalShow, setIsStudentsModalShow] = useState(false);
  const [isAmbassadorsModalShow, setIsAmbassadorsModalShow] = useState(false);
  const [isWorkersModalShow, setIsWorkersModalShow] = useState(false);

  return (
    <div className={styles.content}>
      <div className={`${styles.main_header} ${styles.content_container}`}>
        <div className={styles.main_univ_info}>
          <div className={styles.main_logo}>
            <img src={TestImage} alt="" />
            <div className={styles.main_award}>
              <img src={AwardIcon} alt="" />
            </div>
          </div>
          <h3 className={styles.main_univ_name}>Уральский федеральный университет (УрФУ)</h3>
        </div>
        <div className={styles.main_socials}>
          {socialsInfo.map((item, index) => {
            return (
              <div
                className={styles.main_socials_item}
                key={index}
                onClick={() => {
                  if (item.id === 0) {
                    setIsSubscribersModalShow(true);
                  }
                  if (item.id === 1) {
                    setIsStudentsModalShow(true);
                  }
                  if (item.id === 2) {
                    setIsAmbassadorsModalShow(true);
                  }
                  if (item.id === 3) {
                    setIsWorkersModalShow(true);
                  }
                }}
              >
                <div className={styles.item_value}>{item.value}</div>
                <div className={styles.item_label}>{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`${styles.main_about} ${styles.content_container} ${isAboutInfoFull ? styles.full : ""}`}>
        <div className={styles.content_container_head}>
          <div className={styles.head_title}>
            <h4>{t("university.about_university")}</h4>
          </div>
          {aboutInfo ? (
            <div className={styles.head_action} onClick={() => setIsAboutModalShow(true)}>
              {t("global.edit")}
            </div>
          ) : null}
        </div>
        {aboutInfo ? (
          <div className={styles.main_about_container}>
            <div className={styles.main_about_part}>
              <div className={styles.part_title}>{t("university.main")}</div>
              <div className={styles.part_container}>
                <div className={styles.part_item}>
                  <div className={styles.part_item_label}>{t("university.full_name")}</div>
                  <div className={styles.part_item_value}>{aboutInfo.fullName}</div>
                </div>
                <div className={styles.part_item}>
                  <div className={styles.part_item_label}>{t("university.description")}</div>
                  <div className={styles.part_item_value}>{aboutInfo.description}</div>
                </div>
                <div className={styles.part_item}>
                  <div className={styles.part_item_label}>{t("university.date_of_foundation")}</div>
                  <div className={styles.part_item_value}>{aboutInfo.birthDate}</div>
                </div>
                <div className={styles.part_item}>
                  <div className={styles.part_item_label}>{t("university.country")}</div>
                  <div className={styles.part_item_value}>
                    {i18n.resolvedLanguage === "ru"
                      ? countries.find((country: ICountry) => country.id === aboutInfo.country_id)!.name
                      : countries.find((country: ICountry) => country.id === aboutInfo.country_id)!.nameEnglish}
                  </div>
                </div>
                <div className={styles.part_item}>
                  <div className={styles.part_item_label}>{t("university.city")}</div>
                  <div className={styles.part_item_value}>
                    {i18n.resolvedLanguage === "ru"
                      ? cities.find((city: ICity) => city.id === aboutInfo.city_id)!.name
                      : cities.find((city: ICity) => city.id === aboutInfo.city_id)!.nameEnglish}
                  </div>
                </div>
                <div className={styles.part_item_double}>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>{t("university.house")}</div>
                    <div className={styles.part_item_value}>{aboutInfo.house}</div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>{t("university.corpus")}</div>
                    <div className={styles.part_item_value}>{aboutInfo.korpus}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.main_about_separator} />
            <div className={styles.main_about_part_multi}>
              <div className={styles.main_about_part}>
                <div className={styles.part_title}>{t("university.contacts")}</div>
                <div className={styles.part_container}>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>{t("university.phone")}</div>
                    <div className={styles.part_item_value}>{`${aboutInfo.phone_code} ${aboutInfo.phone}`}</div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>{t("university.site")}</div>
                    <div className={styles.part_item_value}>{aboutInfo.site}</div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>E-mail</div>
                    <div className={styles.part_item_value}>{aboutInfo.email}</div>
                  </div>
                </div>
              </div>
              <div className={styles.main_part_separator} />
              <div className={styles.main_about_part}>
                <div className={styles.part_title}>{t("university.links_to_sections")}</div>
                <div className={styles.part_container}>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>{t("university.admission")}</div>
                    <div className={styles.part_item_value}>{aboutInfo.postupUrl}</div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>{t("university.career")}</div>
                    <div className={styles.part_item_value}>{aboutInfo.careerUrl}</div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>{t("university.faq")}</div>
                    <div className={styles.part_item_value}>{aboutInfo.faqUrl}</div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>{t("university.preparatory_courses")}</div>
                    <div className={styles.part_item_value}>{aboutInfo.coursesUrl}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.empty_info}>
            <div className={styles.empty_message}>{t("university.empty_profile")}</div>
            <button className={globalStyles.small} type="button" onClick={() => setIsAboutModalShow(true)}>
              {t("university.complete_profile")}
            </button>
          </div>
        )}
        {aboutInfo ? (
          <div className={`${styles.overlay} ${!isAboutInfoFull ? styles.active : ""}`}>
            <div className={styles.overlay_button} onClick={() => setIsAboutInfoFull(!isAboutInfoFull)}>
              <ChevronIcon fill="#FFFFFF" />
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.content_container_multi}>
        <div className={`${styles.main_gallery} ${styles.content_container} ${styles.half}`}>
          <div className={styles.content_container_head}>
            <div className={styles.head_title}>
              <h4>{t("gallery.gallery")}</h4>
              <div className={styles.count}>{gallery.length}</div>
            </div>
            {gallery.length > 0 ? <div className={styles.head_action}>{t("gallery.upload_more")}</div> : null}
          </div>
          {gallery.length > 0 ? (
            <>
              <div className={styles.main_gallery_container}>
                {gallery.slice(0, 6).map((_, index) => {
                  return (
                    <div className={styles.main_gallery_item} key={index}>
                      <img src={TestPhoto} alt="" />
                    </div>
                  );
                })}
              </div>
              <button
                className={`${globalStyles.inverted} ${globalStyles.small}`}
                type="button"
                onClick={() => setIsGalleryModalShow(true)}
              >
                <span>{gallery.length > 6 ? t("gallery.see_all") : t("global.edit")}</span>
              </button>
            </>
          ) : (
            <div className={styles.empty_info}>
              <div className={styles.empty_message}>{t("gallery.no_photos")}</div>
              <button className={globalStyles.small} type="button" onClick={() => setIsGalleryModalShow(true)}>
                {t("gallery.upload_photos")}
              </button>
            </div>
          )}
        </div>
        <BookletsContainer />
      </div>
      <UniversityModal
        isShow={isAboutModalShow}
        universityInfo={aboutInfo}
        onClose={() => {
          setIsAboutModalShow(false);
        }}
        onSave={() => {
          setIsAboutModalShow(false);
        }}
      />
      <GalleryModal
        isShow={isGalleryModalShow}
        photos={gallery}
        onClose={() => {
          setIsGalleryModalShow(false);
        }}
        onUpload={() => {
          setIsGalleryModalShow(false);
        }}
        onEdit={() => {
          setIsGalleryModalShow(false);
        }}
      />
      <SubscribersModal
        isShow={isSubscribersModalShow}
        onDownload={() => {
          setIsSubscribersModalShow(false);
          setIsSubscribersDownloadModalShow(true);
        }}
        onClose={() => setIsSubscribersModalShow(false)}
      />
      <SubscribersDownloadModal
        isShow={isSubscribersDownloadModalShow}
        onClose={() => setIsSubscribersDownloadModalShow(false)}
      />
      <StudentsModal
        isShow={isStudentsModalShow}
        students={students}
        onClose={() => {
          setIsStudentsModalShow(false);
        }}
      />
      <AmbassadorsModal
        isShow={isAmbassadorsModalShow}
        ambassadors={ambassadors}
        requestedAmbassadors={requestedAmbassadors}
        onClose={() => {
          setIsAmbassadorsModalShow(false);
        }}
      />
      <WorkersModal
        isShow={isWorkersModalShow}
        workers={workers}
        onClose={() => {
          setIsWorkersModalShow(false);
        }}
      />
    </div>
  );
};
