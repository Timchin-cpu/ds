import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
import reportWebVitals from "./reportWebVitals";
import Main from "./Main";
import Clients from "./components/Clients/Clients.jsx";
import Provider from "./components/Provider/Provider.jsx";
import Branding from "./components/Branding/Branding.jsx";
import Ransom from "./components/Ransom/Ransom.jsx";
import Rent from "./components/Rent/Rent.jsx";
import Disposal from "./components/Disposal/Disposal.jsx";
import Equipmentspare from "./components/Equipmentspare/Equipmentspare.jsx";
import Requestredemption from "./components/Requestredemption/Requestredemption.jsx";
import RequestDisposal from "./components/RequestDisposal/RequestDisposal.jsx";
import Offer from "./components/Offer/Offer.jsx";
import Requestoffer from "./components/Requestoffer/Requestoffer.jsx";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/Provider" element={<Provider />} />
          <Route path="/Branding" element={<Branding />} />
          <Route path="/Ransom" element={<Ransom />} />
          <Route path="/Rent" element={<Rent />} />
          <Route path="/Disposal" element={<Disposal />} />
          <Route path="/Equipmentspare" element={<Equipmentspare />} />
          <Route path="/Requestredemption" element={<Requestredemption />} />
          <Route path="/RequestDisposal" element={<RequestDisposal />} />
          <Route path="/Offer" element={<Offer />} />
          <Route path="/Requestoffer" element={<Requestoffer />} />
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
