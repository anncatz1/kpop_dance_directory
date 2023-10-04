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
    .select("id, title, url")
    .eq("tutorial", "tutorial");

  if (tutorialError) {
    console.error("Error fetching tutorial videos:", tutorialError);
    return;
  }

  // Fetch all dance practice video data: IDs, titles, URLs, date, and artist
  const { data: danceRows, error: danceError } = await supabase
    .from("dance_practice_videos")
    .select("id, title, url, date, artist");

  if (danceError) {
    console.error("Error fetching dance practice videos:", danceError);
    return;
  }

  // Check if any dance video title is a substring of a tutorial video title and store the matches
  const matches = [];

  for (const tutorialVideo of tutorialRows) {
    for (const danceVideo of danceRows) {
      if (tutorialVideo.title.includes(danceVideo.title)) {
        matches.push({
          tutorial_id: tutorialVideo.id,
          dance_id: danceVideo.id,
          date: danceVideo.date,
          title: danceVideo.title,
          artist: danceVideo.artist,
          dance_url: danceVideo.url,
          tutorial_url: tutorialVideo.url,
        });
      }
    }
  }

  const consolidatedMatches = {};
  for (const match of matches) {
    if (!consolidatedMatches[match.title]) {
      consolidatedMatches[match.title] = {
        date: match.date,
        title: match.title,
        artist: match.artist,
        dance_video: match.dance_id,
        dance_url: match.dance_url,
        tutorial_video_1: match.tutorial_id,
        tutorial_urls: [match.tutorial_url],
      };
    } else {
      consolidatedMatches[match.title].tutorial_video_2 = match.tutorial_id;
      consolidatedMatches[match.title].tutorial_urls.push(match.tutorial_url);
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
