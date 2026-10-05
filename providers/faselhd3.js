"use strict";

async function getStreams(tmdbId, type, season, episode) {
  return [
    {
      name: "Authorized Source",
      title: `ID=${tmdbId} | TYPE=${type} | S=${season} | E=${episode}`,
      url: https://strm4.uqload.vc/hls2/02/01750/v4tc47u7a9cl_n/index-v1-a1.m3u8?t=rDuTIRRWuK_RX_BN2Zh0RTo-jhNbwroBOsiUqzJjgkQ&s=1791162427&e=14400&v=511064&i=0.0&sp=0
      quality: 360,
      type: "video"
    }
  ];
}

module.exports = {
  getStreams
};