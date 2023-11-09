import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function MyCalendar(): JSX.Element {
  return (
    <div>
      <div>Ваши записи</div>
      <Calendar />
    </div>
  );
}
