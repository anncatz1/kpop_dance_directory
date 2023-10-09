const { createClient } = require("@supabase/supabase-js");

// Create a client to connect to your Supabase project
const supabaseUrl = "https://onmcnotmyeildgqtsbwl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubWNub3RteWVpbGRncXRzYndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzNjE0ODEsImV4cCI6MjAxMTkzNzQ4MX0.SN9ZMZxfPFI84rsxCaUVMorkvE51Rv7MSVg7znw5MtA";

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  // Fetch only tutorial videos with 'tutorial' in the tutorial column and their IDs, titles, and URLs
  const { data: tutorialRowsNorm, error: tutorialError1 } = await supabase
    .from("dance_tutorial_videos")
    .select("id, song, url")
    .eq("tutorial", "tutorial")
    .eq("slowed", false)
    .order("date", { ascending: false });

  const { data: tutorialRowsSlow, error: tutorialError2 } = await supabase
    .from("dance_tutorial_videos_duplicate")
    .select("id, song, url, difficulty")
    .eq("slowed", true)
    .order("date", { ascending: false });

  if (tutorialError1 || tutorialError2) {
    console.error("Error fetching tutorial videos:", tutorialError1);
    return;
  }

  // Fetch all dance practice video data: IDs, titles, URLs, date, and artist
  const { data: danceRows, error: danceError } = await supabase
    .from("dance_practice_videos")
    .select("id, date, song, artist, url, mirrored")
    // .or("mirrored.eq.true,mirrored.is.null")
    .order("date", { ascending: false });

  if (danceError) {
    console.error("Error fetching dance practice videos:", danceError);
    return;
  }

  // Check if any dance video title is a substring of a tutorial video title and store the matches
  const matches = [];

  for (const tutorialVideo of tutorialRowsNorm) {
    for (const danceVideo of danceRows) {
      // console.log(tutorialVideo.song, danceVideo.song);
      if (
        tutorialVideo.song.toLowerCase() === danceVideo.song.toLowerCase() &&
        danceVideo.mirrored === true
      ) {
        matches.push({
          // tutorial_id: tutorialVideo.id,
          // dance_id: danceVideo.id,
          date: danceVideo.date,
          song: danceVideo.song,
          artist: tutorialVideo.artist,
          dance_url: danceVideo.url,
          tutorial_url: tutorialVideo.url,
        });
      }
      // if (
      //   tutorialVideo.song.toLowerCase() === danceVideo.song.toLowerCase() &&
      //   danceVideo.mirrored === true
      // ) {
      //   matches.push({
      //     // tutorial_id: tutorialVideo.id,
      //     // dance_id: danceVideo.id,
      //     date: danceVideo.date,
      //     song: danceVideo.song,
      //     artist: danceVideo.artist,
      //     mirrored_dance_url: danceVideo.url,
      //     tutorial_url: tutorialVideo.url,
      //   });
      // }
    }
  }

  // console.log(tutorialRowsSlow);
  // console.log(danceRows);
  const matches2 = [];
  for (const tutorialVideo of tutorialRowsSlow) {
    for (const danceVideo of danceRows) {
      // console.log(tutorialVideo.song, danceVideo.song);
      if (
        tutorialVideo.song.toLowerCase() === danceVideo.song.toLowerCase() &&
        danceVideo.mirrored === true
      ) {
        matches2.push({
          // tutorial_id: tutorialVideo.id,
          // dance_id: danceVideo.id,
          date: danceVideo.date,
          song: danceVideo.song,
          artist: danceVideo.artist,
          dance_url: danceVideo.url,
          tutorial_slow_url: tutorialVideo.url,
          difficulty: tutorialVideo.difficulty,
        });
        // console.log(tutorialVideo.difficulty);
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
        dance_url: match.dance_url,
        tutorial_urls: [match.tutorial_url],
      };

      // if (match.mirrored === true) {
      //   consolidatedMatches[match.song].mirrored_dance_url =
      //     match.mirrored_dance_url;
      // } else {
      //   consolidatedMatches[match.song].dance_url = match.dance_url;
      // }
    } else {
      consolidatedMatches[match.song].tutorial_urls.unshift(match.tutorial_url);
    }
  }

  for (const match of matches2) {
    if (consolidatedMatches[match.song]) {
      consolidatedMatches[match.song].tutorial_slow_url =
        match.tutorial_slow_url;
      // console.log(match.difficulty);
      consolidatedMatches[match.song].difficulty = match.difficulty;
    } else {
      consolidatedMatches[match.song] = {
        date: match.date,
        song: match.song,
        artist: match.artist,
        dance_url: match.dance_url,
        tutorial_slow_url: match.tutorial_slow_url,
      };
    }
  }

  // Insert matched data into the new table
  const consolidatedArray = Object.values(consolidatedMatches);
  // console.log(consolidatedArray);

  // Insert matched data into the new table
  const { error: insertError } = await supabase
    .from("dances_duplicate")
    .insert(consolidatedArray);

  if (insertError) {
    console.error("Error inserting matched data:", insertError);
    return;
  }

  console.log("Matched data inserted successfully.");
})();
