import React, { useState, useEffect } from "react";
import supabase from "../services/supabase";
import VideoRow from "./VideoRow";

function VideosList() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      // Fetch tutorial videos
      let { data, error } = await supabase
        .from("dances")
        .select("*")
        .order("date", { ascending: false })
        .limit(10);

      if (error) {
        console.error(error);
        return;
      }

      setVideos(data);
    };

    fetchVideos();
  }, []);

  return (
    <div className="flex flex-col p-20 pt-14 bg-gray-100 divide-y-2">
      {videos.map((row, index) => (
        <VideoRow key={index} row={row} />
      ))}
    </div>
  );
}

export default VideosList;
