import React, { useState } from "react";
import styles from "./Clients.module.css";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
function Clients() {
  const tg = window.Telegram.WebApp;
  tg.disableVerticalSwipes();
  // const tgUserId = tg.initDataUnsafe.user.id;
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleScroll = (direction) => {
    const carousel = document.querySelector(`.${styles.carouselImgs}`);
    const scrollAmount = 100; // Количество пикселей для скролла

    if (direction === "left") {
      carousel.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    } else {
      carousel.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1); // -1 означает переход на одну страницу назад
  };
  const handleBrandClick = () => {
    navigate("/Branding");
  };
  const handleDisposalClick = () => {
    navigate("/Disposal");
  };
  const handleRansomClick = () => {
    navigate("/Ransom");
  };
  const handleRentClick = () => {
    navigate("/Rent");
  };
  const handleSend = () => {
    // Получаем русскую версию текста
    // const russianBrand = t("Request for an offer", { lng: "ru" });

    // Формируем сообщение, включающее выбранные товары

    // Отправка данных на сервер
    fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isEmailOnly: true,
        email: userData.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Данные успешно отправлены");
        navigate("/");
      })
      .catch((error) => {
        console.error("Ошибка при отправке:", error);
        alert("Произошла ошибка при отправке");
      });
  };
  const handleInputChange = (field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // setIsModalOpen(false);
  };
  const handleEquipmentspareClick = () => {
    navigate("/Equipmentspare");
  };
  const { t, i18n } = useTranslation();
  const handleMailClick = () => {
    const tg = window.Telegram.WebApp;
    if (tg.platform === "tdesktop") {
      // Для десктопной версии
      tg.openLink("mailto:sale@bansys.ru");
    } else {
      // Для остальных платформ
      window.open("mailto:sale@bansys.ru");
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Обработчик клика по изображению
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText("https://t.me/bansysbot")
      .then(() => {
        console.log("Ссылка скопирована"); // Optional: показать уведомление
      })
      .catch((err) => {
        console.error("Ошибка при копировании:", err);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.logosDivs}>
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

        <div className={styles.questionSupport}>
          {" "}
          <p>{t("Ask a question")}</p>
          <div className={styles.questionSupportImgs}>
            <img
              className={styles.supportImg}
              src="/mail.png"
              alt=""
              onClick={handleMailClick}
            />
            <img
              className={styles.supportImg}
              src="/tg.png"
              alt=""
              onClick={() => window.open("https://t.me/Bansys_chat")}
            />
            <img
              className={styles.supportImg}
              src="/wp.png"
              alt=""
              onClick={() => window.open("https://wa.me/79295022998")}
            />
          </div>
        </div>

        <div className={styles.navContents}>
          <div className={styles.equipment} onClick={handleEquipmentspareClick}>
            <p>{t("Equipment and spare parts")}</p>
            <img className={styles.texnImg} src="/texn.png" alt="" />
          </div>
          <div className={styles.navContentButtons}>
            <div className={styles.navContent} onClick={handleRentClick}>
              <p>{t("rental fee for equipment")}</p>
            </div>
            <div className={styles.navContent} onClick={handleRansomClick}>
              <p>{t("ransom")}</p>
            </div>
            <div className={styles.navContent} onClick={handleDisposalClick}>
              <p>{t("utilize")}</p>
            </div>
            <div className={styles.navContent} onClick={handleBrandClick}>
              <p>{t("brand")}</p>
            </div>
          </div>
        </div>
        <h2 className={styles.brandNames}>{t("SUPPLIED BRANDS")}</h2>
        <div className={styles.carousel}>
          <img
            className={styles.arrowImgar}
            src="/arrow.png"
            alt=""
            onClick={() => handleScroll("left")}
          />
          <div className={styles.carouselImgs}>
            <img
              className={styles.companyImg}
              src="/dn.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/diebold-nixdorf/")
              }
            />
            <img
              className={styles.companyImg}
              src="/ncr.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/ncr/")
              }
            />
            <img
              className={styles.companyImg}
              src="/hyousung.png"
              alt=""
              onClick={() =>
                window.open(
                  "https://bansys.ru/company/brands/nautilus-hyosung/"
                )
              }
            />
            <img
              className={styles.companyImg}
              src="/oki.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/oki/")
              }
            />
            <img
              className={styles.companyImg}
              src="/grg.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/oki/")
              }
            />
            <img
              className={styles.companyImg}
              src="/dors.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/dors/")
              }
            />
            <img
              className={styles.companyImg}
              src="/sfour.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/sfour/")
              }
            />
            <img
              className={styles.companyImg}
              src="/saga.png"
              alt=""
              onClick={() =>
                window.open(
                  "https://bansys.ru/company/brands/saga-technologies/"
                )
              }
            />
            <img
              className={styles.companyImg}
              src="/deep.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/deep2000/")
              }
            />
            <img
              className={styles.companyImg}
              src="/cpi.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/cpi/")
              }
            />
            <img
              className={styles.companyImg}
              src="/custom.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/custom/")
              }
            />
            <img
              className={styles.companyImg}
              src="/mei.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/mei/")
              }
            />
            <img
              className={styles.companyImg}
              src="/jcmgl.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/jcm/")
              }
            />
            <img
              className={styles.companyImg}
              src="/cashcode.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/cashcode/")
              }
            />
            <img
              className={styles.companyImg}
              src="/creator.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/creator/")
              }
            />
            <img
              className={styles.companyImg}
              src="/idtech.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/id-tech/")
              }
            />
            <img
              className={styles.companyImg}
              src="/npi.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/nippon-primex/")
              }
            />
            <img
              className={styles.companyImg}
              src="/sankyo.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/sankyo-/")
              }
            />
            <img
              className={styles.companyImg}
              src="/NRI.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/nri/")
              }
            />
            <img
              className={styles.companyImg}
              src="/mw.png"
              alt=""
              onClick={() =>
                window.open("https://bansys.ru/company/brands/mean-well/")
              }
            />
          </div>
          <img
            className={styles.arrowImgfor}
            src="/forwarf.png"
            alt=""
            onClick={() => handleScroll("right")}
          />
        </div>
        <div className={styles.subscription}>
          <img className={styles.planeImg} src="/plane.png" alt="" />
          <div>
            <p className={styles.text}>{t("Subscribe to our")}</p>
            <p className={styles.titleText}>{t("Telegram")}</p>
            <p className={styles.text}>
              {t(
                "All new Bansys stocks and themed market news from one channel"
              )}
            </p>
            <button onClick={() => window.open("https://t.me/Bansys_sale")}>
              {t("GO TO CHANNEL")}
            </button>
          </div>
        </div>
        <div className={styles.mailing}>
          <p style={{ color: i18n.language === "en" ? "black" : "white" }}>
            {t(
              "Subscribe to the newsletter. News, popular stocks, sales, inventory clearance."
            )}
          </p>

          <img
            src="/forwardwh.png"
            alt=""
            onClick={handleModalOpen}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className={styles.footer}>
          <div className={styles.tgWin}>
            <p onClick={handleCopyLink} style={{ cursor: "pointer" }}>
              {t("Link invited to our Telegram bot")}
            </p>
            <div className={styles.qwerty}>
              <p>https://t.me/bansysbot</p>
              <img src="/windows.png" alt="" />
            </div>
          </div>
          <p>
            {t(
              "For detailed information about the company's services and products, please visit the Bans'.ru website"
            )}
            <span>{t(" bansys.ru")}</span>
          </p>
        </div>
      </div>
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {/* Содержимое модального окна */}
            {/* <button onClick={() => setIsModalOpen(false)}>Закрыть</button> */}
            <div className={styles.imgArrow}>
              <img
                src="/down.png"
                alt=""
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <input
              type="text"
              placeholder="Введите ваш e-mail"
              value={userData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
            <button onClick={handleSend}>ОТПРАВИТЬ</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;
