import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import { AmbassadorsModal } from "../../../../modals/Ambassadors/Ambassadors";
import { EditAmbassadorsModal } from "../../../../modals/Ambassadors/EditAmbassadors";
import { EditAmbassadorRequestsModal } from "../../../../modals/Ambassadors/EditAmbassadorRequests";
import { ConfirmDeleteModal } from "../../../../modals/ConfirmDelete/ConfirmDelete";
import { StatusInfoModal } from "../../../../modals/StatusInfo/StatusInfo";

import styles from "../../Home.module.sass";

import { IUser } from "../../../../types/user/user";
import { ApiStatusType } from "../../../../enums/local/apiStatusType";
import { initApiStatus } from "../../../../types/local/apiStatus";

export const AmbassadorsContainer = () => {
  const { t } = useTranslation();
  const { acceptAmbassador, setAcceptAmbassadorStatus } = useActions();
  const universityProfile = useTypedSelector(
    (state) => state.universityReducer.universityProfile,
  );
  const acceptStatus = useTypedSelector(
    (state) => state.ambassadorReducer.acceptStatus,
  );
  const [deletedAmbassadors, setDeletedAmbassadors] = useState([] as number[]);
  const [isAmbassadorsModalShow, setIsAmbassadorsModalShow] = useState(false);
  const [isEditAmbassadorsModalShow, setIsEditAmbassadorsModalShow] =
    useState(false);
  const [
    isEditAmbassadorRequestsModalShow,
    setIsEditAmbassadorRequestsModalShow,
  ] = useState(false);
  const [isConfirmDeleteModalShow, setIsConfirmDeleteModalShow] =
    useState(false);
  const [isStatusInfoModalShow, setIsStatusInfoModalShow] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isStatusSuccess, setIsStatusSuccess] = useState(true);
  const [isStatusRestore, setIsStatusRestore] = useState(false);

  useEffect(() => {
    switch (acceptStatus.status) {
      case ApiStatusType.SUCCESS:
        setAcceptAmbassadorStatus(initApiStatus());
        break;
      case ApiStatusType.ERROR:
        setStatusMessage(acceptStatus.error ?? "Server error");
        setIsStatusInfoModalShow(true);
        setIsStatusSuccess(false);
        setIsStatusRestore(false);
        break;
    }
  }, [acceptStatus]);

  const handleOnDeleteAmbassadors = (ambassadorsForDelete: IUser[]) => {
    setDeletedAmbassadors(
      ambassadorsForDelete.map((ambassador: IUser) => ambassador.id!),
    );

    console.log(deletedAmbassadors);
    setStatusMessage(t("employers.employee_was_added"));
    setIsStatusSuccess(true);
    setIsStatusRestore(false);

    setIsEditAmbassadorsModalShow(false);
    setIsConfirmDeleteModalShow(true);
  };

  const handleOnConfirmDeleteAmbassadors = () => {
    setIsConfirmDeleteModalShow(false);
    setIsStatusInfoModalShow(true);
  };

  return (
    <>
      <div
        className={styles.main_socials_item}
        onClick={() => setIsAmbassadorsModalShow(true)}
      >
        <div className={styles.item_value}>
          {universityProfile.ambassadorIds !== undefined &&
          Array.isArray(universityProfile.ambassadorIds)
            ? universityProfile.ambassadorIds.length
            : 0}
        </div>
        <div className={styles.item_label}>{t("home.ambassadors")}</div>
      </div>

      <AmbassadorsModal
        isShow={isAmbassadorsModalShow}
        onAmbassadorsEdit={() => {
          setIsAmbassadorsModalShow(false);
          setIsEditAmbassadorsModalShow(true);
        }}
        onAmbassadorRequestsEdit={() => {
          setIsAmbassadorsModalShow(false);
          setIsEditAmbassadorRequestsModalShow(true);
        }}
        onAmbassadorAccept={(id: number, isAccept: boolean) =>
          acceptAmbassador({ ambassadorId: id, isAccept: isAccept })
        }
        onClose={() => {
          setIsAmbassadorsModalShow(false);
        }}
      />
      <EditAmbassadorsModal
        isShow={isEditAmbassadorsModalShow}
        onDelete={handleOnDeleteAmbassadors}
        onCancel={() => {
          setIsEditAmbassadorsModalShow(false);
          setIsAmbassadorsModalShow(true);
        }}
        onClose={() => setIsEditAmbassadorsModalShow(false)}
      />
      <EditAmbassadorRequestsModal
        isShow={isEditAmbassadorRequestsModalShow}
        onAmbassadorAccept={(id: number, isAccept: boolean) =>
          acceptAmbassador({ ambassadorId: id, isAccept: isAccept })
        }
        onAmbassadorAcceptArray={(ambassadors: IUser[], isAccept: boolean) => {
          ambassadors.forEach((ambassador: IUser) =>
            acceptAmbassador({
              ambassadorId: ambassador.id!,
              isAccept: isAccept,
            }),
          );
        }}
        onClose={() => setIsEditAmbassadorRequestsModalShow(false)}
      />
      <ConfirmDeleteModal
        isShow={isConfirmDeleteModalShow}
        head={t("ambassadors.deleting_ambassadors")}
        title={t("ambassadors.delete_description")}
        message={""}
        onConfirm={handleOnConfirmDeleteAmbassadors}
        onClose={() => {
          setIsConfirmDeleteModalShow(false);
          setIsEditAmbassadorsModalShow(true);
        }}
      />
      <StatusInfoModal
        isShow={isStatusInfoModalShow}
        message={statusMessage}
        isSuccess={isStatusSuccess}
        onClose={() => setIsStatusInfoModalShow(false)}
        isRestore={isStatusRestore}
        onRestore={() => setIsStatusInfoModalShow(false)}
      />
    </>
  );
};
