"use strict";

async function getStreams(tmdbId, type, season, episode) {
  return [
    {
      name: "Authorized Source",
      title: `ID=${tmdbId} | TYPE=${type} | S=${season} | E=${episode}`,
      url: "https://fastvid.cam/stream/fOCjbgY3ksKpulVK-c9DOw/hjkrhuihghfvu/1791204691/36067988/index-f3-v1-a1.m3u8",
      quality: 360,
      type: "video"
    }
  ];
}

module.exports = {
  getStreams
};