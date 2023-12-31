import { useSearchParams } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";

function SwitchButton({ filterField, label }) {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField);
  const isTrueSet = currentFilter === "true";

  function handleClick(e) {
    searchParams.set(filterField, e.target.checked);
    setSearchParams(searchParams);
  }

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            onClick={handleClick}
            color="secondary"
            checked={isTrueSet}
            // size={isSmallScreen ? "small" : "medium"}
            inputProps={{ "aria-label": "controlled" }}
            // sx={{ marginLeft: "3px;" }}
          />
        }
        label={isSmallScreen ? "Slowed" : "Show Slowed Tutorials"}
        sx={{
          // "& .MuiFormControlLabel-label": {
          //   fontSize: `${isSmallScreen ? "0.8rem" : "1rem"}`,
          // },
          "& .MuiSwitch-root": {
            marginLeft: "10px;",
          },
        }}
      />
    </FormGroup>
  );
}

export default SwitchButton;
