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

  const { data: tutorialRowsSlow, error: tutorialError3 } = await supabase
    .from("dance_tutorial_videos_duplicate")
    .select("id, song, url, difficulty")
    .eq("slowed", true)
    .order("date", { ascending: false });

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
      if (tutorialVideo.song.toLowerCase() === danceVideo.song.toLowerCase()) {
        matches.push({
          // tutorial_id: tutorialVideo.id,
          // dance_id: danceVideo.id,
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
        // dance_video: match.dance_id,
        dance_url: match.dance_url,
        // tutorial_video_1: match.tutorial_id,
        tutorial_urls: [match.tutorial_url],
      };
    } else {
      // consolidatedMatches[match.song].tutorial_video_2 = match.tutorial_id;
      consolidatedMatches[match.song].tutorial_urls.unshift(match.tutorial_url);
    }

    for (const row of tutorialRowsSlow) {
      if (
        match.song.toLowerCase().includes(row.song.toLowerCase()) ||
        row.song.toLowerCase().includes(match.song.toLowerCase())
      ) {
        consolidatedMatches[match.song].tutorial_slow_url = row.url;
        consolidatedMatches[match.song].difficulty = row.difficulty;
      }
    }
  }

  // Insert matched data into the new table
  const consolidatedArray = Object.values(consolidatedMatches);

  for (const item of consolidatedArray) {
    const { data, error } = await supabase
      .from("dances_duplicate")
      .select("song")
      .ilike("song", item.song)
      .limit(1);

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    if (data && data.length === 0) {
      // Step 2: If no record with the given title exists, insert the new record
      // console.log(title, videos);

      const { insertError } = await supabase
        .from("dances_duplicate")
        .insert(item);

      if (insertError) {
        console.error("Error inserting data:", insertError);
      } else {
        console.log(item, "Data inserted successfully");
      }
    } else {
      console.log(item.song, "Record with the same title already exists");
    }
  }
})();
