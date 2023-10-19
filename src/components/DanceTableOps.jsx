import { useState } from "react";
import { TextField, Box, Stack } from "@mui/material";
import SortBy from "../ui/SortBy";
import SwitchButton from "../ui/Switch";
import SearchIcon from "@mui/icons-material/Search";

function DanceTableOps({ setSearchField }) {
  return (
    <div className="flex items-end gap-6 justify-between mb-2">
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
    </div>
  );
}

export default DanceTableOps;
