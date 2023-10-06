import React from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ url }) {
  return (
    <div className="min-w-[500px] 2xl:h-96 h-[19rem]">
      <ReactPlayer url={url} controls={true} width="100%" height="100%" />
    </div>
  );
}

export default VideoPlayer;
