import { useState } from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import SortBy from "../ui/SortBy";
import SwitchButton from "../ui/Switch";
import SearchIcon from "@mui/icons-material/Search";

function DanceTableOps({ searchField, setSearchField }) {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSearchField(query);
  }

  return (
    <div className="flex items-center sm:justify-end gap-6 justify-between mb-2">
      {/* <SwitchButton filterField="mirrored" label="Mirrored" /> */}

      <SwitchButton filterField="slowed" />

      <SortBy
        options={[
          { value: "date-desc", label: "Release date (latest first)" },
          { value: "date-asc", label: "Release date (earliest first)" },
          { value: "song-asc", label: "Song title (A-Z)" },
          { value: "song-desc", label: "Song title (Z-A)" },
          { value: "artist-asc", label: "Artist (A-Z)" },
          { value: "artist-desc", label: "Artist (Z-A)" },
          {
            value: "difficulty-asc",
            label: "Difficulty (easiest first)",
          },
          {
            value: "difficulty-desc",
            label: "Difficulty (hardest first)",
          },
        ]}
      />

      <form onSubmit={handleSubmit}>
        {/* <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        /> */}
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="standard"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          </button>
        </Box>
        {/* <button type="submit">Search</button> */}
      </form>
    </div>
  );
}

export default DanceTableOps;
