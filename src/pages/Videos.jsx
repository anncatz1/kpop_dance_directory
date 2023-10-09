import VideosTable from "../components/VideosTable";
import DanceTableOps from "../components/DanceTableOps";
import Row from "../ui/Row";
import Heading from "../ui/Heading";

function Videos() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h2"></Heading>
        <DanceTableOps />
      </Row>

      <Row>
        <VideosTable />
      </Row>
    </>
  );
}

export default Videos;
