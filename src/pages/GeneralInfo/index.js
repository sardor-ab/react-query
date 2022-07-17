import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Filters from "../../components/Filters";
import CustomTable from "../../components/Table";
import SearchBar from "../../components/SearchBar";
import "./index.css";

const GeneralInfo = ({ props }) => {
  const { dataName, buttonData, filterData, tableRows } = props;

  // There is a problem, when the data is loaded, it doubles, so I can see the data in the console twice.

  const ColorButton = styled(Button)(({ theme }) => ({
    "&:hover": {
      background: "#ff2882",
      border: "1px solid #efefef",
      color: "#fff",
    },
    borderRadius: "3px",
    lineHeight: "3.8rem",
    background: "#fff",
    border: "1px solid #efefef",
    color: "#2f2f2f",
    padding: "0 1rem",
    transition: ".2s",
    fontWeight: "400",
  }));

  return (
    <div className="GeneralInfo">
      <div className="GeneralInfo__header">
        <span className="GeneralInfo__header-title">
          {dataName.toUpperCase()}S
        </span>
        <div className="GeneralInfo__header-actions">
          <SearchBar placeholder={dataName.toUpperCase()} />
          <ColorButton
            className="GeneralInfo__header-actions-button"
            variant="outlined"
            onClick={buttonData.action}
          >
            {buttonData.label}
          </ColorButton>
        </div>
      </div>
      <div className="GeneralInfo__content">
        <Filters filterData={filterData} />
        <CustomTable />
      </div>
    </div>
  );
};

export default GeneralInfo;
