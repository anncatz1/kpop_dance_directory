import { useContext, useState } from "react";
import { Checkbox } from "@mui/material";
import { useSearchParams } from "react-router-dom";

function ControlledCheckbox({ filterArtists, setFilterArtists, label }) {
  const [checked, setChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  //   const { filterArtists, setFilterArtists } = useContext(VideosContext);

  function setPageTo1() {
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  const handleCheck = (e) => {
    setChecked((prev) => !prev);
    if (!checked) {
      const newArtists = [...filterArtists, label];
      setFilterArtists(newArtists);
      //   console.log(newArtists);
    } else {
      const newArtists = filterArtists.filter((item) => item !== label);
      setFilterArtists(newArtists);
      //   console.log(newArtists);
    }
    setPageTo1();
  };

  return (
    // <>
    //   <label htmlFor={label}>{label}</label>
    //   <input
    //     id={label}
    //     type="checkbox"
    //     checked={checked}
    //     onChange={handleCheck}
    //   />
    // </>
    <Checkbox
      checked={checked}
      onChange={handleCheck}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
}

export default ControlledCheckbox;
