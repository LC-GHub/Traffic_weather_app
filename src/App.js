import React, {useEffect, useState} from "react";
import Date from './Date'
import Time from './Time'
import Weather from "./Weather";
import Screenshot from "./Screenshot";
import Locationlist from "./Locationlist";
import Spinner from "./Spinner";
import dayjs from 'dayjs';
import 'bootstrap/dist/css/bootstrap.min.css';


import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { Grid, ListItem, ListItemButton } from '@mui/material';
import Typography from '@mui/material/Typography';

function App(props) {
  const [date, setdate] = React.useState(dayjs(''));
  const [time, settime] = React.useState(dayjs(''));
  const [weather, setweather] = React.useState();
  const [imgURL, setimgURL] = React.useState();
  
  return (


    <div className="grid gap-4 w-screen h-screen grid-cols-12 grid-rows-7 ">

        <div className="col-span-12 row-start-1 row-span-1 flex justify-center items-center p-4 font-semibold text-2xl">
          <img src="https://www.aretese.com/images/govtech-animated-logo.gif" className="w-30 h-12"></img>
          Traffic and Weather App
        </div>
      
        <div className="col-span-4 row-start-2 row-span-1 flex justify-center items-center p-2 rounded-lg shadow-sm">
        <Date date = {date} setdate = {setdate}/>
        </div>



        <div className="col-span-4 row-start-2 row-span-1 flex justify-center items-center p-2 rounded-lg shadow-sm">
        <Time time = {time} settime = {settime}/>
        </div>



        <div className="col-span-8 row-start-3 row-span-3 flex flex-col justify-center  rounded-lg shadow-sm p-2">
          <div className="w-full h-full flex flex-col items-center">
            <Typography sx={{ mt: 0, mb: 2 }} variant="h6" component="div">
                Select location of traffic camera
            </Typography>
            <Locationlist date = {date} setdate = {setdate}
            time = {time} settime = {settime}
            weather = {weather} setweather = {setweather}
            imgURL = {imgURL} setimgURL = {setimgURL}
            />
          </div>
        </div>


        <div className="col-span-4 row-start-3 row-span-3 flex items-center justify-left rounded-lg shadow-sm p-2">
          <Weather weather = {weather} setweather = {setweather} date = {date} setdate = {setdate} time = {time} settime = {settime}/>
        </div>

        <div className="col-span-8 row-start-6 row-span-2 flex items-center justify-center rounded-lg shadow-sm p-2">
          <Screenshot imgURL = {imgURL} setimgURL = {setimgURL}/>
        </div>
        

    </div>
        






  );
}

export default App;
