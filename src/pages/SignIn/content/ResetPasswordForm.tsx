import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Input } from "../../../components/input/Input";

import styles from "../SignIn.module.sass";

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(password === confirmedPassword);
  }, [password, confirmedPassword]);

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className={`${styles.form_container} ${styles.application_form}`}>
      <h1>{t("sign_in.create_a_new_password")}</h1>
      <div className={styles.description}>
        {t("sign_in.set_a_new_password")}
      </div>
      <form onSubmit={handleOnSubmit}>
        <Input
          value={password}
          onChange={(value: string) => setPassword(value)}
          placeholder={t("sign_in.enter_new_password")}
          type="text"
          isRequired={true}
          isPassword={true}
        />
        <Input
          value={confirmedPassword}
          onChange={(value: string) => setConfirmedPassword(value)}
          placeholder={t("sign_in.repeat_new_password")}
          type="text"
          isRequired={true}
          isPassword={true}
        />
        <button type="submit" disabled={!isButtonEnabled}>
          {t("sign_in.save_and_open_account")}
        </button>
      </form>
    </div>
  );
};
