import { useSearchParams } from "react-router-dom";
import Select2 from "./Select2";

function FilterBySelect({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("artist") || "";

  function handleChange(e) {
    searchParams.set("artist", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select2
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
      field={"Name"}
    />
  );
}

export default FilterBySelect;
