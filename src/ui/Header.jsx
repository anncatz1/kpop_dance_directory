import React from "react";
// import { NavLink } from "react-router-dom";
import { useState } from "react";
import { TextField, Box, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function Header({ setSearchField }) {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSearchField(query);
  }

  return (
    <div className="py-4 px-6 text-slate-600">
      <div className="flex justify-between items-center">
        <p className="text-3xl hover:text-slate-800 text-left p-2">
          Kpop Dance Tutorials Directory{" "}
        </p>
        {/* <NavLink to="/">Dance Tutorials Directory</NavLink> */}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
              id="outlined-basic"
              // label="Search"
              variant="standard"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ minWidth: 200 }}
            />
            <button type="submit">
              <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            </button>
          </Box>
        </form>
      </div>
    </div>
  );
}

export default Header;
