import React from 'react'
import dayjs from 'dayjs';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

function Time() {
    const [time, settime] = React.useState(dayjs(''));

    const handleChange = (newtime) => {
        settime(newtime);
      };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Time"
          value={time}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  )
}

export default Time