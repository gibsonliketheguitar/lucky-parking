import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { isEmpty } from "lodash";

import { Month, MONTH_NAMES } from "../calendar/option-data/months";
import { Year } from "../calendar/option-data/years";
import { CalendarDate, T_Calendar } from "../calendar/utils/create-calendar";
import { twMerge } from "tailwind-merge";
import { createTwoMonthCalendar } from "./utils/create-two-month-calendar";
import { isEqual } from "../calendar/utils/is-equal";

interface DatePickerCalendarProps {
  initDate?: Date;
  endDate: Date | null;
  startDate: Date | null;
  setEndDate: (arg0: Date | null) => void;
  setStartDate: (arg0: Date | null) => void;
  handleReset: () => void;
}

export default function DatePickerCalendar(props: DatePickerCalendarProps) {
  const { initDate = new Date(), startDate, endDate, setStartDate, setEndDate } = props;

  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(initDate.getMonth() as Month);
  const [year, setYear] = useState(initDate.getFullYear());
  const [firstMonth, secondMonth] = createTwoMonthCalendar(year as Year, month);

  function handleUpdateMonth(type: "prev" | "next") {
    const modify = type === "prev" ? -1 : 1;
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + modify);

    setMonth(newDate.getMonth() as Month);
    setYear(newDate.getFullYear() as Year);
    setDate(newDate);
  }

  const handleSelected = ({ day, month, year }: CalendarDate) => {
    const newDate = new Date(year, month, day);

    if (!startDate && !endDate) {
      setStartDate(newDate);
    } else if (startDate && !endDate) {
      setEndDate(newDate);
    } else {
      /**
       * This handles the edge cases when new End date comes before start date
       *      Note: state is represent as date, but in system refer to CalendarDate interface
       *      EG:
       *        t-0 state:
       *                start : July 16, 1969
       *                end   : July 24, 1969
       *
       *        t-1 state:
       *              new End : July 15, 1969 selected
       *
       *    t-final state:
       *                start : July 15, 1969
       *                end   : null
       */

      if (startDate && newDate < startDate) {
        setStartDate(newDate);
        setEndDate(null);
      } else {
        setEndDate(newDate);
      }
    }
  };

  return (
    <div data-testid="date-range-calendar" className="bg-white-100 w-[512px]">
      {/**Calendar Month Nav */}
      <div className="flex h-[52px] flex-1 justify-between px-4">
        <div className="flex items-center justify-center space-x-5">
          <button className="px-2" onClick={() => handleUpdateMonth("prev")}>
            <ArrowBackIosNewIcon sx={{ fontSize: 8, color: "#7A7A7B" }} />
          </button>
          <div>
            {MONTH_NAMES[month]} {year}
          </div>
        </div>

        <div className="flex items-center justify-center space-x-5">
          <div>
            {MONTH_NAMES[(month + 1) % 12]} {(month + 1) % 12 === 0 ? year + 1 : year}{" "}
          </div>
          <button className="px-2" onClick={() => handleUpdateMonth("next")}>
            <ArrowForwardIosIcon sx={{ fontSize: 8, color: "#7A7A7B" }} />
          </button>
        </div>
      </div>

      {/** Actual Calendars */}
      <div className="flex w-full">
        <div className="flex justify-center px-4 pb-2">
          <table className="border-collaspse">
            <thead>
              <tr>
                {["M", "T", "W", "T", "F", "S", "S"].map((ele: string, index: number) => (
                  <td
                    key={ele + index}
                    className="text-black-400 h-8 w-8 p-px text-center text-xs font-normal leading-[16.8px]">
                    {ele}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {firstMonth.map((week: CalendarDate[], weekIdx: number) => (
                <tr key={"month" + weekIdx}>
                  {week.map((ele: T_Calendar, colIdx: number) => {
                    if (isEmpty(ele)) {
                      return <td key={"empty" + colIdx} className="h-8 w-8" />;
                    }
                    const { day, month, year } = ele as CalendarDate;
                    const key = `${month}/${day}/${year}`;
                    const isSelected = isEqual(ele as CalendarDate, startDate) || isEqual(ele as CalendarDate, endDate);
                    const isCurrDate = isEqual(ele as CalendarDate, initDate);

                    return (
                      <td
                        key={key}
                        onClick={() => handleSelected(ele as CalendarDate)}
                        className={twMerge(
                          "h-8 w-8 text-center text-xs font-normal leading-[18.8px]",
                          isCurrDate && "inline-flex items-center justify-center rounded-full border-[1px]",
                          !isSelected && "rounded-full hover:bg-blue-200",
                          isSelected && "text-white-100 rounded-full bg-blue-500",
                        )}>
                        {day}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center px-4 pb-2">
          <table className="border-collaspse">
            <thead>
              <tr>
                {["M", "T", "W", "T", "F", "S", "S"].map((ele: string, index: number) => (
                  <td
                    key={ele + index}
                    className="text-black-400 h-8 w-8 p-px text-center text-xs font-normal leading-[16.8px]">
                    {ele}
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {secondMonth.map((week: CalendarDate[], weekIdx: number) => (
                <tr key={"month" + weekIdx}>
                  {week.map((ele: T_Calendar, colIdx: number) => {
                    if (isEmpty(ele)) {
                      return <td key={"empty" + colIdx} className="h-8 w-8" />;
                    }
                    const { day, month, year } = ele as CalendarDate;
                    const key = `${month}/${day}/${year}`;
                    const isSelected = isEqual(ele as CalendarDate, startDate) || isEqual(ele as CalendarDate, endDate);
                    const isCurrDate = isEqual(ele as CalendarDate, initDate);

                    return (
                      <td
                        key={key}
                        onClick={() => handleSelected(ele as CalendarDate)}
                        className={twMerge(
                          "h-8 w-8 text-center text-xs font-normal leading-[18.8px]",
                          isCurrDate && "inline-flex items-center justify-center rounded-full border-[1px]",
                          !isSelected && "rounded-full hover:bg-blue-200",
                          isSelected && "text-white-100 rounded-full bg-blue-500",
                        )}>
                        {day}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
