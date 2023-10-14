import { useSearchParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";

// function SwitchButton({ filterField, label }) {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const currentFilter = searchParams.get(filterField);
//   const isTrueSet = currentFilter === "true";

//   function handleClick(e) {
//     searchParams.set(filterField, e.target.checked);
//     setSearchParams(searchParams);
//   }

//   return (
//     <FormGroup>
//       <FormControlLabel
//         control={
//           <Switch
//             onClick={(e) => handleClick(e)}
//             color="secondary"
//             checked={isTrueSet}
//           />
//         }
//         label="Show Slowed"
//       />
//     </FormGroup>
//   );
// }

function SwitchButton({ filterField, label }) {
  const isSmallScreen = useMediaQuery("(max-width:950px)");
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField);
  const isTrueSet = currentFilter === "true";
  // const [checked, setChecked] = useState(false);

  function handleClick(e) {
    // console.log(checked);
    // setChecked((checked) => !checked);
    // console.log("checked", e.target.checked);
    searchParams.set(filterField, e.target.checked);
    setSearchParams(searchParams);
  }
  // console.log(isTrueSet);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            onClick={handleClick}
            color="secondary"
            checked={isTrueSet}
            size={isSmallScreen ? "small" : "medium"}
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Show Slowed Tutorials"
        sx={{
          "& .MuiFormControlLabel-label": {
            fontSize: `${isSmallScreen ? "0.8rem" : "1rem"}`,
          },
        }}
      />
    </FormGroup>
  );
}

export default SwitchButton;
