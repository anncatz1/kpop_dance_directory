import VideosTable from "../components/VideosTable";
import DanceTableOps from "../components/DanceTableOps";
import Row from "../ui/Row";
import { useState } from "react";

function Videos({
  filterArtists,
  filterDifficulty,
  searchField,
  setSearchField,
}) {
  return (
    <>
      <Row>
        <DanceTableOps
          searchField={searchField}
          setSearchField={setSearchField}
        />
        <VideosTable
          filterArtists={filterArtists}
          filterDifficulty={filterDifficulty}
          searchField={searchField}
        />
      </Row>
    </>
  );
}

export default Videos;
