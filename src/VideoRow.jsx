import Video from "./Video";
import "./index.css";

function VideoRow({ row }) {
  return (
    <div className="videoContainer  bg-white pt-10">
      <h1 className="text-3xl mb-1">{row.title}</h1>
      <h3>{row.artist}</h3>
      <div className="videoPair">
        <Video url={row.dance_url} />
        <Video url={row.tutorial_urls.at(0)} />
      </div>
    </div>
  );
}

export default VideoRow;
