import { useEffect, useState } from "react";

import styles from "./Dropdown.module.sass";

import { IDropdownItem } from "../../types/dropdownItem";
import { DropdownType } from "../../enums/dropdownType";

import ArrowDownIcon from "../../assets/svg/chevron.svg";

interface IDropdownProps {
  dropdownIndex: number;
  activeComponent: number;
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>;
  items: IDropdownItem[];
  onItemSelect: Function;
}

export const Dropdown: React.FC<IDropdownProps> = ({
  dropdownIndex,
  activeComponent,
  setActiveComponent,
  items,
  onItemSelect,
}) => {
  useEffect(() => {
    if (activeComponent === dropdownIndex) {
      var list = document.getElementById("dropdown_list");
      list?.scrollTo({ top: 0 });
    }
  }, [activeComponent]);

  const [activeItemIndex, setactiveItemIndex] = useState(-1);

  return (
    <div
      className={`${styles.dropdown} ${
        activeComponent === dropdownIndex ? styles.active : ""
      }`}
      id={activeComponent === dropdownIndex ? "active_dropdown" : ""}
    >
      <div
        className={`${styles.dropdown_button} ${
          items.filter((itemTmp: IDropdownItem) => itemTmp.id === -1).length >
            -1 && items[0].is_selected
            ? styles.not_selected
            : ""
        } ${activeComponent === dropdownIndex ? styles.active : ""}`}
        onClick={() =>
          setActiveComponent(
            activeComponent === dropdownIndex
              ? DropdownType.None
              : dropdownIndex
          )
        }
      >
        <div className={styles.label}>
          {
            items.find((item: IDropdownItem) => item.id == activeItemIndex)
              ?.text
          }
        </div>
        <img
          className={`${styles.arrow} ${
            activeComponent === dropdownIndex ? styles.active : ""
          }`}
          src={ArrowDownIcon}
          alt=""
        />
      </div>
      <div
        className={`${styles.dropdown_container} ${
          activeComponent === dropdownIndex ? styles.active : ""
        }`}
      >
        <div
          className={styles.dropdown_list}
          id={
            activeComponent === dropdownIndex
              ? "dropdown_list"
              : `list${dropdownIndex}`
          }
        >
          {items
            .filter((item: IDropdownItem) => item.id > -1)
            .map((item: IDropdownItem) => (
              <div
                key={item.id}
                className={styles.dropdown_item}
                onClick={() => {
                  setactiveItemIndex(item.id);
                  onItemSelect(item);
                }}
              >
                {item.text}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
