const { createClient } = require("@supabase/supabase-js");

// Create a client to connect to your Supabase project
const supabaseUrl = "https://onmcnotmyeildgqtsbwl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubWNub3RteWVpbGRncXRzYndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzNjE0ODEsImV4cCI6MjAxMTkzNzQ4MX0.SN9ZMZxfPFI84rsxCaUVMorkvE51Rv7MSVg7znw5MtA";

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  // Fetch only tutorial videos with 'tutorial' in the tutorial column and their IDs, titles, and URLs
  const { data: tutorialRows, error: tutorialError } = await supabase
    .from("dance_tutorial_videos")
    .select("id, song, url")
    .eq("tutorial", "tutorial")
    .eq("slowed", false)
    .order("date", { ascending: false });
  // .limit(10);

  if (tutorialError) {
    console.error("Error fetching tutorial videos:", tutorialError);
    return;
  }

  // Fetch all dance practice video data: IDs, titles, URLs, date, and artist
  const { data: danceRows, error: danceError } = await supabase
    .from("dance_practice_videos")
    .select("id, date, song, artist, url")
    .or("mirrored.eq.true,mirrored.is.null")
    .order("date", { ascending: false });

  if (danceError) {
    console.error("Error fetching dance practice videos:", danceError);
    return;
  }

  // Check if any dance video title is a substring of a tutorial video title and store the matches
  const matches = [];

  for (const tutorialVideo of tutorialRows) {
    for (const danceVideo of danceRows) {
      // console.log(tutorialVideo.song, danceVideo.song);
      if (
        tutorialVideo.song.toLowerCase().includes(danceVideo.song.toLowerCase())
      ) {
        matches.push({
          tutorial_id: tutorialVideo.id,
          dance_id: danceVideo.id,
          date: danceVideo.date,
          song: danceVideo.song,
          artist: danceVideo.artist,
          dance_url: danceVideo.url,
          tutorial_url: tutorialVideo.url,
        });
        break;
      }
    }
  }

  const consolidatedMatches = {};
  for (const match of matches) {
    if (!consolidatedMatches[match.song]) {
      consolidatedMatches[match.song] = {
        date: match.date,
        song: match.song,
        artist: match.artist,
        dance_video: match.dance_id,
        dance_url: match.dance_url,
        tutorial_video_1: match.tutorial_id,
        tutorial_urls: [match.tutorial_url],
      };
    } else {
      consolidatedMatches[match.song].tutorial_video_2 = match.tutorial_id;
      consolidatedMatches[match.song].tutorial_urls.unshift(match.tutorial_url);
    }
  }

  // Insert matched data into the new table
  const consolidatedArray = Object.values(consolidatedMatches);

  // Insert matched data into the new table
  const { error: insertError } = await supabase
    .from("dances")
    .insert(consolidatedArray);

  if (insertError) {
    console.error("Error inserting matched data:", insertError);
    return;
  }

  console.log("Matched data inserted successfully.");
})();
