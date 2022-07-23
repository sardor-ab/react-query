import React, { useState } from "react";
import CustomTable from "../../components/Table";
import SearchBar from "../../components/SearchBar";
import FilterComponent from "../../components/Filters";
import "./index.css";

const GeneralInfo = ({ props }) => {
  const { dataName, buttonData, tableRows } = props;
  const [queryParams, setQueryParams] = useState({
    league: 0,
    club: 0,
    position: 0,
  });

  const handleQueryParamsChange = (queryParamName, queryParamValue) => {
    setQueryParams({ ...queryParams, [queryParamName]: queryParamValue });
  };

  const handleReset = () => {
    setQueryParams({
      league: 0,
      club: 0,
      position: 0,
    });
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
        <FilterComponent
          queryParams={queryParams}
          handleQueryParamsChange={handleQueryParamsChange}
          handleReset={handleReset}
        />
        <CustomTable
          queryParams={queryParams}
          tableRows={tableRows}
          handleQueryParamsChange={handleQueryParamsChange}
        />
      </div>
    </div>
  );
};

export default GeneralInfo;
