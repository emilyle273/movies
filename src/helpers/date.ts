export const formatDate = (date: string): string => {
  const dateObj = new Date(date)

  const year = dateObj.getFullYear()
  const month = dateObj.toLocaleString('en-US', { month: 'short' })
  const day = String(dateObj.getDate()).padStart(2, '0')

  return `${year} ${month} ${day}`
}
