// import Filter from "../ui/Filter";
import React, { useState, useEffect } from "react";
import supabase from "../services/supabase";
import FilterBySelect from "../ui/FilterBySelect";
import SortBy from "../ui/SortBy";
import SwitchButton from "../ui/Switch";
import {
  FormLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

function DanceTableOps() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetchArtists();
  }, []);

  async function fetchArtists() {
    try {
      const { data, error } = await supabase
        .from("artists")
        .select("Name", { count: "exact" })
        .eq("Active", "Yes")
        .eq("Famous", "Yes");
      // .order("Name");
      // .limit(99);

      if (error) throw error;
      setArtists(data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }
  artists.sort((a, b) =>
    a.Name.localeCompare(b.Name, undefined, { sensitivity: "base" })
  );
  const firstItem = { Name: "All" };
  const allItems = [firstItem, ...artists];

  return (
    <div className="flex items-center gap-6 mb-8">
      {/* <SwitchButton filterField="mirrored" label="Mirrored" /> */}
      <SwitchButton filterField="slowed" label="Show Slowed" />
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              // checked={checked}
              // onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Slowed"
        />
      </FormGroup> */}

      <SortBy
        options={[
          { value: "date-desc", label: "Sort by release date (latest first)" },
          { value: "date-asc", label: "Sort by release date (earliest first)" },
          { value: "song-asc", label: "Sort by song title (A-Z)" },
          { value: "song-desc", label: "Sort by song title (Z-A)" },
          { value: "artist-asc", label: "Sort by artist (A-Z)" },
          { value: "artist-desc", label: "Sort by artist (Z-A)" },
        ]}
      />

      <FormLabel>Filter by Artist: </FormLabel>
      <FilterBySelect options={allItems} />
    </div>
  );
}

export default DanceTableOps;
