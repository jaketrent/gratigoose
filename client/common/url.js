import qs from 'qs'

function startsWithBasePath(url, basePath) {
  return new RegExp('^' + basePath).test(url)
}

export function isCanonicalUrl(url) {
  return /^[^:]+:\/\//.test(url)
}

export function formatUrl(url, basePath) {
  return !basePath || isCanonicalUrl(url) || startsWithBasePath(url, basePath)
    ? url
    : `${basePath}${url}`
}

export function routesMatch(route1, route2, basePath) {
  return formatUrl(route1, basePath) === formatUrl(route2, basePath)
}
