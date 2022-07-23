import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React from "react";
import { Link } from "react-router-dom";
import { useFetchPlayers } from "../../hooks/hooks";
import "./index.css";

const CustomTable = ({ queryParams, handleQueryParamsChange, tableRows }) => {
  const { league, club, position } = queryParams;

  const { data } = useFetchPlayers(league, club, position);

  return (
    <div className="Table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Club</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <div className="TableCell__name">
                    <Avatar
                      src={`../images/players/faces/${item.image}`}
                      alt={item.name}
                    />

                    <Link
                      className="TableCell__link Link__name"
                      to={`/players/${item.id}`}
                    >
                      {item.name} {item.surname}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <Link
                    className="TableCell__link TableCell__link-position"
                    to={`/players?position_id=${item.position_id}`}
                  >
                    {item.position}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    className="TableCell__link"
                    to={`/teams/${item.club_id}`}
                  >
                    {item.club}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {data?.data.map((item, index) => {
        return (
          <div key={index}>
            <span>{item.name}</span>-<span>{item.position}</span>
          </div>
        );
      })} */}
    </div>
  );
};

export default CustomTable;
