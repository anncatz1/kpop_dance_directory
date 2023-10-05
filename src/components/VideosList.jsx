import React, { useState, useEffect } from "react";
import supabase from "../services/supabase";
import VideoRow from "./VideoRow";
import Pagination from "./Pagination";
const ITEMS_PER_PAGE = 5;

function VideosList() {
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

  // useEffect(() => {
  // const fetchVideos = async () => {
  //   // Fetch tutorial videos
  //   let { data, error } = await supabase
  //     .from("dances")
  //     .select("*")
  //     .order("date", { ascending: false })
  //     .limit(5);

  //   if (error) {
  //     console.error(error);
  //     return;
  //   }

  //   setVideos(data);
  // };

  // fetchVideos();
  // }, []);

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

  return (
    <div className="flex flex-col p-20 pt-14 bg-gray-100 divide-y-2">
      <h1 className="text-2xl mb-5">Dance Practice Vids and Tutorials</h1>
      {videos.map((row, index) => (
        <VideoRow key={index} row={row} />
      ))}
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
    </div>
  );
}

export default VideosList;
