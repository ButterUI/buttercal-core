import StartSelected from './StartSelected';
export default {
  select(selection, calendar, selectionController) {
    calendar.start = selection;
    selectionController.selectionState = StartSelected;
  }
};
