import dayjs from 'dayjs';

export const getDateSubtitle = (from: string, to: string) => {
  if (!from || !to) {
    return '';
  }

  const dateFrom = dayjs(from);
  const dateTo = dayjs(to);
  const isSameDate = !dateTo.diff(dateFrom);
  const isSameMonthAndYear =
    dateFrom.month() === dateTo.month() && dateFrom.year() === dateTo.year();

  if (isSameDate) {
    return `${dateFrom.format('DD.MM.YYYY')}`;
  }

  if (isSameMonthAndYear) {
    return `${dateFrom.format('DD')}-${dateTo.format('DD.MM.YYYY')}`;
  }

  return `${dateFrom.format('DD.MM.YYYY')}-${dateTo.format('DD.MM.YYYY')}`;
};
