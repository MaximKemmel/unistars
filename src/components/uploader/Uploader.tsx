import React from "react";
import { useTranslation } from "react-i18next";
import { Spin } from "@gravity-ui/uikit";

import globalStyles from "../../App.module.sass";
import styles from "./Uploader.module.sass";

import { ApiStatusType } from "../../enums/local/apiStatusType";

import { File as FileIcon } from "../../assets/svgComponents/File";
import FolderIcon from "../../assets/svg/file.svg";
import CloseIcon from "../../assets/svg/circled-close.svg";
import CheckIcon from "../../assets/svg/circled-check.svg";
import ErrorIcon from "../../assets/svg/error.svg";

interface IUploaderProps {
  additionalInfo?: string;
  path: string;
  title: string;
  status: ApiStatusType;
  onClick: Function;
  onRetry: Function;
  onClear: Function;
  isDisabled: boolean;
}

export const Uploader: React.FC<IUploaderProps> = ({
  additionalInfo,
  path,
  title,
  status,
  onClick,
  onRetry,
  onClear,
  isDisabled,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.uploader_container}>
      <button
        className={`${globalStyles.small} ${globalStyles.inverted}`}
        type="button"
        disabled={isDisabled}
        onClick={() => onClick()}
      >
        <FileIcon isDisabled={isDisabled} />
        <span>{title}</span>
      </button>
      {additionalInfo !== null &&
      additionalInfo !== undefined &&
      additionalInfo?.trim().length > 0 ? (
        <div className={styles.additional_info}>{additionalInfo}</div>
      ) : null}
      {path.trim().length > 0 ? (
        <div className={styles.file_item}>
          <div className={styles.file_name}>
            <img src={FolderIcon} alt="" />
            <div className={styles.name}>{path}</div>
          </div>
          <div className={styles.actions}>
            {status === ApiStatusType.SUCCESS ||
            status === ApiStatusType.ERROR ? (
              <div
                className={`${styles.status} ${status === ApiStatusType.SUCCESS ? styles.success : styles.error}`}
              >
                {status === ApiStatusType.SUCCESS ? (
                  <>
                    <img src={CheckIcon} alt="" />
                    {t("global.uploaded")}
                  </>
                ) : (
                  <>
                    <img src={ErrorIcon} alt="" />
                    {t("global.error")}
                  </>
                )}
              </div>
            ) : null}
            {status === ApiStatusType.ERROR ? (
              <div className={styles.button} onClick={() => onRetry()}>
                <img src={CloseIcon} alt="" />
              </div>
            ) : null}
            {status === ApiStatusType.IN_PROGRESS ? (
              <Spin />
            ) : (
              <div className={styles.button} onClick={() => onClear()}>
                <img src={CloseIcon} alt="" />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
