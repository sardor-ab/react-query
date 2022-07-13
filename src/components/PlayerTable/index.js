import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TableContainer from "@mui/material/TableContainer";
import CircularProgress from "@mui/material/CircularProgress";
import { useAddNewPlayerData } from "../../hooks/hooks";
import "./index.css";

const DEFAULT_FORMVALUES = {
  name: "",
  surname: "",
  country: "",
  club: "",
  position: "",
  age: 0,
  rating: 0,
};

const PlayerTable = ({
  data,
  page,
  playersPerPage,
  setPlayersPerPage,
  setNextPage,
  setPrevPage,
}) => {
  const [open, setOpen] = useState(false);
  const addNewPlayer = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formValues, setFormValues] = useState(DEFAULT_FORMVALUES);

  const { mutate } = useAddNewPlayerData();

  let canOpenPrevPage = page > 1;
  let canOpenNextPage = data.length >= playersPerPage;

  const validateForm = (form) => {
    let isValid = true;
    for (let key in form) {
      if (form[key] === "") {
        isValid = false;
      }
    }
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm(formValues)) {
      mutate(formValues, {
        onMutate: () => {
          <Box className="Loading" sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>;
        },
        onSuccess: () => {
          setFormValues(DEFAULT_FORMVALUES);
          setOpen(false);
        },
        onError: (error) => {},
      });
    }
  };

  const handleFormValueChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const handlePlayersPerPageChange = (event) => {
    setPlayersPerPage(event.target.value);
  };

  const getClassName = (rating) => {
    let ratingStatus = "";

    if (rating < 60) {
      ratingStatus = "poor";
    } else if (rating > 60 && rating < 70) {
      ratingStatus = "good";
    } else if (rating > 70 && rating < 80) {
      ratingStatus = "excellent";
    } else {
      ratingStatus = "elite";
    }

    return `rating-text ${ratingStatus}`;
  };

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
            {data?.map((player) => (
              <TableRow
                key={player.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <Tooltip
                  title={`${player.name} ${player.surname}`}
                  placement="top"
                  arrow
                >
                  <TableCell component="th" scope="row">
                    <div className="General__player-info">
                      <Link to={`/player/${player.id}`}>
                        {player.name[0]}.&nbsp;{player.surname}
                      </Link>

                      {/* <div className="General__player-info-positions">
                        {row.positions.map((position, index) => {
                          <span>{position}</span>;
                        })}
                      </div> */}
                    </div>
                  </TableCell>
                </Tooltip>
                <TableCell align="center">{player.country}</TableCell>
                <TableCell align="center">{player.age}</TableCell>
                <TableCell align="center">
                  <span className={getClassName(player.rating)}>
                    {player.rating}
                  </span>
                </TableCell>
                <TableCell align="center">{player.club}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} direction="row" className="ItemsList__action">
        <div className="PlayerTable__action-pages">
          {canOpenPrevPage && (
            <Button variant="contained" onClick={setPrevPage}>
              Prevoius
            </Button>
          )}
          {canOpenNextPage && (
            <Button variant="contained" onClick={setNextPage}>
              Next
            </Button>
          )}
        </div>
        <div className="PlayerTable__action-players">
          <InputLabel id="select-playersPerPage-label">per Page</InputLabel>
          <Select
            labelId="select-playersPerPage-label"
            id="playersPerPage-select"
            value={playersPerPage}
            label="playersPerPage"
            onChange={handlePlayersPerPageChange}
          >
            <MenuItem value={5}>Five</MenuItem>
            <MenuItem value={7}>Seven</MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
          <Button variant="outline" onClick={addNewPlayer}>
            ADD A PLAYER
          </Button>
        </div>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>A NEW PLAYER</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Player's name"
              type="text"
              fullWidth
              value={formValues.name}
              variant="standard"
              onChange={handleFormValueChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="surname"
              name="surname"
              label="Player's surname"
              type="text"
              fullWidth
              value={formValues.surname}
              variant="standard"
              onChange={handleFormValueChange}
            />
            <InputLabel id="select-country-label">Country</InputLabel>
            <Select
              labelId="select-country-label"
              id="select-country-label"
              value={formValues.country}
              name="country"
              label="Country"
              fullWidth
              onChange={handleFormValueChange}
            >
              <MenuItem value="Portugal">Portugal</MenuItem>
              <MenuItem value="England">England</MenuItem>
              <MenuItem value="France">France</MenuItem>
            </Select>
            <InputLabel id="select-club-label">Club</InputLabel>
            <Select
              labelId="select-club-label"
              id="select-club-label"
              value={formValues.club}
              label="Club"
              name="club"
              fullWidth
              onChange={handleFormValueChange}
            >
              <MenuItem value="Chelsea">Chelsea</MenuItem>
              <MenuItem value="Paris Saint-Germain">
                Paris Saint-Germain
              </MenuItem>
              <MenuItem value="Lazio">Lazio</MenuItem>
            </Select>
            <InputLabel id="select-club-label">Position</InputLabel>
            <Select
              labelId="select-position-label"
              id="select-position-label"
              value={formValues.position}
              label="Position"
              fullWidth
              name="position"
              onChange={handleFormValueChange}
            >
              <MenuItem value="GK">GK</MenuItem>
              <MenuItem value="RWB">RWB</MenuItem>
              <MenuItem value="RB">RB</MenuItem>
              <MenuItem value="CB">CB</MenuItem>
              <MenuItem value="LB">LB</MenuItem>
              <MenuItem value="LWB">LWB</MenuItem>
              <MenuItem value="CDM">CDM</MenuItem>
              <MenuItem value="RM">RM</MenuItem>
              <MenuItem value="CM">CM</MenuItem>
              <MenuItem value="LM">LM</MenuItem>
              <MenuItem value="CAM">CAM</MenuItem>
              <MenuItem value="RF">RF</MenuItem>
              <MenuItem value="CF">CF</MenuItem>
              <MenuItem value="LF">LF</MenuItem>
              <MenuItem value="RW">RW</MenuItem>
              <MenuItem value="ST">ST</MenuItem>
              <MenuItem value="LW">LW</MenuItem>
            </Select>
            <TextField
              autoFocus
              margin="dense"
              id="player-age"
              label="Player's age"
              type="number"
              fullWidth
              variant="standard"
              value={formValues.age}
              name="age"
              onChange={handleFormValueChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="player-rating"
              label="Player's rating"
              type="number"
              fullWidth
              name="rating"
              variant="standard"
              value={formValues.rating}
              onChange={handleFormValueChange}
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
