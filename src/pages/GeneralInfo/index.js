import React, { useState } from "react";
import CustomTable from "../../components/Table";
import SearchBar from "../../components/SearchBar";
import FilterComponent from "../../components/Filters";
import "./index.css";

const GeneralInfo = ({ props }) => {
  const { dataName, buttonData, tableRows } = props;
  const [query, setQuery] = useState({
    club: "",
    position: "",
  });

  const handleQueryChange = (stateName, stateValue) => {
    setQuery({ ...query, [stateName]: stateValue });
  };

  return (
    <div className="GeneralInfo">
      <div className="GeneralInfo__header">
        <span className="GeneralInfo__header-title">
          {dataName.toUpperCase()}S
        </span>
        <div className="GeneralInfo__header-actions">
          <SearchBar placeholder={dataName.toUpperCase()} />

          <button
            className="GeneralInfo__header-actions-button"
            onClick={buttonData.action}
          >
            {buttonData.label}
          </button>
        </div>
      </div>
      <div className="GeneralInfo__content">
        <FilterComponent handleQueryChange={handleQueryChange} />
        <CustomTable query={query} />
      </div>
    </div>
  );
};

export default GeneralInfo;
