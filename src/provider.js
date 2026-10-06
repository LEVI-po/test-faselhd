/*
 * Provider adapter.
 *
 * ضع هنا API أو مصدرًا لديك تصريح باستخدامه.
 * لا تضع مفاتيح API مباشرة داخل الكود.
 */

const API_BASE = process.env.CONTENT_API_URL || "";

async function request(path) {
  if (!API_BASE) {
    throw new Error("CONTENT_API_URL is not configured");
  }

  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Accept": "application/json",
      "User-Agent": "Nuvio-Content-Addon/1.0"
    }
  });

  if (!response.ok) {
    throw new Error(`Provider returned HTTP ${response.status}`);
  }

  return response.json();
}

export async function searchContent(query, type) {
  /*
   * عدّل هذا المسار حسب API المصرح به.
   */
  const data = await request(
    `/search?q=${encodeURIComponent(query)}&type=${encodeURIComponent(type)}`
  );

  return (data.results || []).map(item => ({
    id: String(item.id),
    type,
    name: item.title || item.name || "Unknown",
    poster: item.poster || undefined,
    description: item.description || undefined,
    year: item.year || undefined
  }));
}

export async function getMetadata(id, type) {
  const item = await request(
    `/meta/${encodeURIComponent(type)}/${encodeURIComponent(id)}`
  );

  return {
    meta: {
      id: String(item.id),
      type,
      name: item.title || item.name || "Unknown",
      poster: item.poster || undefined,
      background: item.background || undefined,
      description: item.description || undefined,
      releaseInfo: item.year ? String(item.year) : undefined,
      genres: item.genres || []
    }
  };
}