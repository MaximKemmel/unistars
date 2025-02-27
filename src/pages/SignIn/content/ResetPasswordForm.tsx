import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { Input } from "../../../components/input/Input";

import { ApiStatusType } from "../../../enums/local/apiStatusType";
import { initApiStatus } from "../../../types/local/apiStatus";

import styles from "../SignIn.module.sass";

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { changePassword, setChangePasswordStatus } = useActions();
  const changePasswordStatus = useTypedSelector(
    (state) => state.adminReducer.changePasswordStatus,
  );
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(
      oldPassword.trim().length > 7 &&
        password === confirmedPassword &&
        confirmedPassword.trim().length > 7,
    );
  }, [password, confirmedPassword]);

  useEffect(() => {
    switch (changePasswordStatus.status) {
      case ApiStatusType.SUCCESS:
        setChangePasswordStatus(initApiStatus());
        navigate("/");
        break;
    }
  }, [changePasswordStatus]);

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    changePassword({ oldPassword: oldPassword, newPassword: password });
  };

  return (
    <div className={`${styles.form_container} ${styles.application_form}`}>
      <h1>{t("sign_in.create_a_new_password")}</h1>
      <div className={styles.description}>
        {t("sign_in.set_a_new_password")}
      </div>
      <form onSubmit={handleOnSubmit}>
        <Input
          value={oldPassword}
          onChange={(value: string) => setOldPassword(value)}
          placeholder={t("sign_in.password")}
          type="text"
          isRequired={true}
          isPassword={true}
          maxLength={30}
        />
        <Input
          value={password}
          onChange={(value: string) => setPassword(value)}
          placeholder={t("sign_in.enter_new_password")}
          type="text"
          isRequired={true}
          isPassword={true}
          maxLength={30}
        />
        <Input
          value={confirmedPassword}
          onChange={(value: string) => setConfirmedPassword(value)}
          placeholder={t("sign_in.repeat_new_password")}
          type="text"
          isRequired={true}
          isPassword={true}
          maxLength={30}
        />
        <button type="submit" disabled={!isButtonEnabled}>
          {t("sign_in.save_and_open_account")}
        </button>
      </form>
    </div>
  );
};
