import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header";
import GeneralInfo from "../GeneralInfo";
import "./index.css";

const PLAYERS_DATA = {
  dataName: "player",
  buttonData: {
    label: "New Player",
    action: () => {},
  },
  columns: [
    { id: 1, name: "Club" },
    { id: 2, name: "Rating" },
    { id: 3, name: "Country" },
  ],
};

const MainPage = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const colorScheme = event.matches ? "dark" : "light";
        setTheme(colorScheme);
      });
  }, []);

  return (
    <div className="MainPage">
      <div className="MainPage__header">
        <Header theme={theme} setTheme={setTheme} />
      </div>
      <div className="MainPage__content">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <GeneralInfo
                dataName={PLAYERS_DATA.dataName}
                buttonData={PLAYERS_DATA.buttonData}
                columns={PLAYERS_DATA.columns}
              />
            }
          />
          <Route
            exact
            path="/players"
            element={
              <GeneralInfo
                dataName={PLAYERS_DATA.dataName}
                buttonData={PLAYERS_DATA.buttonData}
                columns={PLAYERS_DATA.columns}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default MainPage;
