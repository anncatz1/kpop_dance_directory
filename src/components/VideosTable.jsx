import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient, useInfiniteQuery } from "react-query";

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
  // const [videos, setVideos] = useState([]);
  const [totalVideos, setTotalVideos] = useState(0);
  // const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  // const queryClient = useQueryClient();

  // Queries
  // const { isLoading, data: videos } = useQuery({
  //   queryKey: ["dances"],
  //   queryFn: fetchVideos,
  //   // ...config,
  // });

  // const {
  //   data: videos,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status,
  // } = useInfiniteQuery({
  //   queryKey: ["dancesInf"],
  //   queryFn: fetchVideos,
  //   getNextPageParam: (lastPage, pages) => pages.length,
  // });
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
    queryKey: ["dances", page],
    queryFn: () => fetchVideos(page),
    keepPreviousData: true,
  });

  async function fetchVideos(pageParam) {
    try {
      const start = (pageParam - 1) * ITEMS_PER_PAGE;

      const { data, count, error } = await supabase
        .from("dances")
        .select("*", { count: "exact" })
        .range(start, start + ITEMS_PER_PAGE - 1);
      // .range(pageParam, pageParam);
      // console.log("page", pageParam - 1);

      // .eq("mirror", true);
      // .order("date", { ascending: false })

      if (error) throw error;
      // setVideos(data);

      setTotalVideos(count);
      // console.log("supabase", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }

  const handlePrevious = () => {
    if (page > 1) {
      // setPage(page - 1);
      searchParams.set("page", page - 1);
      setSearchParams(searchParams);
    }
    // () => setPage((old) => Math.max(old - 1, 1))
  };

  const handleNext = () => {
    if (!isPreviousData && page < totalPages) {
      // setPage(page + 1);
      searchParams.set("page", page + 1);
      setSearchParams(searchParams);
    }
    // if () {
    //   setPage((old) => old + 1);
    // }
  };

  // const { isLoading, cabins } = useCabins();
  // if (isLoading) return <Spinner />;
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
  // console.log(videos);
  if (isLoading) return <Spinner />;

  // const sortBy = searchParams.get("sort") || "date-desc";
  // const [field, direction] = sortBy.split("-");
  // const modifier = direction === "asc" ? 1 : -1;
  // const sortedVideos = videos.sort(compareText);

  // let filteredVideos;
  // const filterArtist = searchParams.get("artist") || "All";
  // if (filterArtist === "All") filteredVideos = sortedVideos;
  // else filteredVideos = videos.filter((video) => video.artist === filterArtist);

  // const start = (currentPage - 1) * ITEMS_PER_PAGE;
  // const rangeVids = filteredVideos.slice(start, start + ITEMS_PER_PAGE);

  // typeof videos[0][field] === "number"
  //   ? filteredCabins.sort(compareNumbers)
  //   : filteredCabins.sort(compareText);

  const totalPages = Math.ceil(totalVideos / ITEMS_PER_PAGE);

  function handlePage(event, value) {
    searchParams.set("page", value);
    setSearchParams(searchParams);
  }

  return (
    <>
      <Table role="table">
        <TableHeader role="row">
          <div>Song</div>
          <div>Date</div>
          <div>Practice</div>
          <div>Tutorials </div>
          {/* <div>Tutorial Pt. 2</div> */}
        </TableHeader>

        {videos.map((row, index) => (
          <VideoRow key={index} row={row} />
        ))}

        {/* {videos.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((row, index) => (
              <VideoRow key={index} row={row} />
            ))}
          </React.Fragment>
        ))} */}
      </Table>
      {/* <button
        className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </button>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div> */}
      {/* <span>Current Page: {page}</span> */}
      <div className="flex justify-between my-3">
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
      </div>
      <Typography>Page: {page}</Typography>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePage}
        color="secondary"
        showFirstButton
        showLastButton
      />

      {/* {isFetching ? <span> Loading...</span> : null}{" "} */}
      {/* <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="bg-purple-400 text-white px-4 py-2 rounded mr-2 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="bg-purple-400 text-white px-4 py-2 rounded hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50"
        >
          Next
        </button>
      </div> */}
      {/* <Pagination
        currentPage={currentPage}
        totalVideos={totalVideos}
        onPageChange={setCurrentPage}
      />  */}
    </>
  );
}

export default VideosTable;
