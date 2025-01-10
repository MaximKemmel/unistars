import { useEffect } from "react";

import styles from "./Dropdown.module.sass";

import { IDropdownItem } from "../../types/local/dropdownItem";
import { DropdownType } from "../../enums/dropdownType";

import { Chevron as ChevronIcon } from "../../assets/svgComponents/Chevron";
import { Check as CheckIcon } from "../../assets/svgComponents/Check";

interface IDropdownProps {
  placeholder: string;
  dropdownIndex: number;
  activeComponent: number;
  setActiveComponent: React.Dispatch<React.SetStateAction<number>>;
  items: IDropdownItem[];
  onItemSelect: Function;
}

export const Dropdown: React.FC<IDropdownProps> = ({
  placeholder,
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

  return (
    <div
      className={`${styles.dropdown} ${activeComponent === dropdownIndex ? styles.active : ""}`}
      id={activeComponent === dropdownIndex ? "active_dropdown" : ""}
    >
      <div
        className={`${styles.dropdown_button} ${
          items.filter((itemTmp: IDropdownItem) => itemTmp.id === -1).length > -1 && items[0].is_selected
            ? styles.not_selected
            : ""
        } ${activeComponent === dropdownIndex ? styles.active : ""}`}
        onClick={() => setActiveComponent(activeComponent === dropdownIndex ? DropdownType.None : dropdownIndex)}
      >
        <div className={styles.label}>
          {items.find((item: IDropdownItem) => item.is_selected)?.id === -1
            ? placeholder
            : items.find((item: IDropdownItem) => item.is_selected)?.text}
        </div>
        <ChevronIcon />
      </div>
      <div className={`${styles.dropdown_container} ${activeComponent === dropdownIndex ? styles.active : ""}`}>
        <div
          className={styles.dropdown_list}
          id={activeComponent === dropdownIndex ? "dropdown_list" : `list${dropdownIndex}`}
        >
          {items.map((item: IDropdownItem) => (
            <div
              key={item.id}
              className={`${styles.dropdown_item} ${item.is_selected ? styles.active : ""}`}
              onClick={() => {
                onItemSelect(item);
              }}
            >
              {item.text}
              {item.is_selected ? <CheckIcon /> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
