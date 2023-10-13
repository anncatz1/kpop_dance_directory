import Video from "./VideoPlayer";
import styled from "styled-components";
import { format } from "date-fns";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr 1fr;
  column-gap: 2rem;
  align-items: center;
  justify-items: center;
  padding: 0rem 2rem 0rem 1rem;
  overflow-x: auto;
  /* border-bottom: 1px solid slategray; */

  @media (max-width: 1250px) {
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem;
  }

  &:not(:last-child) {
    border-bottom: 1px solid lightgray;
  }
`;

const TutorialBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* column-gap: 2rem; */
  align-items: center;
  justify-content: center;
  padding: 3rem 0rem;
  max-width: 720px;
  & > * {
    // target direct children, which in this case is the video
    flex-grow: 1; // allows the video to grow
    min-width: 400px; // ensures a minimum width for the video
  }

  @media (max-width: 1250px) {
    padding: 1rem 5rem;
  }
`;

const TableRow1Vid = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  column-gap: 2rem;
  align-items: center;
  justify-content: center;
  padding: 3rem 0rem;
  max-width: 720px;
  & > * {
    // target direct children, which in this case is the video
    flex-grow: 1; // allows the video to grow
    min-width: 400px; // ensures a minimum width for the video
  }

  @media (max-width: 1250px) {
    padding: 1rem 5rem;
  }
`;

const TableRow2Vid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow-x: auto; // show horizontal scrollbar if needed
  column-gap: 2rem;
  align-items: center; // center the videos vertically
  justify-content: start; // start the videos from the left
  padding: 3rem 0rem;
`;

function capitalize(item) {
  return item?.at(0).toUpperCase() + item?.slice(1);
}

function VideoRow({ row, slowed }) {
  return (
    <TableRow>
      <h4 className="text-center space-y-2">
        <div>
          <p className="font-semibold">{row.song}</p>
        </div>
        <div>{row.artist}</div>
        <div>Release date: {format(new Date(row.date), "MM/dd/yyyy")}</div>
        <div>{row.difficulty ? capitalize(row.difficulty) : ""}</div>
      </h4>
      <TutorialBox>
        <Video url={row.dance_url} />
      </TutorialBox>

      {slowed === "true" && row.tutorial_slow_url ? (
        <TableRow2Vid>
          <Video url={row.tutorial_urls.at(0)} />
          {row.tutorial_urls.at(1) && <Video url={row.tutorial_urls.at(1)} />}
          {row.tutorial_slow_url && <Video url={row.tutorial_slow_url} />}
        </TableRow2Vid>
      ) : row.tutorial_urls?.at(1) ? (
        <TableRow2Vid>
          <Video url={row.tutorial_urls.at(0)} />
          {row.tutorial_urls.at(1) && <Video url={row.tutorial_urls.at(1)} />}
        </TableRow2Vid>
      ) : (
        <TableRow1Vid>
          <Video url={row.tutorial_urls?.at(0)} />
        </TableRow1Vid>
      )}
    </TableRow>
  );
}

export default VideoRow;
