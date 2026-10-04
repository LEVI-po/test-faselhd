module.exports = {
  getStreams: async function(tmdbId, type, season, episode) {
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
};