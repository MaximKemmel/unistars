import { useEffect, useState } from "react";

import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { ProfilesFiltersModal } from "../../../modals/ProfilesFilters/ProfilesFilters";

import { Input } from "../../../components/input/Input";
import { Toggle } from "../../../components/toggle/Toggle";

import globalStyles from "../../../App.module.sass";
import styles from "../Home.module.sass";

import { IToggleItem } from "../../../types/local/toggleItem";
import { initUserFilter } from "../../../types/userFilter/initUserFilter";
import { IUser } from "../../../types/user/user";

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
  const users = useTypedSelector(
    (state) => state.subscriberReducer.subscriberList,
  );
  const [viewMode, setViewMode] = useState(0);
  const [filter, setFilter] = useState(initUserFilter());
  const [searchValue, setSearchValue] = useState("");
  const [isFiltersModalShow, setIsFiltersModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUser, setCurrentUser] = useState({ id: -1 } as IUser);
  const [currentInfoTab, setCurrentInfoTab] = useState(0);

  useEffect(() => {
    setFilter(initUserFilter());
    setCurrentPage(1);
    setCurrentUser({ id: -1 } as IUser);
    setCurrentInfoTab(0);
  }, [viewMode]);

  return (
    <>
      <div className={styles.content}>
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
                {users
                  .slice((currentPage - 1) * 10, currentPage * 10)
                  .map((user: IUser) => (
                    <div
                      className={`${styles.table_row} ${user.id === currentUser.id! ? styles.active : ""}`}
                      onClick={() => {
                        console.log(user);
                        setCurrentUser(user);
                      }}
                    >
                      <div
                        className={`${styles.tr} ${styles.name}`}
                        style={{ width: "20%" }}
                      >
                        <div className={styles.avatar}>
                          {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt="" />
                          ) : (
                            <img src={EmptyAvatarImage} alt="" />
                          )}
                        </div>
                        {user.fullName}
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
                  {` ${users.length}`}
                </div>
                {users.length > 10 ? (
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
                    {Array(Math.ceil(users.length / 10))
                      .fill(1)
                      .map((_, index: number) => (
                        <div
                          className={`${styles.page} ${currentPage === index + 1 ? styles.active : ""}`}
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </div>
                      ))}
                    <div
                      className={`${styles.slide_button} ${styles.next} ${currentPage < Math.ceil(users.length / 10) ? styles.active : ""}`}
                      onClick={() => {
                        if (currentPage < Math.ceil(users.length / 10)) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                    >
                      <ChevronIcon
                        fill={
                          currentPage === Math.ceil(users.length / 10)
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
                {users
                  .slice((currentPage - 1) * 10, currentPage * 10)
                  .map((user: IUser) => (
                    <div
                      className={`${styles.table_row} ${user.id === currentUser.id! ? styles.active : ""}`}
                      onClick={() => setCurrentUser(user)}
                    >
                      <div
                        className={`${styles.tr} ${styles.name}`}
                        style={{ width: "20%" }}
                      >
                        <div className={styles.avatar}>
                          {user.avatarUrl ? (
                            <img src={user.avatarUrl} alt="" />
                          ) : (
                            <img src={EmptyAvatarImage} alt="" />
                          )}
                        </div>
                        {user.fullName}
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
                  {` ${users.length}`}
                </div>
                {users.length > 10 ? (
                  <div className={styles.pagination}>
                    {Array(Math.ceil(users.length / 10))
                      .fill(1)
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
            className={`${styles.user_info} ${currentUser.id! > -1 ? styles.active : ""}`}
          >
            {currentUser.id! > -1 ? (
              <>
                <div className={styles.header}>
                  <div className={styles.user_head}>
                    <div className={styles.avatar}>
                      {currentUser.avatarUrl ? (
                        <img src={currentUser.avatarUrl} alt="" />
                      ) : (
                        <img src={EmptyAvatarImage} alt="" />
                      )}
                    </div>
                    <div className={styles.user_name}>
                      <div className={styles.name}>{currentUser.fullName}</div>
                      <div className={styles.state}>Заполненный профиль</div>
                    </div>
                    <div
                      className={styles.close}
                      onClick={() => setCurrentUser({ id: -1 } as IUser)}
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
                      <div className={styles.value}>Узбекистан, Казахстан</div>
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
