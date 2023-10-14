import VideosTable from "../components/VideosTable";
import DanceTableOps from "../components/DanceTableOps";
import Row from "../ui/Row";
import Heading from "../ui/Heading";

function Videos({
  filterArtists,
  setFilterArtists,
  filterDifficulty,
  setFilterDifficulty,
}) {
  return (
    <>
      <Row>
        <DanceTableOps />
        <VideosTable
          filterArtists={filterArtists}
          setFilterArtists={setFilterArtists}
          filterDifficulty={filterDifficulty}
          setFilterDifficulty={setFilterDifficulty}
        />
      </Row>
    </>
  );
}

export default Videos;