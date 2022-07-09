import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import "./index.css";

const ItemList = () => {
  const [page, setPage] = React.useState(1);

  const fetchPlayers = (page) => {
    return axios.get(`http://localhost:3001/players?_limit=5&_page=${page}`);
  };

  const { isLoading, isError, data, error } = useQuery(
    ["players", page, { name: "Lewandowski" }],
    () => fetchPlayers(page),
    {
      refetchInterval: 2000,
      refetchIntervalInBackground: true,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  function createData(id, name, surname, country, age, rating, club) {
    return { id, name, surname, country, age, rating, club };
  }

  const rows = data?.data.map((player) => {
    return createData(
      player.id,
      player.name,
      player.surname,
      player.country,
      player.age,
      player.rating,
      player.club
    );
  });

  return (
    <>
      <TableContainer className="ItemsList" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Country</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Rating</TableCell>
              <TableCell align="center">Club</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <Tooltip
                  title={`${row.name} ${row.surname}`}
                  placement="top"
                  arrow
                >
                  <TableCell component="th" scope="row">
                    {row.name[0]}.&nbsp;{row.surname}
                  </TableCell>
                </Tooltip>
                <TableCell align="center">{row.country}</TableCell>
                <TableCell align="center">{row.age}</TableCell>
                <TableCell align="center">
                  <span
                    className={
                      "rating-text " +
                      (row.rating > 80
                        ? "elite"
                        : row.rating > 70
                        ? "excellent"
                        : row.rating > 60
                        ? "good"
                        : "poor")
                    }
                  >
                    {row.rating}
                  </span>
                </TableCell>
                <TableCell align="center">{row.club}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} direction="row" className="ItemsList__action">
        {page !== 1 && (
          <Button
            variant="contained"
            onClick={() => setPage((page) => page - 1)}
          >
            Prevoius
          </Button>
        )}
        {page !== 5 && (
          <Button
            variant="contained"
            onClick={() => setPage((page) => page + 1)}
          >
            Next
          </Button>
        )}
      </Stack>
    </>
  );
};

export default ItemList;
