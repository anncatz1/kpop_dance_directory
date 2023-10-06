import { useSearchParams } from "react-router-dom";
import { FormGroup, FormControlLabel, Switch } from "@mui/material";

function SwitchButton({ filterField, label }) {
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
          />
        }
        label={label}
      />
    </FormGroup>
  );
}

export default SwitchButton;
