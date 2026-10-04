"use strict";

const BASE_URL = "https://www.faselhds.biz";

async function getStreams(tmdbId, type, season, episode) {
  try {
    const testUrl = `${BASE_URL}/?s=test`;
    const response = await fetch(testUrl);

    console.log("[FaselHD] HTTP:", response.status);

    if (!response.ok) {
      return [];
    }

    const html = await response.text();

    console.log("[FaselHD] HTML LENGTH:", html.length);

    // نرجع Stream تجريبي فقط إذا الموقع رد
    return [
      {
        name: "FaselHD",
        title: `FaselHD HTTP ${response.status}`,
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        quality: 1080,
        type: "video"
      }
    ];
  } catch (e) {
    console.log("[FaselHD] ERROR:", String(e));
    return [];
  }
}

module.exports = {
  getStreams
};