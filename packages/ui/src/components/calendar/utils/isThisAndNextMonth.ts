export function isThisAndNextMonth(date: Date, initMonth: number){
  const currMonth = date.getMonth()
  const isDec = initMonth === 11

  return (
    currMonth === initMonth ||
    currMonth === initMonth + 1 ||
    (isDec && currMonth === 0)
  )
} 
