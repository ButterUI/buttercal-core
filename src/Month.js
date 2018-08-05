import { startOfMonth, lastDayOfMonth, addDays, subDays, getDay } from 'date-fns';
import AbstractDate from './AbstractDate';
import Day from './Day';
import { TODAY } from './constants';

export default class Month {
  constructor(date, { start, end, labelTemplate = null}) {
    this.date = date;
    this.start = start;
    this.end = end;
    this.days = this.getDays(labelTemplate);
  }

  getDays(labelTemplate) {
    let month = [];
    const monthStart = new AbstractDate(new Date(startOfMonth(this.date)));
    const displayStart = new AbstractDate(subDays(monthStart.date, getDay(monthStart.date)));
    const monthEnd = new AbstractDate(new Date(lastDayOfMonth(this.date)));

    for (let i = 0; i < 42; i++) {
      let current = new AbstractDate(new Date(addDays(displayStart.date, i)));

      month.push(new Day(
        current,
        {
          inMonth: current.greaterThan(monthStart) && current.lessThan(monthEnd),
          inFuture: current.greaterThan(TODAY),
          isToday: current.equals(TODAY),
          isSelected: (this.start || this.end) && (current.equals(this.start) || current.equals(this.end)),
          isStart: this.start && current.equals(this.start),
          isEnd: this.end && current.equals(this.end),
          labelTemplate
        }
      ));
    }

    return month;
  }
}
