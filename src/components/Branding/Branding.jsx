import React, { useState, useEffect } from "react";
import styles from "./Branding.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Branding() {
  const tg = window.Telegram.WebApp;
  tg.disableVerticalSwipes();
  const [message, setMessage] = useState("");
  const tgUserId = tg.initDataUnsafe.user.id;
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  // console.log(userData);

  useEffect(() => {
    // Запрос к серверу для получения данных пользователя
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${tgUserId}`);
        const data = await response.json();
        console.log(data);

        if (data) {
          setUserData({
            name: data.name || "",
            phone: data.phone || "",
            email: data.email || "",
          });
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchUserData();
  }, [tgUserId]);
  const { t, i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    `${t("Request for sales quotation")}`
  );

  const options = [
    { value: "painting", label: `${t("dyeing")}` },
    { value: "wrapping", label: `${t("Paste")}` },
    { value: "other", label: `${t("Other")}` },
  ];
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // -1 означает переход на одну страницу назад
  };

  const handleSelect = (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);
  };
  const handleSubmit = () => {
    if (!userData.name || !userData.phone || !userData.email || !message) {
      alert("Пожалуйста, заполните все поля, включая сообщение");
      return;
    }

    // Получаем русскую версию текста
    const russianBrand = t("brand", { lng: "ru" });

    // Отправка данных на сервер
    fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
        userId: tgUserId,
        type: selectedOption,
        message: message,
        photoPath: selectedFile, // добавляем URL файла
        brand: russianBrand, // Добавляем русскую версию текста
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Данные успешно отправлены");
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
  };
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Транслитерация русского имени файла
      const transliterateFileName = (name) => {
        const ru = {
          а: "a",
          б: "b",
          в: "v",
          г: "g",
          д: "d",
          е: "e",
          ё: "yo",
          ж: "zh",
          з: "z",
          и: "i",
          й: "y",
          к: "k",
          л: "l",
          м: "m",
          н: "n",
          о: "o",
          п: "p",
          р: "r",
          с: "s",
          т: "t",
          у: "u",
          ф: "f",
          х: "h",
          ц: "ts",
          ч: "ch",
          ш: "sh",
          щ: "sch",
          ъ: "",
          ы: "y",
          ь: "",
          э: "e",
          ю: "yu",
          я: "ya",
        };

        return name
          .toLowerCase()
          .split("")
          .map((char) => ru[char] || char)
          .join("")
          .replace(/\s+/g, "_"); // Заменяем пробелы на нижнее подчеркивание
      };

      const formData = new FormData();
      const englishFileName = transliterateFileName(file.name);

      // Создаем новый файл с английским именем
      const newFile = new File([file], englishFileName, { type: file.type });
      formData.append("file", newFile);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setSelectedFile(englishFileName);
          console.log(englishFileName);
        } else {
          alert("Ошибка при загрузке файла");
        }
      } catch (error) {
        console.error("Ошибка:", error);
        alert("Произошла ошибка при загрузке файла");
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.logos}>
        <div className={styles.logo}>
          {" "}
          <p>{t("brand")}</p>
          <img
            className={styles.arrow}
            src="/arrow.png"
            alt=""
            onClick={handleBackClick}
            style={{ cursor: "pointer" }} // Добавьте стиль курсора для указания, что элемент кликабелен
          />
        </div>
      </div>
      <div className={styles.mainContent}>
        <div className={styles.main}>
          <div>
            <div className={styles.borderText}>
              <p className={styles.firstText}>
                {t("The brand is developed in its own paint workshop.")}
              </p>
            </div>
            <div className={styles.borderText}>
              <p>
                {t(
                  "The company's highly qualified experts will complete the full cycle of self-service banking equipment branding, from disassembly and paint preparation to sticker and finished product packaging. "
                )}
              </p>
            </div>
            <div className={styles.borderText}>
              <p>
                {t(
                  "Strict quality control is implemented throughout the entire work process."
                )}
              </p>
            </div>
            <div className={styles.textContent}>
              <p>
                <b>
                  {t("The company adopts three main methods of ATM brand:")}
                </b>{" "}
                <br />
                <br />
                {t("1) Paste;")}
                <br />
                {t("2) Paint;")}
                <br />
                {t("3) The combination of paint and adhesive.")}
                <br />
                <br />
                {t("In addition, we can also provide the following services:")}
                <br />
                <br />
                {t("Visualization of object design layout;")}
                <br />
                {t("Customize ready-made design layouts based on equipment;")}
                <br />
                {t("Develop brand layout from scratch;")}
                <br />
                {t("Create advertising lighting design;")}
              </p>
            </div>
          </div>
          <div className={styles.supportImgs}>
            <img
              src="/wp.png"
              alt=""
              onClick={() => window.open("https://wa.me/79295022998")}
            />
            <img
              src="/tg.png"
              alt=""
              onClick={() => window.open("https://t.me/Bansys_chat")}
            />

            <img
              src="mail.png"
              alt=""
              onClick={() => window.open("mailto:sale@bansys.ru")}
            />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.selectContainer}>
          <div
            className={styles.selectHeader}
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption}
            <img src="/down.png" alt="" />
          </div>
          {isOpen && (
            <div className={styles.optionsList}>
              {options.map((option, index) => (
                <React.Fragment key={option.value}>
                  <div
                    className={styles.option}
                    onClick={() => handleSelect(option)}
                  >
                    {option.label}
                  </div>
                  {(index === 0 || index === 1) && (
                    <hr className={styles.divider} />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
        <div className={styles.input}>
          <p>{t("Respectful Name")}</p>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className={styles.input}>
          <p>{t("Telephone")}</p>
          <input
            type="text"
            value={userData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </div>
        <div className={styles.input}>
          <p>E-mail</p>
          <input
            type="text"
            value={userData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
        <div className={styles.inputMsg}>
          <div>
            <h2>{t("signal communication")}</h2>
            <p>
              {t(
                "In order to better form our company's commercial quotation, please indicate the model name and quantity Geographic location."
              )}
            </p>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.attach}>
          <label htmlFor="file-upload">
            <p>{t("Attach a file")}</p>
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            // accept="image/*"
          />
        </div>
        <div className={styles.checkbox}>
          <input type="checkbox" id="coding" name="interest" value="coding" />
          <p> {t("Agree to process personal data")}</p>
        </div>
        <div className={styles.send}>
          {i18n.language !== "en" && (
            <button onClick={handleSubmit}>ОТПРАВИТЬ</button>
          )}
        </div>
        <p className={styles.textInfo}>
          {t(
            "If you need more information about hardware, you can visit the directory on our website"
          )}
        </p>
        <button
          className={styles.abouService}
          onClick={() =>
            window.open("https://bansys.ru/services/brendirovanie/")
          }
        >
          {t("REGARDING SERVICES")}
        </button>
        <p className={styles.textInfo}>
          {t("The invitation link to our TELEGRAM bot")}
        </p>
        <div className={styles.tgWindow}>
          <p className={styles.textInfo}>{t("link")}</p>
          {i18n.language !== "en" && <img src="/windows.png" alt="" />}
        </div>
        <p className={styles.textInfo}>
          {t(
            "Detailed information about the company's services and products is available on the website bansys.ru"
          )}
        </p>
      </div>
    </div>
  );
}

export default Branding;
