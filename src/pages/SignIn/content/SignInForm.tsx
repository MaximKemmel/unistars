import { useState, useEffect } from "react";
import validator from "validator";

import globalStyles from "../../../App.module.sass";
import styles from "../SignIn.module.sass";

import FormWarningIcon from "../../../assets/svg/form-warning.svg";
import EyeClosedIcon from "../../../assets/svg/eye-closed.svg";
import EyeOpenedIcon from "../../../assets/svg/eye-opened.svg";
import { useNavigate } from "react-router-dom";

interface ISignInFormProps {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
}

export const SignInForm: React.FC<ISignInFormProps> = ({ setCurrentStage }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  useEffect(() => {
    setIsButtonEnabled(
      email.trim().length !== 0 &&
        validator.isEmail(email) &&
        password.trim().length !== 0
    );
    setErrorForm("");
  }, [email, password]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (email !== "test@mail.ru") {
      setErrorForm("Логин или пароль указаны неправильно");
    } else {
      navigate('/');
    }
  };

  return (
    <div className={`${styles.form_container} ${styles.sign_in_form}`}>
      <h2>Вход в личный кабинет университета</h2>
      <form onSubmit={handleOnSubmit}>
        <input
          className={errorForm.trim().length !== 0 ? globalStyles.wrong : ""}
          placeholder={"Введите e-mail"}
          type="text"
          required
          onChange={(event) => setEmail(event.target.value.trim())}
          value={email}
        />
        <div className={styles.password_input}>
          <input
            className={errorForm.trim().length !== 0 ? globalStyles.wrong : ""}
            placeholder={"Введите пароль"}
            type={isPasswordVisible ? "text" : "password"}
            required
            onChange={(event) => setPassword(event.target.value.trim())}
            value={password}
            minLength={3}
          />
          <img src={isPasswordVisible ? EyeClosedIcon : EyeOpenedIcon} alt="" onClick={() => setIsPasswordVisible(!isPasswordVisible)}/>
        </div>
        {errorForm !== "" ? (
          <div className={styles.error}>
            <img src={FormWarningIcon} alt="" />
            {errorForm}
          </div>
        ) : null}
        <button type="submit" disabled={!isButtonEnabled}>
          Войти
        </button>
        <div className={styles.bottom_info}>
          Логин и пароль можно получить только после отправки
          <br />
          <span onClick={() => setCurrentStage(1)}>заявки</span>
        </div>
      </form>
    </div>
  );
};
