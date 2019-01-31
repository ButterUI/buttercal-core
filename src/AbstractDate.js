import { startOfDay } from 'date-fns';

export default class AbstractDate {
  constructor(date) {
    this.date = date;
    this.ts = +new Date(startOfDay(date));
  }

  /**
   * Determines if the provided AbstractDate is equal to the current.
   * @param abstractDate
   * @returns {boolean}
   */
  equals({ts}) {
    return this.ts === ts;
  }

  /**
   * Determines if the current AbstractDate is less than the provided AbstractDate.
   * @param abstractDate
   * @returns {boolean}
   */
  lessThan({ts}) {
    return this.ts < ts;
  }

  lessThanEqual({ts}) {
    return this.ts <= ts;
  }

  /**
   * Determines if the current AbstractDate is greater than the provided AbstractDate.
   * @param abstractDate
   * @returns {boolean}
   */
  greaterThan({ts}) {
    return this.ts > ts;
  }

  greaterThanEqual({ts}) {
    return this.ts >= ts;
  }
}
