export const formatDate = (date: string): string => {
  const dateObj = new Date(date)

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }

  return new Intl.DateTimeFormat('en-US', options).format(dateObj)
}
