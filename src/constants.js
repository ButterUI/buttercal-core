import { addDays } from 'date-fns';
import AbstractDate from './AbstractDate';
const currentDate = new Date();

export const TODAY = new AbstractDate(new Date(currentDate));
export const TOMORROW = new AbstractDate(new Date(addDays(currentDate, 1)));
export const MS_IN_DAY = 86400000;
