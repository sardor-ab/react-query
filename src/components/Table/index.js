import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchPlayers } from "../../hooks/hooks";
import "./index.css";

const LOADING__TABLE = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Club</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(10)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
              <TableCell>
                <Skeleton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CustomTable = ({ queryParams, handleQueryParamsChange, tableRows }) => {
  const { league, club, position } = queryParams;

  const { data, isLoading, fetchNextPage, hasNextPage } = useFetchPlayers(
    league,
    club,
    position
  );

  useEffect(() => {
    const onScroll = async (event) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (Math.round(scrollHeight - scrollTop) === clientHeight) {
        fetchNextPage();
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="Table">
      {isLoading && <LOADING__TABLE />}
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
            {data?.pages.map((group, index) => (
              <Fragment key={index}>
                {group?.data?.map((item, index) => (
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
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!hasNextPage && <div className="Table__extra">No more data...</div>}
    </div>
  );
};

export default CustomTable;
