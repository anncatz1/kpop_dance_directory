import { useSearchParams } from "react-router-dom";
import StyledSelect from "./StyledSelect";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort") || "";

  function handleChange(e) {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <StyledSelect
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
      field={"value"}
      label={"Sort By"}
    />
  );
}

export default SortBy;
