"use strict";

async function getStreams(tmdbId, type, season, episode) {
  console.log("[FaselHD TEST] CALLED");
  console.log("[FaselHD TEST] ID:", tmdbId);
  console.log("[FaselHD TEST] TYPE:", type);

  return [
    {
      name: "FaselHD TEST",
      title: "TEST STREAM",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      quality: 1080,
      type: "video"
    }
  ];
}

module.exports = {
  getStreams
};