import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import styles from "./Main.module.css"; // Убедитесь, что стили подключены

function Main() {
  const tg = window.Telegram.WebApp;
  tg.disableVerticalSwipes();
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };
  const navigate = useNavigate();

  const handleClientClick = () => {
    navigate("/clients");
  };
  const handleProviderClick = () => {
    navigate("/Provider");
  };
  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        {/* <button>RUS</button> */}
        <button onClick={changeLanguage} className="translate-button">
          {i18n.language === "ru" ? "EN" : "RU"}
        </button>
      </div>

      <div className={styles.main}>
        <p className={styles.title}>
          БАНКОМАТЫ <span>|</span> ТЕРМИНАЛЫ <span>|</span> ЗИП
        </p>
        <div className={styles.imageContainer}>
          <img className={styles.imgW} src="/BANSYS.png" alt="" />
        </div>
        <div className={styles.role}>
          <button onClick={handleProviderClick}>{t("SUPPLIER")}</button>
          <button onClick={handleClientClick}>{t("CUSTOMER")}</button>
        </div>
        <div className={styles.content}>
          <img className={styles.circleNavImg} src="/Group 9194.png" alt="" />
          <p>{t("Various payment methods")}</p>
        </div>
        <div className={styles.content}>
          <img className={styles.circleNavImg} src="/Group 9195.png" alt="" />
          <p>{t("Delivery and rigging in Russia and abroad")}</p>
        </div>
        <div className={styles.content}>
          <img className={styles.circleNavImg} src="/Group 9189.png" alt="" />

          {/* <div className={styles.circleNav}>
            <img
              className={styles.garantCircleNav}
              src="/Group 9188.png"
              alt=""
            />
          </div> */}

          <p>{t("Warranty and pre-sales preparation")}</p>
        </div>
      </div>
    </div>
  );
}

export default Main;
