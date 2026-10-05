"use strict";

async function getStreams(tmdbId, type, season, episode) {
  return [
    {
      name: "Authorized Source",
      title: `ID=${tmdbId} | TYPE=${type} | S=${season} | E=${episode}`,
      url: "https://stream.foupix.com:8443/animeios/1405893794/dragons_riders_of_berk_01.mp4/index.m3u8?tkn=238ee00ed28c9b7c5e953805dcaa43c0&tms=1791184936&ua=a841d58c1d77dfaeb2fc4787aa814c92&ips=143c3121090be24981e1c85e00e18a68&v=1791163336",
      quality: 360,
      type: "video"
    }
  ];
}

module.exports = {
  getStreams
};