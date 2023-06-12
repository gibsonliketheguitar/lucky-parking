import { useEffect, useState } from "react";
import clsx from "clsx";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { I_CalendarDate, T_Calendar, T_Month, T_Year, createCalendar } from "./utils/createCalendar";
import { isEqual } from "./utils/isEqual";
import { isObjectEmpty } from "./utils/isObjectEmpty";

const today = new Date()

export default function Calendar(props: any) {
  const [date, setDate]   = useState<Date>(today)
  const [selected, setSelected] = useState<Date>(today)
  const [month, setMonth] = useState<T_Month>(date.getMonth() as T_Month)
  const [year, setYear]   = useState<T_Year>(date.getFullYear() as T_Year)
  const calendar = createCalendar(year, month)

  function handleUpdateMonth(type: 'prev' | 'next'){
    const modify = type === 'prev' ? -1 : 1
    const min = new Date(2017, 0, 1)
    const max = new Date(2023, 11, 31)

    setDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + modify)
      
      if(newDate <= min){
        setMonthAndYear(0, 2017)
        return min
      }
      if(newDate >= max) {
        setMonthAndYear(11, 2023)
        return max
      } 
      setMonthAndYear(newDate.getMonth() as T_Month, newDate.getFullYear() as T_Year)
      return newDate
    })
   
    function setMonthAndYear(month: T_Month, year: T_Year){
      setMonth(month)
      setYear(year)
    }
  }

  const handleSetYear = (value:T_Year) => {
    setYear(value)
    setDate(prev => {
      const newDate = new Date(prev)
      newDate.setFullYear(value)
      return newDate
    })
  }

  const handleSetMonth  = (value:T_Month) => {
    setMonth(value)
    setDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(value)
      return newDate
    })
  }
  
  const handleSelected = ({day, month, year}: I_CalendarDate) => {
    const min = new Date(2017, 0, 1)
    const max = new Date(2023, 11, 31)
    const newDate = new Date(year, month, day)
    if(newDate > max || newDate < min) return 
    setSelected(newDate)
  }

  useEffect(() => {
    console.log('what is selected', selected)
  }, [selected])
 
  return (
    <div>
      <div id='TEMP Calendar ACTIONS' className="flex flex-row">
        <Select id='Year'  value={year}  options={YEARS}  onChange={handleSetYear}/>
        <Select id='Month' value={month} options={MONTHS} onChange={handleSetMonth}/>
        <button onClick={() => handleUpdateMonth('prev')}> <ArrowBackIosNewIcon/></button>
        <button onClick={() => handleUpdateMonth('next')}> <ArrowForwardIosIcon/></button>
      </div>
      <div className="bg-light-100">
        <table className='border-collapse'>
          <tbody>
            {calendar.map((week: any, weekIdx:number) => (
              <tr key={'month' + weekIdx}>
                {week.map((ele: T_Calendar, colIdx: any) => {
                  if(isObjectEmpty(ele)){
                    return <td key={'empty'+colIdx}></td>
                  } 
                  const { day, month, year} = ele as I_CalendarDate
                  const isSelected = isEqual({ day, month, year}, selected)  
                  const isCurrDate = isEqual({ day, month, year}, today)
                  return (
                    <td 
                      key={`${month}/${day}/${year}`} 
                      onClick={() => handleSelected(ele as I_CalendarDate)}
                      className={clsx(
                        'rounded-full text-center h-10 w-10',
                        isCurrDate && !isSelected && 'rounded-full border-solid border-2 border-black-500',
                        isSelected && 'bg-blue-500 text-white-100',
                        !isSelected && 'hover:bg-blue-200'
                      )}
                    >
                      {day}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


/** TODO Calendar
 *    0 [x] : gen calendar
 *    1 []  : render calendar
      2 []  : implement method
 *  
 *  TODO Selct
 *    1. figure out if we need to use ref for the select option so we can pass value and on change
 *    2. Create Dropdown menu 
 */

/** Questions?
 *  > What is it is the current day, and we also selected the day too?
 *  > Buttons Left and Right Chevront
 *      - implement locally 
 *      - or have a global component
 * 
 *  > moment or what library do we want to use?
 *  > shoulue value of month and stuff be numeric or strict
 *  > control or uncontrolled
 */

interface I_Select<T extends string | number> {
  id: string;
  options: Array<{ value: T | number, text: string}>;
  onChange?: (value: T) => void;
  value?: T;
}

function Select<T extends string | number>({ id, options, onChange, value }: I_Select<T>) {

  const handleOnChange = (e:React.ChangeEvent<HTMLSelectElement>) =>{
    if(!onChange) return
    onChange(e.target.value as T)
  } 
  return (
    <select 
      id={id} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      value={value}
      onChange={handleOnChange}
    >
      {options
        .map(({ value, text }) => {
          return <option key={'id' + ' ' + text} value={value}>{text}</option>
        })
      }
    </select>
  )
}

const MONTHS = [
  { value: 0, text: 'January' },
  { value: 1, text: 'February' },
  { value: 2, text: 'March' },
  { value: 3, text: 'April' },
  { value: 4, text: 'May' },
  { value: 5, text: 'June' },
  { value: 6, text: 'July' },
  { value: 7, text: 'August' },
  { value: 8, text: 'September' },
  { value: 9, text: 'October' },
  { value: 10, text: 'November' },
  { value: 11, text: 'December' }
];

const YEARS = [
  { value: 2017, text: "2017" },
  { value: 2018, text: "2018" },
  { value: 2019, text: "2019" },
  { value: 2020, text: "2020" },
  { value: 2021, text: "2021" },
  { value: 2022, text: "2022" },
  { value: 2023, text: "2023" }
]