export const MIN = new Date(-8640000000000000)

export function format(dateStr) {
  const justDate = dateStr.split('T')[0]
  const [year, month, day] = justDate.split('-')
  return `${year}-${month}-${day}`
}

export function stripTz(dateStr) {
   return dateStr.split('T')[0]
}
