import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function ControlledCheckbox({ param = [], setParam, label }) {
  const [checked, setChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  // const { filterArtists, setFilterArtists } = useContext(VideosContext);

  function setPageTo1() {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  const handleCheck = (e) => {
    setChecked((prev) => !prev);

    if (!checked) {
      const newArray = [...param, label];
      setParam(newArray);
    } else {
      setParam(param.filter((item) => item !== label));
    }

    setPageTo1();
  };

  return (
    <input
      id={label}
      type="checkbox"
      checked={checked}
      onChange={handleCheck}
    />

    // <Checkbox
    //   checked={checked}
    //   onChange={handleCheck}
    //   inputProps={{ "aria-label": "controlled" }}
    // />
  );
}

export default ControlledCheckbox;
