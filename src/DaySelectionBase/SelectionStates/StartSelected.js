import StartEndSelected from './StartEndSelected';

export default {
  select(selection, calendar, selectionController) {
    const { start } = calendar;

    if (selection.greaterThan(start)) {
      calendar.end = selection;
      selectionController.selectionState = StartEndSelected;
    } else if (selection.lessThan(start)) {
      calendar.start = selection;
    }
  }
};
