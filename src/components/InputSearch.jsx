import React, { useContext, useState } from "react";
import { Box, Divider, FormHelperText, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { PagesContext } from "../context/PagesContext";

export default function InputSearch({ setValueInput }) {
  const [error, setError] = useState(false);
  const [msjError, setMsjError] = useState("");
  const { updatePages } = useContext(PagesContext);

  const editItem = (e) => {
    const value = e;
    if (value.length == 0) {
      setMsjError("");
      setError(false);
    } else if (!/^[A-Za-z\s]+$/.test(value)) {
      setMsjError("The text don't accept characters special");
      setError(true);
    } else if (value == "") {
      setMsjError("The field is required");
      setError(true);
    } else if (value.length <= 2) {
      setMsjError("The field is required with 2 or more characters");
      setError(true);
    } else {
      setMsjError("");
      setError(false);
      setValueInput(e);
      updatePages(1);
      setError(false);
    }
  };

  const inputStyle = {
    border: error ? "2px solid #870606" : "",
  };

  const valueInputStyle = {
    color: error ? "#870606" : "",
  };

  return (
    <Box sx={{ inputStyle, pb: 4 }}>
      <Paper
        id="paperInput"
        component="form"
        style={inputStyle}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <InputBase
          type="text"
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search favorite characters"
          style={valueInputStyle}
          inputProps={{ "aria-label": "Search favorite characters" }}
          onChange={(e) => editItem(e.target.value)}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Box sx={{ p: "10px" }}>
          <SearchIcon />
        </Box>
      </Paper>
      {error && (
        <FormHelperText id="helperError" style={valueInputStyle}>
          {msjError}
        </FormHelperText>
      )}
    </Box>
  );
}
