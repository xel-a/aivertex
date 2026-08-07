export function formatDate(
  date: Date | string,
  month: Intl.DateTimeFormatOptions['month'] = 'long'
) {
  return new Intl.DateTimeFormat('en-CA', {
    month,
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}
