import server from './server'

const allConfig = { ... server }

export function at(key) {
  if (!key) return

  return allConfig[key]
}

export function all() {
  return allConfig
}
