import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import CardActions from "@mui/material/CardActions";

import SearchBar from "../SearchBar/";

const getAriaValueText = (value) => String(value);

const MARKS = [
  {
    value: 0,
    label: 0,
  },
  {
    value: 25,
    label: 25,
  },
  {
    value: 50,
    label: 50,
  },
  {
    value: 75,
    label: 75,
  },
  {
    value: 100,
    label: 100,
  },
];

const Filter = () => {
  const [state, setState] = useState({
    age: [0, 100],
    rating: [0, 100],
    position: "",
  });

  const handleStateChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmitFilter = () => {
    console.log(state);
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Filter
          </Typography>

          <Divider />

          <SearchBar />

          <Divider />

          <Box>
            <Typography gutterBottom>Age</Typography>

            <Slider
              value={state.age}
              onChange={handleStateChange}
              name="age"
              valueLabelDisplay="auto"
              getAriaValueText={getAriaValueText}
              marks={MARKS}
            />
          </Box>
          <Box>
            <Typography gutterBottom>Rating</Typography>

            <Slider
              value={state.rating}
              onChange={handleStateChange}
              name="rating"
              valueLabelDisplay="auto"
              getAriaValueText={getAriaValueText}
              marks={MARKS}
            />
          </Box>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Position</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state.position}
              name="position"
              label="Position"
              onChange={handleStateChange}
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
          </FormControl>
        </CardContent>
        <CardActions>
          <Button onClick={handleSubmitFilter} size="small" color="primary">
            SUBMIT
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Filter;
