export const MIN = new Date(-8640000000000000)

export function format(dateStr) {
  const date = new Date(dateStr)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  return `${year}-${month + 1}-${day}`
}
