import React from "react";
import TextField from "@mui/material/TextField";

import "./index.css";

const SearchBar = () => {
  return (
    <div className="SearchBar">
      <TextField
        id="outlined-basic"
        label="Search player..."
        variant="outlined"
      />
    </div>
  );
};

export default SearchBar;
