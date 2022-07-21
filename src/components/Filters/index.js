import React, { useState, useEffect } from "react";
import { Button, Divider } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import BaseFilter from "./BaseFilter";
import {
  useFetchLeaguesData,
  useFetchPositionsData,
  useFetchTeams,
} from "../../hooks/hooks";
import "./index.css";

const FilterComponent = ({ handleQueryChange }) => {
  const [league, setLeague] = useState(0);
  const [team, setTeam] = useState(0);
  const [position, setPosition] = useState(0);
  const [shouldUpdate, setShouldUpdate] = useState(true);

  const leaguesData = useFetchLeaguesData();
  const teamsData = useFetchTeams(league, shouldUpdate, setShouldUpdate);
  const positionsData = useFetchPositionsData();

  useEffect(() => {
    setTeam(0);
  }, [league]);

  const handleLeagueChange = (event) => {
    setLeague(event.target.value);
    setShouldUpdate(true);
  };

  const handleTeamChange = (event) => {
    setTeam(event.target.value);
    handleQueryChange("club", event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
    handleQueryChange("position", event.target.value);
  };

  const handleReset = () => {
    setLeague(0);
    setTeam(0);
    setPosition(0);
    handleQueryChange("club", "");
    handleQueryChange("position", "");
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
          value={team}
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
