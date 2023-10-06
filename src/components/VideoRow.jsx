import Video from "./VideoPlayer";
import styled from "styled-components";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 1fr 1fr;
  column-gap: 1.5rem;
  align-items: center;
  justify-items: center;
  padding: 0rem 0.5rem;
  border-bottom: 1px solid slategray;
  overflow-x: auto;
`;

const TutorialBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  column-gap: 2rem;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  max-width: 720px;
  & > * {
    // target direct children, which in this case is the video
    flex-grow: 1; // allows the video to grow
    min-width: 400px; // ensures a minimum width for the video
  }
`;

const TableRow1Vid = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  column-gap: 2rem;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  max-width: 720px;
  & > * {
    // target direct children, which in this case is the video
    flex-grow: 1; // allows the video to grow
    min-width: 400px; // ensures a minimum width for the video
  }
`;

const TableRow2Vid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow-x: auto; // show horizontal scrollbar if needed
  column-gap: 1rem;
  align-items: center; // center the videos vertically
  justify-content: start; // start the videos from the left
  padding: 3rem 1rem;
`;

function VideoRow({ row }) {
  return (
    <TableRow>
      <h4 className="text-center">
        <div>{row.song}</div>
        <div>{row.artist}</div>
      </h4>
      <h4 className="text-center">{row.date}</h4>
      <TutorialBox>
        <Video url={row.dance_url} />
      </TutorialBox>
      {row.tutorial_urls.at(1) ? (
        <TableRow2Vid>
          <Video url={row.tutorial_urls.at(0)} />
          {row.tutorial_urls.at(1) && <Video url={row.tutorial_urls.at(1)} />}
        </TableRow2Vid>
      ) : (
        <TableRow1Vid>
          <Video url={row.tutorial_urls.at(0)} />
        </TableRow1Vid>
      )}
    </TableRow>
  );
}

export default VideoRow;
