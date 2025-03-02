import React from "react";
import { Switch as GravitySwitch } from "@gravity-ui/uikit";

import styles from "./Switch.module.sass";

interface ISwitchProps {
  text: string;
  isChecked: boolean;
  onChangeStatus: Function;
}

export const Switch: React.FC<ISwitchProps> = ({
  text,
  isChecked,
  onChangeStatus,
}) => {
  return (
    <div className={styles.switch_container}>
      <div className={styles.label}>{text}</div>
      <div className={styles.switch}>
        <GravitySwitch
          size="l"
          checked={isChecked}
          onUpdate={(value: boolean) => onChangeStatus(value)}
        />
      </div>
    </div>
  );
};
