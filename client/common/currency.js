export function stripDollarSign(amt) {
  return typeof amt === 'string'
    ? amt.replace(/^(-)?\$(.*)$/, '$1$2')
    : amt
}
