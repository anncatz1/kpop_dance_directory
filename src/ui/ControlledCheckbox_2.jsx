import { useState } from "react";
import { Checkbox } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function ControlledCheckbox({ param = [], setParam, artists, label }) {
  const [checked, setChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  // const { filterArtists, setFilterArtists } = useContext(VideosContext);

  function setPageTo1() {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  const handleCheck = (e) => {
    setChecked((prev) => !prev);

    if (checked) {
      // const newArray = artists.filter((item) => item.Group_Type !== label);
      const newArray = artists;
      console.log(newArray);
      setParam(newArray);
    } else {
      const newArray = artists.filter((item) => item.Group_Type === label);
      console.log(newArray, label);
      setParam(newArray);
    }

    setPageTo1();
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleCheck}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}

export default ControlledCheckbox;
