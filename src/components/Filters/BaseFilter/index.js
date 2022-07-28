import { InputLabel, MenuItem, Select } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import "./index.css";

const BaseFilter = ({
  label,
  data,
  value,
  handleValueChange,
  multiple = false,
}) => {
  const { isLoading, isError, data: receivedData, error } = data;

  let values = [
    {
      id: 0,
      name: "All",
    },
  ];

  receivedData?.data.forEach((item) => {
    values.push(item);
  });

  if (label === "SELECTED COLUMNS") {
    data.map((item) => {
      values.push(item);
    });
  }

  return (
    <div className="Filter">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={handleValueChange}
        variant="standard"
        multiple={multiple}
      >
        {isLoading && <LinearProgress />}
        {isError && <div>{error.message}</div>}
        {values.map((value, index) => {
          return (
            <MenuItem key={index} value={value.id}>
              {value.name}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};

export default BaseFilter;
