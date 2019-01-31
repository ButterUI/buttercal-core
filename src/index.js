import AbstractDate from './AbstractDate';
import Month from './Month';
import DaySelectionController from './DaySelectionBase/DaySelectionController';
import { subMonths, addMonths, startOfDay } from 'date-fns';
import {MS_IN_DAY, TODAY, TOMORROW} from './constants';

export default class Calendar {
  constructor(date = new Date(), {
    monthsToShow = 1,
    defaultStart = TODAY.date,
    defaultEnd = TOMORROW.date,
    labelTemplate = null
  } = {
    monthsToShow: 1,
    defaultStart: TODAY.date,
    defaultEnd: TOMORROW.date,
    labelTemplate: null
  }) {
    this.monthsToShow = monthsToShow;
    this.renderedMonths = [];
    this.start = defaultStart ? new AbstractDate(defaultStart) : null;
    this.end = defaultEnd ? new AbstractDate(defaultEnd) : null;
    this.observers = {
      selectionChanged: [],
      monthChanged: []
    };
    this.labelTemplate = labelTemplate;
    this.daySelector = new DaySelectionController(this.start, this.end);
    this.today = TODAY;
    this.tomorrow = TOMORROW;
    this.setMonths(date);
    this.events = [];
  }

  static getAbstractDate(date) {
    return new AbstractDate(date);
  }

  /**
   * Moves rendered months to the next month.
   */
  nextMonth() {
    this.renderedMonths = [
      ...this.renderedMonths.slice(1),
      new Month(new Date(addMonths(this.renderedMonths[this.renderedMonths.length - 1].date, 1)), {
        start: this.start,
        end: this.end,
        labelTemplate: this.labelTemplate
      })
    ];
    this.notifyObservers('monthChanged', {
      months: this.renderedMonths,
      type: 'next'
    });
  }

  /**
   * Moves rendered months to the previous month.
   */
  prevMonth() {
    this.renderedMonths = [
      new Month(new Date(subMonths(this.renderedMonths[0].date, 1)), {
        start: this.start,
        end: this.end,
        labelTemplate: this.labelTemplate
      }),
      ...this.renderedMonths.slice(0, -1)
    ];

    this.notifyObservers('monthChanged', {
      months: this.renderedMonths,
      type: 'prev'
    });
  }

  /**
   * Sets the rendered months based on the date provided.
   * @param date
   * @param monthsToShow
   */
  setMonths(date, monthsToShow = this.monthsToShow) {
    this.renderedMonths = [
      new Month(new Date(subMonths(date, 1)), {
        start: this.start,
        end: this.end,
        labelTemplate: this.labelTemplate
      }),
      new Month(new Date(date), {
        start: this.start,
        end: this.end,
        labelTemplate: this.labelTemplate
      })
    ];
    for (let i = 0; i < monthsToShow; i++) {
      this.renderedMonths.push(new Month(new Date(addMonths(date, i + 1)), {
        start: this.start,
        end: this.end,
        labelTemplate: this.labelTemplate
      }));
    }
    this.notifyObservers('monthChanged', {
      months: this.renderedMonths,
      type: 'set'
    });
  }

  addCalEvent(event) {
    if (!event.hasOwnProperty('start')) {
      throw new Error('All calendar events must have a start date property');
    }

    if (!event.hasOwnProperty('end')) {
      event.end = event.start;
    }

    event.start = +new Date(startOfDay(event.start));
    event.end = +new Date(startOfDay(event.end));
    event.duration = (event.end - event.start) / MS_IN_DAY + 1;

    let rules = [
      ts => (ts >= event.start && ts <= event.end)
    ];

    if (event.every) {
      rules.push(
        ts => (
          (ts - event.start) % (MS_IN_DAY * event.every) >= 0 &&
          (ts - event.start) % (MS_IN_DAY * event.every) <= event.end - event.start
        )
      );
    }

    this.events.push({
      rules,
      originalEvent: event,
      id: event.id
    });

  }

  addCalEvents(events) {
    events.forEach(event => {
      this.addCalEvent(event);
    });

    this.updateEvents();
  }

  updateEvents() {
    this.renderedMonths.forEach(month => {
      month.days.forEach(day => {
        day.setEvents(this.events);
      });
    });
  }

  /**
   * Selects a day on the calendar given the provided date. This method may
   * modify other selected days.
   * @param date
   */
  selectDay(abstractDate) {
    this.daySelector.select(abstractDate, this);
    this.notifyObservers('selectionChanged', {
      start: this.start,
      end: this.end
    });
  }

  /**
   * Notifies any observers of changes in the provided type.
   * @param type The type of change to notify about.
   * @param data
   */
  notifyObservers(type, data) {
    if (this.observers.hasOwnProperty(type)) {
      this.observers[type].forEach(updateFunction => {
        updateFunction(data);
      });
    }
  }

  /**
   * Subscribe to any changes of the given type.
   * @param subscriber Function to call when changes occur.
   */
  subscribe(type, subscriber) {
    if (this.observers.hasOwnProperty(type)) {
      this.observers[type].push(subscriber);
    }
  }
}
