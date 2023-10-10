const { createClient } = require("@supabase/supabase-js");
// const fetch = require("node-fetch");

const supabaseUrl = "https://onmcnotmyeildgqtsbwl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubWNub3RteWVpbGRncXRzYndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzNjE0ODEsImV4cCI6MjAxMTkzNzQ4MX0.SN9ZMZxfPFI84rsxCaUVMorkvE51Rv7MSVg7znw5MtA";
const supabase = createClient(supabaseUrl, supabaseKey);

// function extractBetweenQuotes(title) {
//   const matches = title.match(
//     /`([^`]+)`|'([^']+)'|“([^”]+)”|’([^’]+)’|"([^"]+)"/
//   );
//   return matches
//     ? matches[1] || matches[2] || matches[3] || matches[4] || matches[5]
//     : null;
// }

async function searchYouTube(query) {
  const query1 = query + "Dance Practice";
  // const API_KEY = "AIzaSyAwiaOXMA1Ka7ztm5b1ATb0N3OxmUMan5c";
  const API_KEY = "AIzaSyBYNfYVM524sjTa3B19sib5thoM2yZKTPQ";
  // const API_KEY = "AIzaSyCXI3RoHHsZmOkn3-jXcEfEOMQI9YYni8I";
  const BASE_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
    query1
  )}&key=${API_KEY}`;

  const response = await fetch(BASE_URL);
  const data = await response.json();

  if (!data) return;

  const video = {
    videoId: data.items?.at(0).id.videoId,
    videoTitle: data.items?.at(0).snippet.title,
    song: query,
    url: "https://www.youtube.com/watch?v=" + data.items?.at(0).id.videoId,
    date: data.items?.at(0).snippet.publishedAt,
    channel: data.items?.at(0).snippet.channelTitle,
    mirrored: false,
  };

  // mirrored
  const query2 = query + "Dance Practice Mirrored";
  const BASE_URL2 = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
    query2
  )}&key=${API_KEY}`;

  const response2 = await fetch(BASE_URL2);
  const data2 = await response2.json();

  if (!data2) return;

  const video2 = {
    videoId: data2.items?.at(0).id.videoId,
    videoTitle: data2.items?.at(0).snippet.title,
    song: query,
    url: "https://www.youtube.com/watch?v=" + data2.items?.at(0).id.videoId,
    date: data2.items?.at(0).snippet.publishedAt,
    channel: data2.items?.at(0).snippet.channelTitle,
    mirrored: true,
  };
  if (data.items?.at(0).id.videoId == null) return [];
  return [video, video2];
}

// Loop through tutorial entries
async function processTutorials() {
  const { data: tutorials, error: tutorialError } = await supabase
    .from("dance_tutorial_videos")
    .select("id, date, song")
    .eq("slowed", false)
    .order("date", { ascending: false })
    .lt("date", "05/25/2018");

  if (tutorialError) {
    console.error("Error fetching tutorial videos:", tutorialError);
    //   return;
  }

  for (const tutorial of tutorials) {
    const query = tutorial.song;

    if (query) {
      const result = await searchYouTube(query);
      // console.log(query, result);

      if (result.length === 0) return;
      // Do something with the results, e.g., insert into your database
      //   console.log(result);
      addToDatabase(result, query);
    }
  }
}

processTutorials();

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
