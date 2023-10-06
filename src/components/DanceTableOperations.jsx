// import TableOperations from "../../ui/TableOperations";
import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";

// display: flex;
// align-items: center;
// gap: 1.6rem;
function DanceTableOperations() {
  return (
    <div className="flex items-center gap-6 mb-8">
      <Filter
        filterField={"type"}
        options={[
          { value: "all", label: "All" },
          { value: "mirrored", label: "Mirrored" },
          { value: "slowed", label: "Slowed" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by song title (A-Z)" },
          // { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by artist (A-Z)" },
          // { value: "regularPrice-desc", label: "Sort by price (high first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low first)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (high first)" },
        ]}
      />
    </div>
  );
}

export default DanceTableOperations;
