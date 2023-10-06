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

  // select: (data) => ({
  //   pages: [...data.pages].reverse(),
  //   pageParams: [...data.pageParams].reverse(),
  // }),
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
    // select: (data) => data.filter((item) => item.artist === filterArtist),
  });

  const totalPages = Math.ceil(totalVideos / ITEMS_PER_PAGE);

  async function fetchVideos(pageParam, sortBy = "date-desc") {
    try {
      const start = (pageParam - 1) * ITEMS_PER_PAGE;
      let [field, direction] = sortBy.split("-");
      // const modifier = direction === "asc" ? 1 : -1;

      // const { data, error: error2 } = await supabase.rpc(
      //   create function lower_name(s_users_lists s) returns text as $$
      //   select lower(s.name);
      // $$ language sql;
      // );
      // console.log(data, error2);
      if (field === "artist") field = "lower_artist";

      const {
        data: videos,
        count,
        error,
      } = await supabase
        .from("dances")
        .select("*", { count: "exact" })
        .order(field, { ascending: direction === "asc" });
      // .range(start, start + ITEMS_PER_PAGE - 1);
      // console.log(videos);

      let filteredVideos;
      if (filterArtist === "All") filteredVideos = videos;
      else
        filteredVideos = videos.filter(
          (video) => video.artist === filterArtist
        );

      const rangeVids = filteredVideos.slice(start, start + ITEMS_PER_PAGE);

      // if (artist !== "All") {
      //   const { data, count, error } = await supabase
      //     .from("dances")
      //     .select("*", { count: "exact" })
      //     .order(field, { ascending: direction === "asc" })
      //     .range(start, start + ITEMS_PER_PAGE - 1)
      //     .eq("artist", artist);

      //   dataHere = data;
      // } else {
      //   const { data, count, error } = await supabase
      //     .from("dances")
      //     .select("*", { count: "exact" })
      //     .order(field, { ascending: direction === "asc" })
      //     .range(start, start + ITEMS_PER_PAGE - 1);

      //   dataHere = data;
      // }

      // .range(pageParam, pageParam);
      // .eq("mirror", true);
      // .order("date", { ascending: false })
      // if (filterArtist !== "All") setPageTo1();
      if (error) throw error;
      setTotalVideos(count);
      return rangeVids;
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }

  const handlePrevious = () => {
    if (page > 1) {
      searchParams.set("page", page - 1);
      setSearchParams(searchParams);
    }
  };

  const handleNext = () => {
    if (!isPreviousData && page < totalPages) {
      searchParams.set("page", page + 1);
      setSearchParams(searchParams);
    }
  };

  // filter

  // const mirror = searchParams.get("mirrored");
  // let dancePractices;
  // if (filterValue === "all") filteredCabins = cabins;
  // if (mirror === true)
  //   dancePractices = videos.filter((cabin) => cabin.discount === 0);
  // if (filterValue === "with-discount")
  //   filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // sort by
  // function compareText(a, b) {
  //   if (a[field].toLowerCase() < b[field].toLowerCase()) {
  //     return -1 * modifier;
  //   }
  //   if (a[field].toLowerCase() > b[field].toLowerCase()) {
  //     return 1 * modifier;
  //   }
  //   return 0;
  // }
  // function compareNumbers(a, b) {
  //   return (a[field] - b[field]) * modifier;
  // }

  // const sortBy = searchParams.get("sort") || "date-desc";
  // const [field, direction] = sortBy.split("-");
  // const modifier = direction === "asc" ? 1 : -1;
  // const sortedVideos = videos.sort(compareText);

  // let filteredVideos;
  // const filterArtist = searchParams.get("artist") || "All";
  // if (artist === "All") filteredVideos = videos;
  // else filteredVideos = videos.filter((video) => video.artist === artist);

  // const start = (currentPage - 1) * ITEMS_PER_PAGE;
  // const rangeVids = filteredVideos.slice(start, start + ITEMS_PER_PAGE);

  // typeof videos[0][field] === "number"
  //   ? filteredCabins.sort(compareNumbers)
  //   : filteredCabins.sort(compareText);

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

        {videos.map((row, index) => (
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

      {/* <Typography>Page: {page}</Typography> */}
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
