import { Month } from "../option_data/MONTHS"

export function isThisAndNextMonth(date: Date, initMonth: Month): boolean{
  const currMonth = date.getMonth()
  const isDec = initMonth === 11

  return (
    currMonth === initMonth ||
    currMonth === initMonth + 1 ||
    (isDec && currMonth === 0)
  )
} 
