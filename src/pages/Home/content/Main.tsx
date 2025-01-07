import { useState } from "react";

import { UniversityModal } from "../../../modals/University/UniversityModal";
import { GalleryModal } from "../../../modals/Gallery/GalleryModal";
import { BookletsModal } from "../../../modals/Booklets/BookletsModal";

import { Booklet } from "../../../components/booklet/Booklet";

import globalStyles from "../../../App.module.sass";
import styles from "../Home.module.sass";

import TestImage from "../../../assets/png/test_image.png";
import AwardIcon from "../../../assets/svg/award.svg";
import TestPhoto from "../../../assets/png/sign_in_background.png";
import TestBooklet from "../../../assets/png/test_booklet.png";

export const Main = () => {
  const socialsInfo = [
    {
      value: "2,6k",
      label: "Подписчиков",
    },
    {
      value: "768",
      label: "Студентов",
    },
    {
      value: "92",
      label: "Амбассадоров",
    },
    {
      value: "92",
      label: "Сотрудников",
    },
  ];

  const [aboutInfo, setAboutInfo] = useState<any>(null);
  const tmpAboutInfo = {
    fullName: "Уральский федеральный университет",
    description:
      "Lorem ipsum dolor sit amet consectetur. Ac porttitor et lectus magna mi adipiscing viverra urna. Adipiscing purus lacinia cras augue. Diam amet vitae auctor id facilisis enim volutpat. Vulputate at massa penatibus sed morbi viverra et aliquet fames.",
    birthDate: "05.03.2011",
    country: "Россия",
    city: "Москва",
    street: "Пушкина",
    house: 15,
    korpus: 18,
    phone: "+7 (999) 999-99-99",
    site: "urfu.ru/ru/",
    email: "example@mail.ru",
    postupUrl: "urfu.ru/ru/",
    careerUrl: "urfu.ru/ru/",
    faqUrl: "urfu.ru/ru/",
    coursesUrl: "urfu.ru/ru/",
  };
  const [gallery, setGallery] = useState<number[]>([]);
  const [booklets, setbooklets] = useState<number[]>([]);
  const [isAboutModalShow, setIsAboutModalShow] = useState(false);
  const [isGalleryModalShow, setIsGalleryModalShow] = useState(false);
  const [isBookletsModalShow, setIsBookletsModalShow] = useState(false);
  const testPhotos = Array(32)
    .fill(1)
    .map((_item, index) => {
      return {
        id: index,
        url: TestPhoto,
        isChecked: false,
      };
    });
  const testBooklets = Array(8)
    .fill(1)
    .map((_item, index) => {
      return {
        id: index,
        photo: TestBooklet,
        name: "Название буклета",
        description:
          "Описание буклета Описание буклета Описание буклета Описание буклета Описание буклета Описание буклета",
      };
    });

  return (
    <div className={styles.content}>
      <div className={`${styles.main_header} ${styles.content_container}`}>
        <div className={styles.main_univ_info}>
          <div className={styles.main_logo}>
            <img src={TestImage} alt="" />
            <div className={styles.main_award}>
              <img src={AwardIcon} alt="" />
            </div>
          </div>
          <h3 className={styles.main_univ_name}>
            Уральский федеральный университет (УрФУ)
          </h3>
        </div>
        <div className={styles.main_socials}>
          {socialsInfo.map((item, index) => {
            return (
              <div className={styles.main_socials_item} key={index}>
                <div className={styles.item_value}>{item.value}</div>
                <div className={styles.item_label}>{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`${styles.main_about} ${styles.content_container}`}>
        <div className={styles.content_container_head}>
          <div className={styles.head_title}>
            <h4>Об университете</h4>
          </div>
          {aboutInfo ? (
            <div
              className={styles.head_action}
              onClick={() => setIsAboutModalShow(true)}
            >
              Редактировать
            </div>
          ) : null}
        </div>
        {aboutInfo ? (
          <div className={styles.main_about_container}>
            <div className={styles.main_about_part}>
              <div className={styles.part_title}>Основное</div>
              <div className={styles.part_container}>
                <div className={styles.part_item}>
                  <div className={styles.part_item_label}>
                    Полное наименование университета
                  </div>
                  <div className={styles.part_item_value}>
                    {aboutInfo.fullName}
                  </div>
                </div>
                <div className={styles.part_item}>
                  <div className={styles.part_item_label}>Описание</div>
                  <div className={styles.part_item_value}>
                    {aboutInfo.description}
                  </div>
                </div>
                <div className={styles.part_item}>
                  <div className={styles.part_item_label}>Дата основания</div>
                  <div className={styles.part_item_value}>
                    {aboutInfo.birthDate}
                  </div>
                </div>
                <div className={styles.part_item}>
                  <div className={styles.part_item_label}>Страна</div>
                  <div className={styles.part_item_value}>
                    {aboutInfo.country}
                  </div>
                </div>
                <div className={styles.part_item}>
                  <div className={styles.part_item_label}>Город</div>
                  <div className={styles.part_item_value}>{aboutInfo.city}</div>
                </div>
                <div className={styles.part_item_double}>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>Дом</div>
                    <div className={styles.part_item_value}>
                      {aboutInfo.house}
                    </div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>Корпус</div>
                    <div className={styles.part_item_value}>
                      {aboutInfo.korpus}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.main_about_separator} />
            <div className={styles.main_about_part_multi}>
              <div className={styles.main_about_part}>
                <div className={styles.part_title}>Контакты</div>
                <div className={styles.part_container}>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>Телефон</div>
                    <div className={styles.part_item_value}>
                      {aboutInfo.phone}
                    </div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>Сайт</div>
                    <div className={styles.part_item_value}>
                      {aboutInfo.site}
                    </div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>E-mail</div>
                    <div className={styles.part_item_value}>
                      {aboutInfo.email}
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.main_part_separator} />
              <div className={styles.main_about_part}>
                <div className={styles.part_title}>Ссылки на разделы сайта</div>
                <div className={styles.part_container}>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>Поступление</div>
                    <div className={styles.part_item_value}>
                      {aboutInfo.postupUrl}
                    </div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>Карьера</div>
                    <div className={styles.part_item_value}>
                      {aboutInfo.careerUrl}
                    </div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>
                      Вопросы и ответы
                    </div>
                    <div className={styles.part_item_value}>
                      {aboutInfo.faqUrl}
                    </div>
                  </div>
                  <div className={styles.part_item}>
                    <div className={styles.part_item_label}>
                      Подготовительные курсы
                    </div>
                    <div className={styles.part_item_value}>
                      {aboutInfo.coursesUrl}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.empty_info}>
            <div className={styles.empty_message}>
              В профиле пока пусто. Заполните его, чтобы абитуриенты могли
              больше узнать о вас!
            </div>
            <button
              className={globalStyles.small}
              type="button"
              onClick={() => setAboutInfo(tmpAboutInfo)}
            >
              Заполнить профиль
            </button>
          </div>
        )}
      </div>
      <div className={styles.content_container_multi}>
        <div
          className={`${styles.main_gallery} ${styles.content_container} ${styles.half}`}
        >
          <div className={styles.content_container_head}>
            <div className={styles.head_title}>
              <h4>Галерея</h4>
              <div className={styles.count}>{gallery.length}</div>
            </div>
            {gallery.length > 0 ? (
              <div className={styles.head_action}>Загрузить еще</div>
            ) : null}
          </div>
          {gallery.length > 0 ? (
            <div className={styles.main_gallery_container}>
              {gallery.slice(0, 6).map((_, index) => {
                return (
                  <div className={styles.main_gallery_item} key={index}>
                    <img src={TestPhoto} alt="" />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.empty_info}>
              <div className={styles.empty_message}>
                В вашем профиле пока нет фотографий.
              </div>
              <button
                className={globalStyles.small}
                type="button"
                onClick={() => setGallery([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])}
              >
                Загрузить фотографии
              </button>
            </div>
          )}
          {gallery.length > 6 ? (
            <button
              className={`${globalStyles.inverted} ${globalStyles.small}`}
              type="button"
              onClick={() => setIsGalleryModalShow(true)}
            >
              <span>Посмотреть все</span>
            </button>
          ) : null}
        </div>
        <div
          className={`${styles.main_booklets} ${styles.content_container} ${styles.half}`}
        >
          <div className={styles.content_container_head}>
            <div className={styles.head_title}>
              <h4>Буклеты</h4>
              <div className={styles.count}>{booklets.length}</div>
            </div>
            {booklets.length > 0 ? (
              <div className={styles.head_action}>Создать</div>
            ) : null}
          </div>
          {booklets.length > 0 ? (
            <div className={styles.main_booklets_container}>
              {booklets.slice(0, 2).map((_, index) => {
                return (
                  <div className={styles.main_booklet_item} key={index}>
                    <Booklet
                      bookletItem={{
                        id: index,
                        photo: TestBooklet,
                        name: "Название буклета",
                        description:
                          "Описание буклета Описание буклета Описание буклета Описание буклета Описание буклета Описание буклета",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.empty_info}>
              <div className={styles.empty_message}>
                В вашем профиле пока нет буклетов.
              </div>
              <button
                className={globalStyles.small}
                type="button"
                onClick={() => setbooklets([0, 0, 0, 0])}
              >
                Создать буклет
              </button>
            </div>
          )}
          {booklets.length > 2 ? (
            <button
              className={`${globalStyles.inverted} ${globalStyles.small}`}
              type="button"
              onClick={() => setIsBookletsModalShow(true)}
            >
              <span>Посмотреть все</span>
            </button>
          ) : null}
        </div>
      </div>
      <UniversityModal
        isShow={isAboutModalShow}
        universityInfo={{}}
        onClose={() => {
          setIsAboutModalShow(false);
        }}
        onSave={() => {
          setIsAboutModalShow(false);
        }}
      />
      <GalleryModal
        isShow={isGalleryModalShow}
        photos={testPhotos}
        onClose={() => {
          setIsGalleryModalShow(false);
        }}
        onUpload={() => {
          setIsGalleryModalShow(false);
        }}
        onEdit={() => {
          setIsGalleryModalShow(false);
        }}
      />
      <BookletsModal
        isShow={isBookletsModalShow}
        booklets={testBooklets}
        onClose={() => {
          setIsBookletsModalShow(false);
        }}
      />
    </div>
  );
};
