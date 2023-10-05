const { createClient } = require("@supabase/supabase-js");

// Create a client to connect to your Supabase project
const supabaseUrl = "https://onmcnotmyeildgqtsbwl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubWNub3RteWVpbGRncXRzYndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYzNjE0ODEsImV4cCI6MjAxMTkzNzQ4MX0.SN9ZMZxfPFI84rsxCaUVMorkvE51Rv7MSVg7znw5MtA";

const supabase = createClient(supabaseUrl, supabaseKey);

// add tutorial/cover
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

// add url to tutorials
// (async () => {
//   // Fetch all rows from the table
//   const { data: rows, error } = await supabase
//     .from("dance_tutorial_videos")
//     .select("id, videoId");

//   if (error) {
//     console.error("Error fetching data:", error);
//     return;
//   }

//   for (const row of rows) {
//     const url = "https://www.youtube.com/watch?v=" + row.videoId;
//     // Update the row to have "tutorial" in the tutorial column
//     await supabase
//       .from("dance_tutorial_videos")
//       .update({ url: url })
//       .eq("id", row.id);
//   }
// })();

// change quotes
// function decodeHtmlEntities(str) {
//   return str.replace(/&#39;|&quot;/g, (match) => {
//     if (match === "&#39;" || match === "&quot;") return "'";
//     // if (match === "&quot;") return '"';
//   });
// }

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
//     if (row.title.includes("&#39;") || row.title.includes("&quot;")) {
//       // Update the row to have "tutorial" in the tutorial column
//       await supabase
//         .from("dance_tutorial_videos")
//         .update({ title: decodeHtmlEntities(row.title) })
//         .eq("id", row.id);
//     }
//   }
// })();

// slowed = true
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
//     if (row.title.toLowerCase().includes("slow")) {
//       // Update the row to have "tutorial" in the tutorial column
//       await supabase
//         .from("dance_tutorial_videos")
//         .update({ slowed: true })
//         .eq("id", row.id);
//     } else {
//       // Update the row to have "cover" in the tutorial column
//       await supabase
//         .from("dance_tutorial_videos")
//         .update({ slowed: false })
//         .eq("id", row.id);
//     }
//   }
// })();

function extractBetweenQuotes(title) {
  const matches = title.match(
    /‘([^’]+)’|`([^`]+)`|'([^']+)'|“([^”]+)”|"([^"]+)"/
  );
  return matches
    ? matches[1] || matches[2] || matches[3] || matches[4] || matches[5]
    : null;
}

// function extractBetweenQuotes(title) {
//   const matches = title.match(
//     /‘([^’]+)’|`([^`]+)`|'([^']+)'|“([^”]+)”|"([^"]+)"|_([^_-]+)-|-([^-\s]+)-/
//   );
//   return matches
//     ? matches[1] ||
//         matches[2] ||
//         matches[3] ||
//         matches[4] ||
//         matches[5] ||
//         matches[6] ||
//         matches[7]
//     : null;
// }

// update song title
(async () => {
  // Fetch all rows from the table
  const { data: rows, error } = await supabase
    .from("dance_tutorial_videos")
    .select("id, title");

  if (error) {
    console.error("Error fetching data:", error);
    return;
  }

  for (const row of rows) {
    const newTitle = extractBetweenQuotes(row.title);
    // console.log(newTitle);
    // Update the row to have "tutorial" in the tutorial column
    await supabase
      .from("dance_tutorial_videos")
      .update({ song: newTitle })
      .eq("id", row.id);
  }
})();
