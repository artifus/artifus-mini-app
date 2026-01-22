
export function urlSafeDecode(urlencoded: string): string {
  try {
    urlencoded = urlencoded.replace(/\+/g, "%20");
    return decodeURIComponent(urlencoded);
  } catch {
    return urlencoded;
  }
}

export function urlParseQueryString(queryString: string): Record<string, string | null> {
  const params: Record<string, string | null> = {};
  if (!queryString.length) return params;

  for (const pair of queryString.split("&")) {
    const [rawName, rawValue] = pair.split("=");
    const name = urlSafeDecode(rawName ?? "");
    const value = rawValue == null ? null : urlSafeDecode(rawValue);
    params[name] = value;
  }
  return params;
}

export function urlParseHashParams(locationHash: string): Record<string, string | null> {
  locationHash = locationHash.replace(/^#/, "");
  const params: Record<string, string | null> = {};
  if (!locationHash.length) return params;

  if (locationHash.indexOf("=") < 0 && locationHash.indexOf("?") < 0) {
    params._path = urlSafeDecode(locationHash);
    return params;
  }

  const qIndex = locationHash.indexOf("?");
  if (qIndex >= 0) {
    const pathParam = locationHash.substring(0, qIndex);
    params._path = urlSafeDecode(pathParam);
    locationHash = locationHash.substring(qIndex + 1);
  }

  const queryParams = urlParseQueryString(locationHash);
  for (const k in queryParams) params[k] = queryParams[k];
  return params;
}