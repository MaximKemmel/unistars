import styles from "./Toggle.module.sass";

import { IToggleItem } from "../../types/toggleItem";

interface IToggleProps {
  selectedIndex: number;
  items: IToggleItem[];
  onItemSelect: Function;
}

export const Toggle: React.FC<IToggleProps> = ({
  selectedIndex,
  items,
  onItemSelect,
}) => {
  return (
    <div className={styles.toggle_container}>
      {items.map((item: IToggleItem) => (
        <div
          key={item.id}
          className={`${styles.toggle_item} ${
            selectedIndex === item.id ? styles.active : ""
          }`}
          onClick={() => onItemSelect(item)}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};
