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
    <Grid   container
    spacing={0}
    direction="row"
    alignItems="center"
>
      <Grid xs ={4}  p={20}>
        <Date date = {date} setdate = {setdate}/>
      </Grid>

      <Grid xs ={4} p = {20} >
        <Time time = {time} settime = {settime}/>
      </Grid>

      <Grid xs = {8} p = {20} sx = {{border: 1}} alignItems="center" justify="center">
      <Typography sx={{ mt: 0, mb: 2 }} variant="h6" component="div">
            Select location of traffic camera
      </Typography>

      <Locationlist date = {date} setdate = {setdate}
      time = {time} settime = {settime}
      weather = {weather} setweather = {setweather}
      imgURL = {imgURL} setimgURL = {setimgURL}
       />


      </Grid>

      <Grid xs = {4} p = {20} alignItems="center" justify="center" sx = {{border: 1}}>
        <Weather weather = {weather} setweather = {setweather} date = {date} setdate = {setdate} time = {time} settime = {settime}/>
      </Grid>

      <Grid xs = {8} p = {20} sx = {{border: 1}} alignItems="center" justify="center">
        <Screenshot imgURL = {imgURL} setimgURL = {setimgURL}/>
      </Grid>


    </Grid>




  );
}

export default App;
