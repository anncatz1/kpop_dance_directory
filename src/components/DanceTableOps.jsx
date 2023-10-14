import useMediaQuery from "@mui/material/useMediaQuery";
import SortBy from "../ui/SortBy";
import SwitchButton from "../ui/Switch";

function DanceTableOps() {
  // const isSmallScreen = useMediaQuery("(max-width:500px)");

  return (
    <div className="flex items-center sm:justify-end gap-6 justify-between">
      {/* <SwitchButton filterField="mirrored" label="Mirrored" /> */}
      <SwitchButton
        filterField="slowed"
        // label={isSmallScreen ? "Slowed" : "Show Slowed Tutorials"}
      />

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
            label: "Sort by difficulty (easiest first)",
          },
          {
            value: "difficulty-desc",
            label: "Sort by difficulty (hardest first)",
          },
        ]}
      />
    </div>
  );
}

export default DanceTableOps;
