import Calendar from 'react-calendar';
import DatePicker from 'react-datetime-picker';
import moment from 'moment';
import {useState} from 'react';
import 'react-calendar/dist/Calendar.css'

function Calendar1() {
    const [date, setDate] = useState(new Date())
    const yesterday = moment().subtract(1,'day');
    const disablePast=current => {
        return current.isAfter(yesterday);
    };

    const customDate=['2022-06-10','2022-06-13','2022-06-18'];
    const disableCustom=current => {
        return !customDate.includes(current.format('YYYY-MM-DD'));
    }
   
   
   return (
        <div className="app">
        <DatePicker timeformat={false} isValidDate={disablePast} />
        </div>
     )
   
}

export default Calendar1;