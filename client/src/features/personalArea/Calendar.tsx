import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function MyCalendar(): JSX.Element {
  const [value, setValue] = useState<Date | Date[]>(new Date());

  const handleChange = (newValue: Date | Date[]): void => {
    setValue(newValue);
  };

  return (
    <div className='calendar'>
      <h1>Ваши записи</h1>
      <Calendar onChange={() => handleChange()} value={value} selectRange={Array.isArray(value)} />
    </div>
  );
}
