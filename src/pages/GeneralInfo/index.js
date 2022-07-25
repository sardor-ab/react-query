import React, { useState } from "react";
import CustomTable from "../../components/Table";
import SearchBar from "../../components/SearchBar";
import FilterComponent from "../../components/Filters";
import "./index.css";

const DEFAULT_QUERY_PARAMS = {
  league: 0,
  club: 0,
  position: 0,
};

const GeneralInfo = ({ props }) => {
  let preSelectedColumns = [];

  const { dataName, buttonData, columns } = props;
  const [queryParams, setQueryParams] = useState(DEFAULT_QUERY_PARAMS);

  const handleQueryParamsChange = (queryParamName, queryParamValue) => {
    setQueryParams({ ...queryParams, [queryParamName]: queryParamValue });
  };

  const handleReset = () => {
    setQueryParams(DEFAULT_QUERY_PARAMS);
  };

  if (localStorage.getItem(dataName)) {
    console.log("first");
    preSelectedColumns = JSON.parse(localStorage.getItem(dataName));
  } else {
    console.log("second");
    localStorage.setItem(dataName, JSON.stringify(columns));
  }

  console.log("preSelectedColumns: ", preSelectedColumns);

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
          columns={columns}
          preSelectedColumns={preSelectedColumns}
          dataName={dataName}
        />
        <CustomTable
          queryParams={queryParams}
          columns={columns}
          handleQueryParamsChange={handleQueryParamsChange}
          preSelectedColumns={preSelectedColumns}
        />
      </div>
    </div>
  );
};

export default GeneralInfo;
