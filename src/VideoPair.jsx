import React from "react";
import Video from "./Video";
// import VideosList from "./VideosList_old";

const VideoPair = ({ tutorialVideo, practiceVideo }) => {
  // function extractVideoId(url) {
  //   const regex =
  //     /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  //   const result = url.match(regex);
  //   return result ? result[1] : null;
  // }
  // console.log(tutorialVideo.videoId, practiceVideo.song);

  return (
    <div className="video-pair">
      <div className="video-info">
        {/* <h2>{tutorialVideo.title} (Tutorial)</h2> */}
        {/* <p>{tutorialVideo.group}</p> */}
        {/* <Video videoId={tutorialVideo.videoId} /> */}
      </div>
      <div className="video-info">
        <h2>{practiceVideo.song} (Practice)</h2>
        <p>{practiceVideo.artist}</p>
        {/* <Video videoId={extractVideoId(practiceVideo.url)} /> */}
        <Video url={practiceVideo.url} />
      </div>
    </div>
  );
};

export default VideoPair;
