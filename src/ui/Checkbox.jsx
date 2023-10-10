import { useContext, useState } from "react";
import { Checkbox } from "@mui/material";

function ControlledCheckbox({ filterArtists, setFilterArtists, label }) {
  const [checked, setChecked] = useState(false);
  console.log(label);
  //   const { filterArtists, setFilterArtists } = useContext(VideosContext);

  const handleCheck = (e) => {
    setChecked((prev) => !prev);
    if (!checked) {
      const newArtists = [...filterArtists, label];
      setFilterArtists(newArtists);
      console.log(newArtists);
    } else {
      const newArtists = filterArtists.filter((item) => item !== label);
      setFilterArtists(newArtists);
      console.log(newArtists);
    }
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
