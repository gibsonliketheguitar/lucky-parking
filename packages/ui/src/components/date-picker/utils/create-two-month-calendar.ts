import { CalendarDate } from "@/components/calendar/utils/create-calendar";

export function createTwoMonthCalendar(year: number, month: number) {
  const firstMonth = createCalendarMonth(year, month);
  const nextMonth = (month + 1) % 12;
  const secondMonth = createCalendarMonth(year, nextMonth);

  return [firstMonth, secondMonth];
}

export function createCalendarMonth(year: number, month: number) {
  const startDay = 1;
  const currentDate = new Date(year, month, 1);

  currentDate.setDate(currentDate.getDate() - ((currentDate.getDay() - startDay + 7) % 7));

  // Initialize a two-dimensional array to hold the calendar
  const calendar: CalendarDate[][] = [];
  // Populate the calendar with dates
  for (let row = 0; row < 5; row++) {
    calendar[row] = [];
    for (let col = 0; col < 7; col++) {
      //append days for current month and next month

      //TODO figure type error
      //@ts-ignore
      calendar[row][col] =
        currentDate.getMonth() === month
          ? {
              day: currentDate.getDate(),
              month: currentDate.getMonth(),
              year: currentDate.getFullYear(),
            }
          : { day: null, month: null, year: null };

      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  return calendar;
}
