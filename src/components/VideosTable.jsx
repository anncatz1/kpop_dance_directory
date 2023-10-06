import React, { useState, useEffect } from "react";
import supabase from "../services/supabase";
import VideoRow from "./VideoRow";
import Pagination from "../ui/Pagination";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

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
  grid-template-columns: 100px 100px 2fr 3fr;
  column-gap: 1.5rem;
  align-items: center;
  justify-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid slategray;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 0.5rem;
`;

function VideosTable() {
  const [videos, setVideos] = useState([]);
  const [totalVideos, setTotalVideos] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchVideos(currentPage);
  }, [currentPage]);

  const fetchVideos = async (page) => {
    try {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const { data, count, error } = await supabase
        .from("dances")
        .select("*", { count: "exact" })
        .order("date", { ascending: false })
        .range(start, start + ITEMS_PER_PAGE - 1);

      if (error) throw error;
      setVideos(data);
      setTotalVideos(count);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

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
  const [searchParams] = useSearchParams();

  // filter
  const filterValue = searchParams.get("type") || "all";

  let filteredCabins;
  // if (filterValue === "all") filteredCabins = cabins;
  // if (filterValue === "no-discount")
  //   filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  // if (filterValue === "with-discount")
  //   filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // sort by
  function compareText(a, b) {
    if (a[field].toLowerCase() < b[field].toLowerCase()) {
      return -1 * modifier;
    }
    if (a[field].toLowerCase() > b[field].toLowerCase()) {
      return 1 * modifier;
    }
    return 0;
  }
  function compareNumbers(a, b) {
    return (a[field] - b[field]) * modifier;
  }

  const sortBy = searchParams.get("sort") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  // const sortedCabins =
  //   typeof cabins[0][field] === "number"
  //     ? filteredCabins.sort(compareNumbers)
  //     : filteredCabins.sort(compareText);

  return (
    // <div className="flex flex-col p-20 pt-14 divide-y-2">
    // <div>
    <>
      {/* <h1 className="text-2xl mb-5">Dance Practice Vids and Tutorials</h1> */}
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
      </Table>

      <div className="flex justify-between mt-4">
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
      />
    </>
    // </div>
  );
}

export default VideosTable;
