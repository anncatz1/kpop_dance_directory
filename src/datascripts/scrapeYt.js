const { createClient } = require("@supabase/supabase-js");

// Create a client to connect to your Supabase project
const supabaseUrl = "https://onmcnotmyeildgqtsbwl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubWNub3RteWVpbGRncXRzYndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzNjE0ODEsImV4cCI6MjAxMTkzNzQ4MX0.SN9ZMZxfPFI84rsxCaUVMorkvE51Rv7MSVg7znw5MtA";

const supabase = createClient(supabaseUrl, supabaseKey);

const axios = require("axios");

async function getVideos(channelId, apiKey, pageToken) {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=50`;
    // const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&pageToken=${pageToken}&part=snippet,id&order=date&maxResults=50`;
    const response = await axios.get(url);
    const nextPageToken = response.data.nextPageToken;
    const videos = response.data.items.map((item) => ({
      title: item.snippet.title,
      videoId: item.id.videoId,
      publishedAt: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails.high,
    }));

    // Insert video data into Supabase
    const { data, error } = await supabase
      .from("dance_tutorial_videos_duplicate")
      .insert(videos)
      .select();

    if (error) {
      throw error;
    }

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

// const channelID = "UC2V-OGycOYuUrKGmgrlVdoA" //leia
const channelId = "UCxFPHT6xj7xmgTkf-vzXylQ"; // Replace with Savage Angel's channel ID
// const apiKey = "AIzaSyAwiaOXMA1Ka7ztm5b1ATb0N3OxmUMan5c"; // Replace with your YouTube Data API key
const apiKey = "AIzaSyBYNfYVM524sjTa3B19sib5thoM2yZKTPQ";
const nextPageToken = "CDIQAA";
// getVideos(channelId, apiKey);
getVideos(channelId, apiKey, nextPageToken);
