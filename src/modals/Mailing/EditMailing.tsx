import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Toggle } from "../../components/toggle/Toggle";
import { Dropdown } from "../../components/dropdown/Dropdown";
import { Switch } from "../../components/switch/Switch";
import { Input } from "../../components/input/Input";
import { Textarea } from "../../components/textarea/Textarea";

import globalStyles from "../../App.module.sass";
import modalStyles from "../Modal.module.sass";
import styles from "./MailingModal.module.sass";

import { IToggleItem } from "../../types/local/toggleItem";
import { IDropdownItem } from "../../types/local/dropdownItem";

import { Close as CloseIcon } from "../../assets/svgComponents/Close";

interface IEditMailingModalProps {
  isShow: boolean;
  mailing: any;
  onSave: Function;
  onCancel: Function;
  onClose: Function;
}

export const EditMailingModal: React.FC<IEditMailingModalProps> = ({
  isShow,
  mailing,
  onSave,
  onCancel,
  onClose,
}) => {
  const { t } = useTranslation();
  const [currentMailing, setCurrentMailing] = useState(mailing);
  const [viewMode, setViewMode] = useState(0);
  const [selectedTrigger, setSelectedTrigger] = useState(-1);
  const [isPushChekded, setIsPushChekded] = useState(false);

  useEffect(() => {
    setCurrentMailing(mailing);
    console.log(currentMailing);
  }, [mailing]);

  return (
    <div className={`${modalStyles.modal} ${isShow ? modalStyles.active : ""}`}>
      <div
        className={`${modalStyles.overlay} ${isShow ? modalStyles.active : ""}`}
        onClick={() => onClose()}
      />
      <div className={`${modalStyles.modal_content} ${styles.modal_content}`}>
        <div className={modalStyles.head}>
          <h4>Редактирование рассылки</h4>
          <div className={modalStyles.close} onClick={() => onClose()}>
            <CloseIcon />
          </div>
        </div>
        {isShow ? (
          <form className={modalStyles.form}>
            <div className={modalStyles.form_content}>
              <div className={modalStyles.part_container}>
                <div className={styles.view_toggle}>
                  <Toggle
                    selectedIndex={viewMode}
                    items={
                      [
                        {
                          id: 0,
                          text: "Настройка отправки",
                          text_eng: "Standard",
                        } as IToggleItem,
                        {
                          id: 1,
                          text: "Контент рассылки",
                          text_eng: "Automatic",
                        } as IToggleItem,
                      ] as IToggleItem[]
                    }
                    onItemSelect={(item: IToggleItem) => setViewMode(item.id)}
                  />
                </div>
                {viewMode === 0 ? (
                  <>
                    <div className={styles.form_description}>
                      Как только сработает триггер, пользователь получит
                      сообщение в чате.
                    </div>
                    <div className={modalStyles.part}>
                      <div className={modalStyles.part_label}>
                        {t(
                          "Выберите событие, после которого будет отправлено сообщение",
                        )}
                      </div>
                      <Dropdown
                        placeholder={"Выберите триггер"}
                        items={[
                          {
                            id: -1,
                            text: "Не выбрано",
                            text_eng: t("global.not_selected"),
                            is_selected: selectedTrigger === -1,
                          } as IDropdownItem,
                          {
                            id: 0,
                            text: "Подписка",
                            text_eng: t("global.not_selected"),
                            is_selected: selectedTrigger === 0,
                          } as IDropdownItem,
                          {
                            id: 1,
                            text: "Вариант 1",
                            text_eng: t("global.not_selected"),
                            is_selected: selectedTrigger === 1,
                          } as IDropdownItem,
                          {
                            id: 2,
                            text: "Вариант 2",
                            text_eng: t("global.not_selected"),
                            is_selected: selectedTrigger === 2,
                          } as IDropdownItem,
                        ]}
                        onItemSelect={(item: IDropdownItem) => {
                          setSelectedTrigger(item.id);
                        }}
                      />
                    </div>
                    <div className={modalStyles.part}>
                      <Switch
                        text="Прислать push-уведомление дополнительно"
                        isChecked={isPushChekded}
                        onChangeStatus={(status: boolean) =>
                          setIsPushChekded(status)
                        }
                      />
                    </div>
                    {isPushChekded ? (
                      <div className={modalStyles.part}>
                        <div className={modalStyles.part_label}>
                          Текст уведомления
                        </div>
                        <div className={modalStyles.input}>
                          <Input
                            value={currentMailing.pushText}
                            onChange={(value: string) =>
                              setCurrentMailing({
                                ...currentMailing,
                                pushText: value,
                              })
                            }
                            placeholder={"Введите текст уведомления"}
                            type="text"
                          />
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    <div className={modalStyles.part}>
                      <div className={modalStyles.part_label}>
                        Текст рассылки*
                      </div>
                      <div className={modalStyles.input}>
                        <Textarea
                          value={currentMailing.text}
                          onChange={(value: string) =>
                            setCurrentMailing({
                              ...currentMailing,
                              text: value,
                            })
                          }
                          placeholder={"Введите текст рассылки"}
                        />
                      </div>
                    </div>
                    <div className={modalStyles.part}>
                      <div className={modalStyles.part_label}>
                        Прикрепленные файлы
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </form>
        ) : null}
        <div className={modalStyles.actions}>
          <div />
          <div className={modalStyles.buttons}>
            <button
              className={`${globalStyles.small} ${globalStyles.inverted}`}
              type="button"
              onClick={() => onCancel()}
            >
              <span>{t("global.cancel")}</span>
            </button>
            <button
              className={globalStyles.small}
              type="button"
              onClick={() => onSave()}
            >
              <span>{t("global.save_changes")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
