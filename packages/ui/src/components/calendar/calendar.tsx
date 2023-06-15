import { useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import clsx from "clsx";
import Select from "./select";

import { I_CalendarDate, T_Calendar, T_Month, T_Year, createCalendar } from "./utils/createCalendar";
import { isEqual } from "./utils/isEqual";
import { isObjectEmpty } from "./utils/isObjectEmpty";

const DAYS_OF_WEEK = ["M", "T", "W", "T", "F", "S", "S"]

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

export default function Calendar({ initDate = new Date(), onSelectValueChange }: CalendarProps) {
  const [date, setDate] = useState<Date>(initDate)
  const [selected, setSelected] = useState<Date>(initDate)
  const [month, setMonth] = useState<T_Month>(initDate.getMonth() as T_Month)
  const [year, setYear] = useState<T_Year>(initDate.getFullYear() as T_Year)
  const calendar = createCalendar(year, month)

  function handleUpdateMonth(type: 'prev' | 'next') {
    const modify = type === 'prev' ? -1 : 1
    const min = new Date(2017, 0, 1)
    const max = new Date(2023, 11, 31)

    setDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + modify)

      if (newDate <= min) {
        setMonthAndYear(0, 2017)
        return min
      }
      if (newDate >= max) {
        setMonthAndYear(11, 2023)
        return max
      }
      setMonthAndYear(newDate.getMonth() as T_Month, newDate.getFullYear() as T_Year)
      return newDate
    })

    function setMonthAndYear(month: T_Month, year: T_Year) {
      setMonth(month)
      setYear(year)
    }
  }

  const handleSetYear = (value: T_Year) => {
    setYear(value)
    setDate(prev => {
      const newDate = new Date(prev)
      newDate.setFullYear(value)
      return newDate
    })
  }

  const handleSetMonth = (value: T_Month) => {
    setMonth(value)
    setDate(prev => {
      const newDate = new Date(prev)
      newDate.setMonth(value)
      return newDate
    })
  }

  const handleSelected = ({ day, month, year }: I_CalendarDate) => {
    const min = new Date(2017, 0, 1)
    const max = new Date(2023, 11, 31)
    const newDate = new Date(year, month, day)
    if (newDate > max || newDate < min) return
    setSelected(newDate)
    onSelectValueChange(newDate)
  }

  return (
    <div className="w-72 drop-shadow-xl rounded-md">
      <div className="px-6 pt-5 pb-4 m-auto flex items-center justify-between h-14">
        <div className="space-x-2">
          <Select
            id='Month'
            value={month}
            options={MONTHS}
            onChange={handleSetMonth}
            width={45}
            optionWidth={58}
          />
          <Select
            id='Year'
            value={year}
            options={YEARS}
            onChange={handleSetYear}
            width={66}
            optionWidth={100}
          />
        </div>
        <div className="flex justify-center space-x-4">
          <button className='px-1' onClick={() => handleUpdateMonth('prev')}> <ArrowBackIosNewIcon sx={{ fontSize: 12 }} /></button>
          <button className='px-1' onClick={() => handleUpdateMonth('next')}> <ArrowForwardIosIcon sx={{ fontSize: 12 }} /></button>
        </div>
      </div>
      <div className="px-4 pb-2 flex justify-center">
        <table className='border-collapse'>
          <tbody>
            <tr>
              {DAYS_OF_WEEK.map((ele:string) => <td className="leading-4 font-normal text-black-400 text-sm text-center h-8 w-8 p-px">{ele}</td>)}
            </tr>
            {calendar.map((week: any, weekIdx: number) => (
              <tr key={'month' + weekIdx}>
                {week.map((ele: T_Calendar, colIdx: any) => {
                  if (isObjectEmpty(ele)) {
                    return <td key={'empty' + colIdx}></td>
                  }
                  const { day, month, year } = ele as I_CalendarDate
                  const key = `${month}/${day}/${year}`
                  const isSelected = isEqual({ day, month, year }, selected)
                  const isCurrDate = isEqual({ day, month, year }, initDate)
                  const isCurrMonth = month === date.getMonth()
                  return (
                    <td
                      key={key}
                      onClick={() => handleSelected(ele as I_CalendarDate)}
                      className={clsx(
                        'leading-4 font-normal text-sm text-center h-8 w-8 p-px',
                        !isCurrMonth && 'text-black-200',
                        !isSelected && 'hover:bg-blue-200 rounded-full',
                        isCurrDate && 'inline-flex justify-center items-center rounded-full border-[1px]',
                        isSelected && 'rounded-full bg-blue-500 text-white-100'
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
