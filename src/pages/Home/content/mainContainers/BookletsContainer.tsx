import { useState } from "react";
import { useTranslation } from "react-i18next";

import { BookletCard } from "../../../../cards/booklet/BookletCard";
import { BookletsModal } from "../../../../modals/Booklets/BookletsModal";
import { EditBookletModal } from "../../../../modals/Booklets/EditBookletModal";
import { ConfirmDeleteModal } from "../../../../modals/ConfirmDelete/ConfirmDeleteModal";
import { StatusInfoModal } from "../../../../modals/StatusInfo/StatusInfoModal";

import globalStyles from "../../../../App.module.sass";
import styles from "../../Home.module.sass";

import { IBooklet } from "../../../../types/booklet/booklet";
import { initBooklet } from "../../../../types/booklet/initBooklet";

export const BookletsContainer = () => {
  const { t } = useTranslation();
  const [currentBooklet, setCurrentBooklet] = useState(initBooklet());
  const [isBookletsModalShow, setIsBookletsModalShow] = useState(false);
  const [isEditBookletModalShow, setIsEditBookletModalShow] = useState(false);
  const [isConfirmDeleteModalShow, setIsConfirmDeleteModalShow] = useState(false);
  const [isStatusInfoModalShow, setIsStatusInfoModalShow] = useState(false);

  const booklets = Array(8)
    .fill(1)
    .map((_item, index) => {
      return {
        id: index,
        title: "Booklet",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        imageUrl: "https://i.pinimg.com/736x/57/75/d9/5775d9512ce27a0dce0befe2eba1ccf7.jpg",
        bookletFileUrl: "",
      } as IBooklet;
    }) as IBooklet[];

  const handleOnDeleteBooklet = (booklet: IBooklet) => {
    console.log(booklet.id);
    setIsEditBookletModalShow(false);
    setIsConfirmDeleteModalShow(true);
  };

  const handleOnConfirmDeleteBooklet = () => {
    setIsConfirmDeleteModalShow(false);
    setIsStatusInfoModalShow(true);
  };

  return (
    <>
      <div className={`${styles.main_booklets} ${styles.content_container} ${styles.half}`}>
        <div className={styles.content_container_head}>
          <div className={styles.head_title}>
            <h4>{t("booklets.booklets")}</h4>
            <div className={styles.count}>{booklets.length}</div>
          </div>
          {booklets.length > 0 ? (
            <div
              className={styles.head_action}
              onClick={() => {
                setCurrentBooklet(initBooklet());
                setIsEditBookletModalShow(true);
              }}
            >
              {t("global.create")}
            </div>
          ) : null}
        </div>
        {booklets.length > 0 ? (
          <>
            <div className={styles.main_booklets_container}>
              {booklets.slice(0, 2).map((booklet: IBooklet) => {
                return (
                  <div className={styles.main_booklet_item} key={booklet.id}>
                    <BookletCard
                      bookletItem={booklet}
                      onEdit={() => {
                        setCurrentBooklet(booklet);
                        setIsEditBookletModalShow(true);
                      }}
                    />
                  </div>
                );
              })}
            </div>
            {booklets.length > 0 ? (
              <button
                className={`${globalStyles.inverted} ${globalStyles.small}`}
                type="button"
                onClick={() => setIsBookletsModalShow(true)}
              >
                <span>{booklets.length > 2 ? t("booklets.see_all") : t("global.edit")}</span>
              </button>
            ) : null}
          </>
        ) : (
          <div className={styles.empty_info}>
            <div className={styles.empty_message}>{t("booklets.no_booklets")}</div>
            <button
              className={globalStyles.small}
              type="button"
              onClick={() => {
                setCurrentBooklet(initBooklet());
                setIsEditBookletModalShow(true);
              }}
            >
              {t("booklets.create_booklet")}
            </button>
          </div>
        )}
      </div>
      <BookletsModal
        isShow={isBookletsModalShow}
        booklets={booklets}
        onCreate={() => {
          setIsBookletsModalShow(false);
          setCurrentBooklet(initBooklet());
          setIsEditBookletModalShow(true);
        }}
        onEdit={(booklet: IBooklet) => {
          setIsBookletsModalShow(false);
          setCurrentBooklet(booklet);
          setIsEditBookletModalShow(true);
        }}
        onClose={() => setIsBookletsModalShow(false)}
      />
      <EditBookletModal
        isShow={isEditBookletModalShow}
        booklet={currentBooklet}
        onDelete={handleOnDeleteBooklet}
        onClose={() => setIsEditBookletModalShow(false)}
      />
      <ConfirmDeleteModal
        isShow={isConfirmDeleteModalShow}
        head={t("booklets.deleting_a_booklet")}
        title={t("booklets.delete_title")}
        message={t("booklets.delete_description")}
        onConfirm={handleOnConfirmDeleteBooklet}
        onClose={() => {
          setIsConfirmDeleteModalShow(false);
          setIsEditBookletModalShow(true);
        }}
      />
      <StatusInfoModal
        isShow={isStatusInfoModalShow}
        message={t("booklets.booklet_was_deleted")}
        isSuccess={true}
        onClose={() => setIsStatusInfoModalShow(false)}
        isRestore={true}
        onRestore={() => setIsStatusInfoModalShow(false)}
      />
    </>
  );
};
