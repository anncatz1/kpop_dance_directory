// import Filter from "../ui/Filter";
import React, { useState, useEffect } from "react";
import supabase from "../services/supabase";
import FilterBySelect from "../ui/FilterBySelect";
import SortBy from "../ui/SortBy";
import SwitchButton from "../ui/Switch";

function DanceTableOperations() {
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
        .eq("Famous", "Yes")
        .limit(99);
      // .range(start, start + ITEMS_PER_PAGE - 1);
      // .eq("mirror", true);
      // .order("date", { ascending: false })

      // console.log(data);
      if (error) throw error;
      setArtists(data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }
  const firstItem = { Name: "All" };
  const allItems = [firstItem, ...artists];

  return (
    <div className="flex items-center gap-6 mb-8">
      <SwitchButton filterField="mirrored" label="Mirrored" />
      <SwitchButton filterField="slowed" label="Slowed" />

      <SortBy
        options={[
          // { value: "name-desc", label: "Sort by name (Z-A)" },
          // { value: "artist-asc", label: "Sort by artist (A-Z)" },
          // { value: "regularPrice-desc", label: "Sort by price (high first)" },
          { value: "date-desc", label: "Sort by date (latest first)" },
          { value: "date-asc", label: "Sort by date (earliest first)" },
          { value: "song-asc", label: "Sort by song title (A-Z)" },
        ]}
      />

      <FilterBySelect options={allItems} />
    </div>
  );
}

export default DanceTableOperations;
