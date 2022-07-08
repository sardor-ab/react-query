import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./index.css";

const getAll = () => {
  return axios.get("http://localhost:3001/players");
};

const ItemList = () => {
  const { isLoading, isError, data, error } = useQuery("players", getAll, {
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

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
    <TableContainer className="ItemsList" component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Country</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">Club</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name[0]}.&nbsp;{row.surname}
              </TableCell>
              <TableCell align="right">{row.country}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.rating}</TableCell>
              <TableCell align="right">{row.club}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemList;
