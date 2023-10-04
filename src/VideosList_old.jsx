import React from "react";
import Video from "./Video";
// import VideoPair from "./VideoPair"; // Adjust the import path to match your file structure
import "./index.css";
import { useEffect } from "react";
import { useState } from "react";
import supabase from "./supabase";

function VideosList() {
  const [practiceVideos, setPracticeVideos] = useState([]);

  useEffect(() => {
    const fetchPracticeVideos = async () => {
      let { data: practices, error } = await supabase
        .from("dance_practice_videos")
        .select("*")
        .limit(10);

      console.log(practiceVideos);

      if (error) {
        console.error(error);
        return;
      }

      setPracticeVideos(practices);
    };

    fetchPracticeVideos();
  }, []);

  return (
    <div className="videos-grid">
      {practiceVideos.length > 0 &&
        practiceVideos.map((video, index) => (
          <Video
            key={index}
            url={video.url}
            title={video.song}
            group={video.artist}
          />
        ))}
    </div>
  );
}

export default VideosList;
