import React from 'react'
import dayjs from 'dayjs';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function Date() {
    const [date, setdate] = React.useState(dayjs('2014-08-18T21:11:54'));

    const handleChange = (newdate) => {
        setdate(newdate);
      };
  return (
<LocalizationProvider dateAdapter={AdapterDayjs}>
    <DesktopDatePicker
            label="Select Date"
            inputFormat="DD/MM/YYYY"
            value={date}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
    />
</LocalizationProvider>
  )
}



export default Date