import React, { useEffect, useState } from "react";
import { Button, Divider } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import BaseFilter from "./BaseFilter";
import {
  useFetchLeaguesData,
  useFetchPositionsData,
  useFetchTeams,
} from "../../hooks/hooks";
import "./index.css";

const FilterComponent = ({
  queryParams,
  handleQueryParamsChange,
  handleReset,
  columns,
  preSelectedColumns,
  dataName,
}) => {
  let preSelectedColumnsID = columns.map(
    (preSelectedColumn) => preSelectedColumn.id
  );

  console.log("Filters: ", preSelectedColumns);

  const [selectedColumns, setSelectedColumns] = useState(preSelectedColumnsID);

  const { league, club, position } = queryParams;

  const leaguesData = useFetchLeaguesData();
  const teamsData = useFetchTeams(league);
  const positionsData = useFetchPositionsData();

  useEffect(() => {
    handleQueryParamsChange("club", 0);
  }, [league]);

  useEffect(() => {
    localStorage.setItem(dataName, JSON.stringify(selectedColumns));
    console.log("localStorage: ", localStorage.getItem(dataName));
  }, [selectedColumns, dataName]);

  const handleLeagueChange = (event) => {
    handleQueryParamsChange("league", event.target.value);
  };

  const handleTeamChange = (event) => {
    handleQueryParamsChange("club", event.target.value);
  };

  const handlePositionChange = (event) => {
    handleQueryParamsChange("position", event.target.value);
  };

  const handleColumnChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedColumns(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="Filters">
      <div className="Filters__left">
        <BaseFilter
          label={"FILTER BY LEAGUES"}
          value={league}
          data={leaguesData}
          handleValueChange={handleLeagueChange}
        />
        <Divider orientation="vertical" flexItem />
        <BaseFilter
          label={"FILTER BY CLUBS"}
          value={club}
          data={teamsData}
          handleValueChange={handleTeamChange}
        />
        <Divider orientation="vertical" flexItem />
        <BaseFilter
          label={"FILTER BY POSITIONS"}
          value={position}
          data={positionsData}
          handleValueChange={handlePositionChange}
        />
        <Divider orientation="vertical" flexItem />
        <BaseFilter
          label={"SELECTED COLUMNS"}
          value={selectedColumns}
          data={columns}
          handleValueChange={handleColumnChange}
          multiple={true}
        />
      </div>
      <div className="Filters__right">
        <Button
          variant="standard"
          color="primary"
          startIcon={<RestartAltIcon />}
          className="Filters__right__button"
          onClick={handleReset}
        >
          RESET FILTERS
        </Button>
      </div>
    </div>
  );
};

export default FilterComponent;
