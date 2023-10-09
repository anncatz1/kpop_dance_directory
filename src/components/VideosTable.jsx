import React, { useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";

import supabase from "../services/supabase";
import VideoRow from "./VideoRow";
import Spinner from "../ui/Spinner";
import { Pagination, Typography } from "@mui/material";

const ITEMS_PER_PAGE = 8;

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
  grid-template-columns: 100px 100px 1fr 1fr;
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

function VideosTable() {
  const [totalVideos, setTotalVideos] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const filterArtist = searchParams.get("artist") || "All";
  const sortBy = searchParams.get("sort") || "date-desc";
  const totalPages = Math.ceil(totalVideos / ITEMS_PER_PAGE);

  const {
    isLoading,
    isError,
    error,
    data: videos,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryKey: ["dances", page, sortBy, filterArtist],
    queryFn: () => fetchVideos(page, sortBy),
    keepPreviousData: true,
  });

  async function fetchVideos(pageParam, sortBy = "date-desc") {
    try {
      const start = (pageParam - 1) * ITEMS_PER_PAGE;
      let [field, direction] = sortBy.split("-");
      if (field === "artist") field = "lower_artist";

      const {
        data: videos,
        count,
        error,
      } = await supabase
        .from("dances")
        .select("*", { count: "exact" })
        .order(field, { ascending: direction === "asc" });

      let filteredVideos;
      if (filterArtist === "All") filteredVideos = videos;
      else {
        filteredVideos = videos.filter(
          (video) => video.artist === filterArtist
        );
        setPageTo1();
      }

      if (error) throw error;
      setTotalVideos(filteredVideos.length);
      return filteredVideos;
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }
  const start = (page - 1) * ITEMS_PER_PAGE;
  const rangeVids = videos.slice(start, start + ITEMS_PER_PAGE);
  // const handlePrevious = () => {
  //   if (page > 1) {
  //     searchParams.set("page", page - 1);
  //     setSearchParams(searchParams);
  //   }
  // };

  // const handleNext = () => {
  //   if (!isPreviousData && page < totalPages) {
  //     searchParams.set("page", page + 1);
  //     setSearchParams(searchParams);
  //   }
  // };

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

  return (
    <>
      <Table role="table">
        <TableHeader role="row">
          <div>Song</div>
          <div>Date</div>
          <div>Practice</div>
          <div>Tutorials </div>
        </TableHeader>

        {rangeVids.map((row, index) => (
          <VideoRow key={index} row={row} />
        ))}
      </Table>

      {/* <div className="flex justify-between my-3">
        <button
          className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50"
          onClick={handlePrevious}
          disabled={page === 1}
        >
          Previous Page
        </button>{" "}
        <button
          className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 disabled:bg-gray-300"
          onClick={handleNext}
          disabled={page === totalPages}
        >
          Next Page
        </button>
      </div> */}

      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePage}
        color="secondary"
        showFirstButton
        showLastButton
      />
    </>
  );
}

export default VideosTable;
