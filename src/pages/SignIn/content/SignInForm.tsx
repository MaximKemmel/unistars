import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import validator from "validator";

import globalStyles from "../../../App.module.sass";
import styles from "../SignIn.module.sass";

import FormWarningIcon from "../../../assets/svg/form-warning.svg";
import { Eye as EyeIcon } from "../../../assets/svgComponents/Eye";

interface ISignInFormProps {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
}

export const SignInForm: React.FC<ISignInFormProps> = ({ setCurrentStage }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  useEffect(() => {
    setIsButtonEnabled(email.trim().length !== 0 && validator.isEmail(email) && password.trim().length !== 0);
    setErrorForm("");
  }, [email, password]);

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    if (email !== "test@mail.ru") {
      setErrorForm(t("sign_in.sign_in_error"));
    } else {
      navigate("/home");
    }
  };

  return (
    <div className={`${styles.form_container} ${styles.sign_in_form}`}>
      <h2>{t("sign_in.login_dashboard")}</h2>
      <form onSubmit={handleOnSubmit}>
        <input
          className={errorForm.trim().length !== 0 ? globalStyles.wrong : ""}
          placeholder={t("sign_in.enter_your_email")}
          type="text"
          required
          onChange={(event) => setEmail(event.target.value.trim())}
          value={email}
        />
        <div className={styles.password_input}>
          <input
            className={errorForm.trim().length !== 0 ? globalStyles.wrong : ""}
            placeholder={t("sign_in.enter_your_password")}
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
        {errorForm !== "" ? (
          <div className={styles.error}>
            <img src={FormWarningIcon} alt="" />
            {errorForm}
          </div>
        ) : null}
        <button type="submit" disabled={!isButtonEnabled}>
          {t("sign_in.sign_in")}
        </button>
        <div className={styles.bottom_info}>
          {t("sign_in.sign_up_application")}
          <br />
          <span onClick={() => setCurrentStage(1)}>{t("sign_in.sign_up_application_span")}</span>
        </div>
      </form>
    </div>
  );
};
