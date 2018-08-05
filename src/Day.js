import { getDate } from 'date-fns';

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
}
