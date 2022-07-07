import React from "react";
import SearchBar from "../SearchBar/index.js";
import ItemList from "../ItemList/index.js";

const MainComponent = () => {
  return (
    <div className="MainComponent">
      <div className="MainComponent__content">
        <div className="MainComponent__content-header">
          <SearchBar />
        </div>
        <div className="MainComponent__content-body">
          <ItemList />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
