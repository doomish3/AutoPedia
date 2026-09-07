import React, { useState } from "react";
import "./styles/main.css";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import CarDetail from "./components/CarDetail.jsx";

export default function App() {
  const [view, setView] = useState("home");      // "home" | "detail"
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSelectCar = (carId) => {
    setSelectedCar(carId);
    setView("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setView("home");
    setSelectedCar(null);
    setTimeout(() => {
      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <Header currentView={view} onNavigate={(v) => { setView(v); setSelectedCar(null); }} />

      <main style={{ paddingTop: "64px" }}>
        {view === "home" && (
          <Home onSelectCar={handleSelectCar} />
        )}
        {view === "detail" && selectedCar && (
          <CarDetail carId={selectedCar} onBack={handleBack} />
        )}
      </main>
    </>
  );
}
