import styled from "styled-components";
import React, { useState, useEffect } from "react";
import supabase from "../services/supabase";
import { Checkbox, FormGroup, FormControlLabel } from "@mui/material";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

function Sidebar() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetchArtists();
  }, []);

  async function fetchArtists() {
    try {
      const { data, error } = await supabase
        .from("artists")
        .select("Name", { count: "exact" })
        .eq("Exists", true);

      if (error) throw error;
      setArtists(data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }
  artists.sort((a, b) =>
    a.Name.localeCompare(b.Name, undefined, { sensitivity: "base" })
  );
  // const firstItem = { Name: "All" };
  // const allItems = [firstItem, ...artists];

  return (
    <StyledSidebar>
      <div className="flex flex-col">
        <span className="mb-4 text-xl">Filter by: </span>
      </div>
      <FormGroup>
        <span className="font-semibold text-lg mb-[0.8rem]">Artist: </span>
        <FormControlLabel
          control={
            <Checkbox
              // checked={checked}
              // onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Boy Group"
        />

        <FormControlLabel
          control={
            <Checkbox
              // checked={checked}
              // onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Girl Group"
        />
      </FormGroup>

      <FormGroup>
        {artists.map((item) => (
          <FormControlLabel
            key={item.Name}
            control={
              <Checkbox
                // checked={checked}
                // onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={item.Name}
          />
        ))}
      </FormGroup>
    </StyledSidebar>
  );
}

export default Sidebar;
