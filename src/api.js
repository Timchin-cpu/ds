const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://bansys.ru.net/api"
    : "http://localhost:3001/api";
export default API_BASE_URL;
