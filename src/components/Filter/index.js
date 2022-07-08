import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function valuetext(value) {
  return `${value}`;
}

const Filter = () => {
  const [value, setValue] = React.useState([0, 99]);
  const [type, setType] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const marks = [
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

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            Filter
          </Typography>

          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            marks={marks}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type"
              onChange={handleTypeChange}
            >
              <MenuItem value={"TV-show"}>TV-show</MenuItem>
              <MenuItem value={"Movie"}>Movie</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Filter;
