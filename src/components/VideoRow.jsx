import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Video from "./VideoPlayer";
import styled from "styled-components";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 2fr 3fr;
  column-gap: 1.5rem;
  align-items: center;
  justify-items: center;
  padding: 0rem 0.5rem;
  border-bottom: 1px solid slategray;
  /* min-height: 450px; */
  /* overflow: scroll; */
  overflow-x: auto;
`;

const TableRow1Vid = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  column-gap: 2rem;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  max-width: 800px;
  /* flex-grow: 1; */
  & > * {
    // target direct children, which in this case is the video
    flex-grow: 1; // allows the video to grow
    min-width: 400px; // ensures a minimum width for the video
  }

  /* display: grid;
grid-template-columns: 1fr 1fr 1fr; */
  /* min-height: 500px; */
  /* overflow: scroll; */
`;

const TableRow2Vid = styled.div`
  width: 100%;
  /* height: 100%; */
  /* width: 3fr; */

  /* display: flex; // set the display to flex for horizontal alignment of videos */
  overflow-x: auto; // show horizontal scrollbar if needed
  column-gap: 1rem;
  align-items: center; // center the videos vertically
  justify-content: start; // start the videos from the left
  padding: 3rem 1rem;

  /* & > * {
    // target direct children of the container, in this case, the videos
    flex-shrink: 0; // prevent videos from shrinking
    width: 300px; // each video will be 600px wide
  } */

  display: grid;
  grid-template-columns: 1fr 1fr;
  /* min-height: 500px; */
  /* overflow: scroll; */
`;

function VideoRow({ row }) {
  return (
    // <div className="videoContainer bg-white pt-10">
    <TableRow>
      <h4 className="text-center">
        <div>{row.song}</div>
        <div>{row.artist}</div>
      </h4>
      <h4 className="text-center">{row.date}</h4>
      {/* <div className="flex flex-col lg:flex-row gap-0 justify-center items-center px-5 lg:items-center lg:gap-4"> */}
      {/* <Row type="horizontal"> */}
      <Video url={row.dance_url} />
      {row.tutorial_urls.at(1) ? (
        <TableRow2Vid>
          <Video url={row.tutorial_urls.at(0)} />
          {row.tutorial_urls.at(1) && <Video url={row.tutorial_urls.at(1)} />}
        </TableRow2Vid>
      ) : (
        <TableRow1Vid>
          <Video url={row.tutorial_urls.at(0)} />
          {/* {row.tutorial_urls.at(1) && <Video url={row.tutorial_urls.at(1)} />} */}
        </TableRow1Vid>
      )}
    </TableRow>
  );
}

export default VideoRow;
