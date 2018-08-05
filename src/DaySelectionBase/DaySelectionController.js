import DaySelectionBase from './DaySelectionBase';
import NoSelection from './SelectionStates/NoSelection';
import StartSelected from './SelectionStates/StartSelected';
import StartEndSelected from './SelectionStates/StartEndSelected';

export default class DefaultSelectionController extends DaySelectionBase {
  constructor(start, end) {
    super();
    if (start && end) {
      this.selectionState = StartEndSelected;
    } else if (start && !end) {
      this.selectionState = StartSelected;
    } else {
      this.selectionState = NoSelection;
    }
  }

  /**
   * @param abstractDate
   * @param calendar
   */
  select(abstractDate, calendar) {
    this.selectionState.select(abstractDate, calendar, this);
  }
}
