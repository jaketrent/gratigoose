let appNode

export function getAppNode() {
  if (!appNode)
    appNode = document.getElementById('app')

  return appNode
}

