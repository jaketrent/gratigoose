export function formatUsd(amt) {
  return typeof amt != 'undefined'
    ? parseFloat(amt).toLocaleString('en-US', { style: 'currency', currency: 'usd', minimumFractionDigits: 2 })
    : formatUsd(0)
}
