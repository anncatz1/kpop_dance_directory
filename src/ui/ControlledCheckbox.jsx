import { useState } from "react";
import { Checkbox } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function ControlledCheckbox({ param = [], setParam, label }) {
  const [checked, setChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  //   const { filterArtists, setFilterArtists } = useContext(VideosContext);
  // console.log(setParam);

  function setPageTo1() {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  const handleCheck = (e) => {
    setChecked((prev) => !prev);

    if (!checked) {
      const newArray = [...param, label];
      console.log(newArray);
      setParam(newArray);
    } else {
      const newArray = param.filter((item) => item !== label);
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
