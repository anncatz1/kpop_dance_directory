import React from "react";
// import YouTube from "react-youtube";
import ReactPlayer from "react-player";
import "./index.css";

function Video({ url }) {
  return (
    <div className="video-info">
      <ReactPlayer url={url} controls={true} width="100%" height="80%" />
    </div>
  );
}

export default Video;
