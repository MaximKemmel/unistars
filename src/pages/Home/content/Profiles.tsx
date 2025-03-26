import { useEffect, useState } from "react";

import { ProfilesFiltersModal } from "../../../modals/ProfilesFilters/ProfilesFilters";

import globalStyles from "../../../App.module.sass";
import styles from "../Home.module.sass";

import { Input } from "../../../components/input/Input";
import { Toggle } from "../../../components/toggle/Toggle";

import { IToggleItem } from "../../../types/local/toggleItem";
import { initUserFilter } from "../../../types/userFilter/initUserFilter";

import { Filter as FilterIcon } from "../../../assets/svgComponents/Filter";

export const Profiles = () => {
  const [viewMode, setViewMode] = useState(0);
  const [filter, setFilter] = useState(initUserFilter());
  const [searchValue, setSearchValue] = useState("");
  const [isFiltersModalShow, setIsFiltersModalShow] = useState(false);

  useEffect(() => {
    setFilter(initUserFilter());
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
