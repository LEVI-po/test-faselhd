"use strict";

async function getStreams(tmdbId, type, season, episode) {
  return [
    {
      name: "FaselHD DEBUG",
      title: `ID=${tmdbId} TYPE=${type} S=${season} E=${episode}`,
      url: "https://example.com/test.mp4",
      quality: 1080,
      type: "video"
    }
  ];
}

module.exports = {
  getStreams
};