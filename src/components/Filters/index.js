import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  Button,
  Select,
  Divider,
  MenuItem,
  InputLabel,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import "./index.css";

const fetchOptions = async (filter, params) => {
  const res = await axios.get(`http://localhost:3001/${filter}?${params}`);

  return res.data;
};

const LeagueFilter = ({ league, handleLeagueChange }) => {
  const { data, isLoading, error } = useQuery(["leagues"], () =>
    fetchOptions("leagues", "")
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div className="Filter__league Custom__filter">
      <InputLabel className="Filter__league-title">FILTER BY LEAGUE</InputLabel>
      <Select
        value={league}
        label="FILTER BY LEAGUE"
        onChange={handleLeagueChange}
        variant="standard"
      >
        {data.map((league, index) => {
          return (
            <MenuItem key={index} value={league.id}>
              {league.name}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

const TeamFilter = ({ league, option, handleOptionChange }) => {
  const { data, isLoading, error } = useQuery(["teams", league], () =>
    fetchOptions("teams", "league_id_like=" + league)
  );

  if (isLoading) {
    return <LinearProgress />;
  }

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div className="Filter__field Custom__filter">
      <InputLabel className="Filter__field-title Custom__filter-title">
        FILTER BY TEAMS
      </InputLabel>
      <Select
        value={option}
        // label="FILTER BY LEAGUE"
        onChange={handleOptionChange}
        variant="standard"
      >
        {data.map((option, index) => {
          return (
            <MenuItem key={index} value={option.id}>
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

const PositionFilter = ({ position, handlePositionChange }) => {
  const { data, isLoading, error } = useQuery(["positions"], () =>
    fetchOptions("positions", "")
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error!</div>;
  }

  return (
    <div className="Filter__field Custom__filter">
      <InputLabel className="Filter__field-title Custom__filter-title">
        FILTER BY POSITIONS
      </InputLabel>
      <Select
        value={position}
        // label="FILTER BY LEAGUE"
        onChange={handlePositionChange}
        variant="standard"
      >
        {data.map((option, index) => {
          return (
            <MenuItem key={index} value={option.id}>
              {option.name}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

const FilterComponent = ({ dataName, filterData }) => {
  const [option, setOption] = useState("");
  const [league, setLeague] = useState("");
  const [position, setPosition] = useState("");

  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };

  const handleLeagueChange = (event) => {
    setLeague(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  return (
    <div className="Filters">
      <div className="Filters__left Laptop__up">
        <LeagueFilter league={league} handleLeagueChange={handleLeagueChange} />
        <Divider orientation="vertical" flexItem />
        {/* {dataName === "player" && (
          <CustomFilter
            dataName="teams"
            league={league}
            option={option}
            handleOptionChange={handleOptionChange}
          />
        )} */}
        <TeamFilter
          league={league}
          option={option}
          handleOptionChange={handleOptionChange}
        />
        <Divider orientation="vertical" flexItem />
        <PositionFilter
          position={position}
          handlePositionChange={handlePositionChange}
        />
      </div>
      <div className="Filters__right Laptop__up">
        <Button
          variant="standard"
          color="primary"
          startIcon={<RestartAltIcon />}
          className="Filters__right__button"
        >
          RESET FILTERS
        </Button>
      </div>
      <div className="Filters__content Laptop__down">Filters</div>
    </div>
  );
};

export default FilterComponent;
