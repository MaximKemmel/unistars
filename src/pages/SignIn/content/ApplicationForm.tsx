import { useState, useEffect } from "react";

import styles from "../SignIn.module.sass";

import ApplicationImage from "../../../assets/svg/application.svg";

interface IApplicationFormProps {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
}

export const ApplicationForm: React.FC<IApplicationFormProps> = ({
  setCurrentStage,
}) => {
  const [email, setEmail] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  useEffect(() => {
    setIsButtonEnabled(email.trim().length !== 0);
    setErrorForm("");
  }, [email]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setCurrentStage(0);
  };

  return (
    <div className={`${styles.form_container} ${styles.application_form}`}>
      <img src={ApplicationImage} alt="" />
      <h2>Создание учетной записи</h2>
      <div className={styles.description}>Пожалуйста, введите e-mail, и мы отправим отправим всю необходимую информацию для создания учетной записи.</div>
      <form onSubmit={handleOnSubmit}>
        <input
          placeholder={"E-mail"}
          type="email"
          required
          onChange={(event) => setEmail(event.target.value.trim())}
          value={email}
        />
        {errorForm !== "" ? (
          <div className={styles.error}>{errorForm}</div>
        ) : null}
        <button type="submit" disabled={!isButtonEnabled}>
          Войти
        </button>
      </form>
    </div>
  );
};
