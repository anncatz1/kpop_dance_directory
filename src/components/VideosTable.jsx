import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient, useInfiniteQuery } from "react-query";

import supabase from "../services/supabase";
import VideoRow from "./VideoRow";
// import Pagination from "../ui/Pagination";
import Spinner from "../ui/Spinner";

const ITEMS_PER_PAGE = 5;

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
  // const [totalVideos, setTotalVideos] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();

  // const queryClient = useQueryClient();

  // Queries
  // const { isLoading, data: videos } = useQuery({
  //   queryKey: ["dances"],
  //   queryFn: fetchVideos,
  //   // ...config,
  // });

  const {
    data: videos,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["dancesInf"],
    queryFn: fetchVideos,
    getNextPageParam: (lastPage, pages) => pages.length,
    // select: (data) => ({
    //   pages: [...data.pages].reverse(),
    //   pageParams: [...data.pageParams].reverse(),
    // }),
  });

  // useEffect(() => {
  //   fetchVideos();
  // }, []);

  async function fetchVideos({ pageParam = 0 }) {
    try {
      const start = (pageParam - 1) * ITEMS_PER_PAGE;

      const { data, error } = await supabase
        .from("dances")
        .select("*")
        .range(start, start + ITEMS_PER_PAGE - 1);
      // .range(pageParam, pageParam);
      // console.log("page", pageParam - 1);

      // .eq("mirror", true);
      // .order("date", { ascending: false })

      if (error) throw error;
      // setVideos(data);

      // setTotalVideos(count);
      // console.log("supabase", data);
      return data;
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (videos.length === ITEMS_PER_PAGE) {
      setCurrentPage(currentPage + 1);
    }
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
  if (status === "loading") return <Spinner />;

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

        {videos.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((row, index) => (
              <VideoRow key={index} row={row} />
            ))}
          </React.Fragment>
        ))}
      </Table>

      <button
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
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
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
      </div>
      <Pagination
        currentPage={currentPage}
        totalVideos={totalVideos}
        onPageChange={setCurrentPage}
      /> */}
    </>
  );
}

export default VideosTable;
