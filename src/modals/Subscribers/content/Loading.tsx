import styles from "../SubscribersModal.module.sass";

import FileIcon from "../../../assets/svg/file.svg";
import { Close as CloseIcon } from "../../../assets/svgComponents/Close";
import CheckIcon from "../../../assets/svg/circled-check.svg";

interface ILoadingProps {
  isLoadShow: boolean;
  isLoadingSuccess: boolean;
}

export const Loading: React.FC<ILoadingProps> = ({ isLoadShow, isLoadingSuccess }) => {
  return (
    <div className={styles.loading_content}>
      <div className={styles.loading_description}>
        Абитуриенты заполняют форму с данными о своем образовании, языковых навыках, потребности в общежитии и интересующих
        направлениях обучения. Эти данные можно выгрузить в формате Excel.
      </div>
      {isLoadShow ? (
        <>
          <div className={styles.loading_separator} />
          <div className={styles.loading_status}>
            <div className={styles.loading_file}>
              <img src={FileIcon} alt="" />
              Subscribers.xlsx
            </div>
            {isLoadingSuccess ? (
              <div className={`${styles.loading_progress} ${styles.success}`}>
                <img src={CheckIcon} alt="" />
                Отправлено
              </div>
            ) : (
              <div className={`${styles.loading_progress} ${styles.error}`}>
                Ошибка
                <CloseIcon fill="#C45F1C" isBold={true} />
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};
