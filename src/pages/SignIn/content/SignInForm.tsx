import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import validator from "validator";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import { Input } from "../../../components/input/Input";

import styles from "../SignIn.module.sass";

import { initApiStatus } from "../../../types/local/apiStatus";
import { ApiStatusType } from "../../../enums/local/apiStatusType";

import FormWarningIcon from "../../../assets/svg/form-warning.svg";

interface ISignInFormProps {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
}

export const SignInForm: React.FC<ISignInFormProps> = ({ setCurrentStage }) => {
  const { t } = useTranslation();
  const { login, setLoginStatus } = useActions();
  const loginStatus = useTypedSelector(
    (state) => state.adminReducer.loginStatus,
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  useEffect(() => {
    setIsButtonEnabled(
      email.trim().length !== 0 &&
        validator.isEmail(email) &&
        password.trim().length !== 0,
    );
    setErrorForm("");
  }, [email, password]);

  useEffect(() => {
    switch (loginStatus.status) {
      case ApiStatusType.SUCCESS:
        setLoginStatus(initApiStatus());
        break;
      case ApiStatusType.ERROR:
        setLoginStatus(initApiStatus());
        setErrorForm(t("sign_in.sign_in_error"));
        break;
    }
  }, [loginStatus]);

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    if (email === "test@mail.ru") {
      setCurrentStage(2);
    } else {
      login({
        email: email,
        password: password,
      });
    }
  };

  return (
    <div className={`${styles.form_container} ${styles.sign_in_form}`}>
      <h2>{t("sign_in.login_dashboard")}</h2>
      <form onSubmit={handleOnSubmit}>
        <Input
          value={email}
          onChange={(value: string) => setEmail(value.trim())}
          placeholder={t("sign_in.enter_your_email")}
          type="text"
          isRequired={true}
          isWrong={errorForm.trim().length !== 0}
        />
        <Input
          value={password}
          onChange={(value: string) => setPassword(value)}
          placeholder={t("sign_in.enter_your_password")}
          type="text"
          isRequired={true}
          isPassword={true}
          isWrong={errorForm.trim().length !== 0}
        />
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
          <span onClick={() => setCurrentStage(1)}>
            {t("sign_in.sign_up_application_span")}
          </span>
        </div>
      </form>
    </div>
  );
};
