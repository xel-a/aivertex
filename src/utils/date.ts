interface FormatDateArgs {
  date: Date | string;
  month?: Intl.DateTimeFormatOptions['month'];
  isMonthYear?: boolean;
  isMonthDay?: boolean;
  isYear?: boolean;
}

export function formatDate({
  date,
  month = 'long',
  isMonthYear = false,
  isMonthDay = false,
  isYear = false,
}: FormatDateArgs) {
  const dateFormat: Intl.DateTimeFormatOptions = {
    ...(isYear ? {} : { month }),
    ...(isMonthDay ? {} : { year: 'numeric' }),
    ...(isMonthYear || isYear ? {} : { day: 'numeric' }),
    timeZone: 'UTC',
  };

  return new Intl.DateTimeFormat('en-CA', dateFormat).format(new Date(date));
}
