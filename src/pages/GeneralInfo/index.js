import React, { useState, useEffect } from "react";
import CustomTable from "../../components/Table";
import SearchBar from "../../components/SearchBar";
import FilterComponent from "../../components/Filters";
import "./index.css";

const DEFAULT_QUERY_PARAMS = {
  league: 0,
  club: 0,
  position: 0,
};

const GeneralInfo = ({ dataName, buttonData, columns }) => {
  const [queryParams, setQueryParams] = useState(DEFAULT_QUERY_PARAMS);
  const [preSelectedColumns, setPreSelectedColumns] = useState(columns);

  const handleQueryParamsChange = (queryParamName, queryParamValue) => {
    setQueryParams({ ...queryParams, [queryParamName]: queryParamValue });
  };

  const handleReset = () => {
    setQueryParams(DEFAULT_QUERY_PARAMS);
  };

  useEffect(() => {
    if (localStorage.getItem(dataName)) {
      setPreSelectedColumns(JSON.parse(localStorage.getItem(dataName)));
    }
  }, [dataName]);

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
