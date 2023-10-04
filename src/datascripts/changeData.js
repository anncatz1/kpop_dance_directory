const { createClient } = require("@supabase/supabase-js");

// Create a client to connect to your Supabase project
const supabaseUrl = "https://onmcnotmyeildgqtsbwl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubWNub3RteWVpbGRncXRzYndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzNjE0ODEsImV4cCI6MjAxMTkzNzQ4MX0.SN9ZMZxfPFI84rsxCaUVMorkvE51Rv7MSVg7znw5MtA";

const supabase = createClient(supabaseUrl, supabaseKey);

// (async () => {
//   // Fetch all rows from the table
//   const { data: rows, error } = await supabase
//     .from("dance_tutorial_videos")
//     .select("id, title");

//   if (error) {
//     console.error("Error fetching data:", error);
//     return;
//   }

//   for (const row of rows) {
//     if (row.title.toLowerCase().includes("tutorial")) {
//       // Update the row to have "tutorial" in the tutorial column
//       await supabase
//         .from("dance_tutorial_videos")
//         .update({ url: "tutorial" })
//         .eq("id", row.id);
//     } else {
//       // Update the row to have "cover" in the tutorial column
//       await supabase
//         .from("dance_tutorial_videos")
//         .update({ tutorial: "cover" })
//         .eq("id", row.id);
//     }
//   }
// })();

(async () => {
  // Fetch all rows from the table
  const { data: rows, error } = await supabase
    .from("dance_tutorial_videos")
    .select("id, videoId");

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  for (const row of rows) {
    const url = "https://www.youtube.com/watch?v=" + row.videoId;
    // Update the row to have "tutorial" in the tutorial column
    await supabase
      .from("dance_tutorial_videos")
      .update({ url: url })
      .eq("id", row.id);
  }
})();
