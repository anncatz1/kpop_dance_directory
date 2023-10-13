const { createClient } = require("@supabase/supabase-js");

// Create a client to connect to your Supabase project
const supabaseUrl = "https://onmcnotmyeildgqtsbwl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubWNub3RteWVpbGRncXRzYndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzNjE0ODEsImV4cCI6MjAxMTkzNzQ4MX0.SN9ZMZxfPFI84rsxCaUVMorkvE51Rv7MSVg7znw5MtA";

const supabase = createClient(supabaseUrl, supabaseKey);

const axios = require("axios");

function extractBetweenQuotes(title) {
  const matches = title.match(
    /‘([^’]+)’|`([^`]+)`|'([^']+)'|“([^”]+)”|"([^"]+)"/
  );
  return matches
    ? matches[1] || matches[2] || matches[3] || matches[4] || matches[5]
    : null;
}

async function getVideos(channelId, apiKey, pageToken) {
  try {
    // const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=id%2Csnippet&playlistId=${playlistId}&key=${apiKey}&maxResults=50`;
    // const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50`;
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&pageToken=${pageToken}&part=snippet,id&order=date&maxResults=50`;
    const response = await axios.get(url);
    const nextPageToken = response.data.nextPageToken;
    const videos = response.data.items.map((item) => ({
      title: item.snippet.title,
      videoId: item.videoId,
      date: item.snippet.publishedAt,
      url: "https://www.youtube.com/watch?v=" + item.snippet.videoId,
      // difficulty: "beginner",
      song: extractBetweenQuotes(item.snippet.title),
    }));

    console.log(videos);
    // Insert video data into Supabase
    // const { data, error } = await supabase
    //   .from("dance_tutorial_videos_duplicate")
    //   .insert(videos)
    //   .select();

    // if (error) {
    //   throw error;
    // }

    // console.log(videos);
    console.log(nextPageToken);
    // if (
    //   nextPageToken !== "undefined" &&
    //   nextPageToken !== "undefined HTTP/1.1\r\n"
    // )
    //   getVideos(channelId, apiKey, nextPageToken);
  } catch (error) {
    console.error("Error:", error);
  }
}

// const channelId = "UC2V-OGycOYuUrKGmgrlVdoA"; //leia
// const playlistId = "PLkTUiSDs560YcFVPZwWMbWcktTr43bEKB"; //hard-intermediate
// const playlistId = "PLkTUiSDs560ZuShD2wZ6pJq3tkHdd8iAB"; //advanced
// const playlistId = "PLkTUiSDs560bJ7rrn78Z3OG60oWEzv512"; //intermediate
// const playlistId = "PLkTUiSDs560b8beFMQftfUfOFJE_j3P6G"; //beginner
const channelId = "UCxFPHT6xj7xmgTkf-vzXylQ"; // Savage Angel's channel ID
// const apiKey = "AIzaSyAwiaOXMA1Ka7ztm5b1ATb0N3OxmUMan5c"; // Replace with your YouTube Data API key
const apiKey = "AIzaSyBYNfYVM524sjTa3B19sib5thoM2yZKTPQ";
const nextPageToken = "CN4CEAA";
//   "EAAaKVBUOkNESWlFRUl3UlVGRlFrUkdSVEkxTUVRMU9UTW9BVEN3eVpDcEJn";
// getVideos(channelId, apiKey);
getVideos(channelId, apiKey, nextPageToken);
