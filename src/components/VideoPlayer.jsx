import React from "react";
import ReactPlayer from "react-player/lazy";

function VideoPlayer({ url }) {
  return (
    <div className="min-w-[300px] min-[1800px]:h-96 min-[1600px]:h-80 2xl:h-72 min-[1450px]:h-[17rem] xl:h-[16rem] h-[13rem]">
      <ReactPlayer url={url} controls={true} width="100%" height="100%" />
    </div>
  );
}

export default VideoPlayer;
