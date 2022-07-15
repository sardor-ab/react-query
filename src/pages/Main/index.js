import React, { useState } from "react";
import { Routes } from "react-router-dom";
import Header from "../../components/Header";

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
        <Routes></Routes>
      </div>
    </div>
  );
};

export default MainPage;
