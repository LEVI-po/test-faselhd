"use strict";

const BASE_URL = "https://www.faselhds.biz";
const ALT_URL = "https://faselhd.club";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
  "AppleWebKit/537.36 (KHTML, like Gecko) " +
  "Chrome/140.0.0.0 Safari/537.36";

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "User-Agent": UA,
      "Accept":
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      ...(options.headers || {})
    }
  });

  return {
    ok: response.ok,
    status: response.status,
    url: response.url,
    text: await response.text()
  };
}

function absoluteUrl(base, url) {
  try {
    return new URL(url, base).href;
  } catch {
    return url;
  }
}

function clean(text) {
  return String(text || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function getTitle(tmdbId, type) {
  /*
   * Nuvio normally gives us the TMDB id.
   * Cinemeta gives us the title without requiring
   * a TMDB API key.
   */

  const kind =
    type === "movie"
      ? "movie"
      : "tv";

  const url =
    `https://v3-cinemeta.strem.io/meta/${kind}/${tmdbId}.json`;

  console.log("[FaselHD] Cinemeta:", url);

  const result = await request(url);

  if (!result.ok) {
    throw new Error(
      `Cinemeta HTTP ${result.status}`
    );
  }

  const data = JSON.parse(result.text);

  return {
    title: data?.meta?.name || "",
    year:
      data?.meta?.releaseInfo?.match(/\d{4}/)?.[0] || ""
  };
}

function extractSearchResults(html, base) {
  const results = [];

  const regex =
    /<a[^>]+href=["']([^"']+)["'][^>]*>[\s\S]*?<\/a>/gi;

  let match;

  while ((match = regex.exec(html))) {
    const href = absoluteUrl(base, match[1]);

    if (!href) continue;

    const block = match[0];

    const text = clean(block);

    if (!text) continue;

    results.push({
      url: href,
      title: text
    });
  }

  return results;
}

async function search(site, title) {
  const url =
    `${site}/?s=${encodeURIComponent(title)}`;

  console.log("[FaselHD] Search:", url);

  const result = await request(url);

  console.log(
    "[FaselHD] Search HTTP:",
    result.status
  );

  if (!result.ok) {
    return [];
  }

  if (
    result.text.includes("Just a moment") ||
    result.text.includes("cf-chl")
  ) {
    console.log(
      "[FaselHD] Cloudflare/challenge detected"
    );

    return [];
  }

  return extractSearchResults(
    result.text,
    site
  );
}

function chooseResult(results, title) {
  const wanted =
    title.toLowerCase().trim();

  let best = null;
  let score = -1;

  for (const item of results) {
    const current =
      item.title.toLowerCase();

    let s = 0;

    if (current === wanted) {
      s = 100;
    } else if (
      current.includes(wanted)
    ) {
      s = 80;
    } else if (
      wanted.includes(current)
    ) {
      s = 60;
    }

    if (s > score) {
      score = s;
      best = item;
    }
  }

  return best;
}

function findEpisode(
  html,
  base,
  episode
) {
  const regex =
    /<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;

  const wanted =
    String(episode);

  let match;

  while ((match = regex.exec(html))) {
    const text =
      clean(match[2]);

    const numbers =
      text.match(/\d+/g) || [];

    if (
      numbers.includes(wanted)
    ) {
      return absoluteUrl(
        base,
        match[1]
      );
    }
  }

  return null;
}

function findDownloadPage(
  html,
  base
) {
  const match =
    html.match(
      /class=["'][^"']*downloadLinks[^"']*["'][\s\S]*?<a[^>]+href=["']([^"']+)["']/i
    );

  if (!match) {
    return null;
  }

  return absoluteUrl(
    base,
    match[1]
  );
}

async function resolveDownload(
  url,
  site
) {
  console.log(
    "[FaselHD] POST:",
    url
  );

  const result =
    await request(url, {
      method: "POST",
      headers: {
        Referer: site,
        Origin: site
      }
    });

  console.log(
    "[FaselHD] Download HTTP:",
    result.status
  );

  if (!result.ok) {
    return null;
  }

  const match =
    result.text.match(
      /class=["'][^"']*dl-link[^"']*["'][\s\S]*?<a[^>]+href=["']([^"']+)["']/i
    );

  if (!match) {
    console.log(
      "[FaselHD] Direct link not found"
    );

    return null;
  }

  return absoluteUrl(
    site,
    match[1]
  );
}

async function getStreams(
  tmdbId,
  type,
  season,
  episode
) {
  console.log(
    "[FaselHD] =================="
  );

  console.log(
    "[FaselHD] ID:",
    tmdbId
  );

  console.log(
    "[FaselHD] Type:",
    type
  );

  console.log(
    "[FaselHD] Season:",
    season
  );

  console.log(
    "[FaselHD] Episode:",
    episode
  );

  try {
    const info =
      await getTitle(
        tmdbId,
        type
      );

    if (!info.title) {
      console.log(
        "[FaselHD] No title"
      );

      return [];
    }

    console.log(
      "[FaselHD] Title:",
      info.title
    );

    let site = BASE_URL;

    let results =
      await search(
        site,
        info.title
      );

    if (!results.length) {
      site = ALT_URL;

      results =
        await search(
          site,
          info.title
        );
    }

    if (!results.length) {
      console.log(
        "[FaselHD] No search results"
      );

      return [];
    }

    const selected =
      chooseResult(
        results,
        info.title
      );

    if (!selected) {
      return [];
    }

    console.log(
      "[FaselHD] Selected:",
      selected.title
    );

    console.log(
      "[FaselHD] URL:",
      selected.url
    );

    const page =
      await request(
        selected.url
      );

    if (!page.ok) {
      return [];
    }

    let targetUrl =
      selected.url;

    if (type !== "movie") {
      targetUrl =
        findEpisode(
          page.text,
          site,
          episode || 1
        );

      if (!targetUrl) {
        console.log(
          "[FaselHD] Episode not found"
        );

        return [];
      }

      console.log(
        "[FaselHD] Episode URL:",
        targetUrl
      );
    }

    let episodeHtml =
      page.text;

    if (
      targetUrl !== selected.url
    ) {
      const episodePage =
        await request(
          targetUrl
        );

      if (!episodePage.ok) {
        return [];
      }

      episodeHtml =
        episodePage.text;
    }

    const downloadPage =
      findDownloadPage(
        episodeHtml,
        site
      );

    if (!downloadPage) {
      console.log(
        "[FaselHD] Download page not found"
      );

      return [];
    }

    console.log(
      "[FaselHD] Download page:",
      downloadPage
    );

    const directUrl =
      await resolveDownload(
        downloadPage,
        site
      );

    if (!directUrl) {
      return [];
    }

    console.log(
      "[FaselHD] DIRECT:",
      directUrl
    );

    return [
      {
        name: "FaselHD",
        title: "FaselHD",
        url: directUrl,
        quality: 1080,
        type: "video",
        behaviorHints: {
          bingeGroup: "faselhd"
        }
      }
    ];

  } catch (error) {
    console.log(
      "[FaselHD] ERROR:",
      error?.message ||
        String(error)
    );

    return [];
  }
}

module.exports = {
  getStreams
};