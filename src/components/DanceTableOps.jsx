import SortBy from "../ui/SortBy";
import SwitchButton from "../ui/Switch";

function DanceTableOps() {
  return (
    <div className="flex items-center gap-6">
      {/* <SwitchButton filterField="mirrored" label="Mirrored" /> */}
      <SwitchButton filterField="slowed" label="Show Slowed Tutorials" />

      <SortBy
        options={[
          { value: "date-desc", label: "Sort by release date (latest first)" },
          { value: "date-asc", label: "Sort by release date (earliest first)" },
          { value: "song-asc", label: "Sort by song title (A-Z)" },
          { value: "song-desc", label: "Sort by song title (Z-A)" },
          { value: "artist-asc", label: "Sort by artist (A-Z)" },
          { value: "artist-desc", label: "Sort by artist (Z-A)" },
          {
            value: "difficulty-asc",
            label: "Sort by difficulty (easiest to hardest)",
          },
          {
            value: "difficulty-desc",
            label: "Sort by difficulty (hardest to easiest)",
          },
        ]}
      />
    </div>
  );
}

export default DanceTableOps;
