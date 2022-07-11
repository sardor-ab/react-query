import axios from "axios";
import React, { useState } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import PlayerTable from "../PlayerTable";
import "./index.css";

const MainComponent = () => {
  const [page, setPage] = useState(1);
  const [playersPerPage, setPlayersPerPage] = useState(5);

  const setPrevPage = () => {
    setPage(page - 1);
  };

  const setNextPage = () => {
    setPage(page + 1);
  };

  const fetchPlayers = async (page) => {
    return await axios.get(
      `http://localhost:3001/players?_limit=${playersPerPage}&_page=${page}`
    );
  };

  const { isLoading, isError, data, error } = useInfiniteQuery(
    ["players", page, playersPerPage],
    () => fetchPlayers(page),
    {
      refetchInterval: 2000,
      refetchIntervalInBackground: true,
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    }
  );

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="MainComponent">
      <div className="MainComponent__content">
        <div className="MainComponent__content-header">
          <h2>PLAYERS</h2>
        </div>
        <div className="MainComponent__content-body">
          <PlayerTable
            data={data?.pages[0].data}
            page={page}
            playersPerPage={playersPerPage}
            setPlayersPerPage={setPlayersPerPage}
            setNextPage={setNextPage}
            setPrevPage={setPrevPage}
          />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
