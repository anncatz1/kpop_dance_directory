import { useSearchParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";

function SwitchButton({ filterField, label }) {
  // const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:950px)");
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
            onClick={(e) => handleClick(e)}
            color="secondary"
            checked={isTrueSet}
            size={isSmallScreen ? "small" : "medium"}
          />
        }
        label={label}
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
