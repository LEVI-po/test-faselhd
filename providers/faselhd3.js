"use strict";

async function getStreams(tmdbId, type, season, episode) {
  console.log("[TEST] PROVIDER WORKING");

  return [
    {
      name: "FaselHD TEST",
      title: `ID=${tmdbId} TYPE=${type}`,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      quality: 1080,
      type: "video"
    }
  ];
}

module.exports = {
  getStreams
};