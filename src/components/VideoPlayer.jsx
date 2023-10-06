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
    <ReactPlayer url={url} controls={true} width="600px" height="350px" />
    // </StyledVideoPlayer>
  );
}

export default VideoPlayer;
