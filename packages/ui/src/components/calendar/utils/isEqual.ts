import { I_CalendarDate } from "./createCalendar";

export function isEqual({ day, month, year}: I_CalendarDate, targetDate: Date): boolean{
  if(!targetDate) return false
  return (
    targetDate.getDate() === day &&
    targetDate.getMonth() === month &&
    targetDate.getFullYear() === year
  ) 
}
