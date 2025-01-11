import { useState } from "react";
import {useTranslation} from "react-i18next";

import { SignInForm } from "./content/SignInForm";
import { ApplicationForm } from "./content/ApplicationForm";

import styles from "./SignIn.module.sass";

import Background from "../../assets/png/sign-in-background.png";
import Logo from "../../assets/svg/logo.svg";
import BackArrowIcon from "../../assets/svg/back-arrow.svg";

export const SignIn = () => {
  const { t } = useTranslation();
  const [currentStage, setCurrentStage] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <img className={styles.background_image} src={Background} alt="" />
        <img className={styles.logo} src={Logo} alt="" />
      </div>
      <div className={styles.content}>
        {currentStage === 0 ? (
          <SignInForm setCurrentStage={setCurrentStage} />
        ) : (
          <ApplicationForm setCurrentStage={setCurrentStage} />
        )}
        {currentStage === 1 ? (
          <button className={styles.back_button} type="button" onClick={() => setCurrentStage(0)}>
            <img src={BackArrowIcon} alt="" />
            <span>{t("sign_in.back")}</span>
          </button>
        ) : null}
      </div>
    </div>
  );
};
