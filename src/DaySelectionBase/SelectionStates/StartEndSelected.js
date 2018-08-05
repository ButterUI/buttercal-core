import StartSelected from './StartSelected';

export default {
  select(selection, calendar, selectionController) {
    calendar.start = selection;
    calendar.end = null;
    selectionController.selectionState = StartSelected;
  }
};

