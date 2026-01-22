import {MiniAppInitData} from './types'
import {urlParseHashParams, urlParseQueryString} from './url'

export function getLocationHashSafe(): string {
  try {
    return location.hash.toString()
  } catch {
    return ''
  }
}

export function getInitParamsFromHash(hash: string): { artifusMiniAppData: string } {
  return urlParseHashParams(hash) as unknown as { artifusMiniAppData: string }
}

export function parseInitDataUnsafe(miniAppInitData: string): MiniAppInitData {
  const parsed = urlParseQueryString(miniAppInitData) as unknown as MiniAppInitData

  for (const [key, value] of Object.entries(parsed)) {
    if (typeof value !== 'string') continue

    const isJsonLike =
      (value.startsWith('{') && value.endsWith('}')) || (value.startsWith('[') && value.endsWith(']'))

    if (isJsonLike) {
      try {
        (parsed as any)[key] = JSON.parse(value)
      } catch {
        // ignore
      }
    }
  }

  return parsed
}