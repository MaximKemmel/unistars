import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import useOutsideAlerter from "../../hooks/useOutsideAlerter";

import { Input } from "../../components/input/Input";

import styles from "./Dropdown.module.sass";

import { IDropdownItem } from "../../types/local/dropdownItem";

import { Chevron as ChevronIcon } from "../../assets/svgComponents/Chevron";
import { Check as CheckIcon } from "../../assets/svgComponents/Check";

interface IDropdownProps {
  placeholder: string;
  items: IDropdownItem[];
  onItemSelect: Function;
  withSearch?: boolean;
  searchPlaceholder?: string;
}

export const Dropdown: React.FC<IDropdownProps> = ({
  placeholder,
  items,
  onItemSelect,
  withSearch,
  searchPlaceholder,
}) => {
  const { i18n } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    setFilteredItems(items);
    setSearchValue("");
  }, [isActive]);

  useEffect(() => {
    if (searchValue.length === 0) {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        items.filter(
          (item: IDropdownItem) =>
            item.text.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.text_eng.toLowerCase().includes(searchValue.toLowerCase()),
        ),
      );
    }
  }, [searchValue]);

  useOutsideAlerter(dropdownRef, () => {
    if (isActive) {
      setIsActive(false);
    }
  });

  useEffect(() => {
    if (isActive) {
      const list = document.getElementById("dropdown_list");
      list?.scrollTo({ top: 0 });
      const activeDropdownDiv = document.getElementById("active_dropdown");
      if (activeDropdownDiv) {
        const formDiv = document.getElementById("form");
        formDiv?.scrollTo({
          top: activeDropdownDiv.offsetTop - formDiv?.offsetTop - 45,
          behavior: "smooth",
        });
      }
    }
  }, [isActive]);

  return (
    <div
      className={`${styles.dropdown} ${isActive ? styles.active : ""}`}
      id={isActive ? "active_dropdown" : ""}
      ref={dropdownRef}
    >
      <div
        className={`${styles.dropdown_button} ${
          items.filter((itemTmp: IDropdownItem) => itemTmp.id === -1).length >
            0 && items[0].is_selected
            ? styles.not_selected
            : ""
        } ${isActive ? styles.active : ""}`}
        onClick={() => setIsActive(!isActive)}
      >
        <div className={styles.label}>
          {items.find((item: IDropdownItem) => item.is_selected)?.id === -1
            ? placeholder
            : i18n.resolvedLanguage === "ru"
              ? items.find((item: IDropdownItem) => item.is_selected)?.text
              : items.find((item: IDropdownItem) => item.is_selected)?.text_eng}
        </div>
        <div className={styles.arrow}>
          <ChevronIcon />
        </div>
      </div>
      <div
        className={`${styles.dropdown_container} ${isActive ? styles.active : ""}`}
      >
        <div
          className={styles.dropdown_list}
          id={isActive ? "dropdown_list" : `list`}
        >
          {withSearch ? (
            <div className={styles.search_input}>
              <Input
                value={searchValue}
                onChange={(value: string) => setSearchValue(value)}
                placeholder={searchPlaceholder ?? ""}
                type="text"
                isSearch={true}
              />
            </div>
          ) : null}
          {filteredItems.map((item: IDropdownItem) => (
            <div
              key={item.id}
              className={`${styles.dropdown_item} ${item.is_selected ? styles.active : ""}`}
              onClick={() => {
                setIsActive(false);
                onItemSelect(item);
              }}
            >
              {i18n.resolvedLanguage === "ru" ? item.text : item.text_eng}
              {item.is_selected ? <CheckIcon /> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
