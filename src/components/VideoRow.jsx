import Video from "./Video";

function VideoRow({ row }) {
  return (
    <div className="videoContainer bg-white pt-10">
      <h1 className="text-3xl mb-1">{row.title}</h1>
      <h3>{row.artist}</h3>
      <div className="flex flex-col lg:flex-row gap-0 justify-center items-center px-5 lg:items-center lg:gap-4">
        <Video url={row.dance_url} />
        <Video url={row.tutorial_urls.at(0)} />
      </div>
    </div>
  );
}

export default VideoRow;
