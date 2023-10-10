import React, { useState } from "react";
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
  grid-template-columns: 100px 1fr 1fr;
  column-gap: 2rem;
  align-items: center;
  justify-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid slategray;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 1rem;
`;

function VideosTable({ filterArtists, setFilterArtists }) {
  const [totalVideos, setTotalVideos] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  // const filterArtist = searchParams.get("artist") || "All";
  const sortBy = searchParams.get("sort") || "date-desc";
  const totalPages = Math.ceil(totalVideos / ITEMS_PER_PAGE);
  const slowed = searchParams.get("slowed") || "false";

  const {
    isLoading,
    // isError,
    // error,
    data: videos,
    // isFetching,
    // isPreviousData,
  } = useQuery({
    queryKey: ["dances", page, sortBy, filterArtists],
    queryFn: () => fetchVideos(),
    keepPreviousData: true,
  });

  async function fetchVideos() {
    try {
      let [field, direction] = sortBy.split("-");
      if (field === "artist") field = "lower_artist";

      const { data: videos, error } = await supabase
        .from("dances_duplicate")
        .select("*", { count: "exact" })
        .order(field, { ascending: direction === "asc" });

      let filteredVideos;
      if (filterArtists.length === 0) filteredVideos = videos;
      else {
        filteredVideos = videos.filter((video) =>
          filterArtists.includes(video.artist)
        );
        setPageTo1();
      }

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
  // let dancePractices;
  // if (filterValue === "all") filteredCabins = cabins;
  // if (mirror === true)
  //   dancePractices = videos.filter((cabin) => cabin.discount === 0);
  // if (filterValue === "with-discount")
  //   filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  function setPageTo1() {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  function handlePage(event, value) {
    searchParams.set("page", value);
    setSearchParams(searchParams);
  }

  if (isLoading) return <Spinner />;
  if (videos.length === 0) return <NoVideos />;

  return (
    <>
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
      />
    </>
  );
}

export default VideosTable;
