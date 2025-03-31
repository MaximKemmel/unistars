import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../hooks/useTypedSelector";

import { Checkbox } from "../../components/checkbox/Checkbox";
import { Dropdown } from "../../components/dropdown/Dropdown";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";

import { IProfileFilter } from "../../types/profileFilter/profileFilter";
import { IDropdownItem } from "../../types/local/dropdownItem";
import { ageRanges } from "../../data/ageRanges";
import { IAgeRange } from "../../types/profileFilter/ageRange";
import { initProfileFilter } from "../../types/profileFilter/initProfileFilter";
import { ICountry } from "../../types/core/country";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import { Filter as FilterIcon } from "../../assets/svgComponents/Filter";

interface IProfilesFiltersModalProps {
  isShow: boolean;
  viewMode: number;
  filter: IProfileFilter;
  onSave: Function;
  onClose: Function;
}

export const ProfilesFiltersModal: React.FC<IProfilesFiltersModalProps> = ({
  isShow,
  viewMode,
  filter,
  onSave,
  onClose,
}) => {
  const { t } = useTranslation();
  const [currentFilter, setCurrentFilter] = useState(filter);
  const countries = useTypedSelector((state) => state.coreReducer.countries);

  useEffect(() => {
    setCurrentFilter(filter);
  }, [filter]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      ></div>
      <div className={`${modalStyles.modal_content} ${modalStyles.wide}`}>
        <div className={modalStyles.head}>
          <div className={modalStyles.head_title}>
            <FilterIcon />
            <h4>
              {viewMode === 0 ? "Фильтры абитуриентов" : "Фильтры студентов"}
            </h4>
          </div>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        {isShow ? (
          <div className={modalStyles.form}>
            <div className={modalStyles.form_content}>
              <div className={modalStyles.part_container}>
                <div className={modalStyles.part}>
                  <Checkbox
                    isChecked={currentFilter.isCompleted}
                    onChangeStatus={(status: boolean) =>
                      setCurrentFilter({
                        ...currentFilter,
                        isCompleted: status,
                      })
                    }
                    text={"Заполненный профиль"}
                  />
                </div>
              </div>
              <div className={modalStyles.part_container}>
                <div className={modalStyles.part_container_title}>
                  Личные данные
                </div>
                <div
                  className={`${modalStyles.part_multi} ${modalStyles.double}`}
                >
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>Пол</div>
                    <div className={modalStyles.part_selector}>
                      <Checkbox
                        isChecked={currentFilter.sex === 0}
                        onChangeStatus={(status: boolean) =>
                          setCurrentFilter({
                            ...currentFilter,
                            sex: status ? 0 : -1,
                          })
                        }
                        text={"Мужской"}
                      />
                      <Checkbox
                        isChecked={currentFilter.sex === 1}
                        onChangeStatus={(status: boolean) =>
                          setCurrentFilter({
                            ...currentFilter,
                            sex: status ? 1 : -1,
                          })
                        }
                        text={"Женский"}
                      />
                    </div>
                  </div>
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>
                      {viewMode === 0
                        ? "Возраст абитуриента"
                        : "Возраст студента"}
                    </div>
                    <Dropdown
                      placeholder={"Выберите возраст"}
                      items={[
                        {
                          id: -1,
                          text: t("global.not_selected"),
                          text_eng: t("global.not_selected"),
                          is_selected: currentFilter.ageRange === -1,
                        } as IDropdownItem,
                        ...(ageRanges.map((ageRange: IAgeRange) => {
                          return {
                            id: ageRange.id,
                            text: ageRange.text,
                            text_eng: ageRange.text_eng,
                            is_selected: currentFilter.ageRange === ageRange.id,
                          } as IDropdownItem;
                        }) as IDropdownItem[]),
                      ]}
                      onItemSelect={(item: IDropdownItem) => {
                        setCurrentFilter({
                          ...currentFilter,
                          ageRange: item.id,
                        });
                      }}
                    />
                  </div>
                </div>
                <div
                  className={`${modalStyles.part_multi} ${modalStyles.double}`}
                >
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>
                      {viewMode === 0
                        ? "Гражданство абитуриента"
                        : "Гражданство студента"}
                    </div>
                    <Dropdown
                      placeholder={"Выберите гражданства"}
                      items={[
                        {
                          id: -1,
                          text: t("global.not_selected"),
                          text_eng: t("global.not_selected"),
                          is_selected: currentFilter.citizenship === -1,
                        } as IDropdownItem,
                        ...(countries.map((country: ICountry) => {
                          return {
                            id: country.id,
                            text: country.name,
                            text_eng: country.nameEnglish,
                            is_selected:
                              currentFilter.citizenship === country.id,
                          } as IDropdownItem;
                        }) as IDropdownItem[]),
                      ]}
                      onItemSelect={(item: IDropdownItem) => {
                        setCurrentFilter({
                          ...currentFilter,
                          citizenship: item.id,
                        });
                      }}
                      withSearch={true}
                      searchPlaceholder={"Поиск по странам"}
                    />
                  </div>
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>
                      Владеет языками
                    </div>
                    <Dropdown
                      placeholder={"Выберите языки"}
                      items={[
                        {
                          id: -1,
                          text: t("global.not_selected"),
                          text_eng: t("global.not_selected"),
                          is_selected: currentFilter.citizenship === -1,
                        } as IDropdownItem,
                        ...(countries.map((country: ICountry) => {
                          return {
                            id: country.id,
                            text: country.name,
                            text_eng: country.nameEnglish,
                            is_selected:
                              currentFilter.citizenship === country.id,
                          } as IDropdownItem;
                        }) as IDropdownItem[]),
                      ]}
                      onItemSelect={(item: IDropdownItem) => {
                        setCurrentFilter({
                          ...currentFilter,
                          citizenship: item.id,
                        });
                      }}
                      withSearch={true}
                      searchPlaceholder={"Поиск по странам"}
                    />
                  </div>
                </div>
                <div
                  className={`${modalStyles.part_multi} ${modalStyles.double}`}
                >
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>
                      Текущее образование
                    </div>
                    <Dropdown
                      placeholder={"Выберите текущее образование"}
                      items={[
                        {
                          id: -1,
                          text: t("global.not_selected"),
                          text_eng: t("global.not_selected"),
                          is_selected: currentFilter.citizenship === -1,
                        } as IDropdownItem,
                        ...(countries.map((country: ICountry) => {
                          return {
                            id: country.id,
                            text: country.name,
                            text_eng: country.nameEnglish,
                            is_selected:
                              currentFilter.citizenship === country.id,
                          } as IDropdownItem;
                        }) as IDropdownItem[]),
                      ]}
                      onItemSelect={(item: IDropdownItem) => {
                        setCurrentFilter({
                          ...currentFilter,
                          citizenship: item.id,
                        });
                      }}
                      withSearch={true}
                      searchPlaceholder={"Поиск по странам"}
                    />
                  </div>
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>
                      Дата регистрации
                    </div>
                    <Dropdown
                      placeholder={"Выберите период"}
                      items={[
                        {
                          id: -1,
                          text: t("global.not_selected"),
                          text_eng: t("global.not_selected"),
                          is_selected: currentFilter.citizenship === -1,
                        } as IDropdownItem,
                        ...(countries.map((country: ICountry) => {
                          return {
                            id: country.id,
                            text: country.name,
                            text_eng: country.nameEnglish,
                            is_selected:
                              currentFilter.citizenship === country.id,
                          } as IDropdownItem;
                        }) as IDropdownItem[]),
                      ]}
                      onItemSelect={(item: IDropdownItem) => {
                        setCurrentFilter({
                          ...currentFilter,
                          citizenship: item.id,
                        });
                      }}
                      withSearch={true}
                      searchPlaceholder={"Поиск по странам"}
                    />
                  </div>
                </div>
              </div>
              {viewMode === 0 ? (
                <div className={modalStyles.part_container}>
                  <div className={modalStyles.part_container_title}>
                    Пожелания по обучению
                  </div>
                  <div
                    className={`${modalStyles.part_multi} ${modalStyles.double}`}
                  >
                    <div className={modalStyles.part}>
                      <div className={modalStyles.part_label}>
                        Желаемое образование
                      </div>
                      <Dropdown
                        placeholder={"Выберите образование"}
                        items={[
                          {
                            id: -1,
                            text: t("global.not_selected"),
                            text_eng: t("global.not_selected"),
                            is_selected: currentFilter.citizenship === -1,
                          } as IDropdownItem,
                          ...(countries.map((country: ICountry) => {
                            return {
                              id: country.id,
                              text: country.name,
                              text_eng: country.nameEnglish,
                              is_selected:
                                currentFilter.citizenship === country.id,
                            } as IDropdownItem;
                          }) as IDropdownItem[]),
                        ]}
                        onItemSelect={(item: IDropdownItem) => {
                          setCurrentFilter({
                            ...currentFilter,
                            citizenship: item.id,
                          });
                        }}
                        withSearch={true}
                        searchPlaceholder={"Поиск по странам"}
                      />
                    </div>
                    <div className={modalStyles.part}>
                      <div className={modalStyles.part_label}>
                        Желаемое направление
                      </div>
                      <Dropdown
                        placeholder={"Выберите направление"}
                        items={[
                          {
                            id: -1,
                            text: t("global.not_selected"),
                            text_eng: t("global.not_selected"),
                            is_selected: currentFilter.citizenship === -1,
                          } as IDropdownItem,
                          ...(countries.map((country: ICountry) => {
                            return {
                              id: country.id,
                              text: country.name,
                              text_eng: country.nameEnglish,
                              is_selected:
                                currentFilter.citizenship === country.id,
                            } as IDropdownItem;
                          }) as IDropdownItem[]),
                        ]}
                        onItemSelect={(item: IDropdownItem) => {
                          setCurrentFilter({
                            ...currentFilter,
                            citizenship: item.id,
                          });
                        }}
                        withSearch={true}
                        searchPlaceholder={"Поиск по странам"}
                      />
                    </div>
                  </div>
                  <div
                    className={`${modalStyles.part_multi} ${modalStyles.double}`}
                  >
                    <div className={modalStyles.part}>
                      <div className={modalStyles.part_label}>
                        Желаемый год поступления
                      </div>
                      <Dropdown
                        placeholder={"Выберите год"}
                        items={[
                          {
                            id: -1,
                            text: t("global.not_selected"),
                            text_eng: t("global.not_selected"),
                            is_selected: currentFilter.ageRange === -1,
                          } as IDropdownItem,
                          ...(ageRanges.map((ageRange: IAgeRange) => {
                            return {
                              id: ageRange.id,
                              text: ageRange.text,
                              text_eng: ageRange.text_eng,
                              is_selected:
                                currentFilter.ageRange === ageRange.id,
                            } as IDropdownItem;
                          }) as IDropdownItem[]),
                        ]}
                        onItemSelect={(item: IDropdownItem) => {
                          setCurrentFilter({
                            ...currentFilter,
                            ageRange: item.id,
                          });
                        }}
                      />
                    </div>
                    <div className={modalStyles.part}>
                      <div className={modalStyles.part_label}>
                        Языки обучения
                      </div>
                      <div className={modalStyles.part_selector}>
                        <Checkbox
                          isChecked={currentFilter.sex === 0}
                          onChangeStatus={(status: boolean) =>
                            setCurrentFilter({
                              ...currentFilter,
                              sex: status ? 0 : -1,
                            })
                          }
                          text={"Русский"}
                        />
                        <Checkbox
                          isChecked={currentFilter.sex === 1}
                          onChangeStatus={(status: boolean) =>
                            setCurrentFilter({
                              ...currentFilter,
                              sex: status ? 1 : -1,
                            })
                          }
                          text={"Английский"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>
                      Необходимость в общежитии
                    </div>
                    <Checkbox
                      isChecked={currentFilter.isCompleted}
                      onChangeStatus={(status: boolean) =>
                        setCurrentFilter({
                          ...currentFilter,
                          isCompleted: status,
                        })
                      }
                      text={"Необходимо"}
                    />
                  </div>
                </div>
              ) : (
                <div className={modalStyles.part_container}>
                  <div className={modalStyles.part_container_title}>
                    Обучение
                  </div>
                  <div
                    className={`${modalStyles.part_multi} ${modalStyles.double}`}
                  >
                    <div className={modalStyles.part}>
                      <div className={modalStyles.part_label}>Университет</div>
                      <Dropdown
                        placeholder={"Выберите университет"}
                        items={[
                          {
                            id: -1,
                            text: t("global.not_selected"),
                            text_eng: t("global.not_selected"),
                            is_selected: currentFilter.citizenship === -1,
                          } as IDropdownItem,
                          ...(countries.map((country: ICountry) => {
                            return {
                              id: country.id,
                              text: country.name,
                              text_eng: country.nameEnglish,
                              is_selected:
                                currentFilter.citizenship === country.id,
                            } as IDropdownItem;
                          }) as IDropdownItem[]),
                        ]}
                        onItemSelect={(item: IDropdownItem) => {
                          setCurrentFilter({
                            ...currentFilter,
                            citizenship: item.id,
                          });
                        }}
                        withSearch={true}
                        searchPlaceholder={"Поиск по странам"}
                      />
                    </div>
                    <div className={modalStyles.part}>
                      <div className={modalStyles.part_label}>
                        Уровень образования
                      </div>
                      <Dropdown
                        placeholder={"Выберите уровень образования"}
                        items={[
                          {
                            id: -1,
                            text: t("global.not_selected"),
                            text_eng: t("global.not_selected"),
                            is_selected: currentFilter.citizenship === -1,
                          } as IDropdownItem,
                          ...(countries.map((country: ICountry) => {
                            return {
                              id: country.id,
                              text: country.name,
                              text_eng: country.nameEnglish,
                              is_selected:
                                currentFilter.citizenship === country.id,
                            } as IDropdownItem;
                          }) as IDropdownItem[]),
                        ]}
                        onItemSelect={(item: IDropdownItem) => {
                          setCurrentFilter({
                            ...currentFilter,
                            citizenship: item.id,
                          });
                        }}
                        withSearch={true}
                        searchPlaceholder={"Поиск по странам"}
                      />
                    </div>
                  </div>
                  <div
                    className={`${modalStyles.part_multi} ${modalStyles.double}`}
                  >
                    <div className={modalStyles.part}>
                      <div className={modalStyles.part_label}>
                        Направление обучения
                      </div>
                      <Dropdown
                        placeholder={"Выберите направление"}
                        items={[
                          {
                            id: -1,
                            text: t("global.not_selected"),
                            text_eng: t("global.not_selected"),
                            is_selected: currentFilter.ageRange === -1,
                          } as IDropdownItem,
                          ...(ageRanges.map((ageRange: IAgeRange) => {
                            return {
                              id: ageRange.id,
                              text: ageRange.text,
                              text_eng: ageRange.text_eng,
                              is_selected:
                                currentFilter.ageRange === ageRange.id,
                            } as IDropdownItem;
                          }) as IDropdownItem[]),
                        ]}
                        onItemSelect={(item: IDropdownItem) => {
                          setCurrentFilter({
                            ...currentFilter,
                            ageRange: item.id,
                          });
                        }}
                      />
                    </div>
                    <div className={modalStyles.part}>
                      <div className={modalStyles.part_label}>
                        Год окончания
                      </div>
                      <Dropdown
                        placeholder={"Выберите год"}
                        items={[
                          {
                            id: -1,
                            text: t("global.not_selected"),
                            text_eng: t("global.not_selected"),
                            is_selected: currentFilter.ageRange === -1,
                          } as IDropdownItem,
                          ...(ageRanges.map((ageRange: IAgeRange) => {
                            return {
                              id: ageRange.id,
                              text: ageRange.text,
                              text_eng: ageRange.text_eng,
                              is_selected:
                                currentFilter.ageRange === ageRange.id,
                            } as IDropdownItem;
                          }) as IDropdownItem[]),
                        ]}
                        onItemSelect={(item: IDropdownItem) => {
                          setCurrentFilter({
                            ...currentFilter,
                            ageRange: item.id,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className={modalStyles.part}>
                    <div className={modalStyles.part_label}>Статус</div>
                    <div className={modalStyles.part_selector}>
                      <Checkbox
                        isChecked={currentFilter.sex === 0}
                        onChangeStatus={(status: boolean) =>
                          setCurrentFilter({
                            ...currentFilter,
                            sex: status ? 0 : -1,
                          })
                        }
                        text={"Студент"}
                      />
                      <Checkbox
                        isChecked={currentFilter.sex === 1}
                        onChangeStatus={(status: boolean) =>
                          setCurrentFilter({
                            ...currentFilter,
                            sex: status ? 1 : -1,
                          })
                        }
                        text={"Абмассадор"}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
        <div className={modalStyles.actions}>
          <div />
          <div className={modalStyles.buttons}>
            <button
              type="button"
              className={`${globalStyles.inverted} ${globalStyles.small}`}
              onClick={() => setCurrentFilter(initProfileFilter())}
            >
              <span>Сбросить</span>
            </button>
            <button
              type="button"
              className={globalStyles.small}
              onClick={() => onSave(currentFilter)}
            >
              Применить фильтры
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
