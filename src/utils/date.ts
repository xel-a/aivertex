export function formatDate(
  date: Date | string,
  month: Intl.DateTimeFormatOptions['month'] = 'long',
  isMonthYear: boolean = false
) {
  const dateFormat: Intl.DateTimeFormatOptions = {
    month,
    year: 'numeric',
    ...(isMonthYear ? {} : { day: 'numeric' }),
  };

  return new Intl.DateTimeFormat('en-CA', dateFormat).format(new Date(date));
}
