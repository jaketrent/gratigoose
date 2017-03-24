export function stripDollarSign(amt) {
  return amt && amt.replace(/^(-)?\$(.*)$/, '$1$2')
}
