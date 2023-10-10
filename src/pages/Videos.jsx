import VideosTable from "../components/VideosTable";
import DanceTableOps from "../components/DanceTableOps";
import Row from "../ui/Row";
import Heading from "../ui/Heading";

function Videos({ filterArtists, setFilterArtists }) {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h2"></Heading>
        <DanceTableOps />
      </Row>

      <Row>
        <VideosTable
          filterArtists={filterArtists}
          setFilterArtists={setFilterArtists}
        />
      </Row>
    </>
  );
}

export default Videos;
