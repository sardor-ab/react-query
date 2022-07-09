import React from "react";
import ItemList from "../ItemList/index.js";
import "./index.css";

const MainComponent = () => {
  return (
    <div className="MainComponent">
      <div className="MainComponent__content">
        <div className="MainComponent__content-header">
          <h2>PLAYERS</h2>
        </div>
        <div className="MainComponent__content-body">
          <ItemList />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
