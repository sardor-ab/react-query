import React from "react";
import TextField from "@mui/material/TextField";
import "./index.css";

const getPlaceholderText = (word) => {
  const passedWord = word[0].toUpperCase() + word.slice(1).toLowerCase();

  return `Search for a ${passedWord}`;
};

const SearchBar = ({ placeholder = "PLAYER" }) => {
  return (
    <div className="SearchBar">
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder={getPlaceholderText(placeholder)}
        fullWidth
      />
    </div>
  );
};

export default SearchBar;
