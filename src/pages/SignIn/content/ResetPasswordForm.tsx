import { useState, useEffect } from "react";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

import styles from "../SignIn.module.sass";

import { Eye as EyeIcon } from "../../../assets/svgComponents/Eye";

export const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmedPasswordVisible, setIsConfirmedPasswordVisible] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(password === confirmedPassword);
  }, [password, confirmedPassword]);

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className={`${styles.form_container} ${styles.application_form}`}>
      <h1>{t("sign_in.create_a_new_password")}</h1>
      <div className={styles.description}>
        {t("sign_in.set_a_new_password")}
      </div>
      <form onSubmit={handleOnSubmit}>
        <div className={styles.password_input}>
          <input
            placeholder={t("sign_in.enter_new_password")}
            type={isPasswordVisible ? "text" : "password"}
            required
            onChange={(event) => setPassword(event.target.value.trim())}
            value={password}
            minLength={3}
          />
          <div className={styles.eye} onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
            <EyeIcon isOpened={!isPasswordVisible} />
          </div>
        </div>
        <div className={styles.password_input}>
          <input
            placeholder={t("sign_in.repeat_new_password")}
            type={isConfirmedPasswordVisible ? "text" : "password"}
            required
            onChange={(event) => setConfirmedPassword(event.target.value.trim())}
            value={confirmedPassword}
            minLength={3}
          />
          <div className={styles.eye} onClick={() => setIsConfirmedPasswordVisible(!isConfirmedPasswordVisible)}>
            <EyeIcon isOpened={!isConfirmedPasswordVisible} />
          </div>
        </div>
        <button type="submit" disabled={!isButtonEnabled}>
          {t('sign_in.save_and_open_account')}
        </button>
      </form>
    </div>
  );
};
