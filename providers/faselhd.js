"use strict";

const BASE_URL = "https://www.faselhds.biz";

async function getStreams(tmdbId, type, season, episode) {
  console.log("[FaselHD] START");
  console.log("[FaselHD] TMDB:", tmdbId);
  console.log("[FaselHD] TYPE:", type);

  try {
    const url = `${BASE_URL}/?s=test`;

    const response = await fetch(url);

    console.log("[FaselHD] HTTP:", response.status);

    if (!response.ok) {
      return [];
    }

    const html = await response.text();

    console.log("[FaselHD] HTML:", html.length);

    return [
      {
        name: "FaselHD TEST",
        title: "FaselHD connection OK",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        quality: 1080,
        type: "video"
      }
    ];
  } catch (error) {
    console.log("[FaselHD] ERROR:", error.message);
    return [];
  }
}

module.exports = {
  getStreams
};