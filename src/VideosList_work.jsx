import React from "react";
import Video from "./Video";
import VideoPair from "./VideoPair"; // Adjust the import path to match your file structure
import "./index.css";
import { useEffect } from "react";
import { useState } from "react";
import supabase from "./supabase";

function VideosList2() {
  const [videoPairs, setVideoPairs] = useState([]);

  useEffect(() => {
    const fetchVideoPairs = async () => {
      // Fetch tutorial videos
      let { data: tutorials, error: error1 } = await supabase
        .from("dance_tutorial_videos")
        .select("*")
        .limit(10);

      // Fetch practice videos
      let { data: practices, error: error2 } = await supabase
        .from("dance_practice_videos")
        .select("*")
        .limit(10);

      if (error1 || error2) {
        console.error(error1 || error2);
        return;
      }

      // Assuming that each tutorial and practice video is for the same group
      // and ordered correspondingly in the database
      const pairs = tutorials.map((tutorial, index) => ({
        tutorial,
        practice: practices[index],
      }));

      setVideoPairs(pairs);
    };

    fetchVideoPairs();
  }, []);

  console.log(videoPairs);

  return (
    <div className="videos-grid">
      {videoPairs.map((pair, index) => (
        <div key={index} className="videoPair">
          <Video
            url={"https://www.youtube.com/watch?v=" + pair.tutorial.videoId}
            title={pair.tutorial.title}
            // group={pair.group}
          />
          <Video
            url={pair.practice.url}
            title={pair.practice.song + " Practice"}
            group={pair.practice.artist}
          />
        </div>
      ))}
    </div>
  );
}

export default VideosList2;
