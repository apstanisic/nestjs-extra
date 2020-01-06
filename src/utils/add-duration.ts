import * as moment from 'moment';

/**
 * Add duration to date. It will subtract from last day.
 * For example. If it starts at 12.05 14:44 and lasts a month,
 * it will and at 11.05 23:59, and not at 12.06 14:44
 * If number provided for duration, assume it's days.
 */
export function getEndTime(
  duration: moment.Duration | number = moment.duration(1, 'month'),
  from: Date | moment.Moment = moment(),
): Date {
  // Always convert to moment
  const momentFrom = from instanceof Date ? moment(from) : from;
  if (typeof duration === 'number') {
    momentFrom.add(duration, 'months');
  } else {
    momentFrom.add(duration);
  }
  return momentFrom
    .subtract(1, 'day')
    .endOf('day')
    .toDate();
}
