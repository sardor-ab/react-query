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
import React, { Fragment, useEffect } from "react";
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

const CustomTable = ({ queryParams, columns, preSelectedColumns }) => {
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

  let tempValues = columns.filter((column) =>
    preSelectedColumns.includes(column.id)
  );

  if (tempValues && !tempValues.length) {
    tempValues = columns;
  }

  let columnsValues = ["Name", "Position"];

  tempValues.map((column) => columnsValues.push(column.name));

  return (
    <div className="Table">
      {isLoading && <LOADING__TABLE />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              {columnsValues.map((column, i) => (
                <TableCell key={i}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.pages.map((group, index) => (
              <Fragment key={index}>
                {group?.data?.map((item, i) => (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <Link
                        className="TableCell__link"
                        to={`/players/${item.id}`}
                      >
                        {item.name} {item.surname}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        className="TableCell__link"
                        to={`/players?position_id=${item.position_id}`}
                      >
                        {item.position}
                      </Link>
                    </TableCell>
                    {columnsValues.includes("Club") && (
                      <TableCell>
                        <Link
                          className="TableCell__link"
                          to={`/teams/${item.club_id}`}
                        >
                          {item.club}
                        </Link>
                      </TableCell>
                    )}
                    {columnsValues.includes("Rating") && (
                      <TableCell>{item.rating}</TableCell>
                    )}
                    {columnsValues.includes("Country") && (
                      <TableCell>{item.country}</TableCell>
                    )}
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
