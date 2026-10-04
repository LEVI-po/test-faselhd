"use strict";

async function getStreams(tmdbId, type, season, episode) {
  return [
    {
      name: "FaselHD",
      title: "NEW PROVIDER TEST",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      quality: 1080,
      type: "video"
    }
  ];
}

module.exports = {
  getStreams
};