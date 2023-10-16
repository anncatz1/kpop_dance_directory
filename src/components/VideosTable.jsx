import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";

import supabase from "../services/supabase";
import VideoRow from "./VideoRow";
import Spinner from "../ui/Spinner";
import { Pagination } from "@mui/material";
import NoVideos from "../ui/NoVideos";

const ITEMS_PER_PAGE = 15;

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.1rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
  margin-bottom: 10px;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 170px 1fr 1fr;
  column-gap: 2rem;
  align-items: center;
  justify-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid slategray;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1rem 1rem;

  @media (max-width: 1250px) {
    display: none;
  }
`;

function VideosTable({
  filterArtists,
  setFilterArtists,
  filterDifficulty,
  setFilterDifficulty,
}) {
  const [totalVideos, setTotalVideos] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const sortBy = searchParams.get("sort") || "date-desc";
  const totalPages = Math.ceil(totalVideos / ITEMS_PER_PAGE);
  const slowed = searchParams.get("slowed") || "false";
  // const filterArtist = searchParams.get("artist") || "All";

  const difficulties = {
    beginner: 0,
    intermediate: 1,
    "hard-intermediate": 2,
    advanced: 3,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    isLoading,
    // isError,
    // error,
    data: videos,
    // isFetching,
    // isPreviousData,
  } = useQuery({
    queryKey: ["dances", page, sortBy, filterArtists, filterDifficulty],
    queryFn: () => fetchVideos(),
    keepPreviousData: true,
  });

  async function fetchVideos() {
    try {
      let [field, direction] = sortBy.split("-");
      if (field === "artist") field = "lower_artist";
      if (field === "song") field = "lower_song";
      // let modifier = direction === "asc";

      const { data: videos, error } = await supabase
        .from("dances_duplicate")
        .select("*", { count: "exact" })
        .order(field, { ascending: direction === "asc" });

      if (field === "difficulty") {
        videos.sort((a, b) => {
          if (difficulties[a.difficulty] < difficulties[b.difficulty])
            return -1;
          if (difficulties[a.difficulty] > difficulties[b.difficulty]) return 1;
          if (a.song < b.song) return -1;
          if (a.song > b.song) return 1;
          return 0; // They are equal
        });
      }

      if (direction === "desc" && field === "difficulty") {
        videos.reverse();
      }

      let filteredVideos;
      console.log(filteredVideos);
      if (filterArtists.length === 0) filteredVideos = videos;
      else {
        filteredVideos = videos.filter((video) => {
          let splitted = video.artist.split(" X ");
          if (splitted.length === 1) splitted = video.artist.split(" & ");
          console.log(splitted);
          return (
            filterArtists.includes(video.artist) ||
            filterArtists.includes(splitted[0]?.trim()) ||
            filterArtists.includes(splitted[1]?.trim())
          );
        });
      }
      console.log(filteredVideos);
      if (filterDifficulty.length !== 0)
        filteredVideos = filteredVideos.filter((video) =>
          filterDifficulty.includes(video.difficulty)
        );

      if (error) throw error;
      setTotalVideos(filteredVideos.length);

      const start = (page - 1) * ITEMS_PER_PAGE;
      const rangeVids = filteredVideos.slice(start, start + ITEMS_PER_PAGE);
      return rangeVids;
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }

  // filter
  // const mirror = searchParams.get("mirrored");

  function handlePage(event, value) {
    searchParams.set("page", value);
    setSearchParams(searchParams);
  }

  if (isLoading) return <Spinner />;
  if (videos.length === 0) return <NoVideos />;

  return (
    <>
      {/* <div className="mb-6"> */}
      <span className="mb-2 ml-2">{totalVideos} results</span>
      <Table role="table">
        <TableHeader role="row">
          <div>Song</div>
          <div>Practice</div>
          <div>Tutorials </div>
        </TableHeader>

        {videos.map((row, index) => (
          <VideoRow key={index} row={row} slowed={slowed} />
        ))}
      </Table>

      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePage}
        color="secondary"
        size="large"
        showFirstButton
        showLastButton
        styles={{ marginBottom: "10px" }}
      />
      {/* </div> */}
    </>
  );
}

export default VideosTable;
