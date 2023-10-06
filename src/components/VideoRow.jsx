import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Video from "./VideoPlayer";
import styled from "styled-components";

function VideoRow({ row }) {
  const TableRow = styled.div`
    display: grid;
    grid-template-columns: 150px 150px 625px 1fr;
    column-gap: 0.5rem;
    align-items: center;
    justify-items: center;
    /* padding: 1.4rem 1.4rem; */
    /* min-height: 450px; */

    /* &:not(:last-child) { */
    border-bottom: 1px solid slategray;
    /* } */
  `;

  const TableRow2 = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    column-gap: 2rem;
    align-items: center;
    justify-content: center;
    padding: 3rem 1.4rem;

    /* display: grid;
    grid-template-columns: 1fr 1fr 1fr; */
    /* min-height: 500px; */
    overflow: scroll;
  `;

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
      <TableRow2>
        <Video url={row.tutorial_urls.at(0)} />
        {row.tutorial_urls.at(1) && <Video url={row.tutorial_urls.at(1)} />}
      </TableRow2>
    </TableRow>
  );
}

export default VideoRow;
