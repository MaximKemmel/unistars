import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import validator from "validator";

import { Input } from "../../../components/input/Input";

import styles from "../SignIn.module.sass";

import { InfoModal } from "../../../modals/Info/InfoModal";

import ApplicationImage from "../../../assets/svg/application.svg";
import MessageSuccess from "../../../assets/svg/message-success.svg";

interface IApplicationFormProps {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
}

export const ApplicationForm: React.FC<IApplicationFormProps> = ({
  setCurrentStage,
}) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(email.trim().length !== 0 && validator.isEmail(email));
  }, [email]);

  const handleOnSubmit = (event: any) => {
    event.preventDefault();
    setIsModalShow(true);
  };

  return (
    <div className={`${styles.form_container} ${styles.application_form}`}>
      <img className={styles.form_image} src={ApplicationImage} alt="" />
      <h1>{t("sign_in.sign_up")}</h1>
      <div className={styles.description}>
        {t("sign_in.please_enter_email")}
      </div>
      <form onSubmit={handleOnSubmit}>
        <Input
          value={email}
          onChange={(value: string) => setEmail(value.trim())}
          placeholder={"E-mail"}
          type="text"
          isRequired={true}
        />
        <button type="submit" disabled={!isButtonEnabled}>
          {t("sign_in.send")}
        </button>
      </form>
      <InfoModal
        isShow={isModalShow}
        title={t("sign_in.application_has_been_sent")}
        message={t("sign_in.will_contact_you")}
        image={MessageSuccess}
        onClose={() => {
          setIsModalShow(false);
          setCurrentStage(2);
        }}
      />
    </div>
  );
};
