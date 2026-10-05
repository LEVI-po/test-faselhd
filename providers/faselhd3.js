"use strict";

async function getStreams(tmdbId, type, season, episode) {
  return [
    {
      name: "Video",
      title: `Video - ${quality}`,
      url: "YOUR_VIDEO_M3U8_URL",
      quality: 360,
      type: "video"
    },
    {
      name: "Arabic Audio",
      title: "Arabic Audio",
      url: "YOUR_ARABIC_AUDIO_MP3",
      type: "audio"
    }
  ];
}

module.exports = {
  getStreams
};