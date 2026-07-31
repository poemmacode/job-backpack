import { DateRange } from '../types/analytics';

interface DateRangeResult {
  start: Date;
  end: Date;
}

export function getDateRange(range: DateRange): DateRangeResult {
  const end = new Date();
  const start = new Date();

  switch (range) {
    case 'week':
      start.setDate(start.getDate() - 7);
      break;
    case 'month':
      start.setMonth(start.getMonth() - 1);
      break;
    case '3months':
      start.setMonth(start.getMonth() - 3);
      break;
    case '6months':
      start.setMonth(start.getMonth() - 6);
      break;
    case 'year':
      start.setFullYear(start.getFullYear() - 1);
      break;
  }

  return { start, end };
}

export function getPreviousDateRange(range: DateRange): DateRangeResult {
  const current = getDateRange(range);
  const duration = current.end.getTime() - current.start.getTime();

  return {
    start: new Date(current.start.getTime() - duration),
    end: new Date(current.start.getTime() - 1),
  };
}

export function getGroupByInterval(range: DateRange): 'day' | 'week' | 'month' {
  switch (range) {
    case 'week':
      return 'day';
    case 'month':
      return 'day';
    case '3months':
      return 'week';
    case '6months':
      return 'week';
    case 'year':
      return 'month';
  }
}

export function formatDateByInterval(date: Date, interval: 'day' | 'week' | 'month'): string {
  if (interval === 'month') {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }
  if (interval === 'week') {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return `${startOfWeek.getFullYear()}-${String(startOfWeek.getMonth() + 1).padStart(2, '0')}-${String(startOfWeek.getDate()).padStart(2, '0')}`;
  }
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
