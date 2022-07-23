import React, { useEffect } from "react";
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
}) => {
  const { league, club, position } = queryParams;

  const leaguesData = useFetchLeaguesData();
  const teamsData = useFetchTeams(league);
  const positionsData = useFetchPositionsData();

  useEffect(() => {
    handleQueryParamsChange("club", 0);
  }, [league]);

  const handleLeagueChange = (event) => {
    handleQueryParamsChange("league", event.target.value);
  };

  const handleTeamChange = (event) => {
    handleQueryParamsChange("club", event.target.value);
  };

  const handlePositionChange = (event) => {
    handleQueryParamsChange("position", event.target.value);
  };

  return (
    <div className="Filters">
      <div className="Filters__left Laptop__up">
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
      </div>
      <div className="Filters__right Laptop__up">
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
      <div className="Filters__content Laptop__down">Filters</div>
    </div>
  );
};

export default FilterComponent;
