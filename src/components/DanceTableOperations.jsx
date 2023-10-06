import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";
import SwitchButton from "../ui/Switch";

function DanceTableOperations() {
  return (
    <div className="flex items-center gap-6 mb-8">
      <SwitchButton filterField="mirrored" label="Mirrored" />
      <SwitchButton filterField="slowed" label="Slowed" />

      <SortBy
        options={[
          { value: "song-asc", label: "Sort by song title (A-Z)" },
          // { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "artist-asc", label: "Sort by artist (A-Z)" },
          // { value: "regularPrice-desc", label: "Sort by price (high first)" },
          { value: "date-desc", label: "Sort by date (latest first)" },
          { value: "date-asc", label: "Sort by date (earliest first)" },
        ]}
      />
    </div>
  );
}

export default DanceTableOperations;
