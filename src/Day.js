import { getDate } from 'date-fns';
import { MS_IN_DAY } from './constants';

export default class Day {
  constructor(abstractDate, {inMonth, inFuture, isToday, isSelected, isStart, isEnd, labelTemplate }) {
    this.abstract = abstractDate;
    this.inMonth = inMonth;
    this.inFuture = inFuture;
    this.isToday = isToday;
    this.isSelected = isSelected;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.label = labelTemplate ? labelTemplate(this) : getDate(this.abstract.date);
    this.events = [];
    this.eventStart = [];
  }

  serialize() {
    return {
      abstract: this.abstract,
      label: this.label,
      inMonth: this.inMonth,
      inFuture: this.inFuture,
      isToday: this.isToday,
      isSelected: this.isSelected,
      isStart: this.isStart,
      isEnd: this.isEnd
    };
  }

  setEvents(events) {
    events.forEach(event => {
      let pass = false;

      event.rules.forEach(rule => {
        if (rule(this.abstract.ts)) {
          pass = true;
        }
      });

      if (pass) {
        this.events.push(event.originalEvent);

        if ((this.abstract.ts - event.originalEvent.start) % (MS_IN_DAY * event.originalEvent.every) === 0) {
          this.eventStart.push(event.originalEvent);
        }
      }
    });
  }
}
