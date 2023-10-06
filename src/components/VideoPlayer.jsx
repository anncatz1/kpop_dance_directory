import React from "react";
// import YouTube from "react-youtube";
import ReactPlayer from "react-player";
import styled from "styled-components";

// const StyledVideoPlayer = styled.div`
//   width: 450px;
//   height: 300px;
//   margin: 0;
//   padding: 0;
// `;
function VideoPlayer({ url }) {
  return (
    // <StyledVideoPlayer className="video-info">
    // <div className="max-w-[700px] min-h-[300px] lg:min-w-[400px] xl:min-w-[500px] md:min-w-[400px] min-w-[300px]">
    <div className="min-w-[500px]">
      <ReactPlayer
        url={url}
        controls={true}
        width="100%"
        height="350px"
        // style={{ minHeight: "400px" }}
      />
    </div>
    // </StyledVideoPlayer>
  );
}

export default VideoPlayer;
