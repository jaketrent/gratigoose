import qs from 'qs'

export function isCanonicalUrl(url) {
  return /^[^:]+:\/\//.test(url)
}
