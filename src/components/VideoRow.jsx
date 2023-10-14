import Video from "./VideoPlayer";
import styled from "styled-components";
import { format } from "date-fns";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr 1fr;
  column-gap: 1rem;
  align-items: center;
  justify-items: center;
  padding: 0rem 1rem 0rem 1rem;
  overflow-x: auto;

  @media (max-width: 1250px) {
    display: flex;
    flex-direction: column;
    padding: 2rem 5rem;
    overflow: hidden;
  }

  &:not(:last-child) {
    border-bottom: 1px solid lightgray;
  }
`;

const TutorialBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 0rem;
  max-width: 720px;
  & > * {
    // target direct children, which in this case is the video
    flex-grow: 1; // allows the video to grow
    min-width: 450px; // ensures a minimum width for the video
    max-width: 450px;
  }

  @media (max-width: 1250px) {
    padding: 1rem 4rem;
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

  @media (max-width: 1250px) {
    padding: 1rem 0rem;
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
  }

  & > * {
    // target direct children, which in this case is the video
    flex-grow: 1; // allows the video to grow
    min-width: 450px; // ensures a minimum width for the video
  }
`;

function capitalize(item) {
  return item?.at(0).toUpperCase() + item?.slice(1);
}

function VideoRow({ row, slowed }) {
  return (
    <TableRow>
      <div>
        <div className="text-center mb-2 sm:mb-3 md:mb-4">
          <p className="font-medium text-lg">{row.song}</p>
          <p className="text-lg">{row.artist}</p>
        </div>
        <div className="text-center sm:space-y-2 mb-1 sm:mb-2 xl:space-y-3">
          <p className="text-base">
            Release date: {format(new Date(row.date), "MM/dd/yyyy")}
          </p>
          <div className="flex gap-1 justify-center xl:flex-col xl:gap-0">
            <p className="text-base">Difficulty: </p>
            <p className="text-base">
              {row.difficulty ? capitalize(row.difficulty) : ""}
            </p>
          </div>
        </div>
      </div>
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
        <TutorialBox>
          <Video url={row.tutorial_urls?.at(0)} />
        </TutorialBox>
      )}
    </TableRow>
  );
}

export default VideoRow;
