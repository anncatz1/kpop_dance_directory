const { createClient } = require("@supabase/supabase-js");

// Create a client to connect to your Supabase project
const supabaseUrl = "https://onmcnotmyeildgqtsbwl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubWNub3RteWVpbGRncXRzYndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzNjE0ODEsImV4cCI6MjAxMTkzNzQ4MX0.SN9ZMZxfPFI84rsxCaUVMorkvE51Rv7MSVg7znw5MtA";

const supabase = createClient(supabaseUrl, supabaseKey);

(async () => {
  // Fetch only tutorial videos with 'tutorial' in the tutorial column and their IDs, titles, and URLs
  const { data: tutorialRows, error: tutorialError } = await supabase
    .from("dance_tutorial_videos_kathleen")
    .select("id, song, url, artist")
    .eq("slowed", false)
    .eq("tutorial", "tutorial")
    .order("date", { ascending: false });

  const { data: tutorialRowsSlow, error: tutorialError3 } = await supabase
    .from("dance_tutorial_videos_kathleen")
    .select("id, song, url")
    .eq("slowed", true)
    .eq("tutorial", "tutorial")
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
  let added = false;

  // console.log(tutorialRows);
  for (const tutorialVideo of tutorialRows) {
    // console.log(tutorialVideo.song);
    added = false;
    for (const danceVideo of danceRows) {
      if (tutorialVideo.song.toLowerCase() === danceVideo.song.toLowerCase()) {
        const item = {
          date: danceVideo.date,
          song: danceVideo.song,
          artist: tutorialVideo.artist,
          dance_url: danceVideo.url,
          tutorial_urls: [tutorialVideo.url],
          full_tutorial: "chorus",
        };

        for (const row of tutorialRowsSlow) {
          if (
            tutorialVideo.song.toLowerCase().includes(row.song.toLowerCase()) ||
            row.song.toLowerCase().includes(tutorialVideo.song.toLowerCase())
          ) {
            item.tutorial_slow_url = row.url;
          }
        }

        matches.push(item);
        added = true;
      }
    }
    if (added === false) {
      console.log(tutorialVideo.song);
      const query = { song: tutorialVideo.song, artist: tutorialVideo.artist };
      processTutorials(query);
    }
  }

  // console.log(matches);
  for (const item of matches) {
    const { data, error } = await supabase
      .from("dances_duplicate")
      .select("song, artist")
      .ilike("song", item.song)
      .ilike("artist", item.artist)
      .limit(1);

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    if (data && data.length === 0) {
      // Step 2: If no record with the given title exists, insert the new record
      // console.log(title, videos);
      const { data: videos, error } = await supabase
        .from("dances_duplicate")
        .insert(item);

      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log(item, "Data inserted successfully");
      }
      // console.log("insert", item);
    } else {
      console.log(item.song, "Record with the same title already exists");
    }
  }
})();

async function searchYouTube(query) {
  // const query1 = query + "Dance Practice";
  // const API_KEY = "AIzaSyAwiaOXMA1Ka7ztm5b1ATb0N3OxmUMan5c";
  const query1 = query.song;
  // const API_KEY = "AIzaSyBYNfYVM524sjTa3B19sib5thoM2yZKTPQ";
  const API_KEY = "AIzaSyCXI3RoHHsZmOkn3-jXcEfEOMQI9YYni8I";

  // mirrored
  const query2 = query1 + "Dance Practice Mirrored";
  const BASE_URL2 = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
    query2
  )}&key=${API_KEY}`;

  const response2 = await fetch(BASE_URL2);
  const data2 = await response2.json();

  if (!data2) return;

  const video2 = {
    videoId: data2.items?.at(0).id.videoId,
    videoTitle: data2.items?.at(0).snippet.title,
    song: query.song,
    artist: query.artist,
    url: "https://www.youtube.com/watch?v=" + data2.items?.at(0).id.videoId,
    date: data2.items?.at(0).snippet.publishedAt,
    channel: data2.items?.at(0).snippet.channelTitle,
    mirrored: true,
  };

  console.log(video2);
  if (data2.items?.at(0).id.videoId == null) return [];
  return [video2];
}

// Loop through tutorial entries
async function processTutorials(query) {
  // const { data: tutorials, error: tutorialError } = await supabase
  //   .from("dance_tutorial_videos")
  //   .select("id, date, song")
  //   .eq("tutorial", "tutorial")
  //   .order("date", { ascending: false })
  //   .lt("date", "10/01/2017");

  // if (tutorialError) {
  //   console.error("Error fetching tutorial videos:", tutorialError);
  //   //   return;
  // }

  // const queries = ["LIAR LIAR"];
  // for (const tutorial of tutorials) {
  // const query = tutorial.song;

  if (query) {
    const result = await searchYouTube(query);
    // console.log(query, result);

    if (result.length === 0) return;
    // Do something with the results, e.g., insert into your database
    //   console.log(result);
    addToDatabase(result, query.song);
  }
  // }
}

// processTutorials();

// add to database
async function addToDatabase(videos, title) {
  console.log(title, videos);
  if (!videos || videos.length === 0) return;

  const { data, error } = await supabase
    .from("dance_practice_videos")
    .select("song")
    .ilike("song", title)
    .limit(1);

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  if (data && data.length === 0) {
    // Step 2: If no record with the given title exists, insert the new record
    // console.log(title, videos);

    const { insertError } = await supabase
      .from("dance_practice_videos")
      .insert(videos);

    if (insertError) {
      console.error("Error inserting data:", insertError);
    } else {
      console.log("Data inserted successfully");
    }
  } else {
    console.log("Record with the same title already exists");
  }
}
