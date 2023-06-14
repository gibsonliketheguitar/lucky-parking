export type T_Day   = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31;
export type T_Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 
export type T_Year  = 2017 | 2018 | 2019 | 2020 | 2021 | 2022 |2023


export interface I_CalendarDate {
    day  : T_Day;
    month: T_Month;
    year : T_Year;
}

export type T_Calendar = I_CalendarDate | {}

export function createCalendar(year: T_Year, month: T_Month): T_Calendar[] {
  const startDay = 1 // Monday: 0 (Sunday) to 6 (Saturday)
  const currentDate = new Date(year, month, 1);

  // Set the day of the week for the start day
  currentDate.setDate(currentDate.getDate() - (currentDate.getDay() - startDay + 7) % 7);

  // Initialize a two-dimensional array to hold the calendar
  const calendar: any = [];
  const isThisAndNextMonth = (date: Date, initMonth: number) => {
    const currMonth = date.getMonth()
    const isDec = initMonth === 11

    return (
      currMonth === initMonth ||
      currMonth === initMonth + 1 ||
      (isDec && currMonth === 0)
    )
  } 
  // Populate the calendar with dates
  for (let row = 0; row < 5; row++) {
    calendar[row] = [];
    for (let col = 0; col < 7; col++) {
      //append days for current month and next month
      calendar[row][col] = isThisAndNextMonth(currentDate, month)
        ? {
            day   :currentDate.getDate(),
            month :currentDate.getMonth(),
            year  :currentDate.getFullYear()
          }
        : {}
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  return calendar;
}