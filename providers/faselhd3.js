"use strict";

async function getStreams(tmdbId, type, season, episode) {
  return [
    {
      name: "Authorized Source",
      title: `ID=${tmdbId} | TYPE=${type} | S=${season} | E=${episode}`,
      url: "https://www.dimakids.com/audio/1405893794.mp3",
      quality: 360,
      type: "video"
    }
  ];
}

module.exports = {
  getStreams
};