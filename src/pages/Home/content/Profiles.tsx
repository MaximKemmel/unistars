import { useEffect, useState } from "react";

import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { ProfilesFiltersModal } from "../../../modals/ProfilesFilters/ProfilesFilters";

import { Input } from "../../../components/input/Input";
import { Toggle } from "../../../components/toggle/Toggle";

import globalStyles from "../../../App.module.sass";
import styles from "../Home.module.sass";

import { IToggleItem } from "../../../types/local/toggleItem";
import { initProfileFilter } from "../../../types/profileFilter/initProfileFilter";
import { IPersonalData } from "src/types/profile/personalData";
import { IProfile } from "src/types/profile/profile";

import { Filter as FilterIcon } from "../../../assets/svgComponents/Filter";
import EmptyAvatarImage from "../../../assets/png/empty-avatar.png";
import { Chevron as ChevronIcon } from "../../../assets/svgComponents/Chevron";
import { Close as CloseIcon } from "../../../assets/svgComponents/Close";
import RuIcon from "../../../assets/svg/tmp_ru.svg";
import EnIcon from "../../../assets/svg/tmp_en.svg";
import UzIcon from "../../../assets/svg/tmp_uz.svg";
import LanguageIcon from "../../../assets/svg/language.svg";
import EducationIcon from "../../../assets/svg/education.svg";
import RateIcon from "../../../assets/svg/rate.svg";

export const Profiles = () => {
  const profiles = useTypedSelector(
    (state) => state.profileReducer.profilesList,
  );
  const [viewMode, setViewMode] = useState(0);
  const [filter, setFilter] = useState(initProfileFilter());
  const [searchValue, setSearchValue] = useState("");
  const [isFiltersModalShow, setIsFiltersModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentProfile, setCurrentProfile] = useState({
    personalData: {
      email: "",
    } as IPersonalData,
  } as IProfile);
  const [currentInfoTab, setCurrentInfoTab] = useState(0);

  useEffect(() => {
    setFilter(initProfileFilter());
    setCurrentPage(1);
    setCurrentProfile({
      personalData: {
        email: "",
      } as IPersonalData,
    } as IProfile);
    setCurrentInfoTab(0);
  }, [viewMode]);

  useEffect(() => {
    if (currentProfile.personalData.email.trim().length > 0) {
      const content = document.getElementById("profiles_content");
      content?.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentProfile]);

  return (
    <>
      <div className={styles.content} id="profiles_content">
        <div className={`${styles.main_header} ${styles.content_container}`}>
          <div className={styles.profiles_info}>
            <h4>Все пользователи</h4>
            <div className={styles.profiles_modes}>
              <Toggle
                selectedIndex={viewMode}
                items={
                  [
                    {
                      id: 0,
                      text: "Абитуриенты",
                      text_eng: "Standard",
                    } as IToggleItem,
                    {
                      id: 1,
                      text: "Студенты и амбассадоры",
                      text_eng: "Automatic",
                    } as IToggleItem,
                  ] as IToggleItem[]
                }
                onItemSelect={(item: IToggleItem) => setViewMode(item.id)}
              />
            </div>
          </div>
          <div className={styles.profiles_actions}>
            <div className={styles.profiles_search}>
              <Input
                value={searchValue}
                onChange={(value: string) => setSearchValue(value)}
                placeholder={
                  viewMode === 0
                    ? "Поиск по абитуриентам"
                    : "Поиск по студентам"
                }
                type="text"
                isSearch={true}
              />
            </div>
            <button
              type="button"
              className={`${globalStyles.inverted} ${globalStyles.small}`}
              onClick={() => setIsFiltersModalShow(true)}
            >
              <span>Фильтры</span>
              <FilterIcon isActive={true} />
            </button>
          </div>
        </div>
        {profiles !== null && Array.isArray(profiles) ? (
          <div
            className={`${styles.content_container} ${styles.profiles_table_container}`}
          >
            {viewMode === 0 ? (
              <div className={styles.profiles_table}>
                <div className={styles.table_head}>
                  <div className={styles.th} style={{ width: "20%" }}>
                    Имя Фамилия
                  </div>
                  <div className={styles.th} style={{ width: "20%" }}>
                    Гражданство
                  </div>
                  <div className={styles.th} style={{ width: "17%" }}>
                    Жел.образование
                  </div>
                  <div className={styles.th} style={{ width: "15%" }}>
                    Жел.направление
                  </div>
                  <div className={styles.th} style={{ width: "13%" }}>
                    Год поступления
                  </div>
                  <div className={styles.th} style={{ width: "13%" }}>
                    Язык обучения
                  </div>
                </div>
                <div className={styles.table_body}>
                  {profiles
                    .slice((currentPage - 1) * 10, currentPage * 10)
                    .map((profile: IProfile) => (
                      <div
                        className={`${styles.table_row} ${profile.personalData.email === currentProfile.personalData.email ? styles.active : ""}`}
                        onClick={() => setCurrentProfile(profile)}
                      >
                        <div
                          className={`${styles.tr} ${styles.name}`}
                          style={{ width: "20%" }}
                        >
                          <div className={styles.avatar}>
                            {profile.avatarUrl ? (
                              <img src={profile.avatarUrl} alt="" />
                            ) : (
                              <img src={EmptyAvatarImage} alt="" />
                            )}
                          </div>
                          {profile.fullName}
                        </div>
                        <div className={styles.tr} style={{ width: "20%" }}>
                          Казахстан, Узбекистан
                        </div>
                        <div className={styles.tr} style={{ width: "17%" }}>
                          Бакалавриат
                        </div>
                        <div className={styles.tr} style={{ width: "15%" }}>
                          Гуманитарные и социальные науки
                        </div>
                        <div className={styles.tr} style={{ width: "13%" }}>
                          2025
                        </div>
                        <div className={styles.tr} style={{ width: "13%" }}>
                          <div className={styles.languages}>
                            <img src={RuIcon} alt="" />
                            <img className={styles.front} src={EnIcon} alt="" />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className={styles.table_footer}>
                  <div className={styles.items_count}>
                    <span>Всего:</span>
                    {` ${profiles.length}`}
                  </div>
                  {profiles.length > 10 ? (
                    <div className={styles.pagination}>
                      <div
                        className={`${styles.slide_button} ${styles.prev} ${currentPage > 1 ? styles.active : ""}`}
                        onClick={() => {
                          if (currentPage > 1) {
                            setCurrentPage(currentPage - 1);
                          }
                        }}
                      >
                        <ChevronIcon
                          fill={currentPage === 1 ? "#14171A57" : "#14171A"}
                        />
                      </div>
                      {Array(Math.ceil(profiles.length / 10))
                        .fill(1)
                        .slice(0, 5)
                        .map((_, index: number) => (
                          <div
                            className={`${styles.page} ${currentPage === index + 1 ? styles.active : ""}`}
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </div>
                        ))}
                      <div
                        className={`${styles.slide_button} ${styles.next} ${currentPage < Math.ceil(profiles.length / 10) ? styles.active : ""}`}
                        onClick={() => {
                          if (currentPage < Math.ceil(profiles.length / 10)) {
                            setCurrentPage(currentPage + 1);
                          }
                        }}
                      >
                        <ChevronIcon
                          fill={
                            currentPage === Math.ceil(profiles.length / 10)
                              ? "#14171A57"
                              : "#14171A"
                          }
                        />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className={styles.profiles_table}>
                <div className={styles.table_head}>
                  <div className={styles.th} style={{ width: "20%" }}>
                    Имя Фамилия
                  </div>
                  <div className={styles.th} style={{ width: "20%" }}>
                    Гражданство
                  </div>
                  <div className={styles.th} style={{ width: "17%" }}>
                    Университет
                  </div>
                  <div className={styles.th} style={{ width: "15%" }}>
                    Образование
                  </div>
                  <div className={styles.th} style={{ width: "13%" }}>
                    Направление
                  </div>
                  <div className={styles.th} style={{ width: "13%" }}>
                    Год окончания
                  </div>
                </div>
                <div className={styles.table_body}>
                  {profiles
                    .slice((currentPage - 1) * 10, currentPage * 10)
                    .map((profile: IProfile) => (
                      <div
                        className={`${styles.table_row} ${profile.personalData.email === currentProfile.personalData.email ? styles.active : ""}`}
                        onClick={() => setCurrentProfile(profile)}
                      >
                        <div
                          className={`${styles.tr} ${styles.name}`}
                          style={{ width: "20%" }}
                        >
                          <div className={styles.avatar}>
                            {profile.avatarUrl ? (
                              <img src={profile.avatarUrl} alt="" />
                            ) : (
                              <img src={EmptyAvatarImage} alt="" />
                            )}
                          </div>
                          {profile.fullName}
                        </div>
                        <div className={styles.tr} style={{ width: "20%" }}>
                          Казахстан, Узбекистан
                        </div>
                        <div className={styles.th} style={{ width: "17%" }}>
                          СФУ
                        </div>
                        <div className={styles.th} style={{ width: "15%" }}>
                          Бакалавриат
                        </div>
                        <div className={styles.th} style={{ width: "13%" }}>
                          Гуманитарные и социальные науки
                        </div>
                        <div className={styles.th} style={{ width: "13%" }}>
                          2025
                        </div>
                      </div>
                    ))}
                </div>
                <div className={styles.table_footer}>
                  <div className={styles.items_count}>
                    <span>Всего:</span>
                    {` ${profiles.length}`}
                  </div>
                  {profiles.length > 10 ? (
                    <div className={styles.pagination}>
                      {Array(Math.ceil(profiles.length / 10))
                        .fill(1)
                        .slice(0, 5)
                        .map((_, index: number) => (
                          <div
                            className={`${styles.page} ${currentPage === index + 1 ? styles.active : ""}`}
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </div>
                        ))}
                    </div>
                  ) : null}
                </div>
              </div>
            )}
            <div
              className={`${styles.user_info} ${currentProfile.personalData.email.trim().length > 0 ? styles.active : ""}`}
            >
              {currentProfile.personalData.email.trim().length > 0 ? (
                <>
                  <div className={styles.header}>
                    <div className={styles.user_head}>
                      <div className={styles.avatar}>
                        {currentProfile.avatarUrl ? (
                          <img src={currentProfile.avatarUrl} alt="" />
                        ) : (
                          <img src={EmptyAvatarImage} alt="" />
                        )}
                      </div>
                      <div className={styles.user_name}>
                        <div className={styles.name}>
                          {currentProfile.fullName}
                        </div>
                        {currentProfile.profileFilled ? (
                          <div className={styles.state}>
                            Заполненный профиль
                          </div>
                        ) : null}
                      </div>
                      <div
                        className={styles.close}
                        onClick={() =>
                          setCurrentProfile({
                            personalData: { email: "" } as IPersonalData,
                          } as IProfile)
                        }
                      >
                        <CloseIcon />
                      </div>
                    </div>
                    <div className={styles.user_states}>
                      <div className={styles.state_item}>
                        <div className={styles.languages}>
                          <img src={UzIcon} alt="" />
                          <img className={styles.front} src={UzIcon} alt="" />
                        </div>
                        <div className={styles.value}>
                          Узбекистан, Казахстан
                        </div>
                      </div>
                      <div className={styles.separator} />
                      <div className={styles.state_item}>
                        <img src={LanguageIcon} alt="" />
                        <div className={styles.value}>Рус, Узб</div>
                      </div>
                      <div className={styles.separator} />
                      <div className={styles.state_item}>
                        <img src={EducationIcon} alt="" />
                        <div className={styles.value}>Среднее</div>
                      </div>
                      <div className={styles.separator} />
                      <div className={styles.state_item}>
                        <img src={RateIcon} alt="" />
                        <div className={styles.value}>4.5</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.tab_view}>
                    <div className={styles.tabs_container}>
                      <div className={styles.tabs_list}>
                        <div
                          className={`${styles.tab} ${currentInfoTab === 0 ? styles.active : ""}`}
                          onClick={() => setCurrentInfoTab(0)}
                        >
                          Личные данные
                        </div>
                        <div
                          className={`${styles.tab} ${currentInfoTab === 1 ? styles.active : ""}`}
                          onClick={() => setCurrentInfoTab(1)}
                        >
                          Образование
                        </div>
                        <div
                          className={`${styles.tab} ${currentInfoTab === 2 ? styles.active : ""}`}
                          onClick={() => setCurrentInfoTab(2)}
                        >
                          Пожелания
                        </div>
                      </div>
                    </div>
                    <div className={styles.tab_content}>
                      {currentInfoTab === 0 ? <></> : null}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
      <ProfilesFiltersModal
        isShow={isFiltersModalShow}
        viewMode={viewMode}
        filter={filter}
        onSave={() => {}}
        onClose={() => setIsFiltersModalShow(false)}
      />
    </>
  );
};
