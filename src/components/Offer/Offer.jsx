import React, { useState, useEffect } from "react";
import styles from "./Offer.module.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Offer = () => {
  const tg = window.Telegram.WebApp;
  tg.disableVerticalSwipes();
  const { t, i18n } = useTranslation();

  const [selectedItems, setSelectedItems] = useState([]);
  const allItemsId = "all";

  const [cardItems, setCardItems] = useState([]); // Изменяем на состояние
  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => {
        setCardItems(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке товаров:", error);
      });
  }, []);
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Опционально: добавьте уведомление об успешном копировании
        console.log("P/N скопирован");
      })
      .catch((err) => {
        console.error("Ошибка при копировании:", err);
      });
  };
  const handleCheckboxChange = (id) => {
    if (id === allItemsId) {
      // Если нажат "выбрать все"
      if (selectedItems.includes(allItemsId)) {
        setSelectedItems([]); // Снимаем все выделения
      } else {
        setSelectedItems([allItemsId, ...cardItems.map((item) => item.id)]); // Выбираем все
      }
    } else {
      setSelectedItems((prev) => {
        if (prev.includes(id)) {
          const newSelected = prev.filter(
            (item) => item !== id && item !== allItemsId
          );
          return newSelected;
        } else {
          const newSelected = [...prev, id];
          // Проверяем, выбраны ли все карточки
          if (cardItems.every((item) => newSelected.includes(item.id))) {
            return [...newSelected, allItemsId];
          }
          return newSelected;
        }
      });
    }
  };
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // -1 означает переход на одну страницу назад
  };
  const handleOfferClick = () => {
    const selectedProducts = cardItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    navigate("/Requestoffer", {
      state: { selectedItems: selectedProducts },
    });
  };
  return (
    <div className={styles.container}>
      {" "}
      <div className={styles.header}>
        {" "}
        <div className={styles.logos}>
          <img className={styles.logo} src="/BANSYS.png" alt="" />
          <img
            className={styles.arrow}
            src="/arrow.png"
            alt=""
            onClick={handleBackClick}
            style={{ cursor: "pointer" }} // Добавьте стиль курсора для указания, что элемент кликабелен
          />
        </div>
      </div>
      <div className={styles.main}>
        <p
          className={`${styles.offer} ${
            i18n.language === "en" ? styles.offerEn : ""
          }`}
        >
          {t("propose")}
        </p>
        <div className={styles.chooseAll}>
          <p className={styles.offer}>{t("by")}</p>
          <div className={styles.checkboxAll}>
            <p>{t("Select All")}</p>
            <input
              type="checkbox"
              id="coding"
              name="interest"
              value="coding"
              onChange={() => handleCheckboxChange(allItemsId)}
              checked={selectedItems.includes(allItemsId)}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <p>{t("name")}</p>
          </div>

          <div className={styles.buttonsSm}>
            <div className={styles.button}>
              <p>{t("state")}</p>
            </div>
            <div className={styles.button}>
              <p>{t("quantity")}</p>
            </div>
          </div>
        </div>
        {cardItems.map((item) => (
          <div className={styles.card} key={item.id}>
            <div className={styles.cardContent}>
              <p>{i18n.language === "en" ? item.name_en : item.name}</p>
              <div className={styles.usedCount}>
                <p>
                  {i18n.language === "en"
                    ? item.description_en
                    : item.description}
                </p>
                <p>{item.quant}</p>
              </div>
            </div>
            <div className={styles.cardAbout}>
              <div className={styles.pN}>
                <p>p/n:</p>
                <p>{item.pn}</p>
                <img
                  src="/Group 9264.png"
                  alt=""
                  onClick={() => copyToClipboard(item.pn)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <input
                type="checkbox"
                onChange={() => handleCheckboxChange(item.id)}
                checked={selectedItems.includes(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
      {selectedItems.length > 0 && (
        <button
          className={styles.submitButton}
          onClick={() =>
            handleOfferClick(
              cardItems
                .filter((item) => selectedItems.includes(item.id))
                .map((item) => item.name)
                .join(", ")
            )
          }
        >
          {t("PROPOSE")}
        </button>
      )}
    </div>
  );
};

export default Offer;
