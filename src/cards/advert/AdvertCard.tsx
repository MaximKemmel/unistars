import styles from "./AdvertCard.module.sass";

import TimeIcon from "../../assets/svg/time.svg";
import ViewIcon from "../../assets/svg/view.svg";
import ClickIcon from "../../assets/svg/click.svg";

interface IAdvertCardProps {
  advertItem: any;
}

export const AdvertCard: React.FC<IAdvertCardProps> = ({ advertItem }) => {
  return (
    <div className={styles.advert_container}>
      <div className={styles.advert_head}>
        <img src={advertItem.photo} alt="" />
        <div className={styles.photo_overlay} />
        <div className={styles.advert_info}>
          <div className={styles.advert_name}>{advertItem.name}</div>
          <div className={styles.advert_description}>{advertItem.description}</div>
        </div>
        <div className={`${styles.advert_status} ${advertItem.state === 0 ? styles.moderation : styles.published}`}>
          {advertItem.state === 0 ? "Модерация" : "Опубликовано"}
        </div>
      </div>
      <div className={styles.additional_info}>
        <div className={styles.info_item}>
          <img className={styles.item_icon} src={TimeIcon} alt="" />
          {advertItem.endDate}
        </div>
        <div className={styles.info_progress_item}>
          <div className={styles.progress_head}>
            <div className={styles.info_item}>
              <img className={styles.item_icon} src={ViewIcon} alt="" />
              <div>{`${advertItem.views} показов`}</div>
            </div>
            <div className={styles.info_limit}>{`${advertItem.viewsLimit} лимит`}</div>
          </div>
          <div className={styles.progress_bar}>
            <div
              className={styles.progress}
              style={{ width: `${advertItem.views === 0 ? "0" : (advertItem.views * 100) / advertItem.viewsLimit}%` }}
            />
          </div>
        </div>
        <div className={styles.info_progress_item}>
          <div className={styles.progress_head}>
            <div className={styles.info_item}>
              <img className={styles.item_icon} src={ClickIcon} alt="" />
              <div>{`${advertItem.clicks} кликов`}</div>
            </div>
            <div className={styles.info_limit}>{`${advertItem.clicksLimit} лимит`}</div>
          </div>
          <div className={styles.progress_bar}>
            <div
              className={styles.progress}
              style={{ width: `${advertItem.clicks === 0 ? "0" : (advertItem.clicks * 100) / advertItem.clicksLimit}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
