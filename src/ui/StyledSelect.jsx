import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

function StyledSelect({ options, value, onChange, field, label, ...props }) {
  return (
    <>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="select-label">{label}</InputLabel>
        <Select
          labelId="select-label"
          label={label}
          value={value}
          onChange={onChange}
          {...props}
          // defaultValue={options[0].value}
        >
          {options.map((item) => (
            <MenuItem value={item.value} key={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default StyledSelect;
