import React from "react";
import Divider from "@mui/material/Divider";
import SearchBar from "../SearchBar/index.js";
import ItemList from "../ItemList/index.js";
import "./index.css";

const MainComponent = () => {
  return (
    <div className="MainComponent">
      <div className="MainComponent__content">
        <div className="MainComponent__content-header">PLAYERS</div>
        <Divider variant="middle" />
        <div className="MainComponent__content-search">
          <SearchBar />
        </div>
        <Divider variant="middle" />
        <div className="MainComponent__content-body">
          <ItemList />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
