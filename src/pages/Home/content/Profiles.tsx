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

export const Profiles = () => {
  const users = useTypedSelector(
    (state) => state.subscriberReducer.subscriberList,
  );
  const [viewMode, setViewMode] = useState(0);
  const [filter, setFilter] = useState(initUserFilter());
  const [searchValue, setSearchValue] = useState("");
  const [isFiltersModalShow, setIsFiltersModalShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setFilter(initUserFilter());
    setCurrentPage(1);
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
                    <div className={styles.table_row}>
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
                        Бакалавриат
                      </div>
                      <div className={styles.th} style={{ width: "15%" }}>
                        Гуманитарные и социальные науки
                      </div>
                      <div className={styles.th} style={{ width: "13%" }}>
                        2025
                      </div>
                      <div className={styles.th} style={{ width: "13%" }}>
                        {user.languages !== null &&
                        user.languages !== undefined &&
                        user.languages.length > 0
                          ? user.languages[0].name
                          : ""}
                      </div>
                    </div>
                  ))}
              </div>
              {users.length > 10 ? (
                <div className={styles.pagination}>
                  {Array(Math.ceil(users.length / 10))
                    .fill(1)
                    .map((_, index: number) => (
                      <div onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </div>
                    ))}
                </div>
              ) : null}
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
                    <div className={styles.table_row}>
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
              {users.length > 10 ? (
                <div className={styles.pagination}>
                  {Array(Math.ceil(users.length / 10))
                    .fill(1)
                    .map((_, index: number) => (
                      <div onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </div>
                    ))}
                </div>
              ) : null}
            </div>
          )}
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
