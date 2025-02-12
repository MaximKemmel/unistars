import React, { useState } from "react";

import { Checkbox } from "../../components/checkbox/Checkbox";

import styles from "./UserCard.module.sass";

import { IUser } from "../../types/user/user";

import EmptyAvatarImage from "../../assets/png/empty-avatar.png";
import { Close as CloseIcon } from "../../assets/svgComponents/Close";
import { Check as CheckIcon } from "../../assets/svgComponents/Check";
import MoreIcon from "../../assets/svg/more.svg";

interface IUserCardProps {
  userItem: IUser;
  isRequestItem?: boolean;
  isCheckedItem?: boolean;
  isWithMoreItem?: boolean;
  onCheckedChange?: Function;
  onAcceptRequest?: Function;
  onCancelRequest?: Function;
  moreItems?: any[];
}

export const UserCard: React.FC<IUserCardProps> = ({
  userItem,
  isRequestItem,
  isCheckedItem,
  isWithMoreItem,
  onCheckedChange,
  onAcceptRequest,
  onCancelRequest,
  moreItems,
}) => {
  const [isMorePopupShow, setIsMorePopupShow] = useState(false);

  return (
    <div className={styles.user_container}>
      {isCheckedItem ? (
        <div className={styles.checkbox}>
          <Checkbox
            isChecked={userItem.isSelected ?? false}
            onChangeStatus={(status: boolean) => onCheckedChange!(status)}
          />
        </div>
      ) : null}
      <div className={styles.user_content}>
        <div className={styles.user_avatar}>
          {userItem.avatarUrl ? (
            <img src={userItem.avatarUrl} alt="" />
          ) : (
            <img src={EmptyAvatarImage} alt="" />
          )}
        </div>
        <div className={styles.user_info}>
          <div className={styles.user_name}>{userItem.fullName}</div>
          <div className={styles.user_description}>{userItem.description}</div>
        </div>
      </div>
      {isRequestItem ? (
        <div className={styles.user_actions}>
          <div
            className={`${styles.button} ${styles.cancel}`}
            onClick={() => onCancelRequest!()}
          >
            <CloseIcon fill="#FF2941" />
          </div>
          <div
            className={`${styles.button} ${styles.accept}`}
            onClick={() => onAcceptRequest!()}
          >
            <CheckIcon fill="#FFFFFF" />
          </div>
        </div>
      ) : null}
      {isWithMoreItem ? (
        <div className={styles.more_container}>
          <div
            className={styles.more_button}
            onClick={() => setIsMorePopupShow(!isMorePopupShow)}
          >
            <img src={MoreIcon} alt="" />
          </div>
          <div
            className={`${styles.more_popup} ${isMorePopupShow ? styles.active : ""}`}
          >
            {moreItems!.map((item, index) => (
              <div className={styles.popup_item} key={index}>
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
