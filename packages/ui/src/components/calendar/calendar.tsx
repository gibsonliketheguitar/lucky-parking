import { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Select from './calendar-select';
import { YEAR_RANGE } from './options_data/years';
import { MONTHS_RANGE, Month } from './options_data/months';

interface CalendarProps { }

const tempCalendar = Array.from(Array(4), () => new Array(7).fill(0))

export default function Calendar(props: CalendarProps) {
  const [month, setMonth] = useState(5)
  const [year, setYear]   = useState(2023)

  function handleUpdateMonth(type: 'prev' | 'next') { }

  const handleSetYear = (value: string) => { 
    const val = parseInt(value)
    setYear(val)
  }

  const handleSetMonth = (value: string) => { 
    const val = parseInt(value) as Month
    setMonth(val)
  }

  const handleSelected = (value: string) => { }

  return (
    <div className="w-64">
      <div className="flex px-6 h-[52px]">
        <div className="flex flex-1 items-center space-x-2">
          <Select
            id='Year'
            value={month}
            options={MONTHS_RANGE}
            onChange={handleSetMonth}
            optionWidth={100}
          />
          <Select
            id='Year'
            center={true}
            value={year}
            options={YEAR_RANGE}
            onChange={handleSetYear}
            optionWidth={58}
          />
        </div>
        <div className="flex justify-center space-x-7">
          <button className="px-2" onClick={() => handleUpdateMonth('prev')}> <ArrowBackIosNewIcon sx={{ fontSize: 8, color: '#7A7A7B' }} /></button>
          <button className="px-2" onClick={() => handleUpdateMonth('next')}> <ArrowForwardIosIcon sx={{ fontSize: 8, color: '#7A7A7B' }} /></button>
        </div>
      </div>
      <div className="px-4 pb-2 flex justify-center">
        <table className="border-collaspse">
          <thead>
            <tr>
              {["M", "T", "W", "T", "F", "S", "S"].map((ele: string) => <td className='h-8 w-8 p-px font-normal leading-[16.8px] text-xs text-black-400 text-center'>{ele}</td>)}
            </tr>
          </thead>
          <tbody>
            {tempCalendar.map((week) => (
              <tr>
                {week.map((ele, idx) => {
                  return <td className='h-8 w-8 font-normal leading-[18.8px] text-xs text-black-500 text-center'>{idx}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
