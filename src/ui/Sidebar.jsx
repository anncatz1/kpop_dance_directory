import styled from "styled-components";
import React, { useState, useEffect } from "react";
import supabase from "../services/supabase";
// import { useSearchParams } from "react-router-dom";
import ControlledCheckbox from "./ControlledCheckbox";
import { useSearchParams } from "react-router-dom";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function Sidebar({
  filterArtists,
  setFilterArtists,
  filterDifficulty,
  setFilterDifficulty,
}) {
  const [artistsObj, setArtistsObj] = useState([]); //all artists
  const [checkboxes, setCheckboxes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  function setPageTo1() {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

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

    setPageTo1();
  }

  useEffect(() => {
    fetchArtists();
  }, []);

  async function fetchArtists() {
    try {
      const { data, error } = await supabase
        .from("artists")
        .select("*")
        .eq("Exists", true)
        .order("Name");

      data.sort((a, b) =>
        a.Name.localeCompare(b.Name, undefined, { sensitivity: "base" })
      );

      if (error) throw error;
      setArtistsObj(data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }

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
        <span className="mb-2 text-xl">Filter by: </span>
      </div>

      <span className="font-medium text-lg mb-1">Difficulty: </span>
      <div>
        {difficulties.map((item) => (
          <div key={item}>
            <label className="form-control">
              <ControlledCheckbox
                param={filterDifficulty}
                setParam={setFilterDifficulty}
                label={item}
              />
              {capitalize(item)}
            </label>
          </div>
        ))}
      </div>

      <span className="font-medium text-lg mb-1">Artist: </span>
      <div className="flex items-center justify-between w-full">
        <label className="form-control">
          <input type="checkbox" onChange={handleGirls} />
          Girls
        </label>
        <label className="form-control">
          <input type="checkbox" onChange={handleBoys} /> Boys
        </label>
        <label className="form-control">
          <input type="checkbox" onChange={handleSolo} /> Solo
        </label>
      </div>

      <div>
        {checkboxes.map((checkbox, index) => (
          <div key={index}>
            <label className="form-control">
              <input
                id={checkbox.label}
                type="checkbox"
                checked={checkbox.checked}
                onChange={(e) => handleCheckboxChange(e, index)}
              />{" "}
              {checkbox.label}
            </label>
          </div>
        ))}
      </div>
    </StyledSidebar>
  );
}

export default Sidebar;
