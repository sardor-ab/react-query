import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../../components/Header";
import GeneralInfo from "../GeneralInfo";
import "./index.css";

// { dataName, buttonData, filterData, tableRows }

const PLAYERS_DATA = {
  dataName: "player",
  buttonData: {
    label: "New Player",
    action: () => {},
  },
  filterData: [
    {
      title: "FILTER BY CLUB",
      search_param: "teams",
    },
  ],
  tableRows: [
    { title: "Age" },
    { title: "Club" },
    { title: "Position" },
    { title: "Rating" },
    { title: "Wage" },
  ],
};

const MainPage = () => {
  const [theme, setTheme] = useState("light");
  const setContentClassName = (theme) => {
    return `MainPage__content ${theme}`;
  };
  return (
    <div className="MainPage">
      <div className="MainPage__header">
        <Header theme={theme} setTheme={setTheme} />
      </div>
      <div className={setContentClassName(theme)}>
        <Routes>
          <Route
            exact
            path="/"
            element={<GeneralInfo props={PLAYERS_DATA} />}
          />
          <Route
            exact
            path="/players"
            element={<GeneralInfo props={PLAYERS_DATA} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default MainPage;
