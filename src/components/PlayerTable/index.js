import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import CircularProgress from "@mui/material/CircularProgress";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import "./index.css";
import { useAddNewPlayerData } from "../../hooks/hooks";

const PlayerTable = ({ data, page, setNextPage, setPrevPage }) => {
  const [open, setOpen] = React.useState(false);
  const addNewPlayer = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formValues, setFormValues] = React.useState({
    name: "",
    surname: "",
    country: "",
    club: "",
    position: "",
    age: "",
    rating: 0,
  });

  const [errors, setErrors] = React.useState({
    errorFN: false,
    errorSN: false,
    errorCNTR: false,
    errorClub: false,
  });

  const validateForm = (form) => {
    console.log(form);
  };

  const { mutate, isLoading: isMutating } = useAddNewPlayerData();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formValues.name === "") {
      setErrors({ ...errors, errorFN: true });
    }
    if (formValues.surname === "") {
      setErrors({ ...errors, errorSN: true });
    }
    if (formValues.country === "") {
      setErrors({ ...errors, errorCNTR: true });
    }
    if (formValues.club === "") {
      setErrors({ ...errors, errorClub: true });
    }

    validateForm(formValues);

    if (
      !errors.errorFN &&
      !errors.errorFN &&
      !errors.errorCNTR &&
      !errors.errorClub
    ) {
      mutate(formValues);
      setFormValues({
        name: "",
        surname: "",
        country: "",
        club: "",
      });
      handleClose();
    }
  };

  const handleCountryChange = (event) => {
    // setCountry(event.target.value);
    setFormValues({ ...formValues, country: event.target.value });
  };
  const handleClubChange = (event) => {
    // setClub(event.target.value);
    setFormValues({ ...formValues, club: event.target.value });
  };
  const handlePositionChange = (event) => {
    setFormValues({ ...formValues, position: event.target.value });
  };

  const handleInputNameChange = (event) => {
    setFormValues({ ...formValues, name: event.target.value });
  };
  const handleInputSurNameChange = (event) => {
    setFormValues({ ...formValues, surname: event.target.value });
  };
  const handleInputAgeChange = (event) => {
    setFormValues({ ...formValues, age: event.target.value });
  };
  const handleInputRatingChange = (event) => {
    setFormValues({ ...formValues, rating: event.target.value });
  };

  if (isMutating) {
    return (
      <Box className="Loading" sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  function createData(
    id,
    name,
    surname,
    positions,
    country,
    age,
    rating,
    club
  ) {
    return { id, name, surname, positions, country, age, rating, club };
  }

  const rows = data?.data.map((player) => {
    return createData(
      player.id,
      player.name,
      player.surname,
      player.positions,
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
                    <div className="General__player-info">
                      <Link to={`/player/${row.id}`}>
                        {row.name[0]}.&nbsp;{row.surname}
                      </Link>

                      {/* <div className="General__player-info-positions">
                        {row.positions.map((position, index) => {
                          <span>{position}</span>;
                        })}
                      </div> */}
                    </div>
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
        <div className="ItemsList__action-pages">
          {page !== 1 && (
            <Button variant="contained" onClick={setPrevPage}>
              Prevoius
            </Button>
          )}
          {page !== 5 && (
            <Button variant="contained" onClick={setNextPage}>
              Next
            </Button>
          )}
        </div>
        <Button variant="outline" onClick={addNewPlayer}>
          ADD A PLAYER
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>A NEW PLAYER</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Player's name"
              type="text"
              fullWidth
              variant="standard"
              value={formValues.name}
              onChange={handleInputNameChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="surname"
              label="Player's surname"
              type="text"
              fullWidth
              value={formValues.surname}
              variant="standard"
              onChange={handleInputSurNameChange}
            />
            <InputLabel id="select-country-label">Country</InputLabel>
            <Select
              labelId="select-country-label"
              id="select-country-label"
              // value={country}
              value={formValues.country}
              label="Country"
              fullWidth
              onChange={handleCountryChange}
            >
              <MenuItem value={"Portugal"}>Portugal</MenuItem>
              <MenuItem value={"England"}>England</MenuItem>
              <MenuItem value={"France"}>France</MenuItem>
            </Select>
            <InputLabel id="select-club-label">Club</InputLabel>
            <Select
              labelId="select-club-label"
              id="select-club-label"
              // value={club}
              value={formValues.club}
              label="Club"
              fullWidth
              onChange={handleClubChange}
            >
              <MenuItem value={"Chelsea"}>Chelsea</MenuItem>
              <MenuItem value={"Paris Saint-Germain"}>
                Paris Saint-Germain
              </MenuItem>
              <MenuItem value={"Lazio"}>Lazio</MenuItem>
            </Select>
            <InputLabel id="select-club-label">Position</InputLabel>
            <Select
              labelId="select-position-label"
              id="select-position-label"
              // value={position}
              value={formValues.position}
              label="Position"
              fullWidth
              onChange={handlePositionChange}
            >
              <MenuItem value={"GK"}>GK</MenuItem>
              <MenuItem value={"RWB"}>RWB</MenuItem>
              <MenuItem value={"RB"}>RB</MenuItem>
              <MenuItem value={"CB"}>CB</MenuItem>
              <MenuItem value={"LB"}>LB</MenuItem>
              <MenuItem value={"LWB"}>LWB</MenuItem>
              <MenuItem value={"CDM"}>CDM</MenuItem>
              <MenuItem value={"RM"}>RM</MenuItem>
              <MenuItem value={"CM"}>CM</MenuItem>
              <MenuItem value={"LM"}>LM</MenuItem>
              <MenuItem value={"CAM"}>CAM</MenuItem>
              <MenuItem value={"RF"}>RF</MenuItem>
              <MenuItem value={"CF"}>CF</MenuItem>
              <MenuItem value={"LF"}>LF</MenuItem>
              <MenuItem value={"RW"}>RW</MenuItem>
              <MenuItem value={"ST"}>ST</MenuItem>
              <MenuItem value={"LW"}>LW</MenuItem>
            </Select>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Player's age"
              type="number"
              fullWidth
              variant="standard"
              value={formValues.age}
              onChange={handleInputAgeChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Player's rating"
              type="number"
              fullWidth
              variant="standard"
              value={formValues.rating}
              onChange={handleInputRatingChange}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit}>
              ADD
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </>
  );
};

export default PlayerTable;
