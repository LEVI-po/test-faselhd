"use strict";

const BASE_URL = "https://faselhd.club";

async function getStreams(tmdbId, type, season, episode) {
  try {
    console.log("[FaselHD] START:", tmdbId, type);

    const response = await fetch(BASE_URL);

    console.log("[FaselHD] STATUS:", response.status);

    const html = await response.text();

    console.log("[FaselHD] HTML LENGTH:", html.length);

    return [
      {
        name: "FaselHD",
        title: `FaselHD CONNECTED (${response.status})`,
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        quality: 1080,
        type: "video"
      }
    ];
  } catch (error) {
    console.log("[FaselHD] ERROR:", String(error));
    return [];
  }
}

module.exports = {
  getStreams
};