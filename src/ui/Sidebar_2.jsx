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
  // const [artists, setArtists] = useState([]); //all artists
  const [artistsObj, setArtistsObj] = useState([]); //all artists
  const [checkboxes, setCheckboxes] = useState([]);

  useEffect(() => {
    if (artistsObj.length > 0) {
      const initialState = artistsObj.map((artist) => ({
        label: artist.Name,
        checked: false,
      }));
      setCheckboxes(initialState);
    }
  }, [artistsObj]);

  function handleGirls(event) {
    const isChecked = event.target.checked;
    const artistsF = artistsObj.filter(
      (artist) => artist.Group_Type === "GIRL"
    );

    const artistF2 = artistsF.map((artist) => artist.Name);
    setCheckboxes(
      checkboxes.map((checkbox) => {
        if (artistF2.includes(checkbox.label))
          return { ...checkbox, checked: isChecked };
        return { ...checkbox };
      })
    );

    if (isChecked) setFilterArtists(filterArtists.concat(artistF2));
    else
      setFilterArtists(
        filterArtists.filter((artist) => !artistF2.includes(artist))
      );
  }

  function handleBoys(event) {
    const isChecked = event.target.checked;
    const artistsF = artistsObj.filter((artist) => artist.Group_Type === "BOY");

    const artistF2 = artistsF.map((artist) => artist.Name);
    setCheckboxes(
      checkboxes.map((checkbox) => {
        if (artistF2.includes(checkbox.label))
          return { ...checkbox, checked: isChecked };
        return { ...checkbox };
      })
    );

    if (isChecked) setFilterArtists(filterArtists.concat(artistF2));
    else
      setFilterArtists(
        filterArtists.filter((artist) => !artistF2.includes(artist))
      );
  }

  function handleSolo(event) {
    const isChecked = event.target.checked;
    const artistsF = artistsObj.filter(
      (artist) => artist.Group_Type === "SOLO"
    );

    const artistF2 = artistsF.map((artist) => artist.Name);
    setCheckboxes(
      checkboxes.map((checkbox) => {
        if (artistF2.includes(checkbox.label))
          return { ...checkbox, checked: isChecked };
        return { ...checkbox };
      })
    );

    if (isChecked) setFilterArtists(filterArtists.concat(artistF2));
    else {
      const filtered = filterArtists.filter(
        (artist) => !artistF2.includes(artist)
      );
      setFilterArtists(filtered);
    }
  }

  function handleCheckboxChange(e, index) {
    setCheckboxes(
      checkboxes.map((checkbox, i) =>
        i === index ? { ...checkbox, checked: !checkbox.checked } : checkbox
      )
    );

    if (e.target.checked) {
      const newArray = [...filterArtists, e.target.id];
      setFilterArtists(newArray);
    } else {
      const newArray = filterArtists.filter((item) => item !== e.target.id);
      setFilterArtists(newArray);
    }
  }

  // useEffect(() => {
  //   fetchArtists();
  // }, []);

  // async function fetchArtists() {
  //   try {
  //     const { data, error } = await supabase
  //       .from("artists")
  //       .select("Name")
  //       .eq("Exists", true);

  //     if (error) throw error;
  //     // const artists = data.map((artist) => artist.Name);
  //     // console.log(artists);
  //     setArtists(data);
  //   } catch (error) {
  //     console.error("Failed to fetch videos:", error);
  //   }
  // }

  useEffect(() => {
    fetchArtists2();
  }, []);

  async function fetchArtists2() {
    try {
      const { data, error } = await supabase
        .from("artists")
        .select("*")
        .eq("Exists", true)
        .order("Name");

      if (error) throw error;
      setArtistsObj(data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }

  // artists.sort((a, b) =>
  //   a.Name.localeCompare(b.Name, undefined, { sensitivity: "base" })
  // );

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
          // <div key={item}>
          //   <input
          //     id={item}
          //     type="checkbox"
          //     param={filterDifficulty}
          //     setParam={setFilterDifficulty}
          //     label={item}
          //     checked={checked}
          //     onChange={handleCheck}
          //   />{" "}
          //   {capitalize(item)}
          // </div>
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

      <div>
        <input
          type="checkbox"
          onChange={handleGirls}
          // style={{ fontSize: "10rem", margin: "0px 4px 0px 0px" }}
        />{" "}
        Girls
        <input type="checkbox" onChange={handleBoys} /> Boys
        <input type="checkbox" onChange={handleSolo} /> Solo
      </div>

      <div>
        {checkboxes.map((checkbox, index) => (
          <div key={index}>
            <input
              id={checkbox.label}
              type="checkbox"
              checked={checkbox.checked}
              onChange={(e) => handleCheckboxChange(e, index)}
              style={{ margin: "8px 0px" }}
            />{" "}
            {checkbox.label}
          </div>
        ))}
      </div>
    </StyledSidebar>
  );
  // return (
  //   <StyledSidebar>
  //     <div className="flex flex-col">
  //       <span className="mb-3 text-xl">Filter by: </span>
  //     </div>

  //     <FormGroup className="mb-1">
  //       <span className="font-medium text-lg mb-1">Difficulty: </span>
  //       {difficulties.map((item) => (
  //         <FormControlLabel
  //           key={item}
  //           control={
  //             <ControlledCheckbox
  //               param={filterDifficulty}
  //               setParam={setFilterDifficulty}
  //               label={item}
  //             />
  //           }
  //           label={capitalize(item)}
  //         />
  //       ))}
  //     </FormGroup>

  //     <FormGroup>
  //       <span className="font-semibold text-lg">Artist: </span>
  //       {/* <FormControlLabel
  //       control={
  //         <ControlledCheckbox2
  //           param={filterArtists}
  //           setParam={setFilterArtists}
  //           label="BOY"
  //           artists={artistsObj}
  //         />
  //       }
  //       label="Boy Groups"
  //     />

  //     <FormControlLabel
  //       control={
  //         <ControlledCheckbox2
  //           param={filterArtists}
  //           setParam={setFilterArtists}
  //           label="GIRL"
  //           artists={artistsObj}
  //         />
  //       }
  //       label="Girl Groups"
  //     /> */}
  //     </FormGroup>

  //     <FormGroup>
  //       {/* <span className="font-medium text-lg mb-1">Artist: </span> */}
  //       {artists.map((item) => (
  //         <FormControlLabel
  //           key={item.Name}
  //           control={
  //             <ControlledCheckbox
  //               param={filterArtists}
  //               setParam={setFilterArtists}
  //               label={item.Name}
  //             />
  //           }
  //           label={item.Name}
  //         />
  //       ))}
  //     </FormGroup>
  //   </StyledSidebar>
  // );
}

export default Sidebar;
