import Video from "./Video";

function VideoRow({ row }) {
  return (
    <div className="videoContainer bg-white pt-10">
      <h1 className="text-3xl mb-1">{row.song}</h1>
      {/* <h3>{row.artist}</h3> */}
      <h4 className="text-center mb-4">{row.date}</h4>
      <div className="flex flex-col lg:flex-row gap-0 justify-center items-center px-5 lg:items-center lg:gap-4">
        <Video url={row.dance_url} />
        <Video url={row.tutorial_urls.at(0)} />
        {row.tutorial_urls.at(1) && <Video url={row.tutorial_urls.at(1)} />}
      </div>
    </div>
  );
}

export default VideoRow;
