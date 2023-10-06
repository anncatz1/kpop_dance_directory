import VideosTable from "../components/VideosTable";
import DanceTableOperations from "../components/DanceTableOperations";
import Row from "../ui/Row";
import Heading from "../ui/Heading";

function Videos() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h2"></Heading>
        <DanceTableOperations />
      </Row>

      <Row>
        <VideosTable />
      </Row>
    </>
  );
}

export default Videos;
