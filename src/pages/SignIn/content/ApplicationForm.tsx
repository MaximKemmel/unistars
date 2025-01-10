import { useState, useEffect } from "react";
import validator from "validator";

import styles from "../SignIn.module.sass";

import { InfoModal } from "../../../modals/Info/InfoModal";

import ApplicationImage from "../../../assets/svg/application.svg";
import MessageSuccess from "../../../assets/svg/message-success.svg";

interface IApplicationFormProps {
  setCurrentStage: React.Dispatch<React.SetStateAction<number>>;
}

export const ApplicationForm: React.FC<IApplicationFormProps> = ({ setCurrentStage }) => {
  const [email, setEmail] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);

  useEffect(() => {
    setIsButtonEnabled(email.trim().length !== 0 && validator.isEmail(email));
  }, [email]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setIsModalShow(true);
  };

  return (
    <div className={`${styles.form_container} ${styles.application_form}`}>
      <img className={styles.form_image} src={ApplicationImage} alt="" />
      <h2>Создание учетной записи</h2>
      <div className={styles.description}>
        Пожалуйста, введите e-mail, и мы отправим отправим всю необходимую информацию для создания учетной записи.
      </div>
      <form onSubmit={handleOnSubmit}>
        <input
          placeholder={"E-mail"}
          type="text"
          required
          onChange={(event) => setEmail(event.target.value.trim())}
          value={email}
        />
        <button type="submit" disabled={!isButtonEnabled}>
          Отправить
        </button>
      </form>
      <InfoModal
        isShow={isModalShow}
        title="Заявка отправлена"
        message="Мы свяжемся с вами для создания аккаунта"
        image={MessageSuccess}
        onClose={() => {
          setIsModalShow(false);
          setCurrentStage(0);
        }}
      />
    </div>
  );
};
