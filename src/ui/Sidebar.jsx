import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import { FormGroup, FormControlLabel } from "@mui/material";
import supabase from "../services/supabase";
// import { useSearchParams } from "react-router-dom";
import ControlledCheckbox from "./ControlledCheckbox";
import ControlledCheckbox2 from "./ControlledCheckbox_2";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

function Sidebar({
  filterArtists,
  setFilterArtists,
  filterDifficulty,
  setFilterDifficulty,
}) {
  const [artists, setArtists] = useState([]); //all artists
  const [artistsObj, setArtistsObj] = useState([]); //all artists
  // const [filterDifficulty, setFilterDifficulty] = useState([]);

  useEffect(() => {
    fetchArtists();
  }, []);

  useEffect(() => {
    fetchArtists2();
  }, []);

  async function fetchArtists() {
    try {
      const { data, error } = await supabase
        .from("artists")
        .select("Name")
        .eq("Exists", true);

      if (error) throw error;
      setArtists(data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }

  async function fetchArtists2() {
    try {
      const { data, error } = await supabase
        .from("artists")
        .select("*")
        .eq("Exists", true);

      if (error) throw error;
      setArtistsObj(data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }

  artists.sort((a, b) =>
    a.Name.localeCompare(b.Name, undefined, { sensitivity: "base" })
  );

  function capitalize(item) {
    return item?.at(0).toUpperCase() + item?.slice(1);
  }

  const difficulties = [
    "beginner",
    "intermediate",
    "hard-intermediate",
    "advanced",
  ];

  return (
    <StyledSidebar>
      <div className="flex flex-col">
        <span className="mb-3 text-xl">Filter by: </span>
      </div>

      <FormGroup className="mb-1">
        <span className="font-medium text-lg mb-1">Difficulty: </span>
        {difficulties.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <ControlledCheckbox
                param={filterDifficulty}
                setParam={setFilterDifficulty}
                label={item}
              />
            }
            label={capitalize(item)}
          />
        ))}
      </FormGroup>

      <FormGroup>
        <span className="font-semibold text-lg">Artist: </span>
        {/* <FormControlLabel
          control={
            <ControlledCheckbox2
              param={filterArtists}
              setParam={setFilterArtists}
              label="BOY"
              artists={artistsObj}
            />
          }
          label="Boy Groups"
        />

        <FormControlLabel
          control={
            <ControlledCheckbox2
              param={filterArtists}
              setParam={setFilterArtists}
              label="GIRL"
              artists={artistsObj}
            />
          }
          label="Girl Groups"
        /> */}
      </FormGroup>

      <FormGroup>
        {/* <span className="font-medium text-lg mb-1">Artist: </span> */}
        {artists.map((item) => (
          <FormControlLabel
            key={item.Name}
            control={
              <ControlledCheckbox
                param={filterArtists}
                setParam={setFilterArtists}
                label={item.Name}
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
