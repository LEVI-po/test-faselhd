"use strict";

async function getStreams(tmdbId, type, season, episode) {
  return [
    {
      name: "Video",
      title: `Video - 720" ,
      url: "https://strm4.uqload.vc/hls2/02/01750/v4tc47u7a9cl_n/index-v1-a1.m3u8?t=kqZxwkxxifmgj1tckVN4dS8SO2iiUaesfegAU6LU3xg&s=1791165192&e=14400&v=511064&i=0.0&sp=0",
      quality: 720,
      type: "video"
    },
    {
      name: "Arabic Audio",
      title: "Arabic Audio",
      url: "https://www.dimakids.com/audio/1405893794.mp3",
      type: "audio"
    }
  ];
}

module.exports = {
  getStreams
};