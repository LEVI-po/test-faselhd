"use strict"

const BASE_URL = "https://www.faselhds.biz";

async function getStreams(tmdbId, type, season, episode) {
  try {
    // الحصول على اسم الفيلم من Cinemeta
    const metaUrl =
      `https://v3-cinemeta.strem.io/meta/movie/${tmdbId}.json`;

    const metaResponse = await fetch(metaUrl);

    if (!metaResponse.ok) {
      console.log("[FaselHD] Cinemeta error:", metaResponse.status);
      return [];
    }

    const meta = await metaResponse.json();
    const title = meta?.meta?.name;

    console.log("[FaselHD] TITLE:", title);

    if (!title) {
      return [];
    }

    // البحث في FaselHD
    const searchUrl =
      `${BASE_URL}/?s=${encodeURIComponent(title)}`;

    console.log("[FaselHD] SEARCH:", searchUrl);

    const response = await fetch(searchUrl);

    console.log("[FaselHD] HTTP:", response.status);

    if (!response.ok) {
      return [];
    }

    const html = await response.text();

    console.log("[FaselHD] HTML:", html.length);

    // اختبار فقط: إذا وصلنا لصفحة البحث
    return [
      {
        name: "FaselHD",
        title: `FOUND: ${title}`,
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        quality: 1080,
        type: "video"
      }
    ];

  } catch (e) {
    console.log("[FaselHD] ERROR:", String(e));
    return [];
  }
}

module.exports = {
  getStreams
};