import { useState, useEffect } from "react";

import styles from "../SignIn.module.sass";

interface ISignInFormProps {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
}

export const SignInForm: React.FC<ISignInFormProps> = ({ setCurrentStage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  useEffect(() => {
    setIsButtonEnabled(
      email.trim().length !== 0 && password.trim().length !== 0
    );
    setErrorForm("");
  }, [email, password]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={`${styles.form_container} ${styles.sign_in_form}`}>
      <h2>Вход в личный кабинет университета</h2>
      <form onSubmit={handleOnSubmit}>
        <input
          placeholder={"Введите e-mail"}
          type="email"
          required
          onChange={(event) => setEmail(event.target.value.trim())}
          value={email}
        />
        <input
          placeholder={"Введите пароль"}
          type="password"
          required
          onChange={(event) => setPassword(event.target.value.trim())}
          value={password}
          minLength={6}
        />
        {errorForm !== "" ? (
          <div className={styles.error}>{errorForm}</div>
        ) : null}
        <button type="submit" disabled={!isButtonEnabled}>
          Войти
        </button>
        <div className={styles.bottom_info}>
          Логин и пароль можно получить только после отправки{" "}
          <span onClick={() => setCurrentStage(1)}>заявки</span>
        </div>
      </form>
    </div>
  );
};
