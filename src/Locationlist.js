import React, {useState, useEffect} from 'react'

import ListItemText from '@mui/material/ListItemText';
import {Grid, List, ListItem, ListItemButton } from '@mui/material';
import axios from 'axios';
import { CircularProgress } from '@mui/material'


function Locationlist(props) {
  const [locations, setLocations] = useState([]);
  const [IsLoading, setIsLoading] = React.useState(false);
  const dateFormatted = `${props.date.$y}-${(props.date.$M < 10 ? '0' : '') + props.date.$M}-${(props.date.$D < 10 ? '0' : '') + props.date.$D}`;
  const hourFormatted = `${(props.time.$H < 10 ? '0' : '') + props.time.$H}`
  const minFormatted = `${(props.time.$m < 10 ? '0' : '') + props.time.$m}`
  const secFormatted = `${(props.time.$s < 10 ? '0' : '') + props.time.$s}`
  const OneMapAPIKey = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjg0NzksInVzZXJfaWQiOjg0NzksImVtYWlsIjoiY2hld2NoeW91a2VhdGxpb25lbDE3MTJAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHA6XC9cL29tMi5kZmUub25lbWFwLnNnXC9hcGlcL3YyXC91c2VyXC9zZXNzaW9uIiwiaWF0IjoxNjc2OTU5ODkzLCJleHAiOjE2NzczOTE4OTMsIm5iZiI6MTY3Njk1OTg5MywianRpIjoiNDVjNGYwNzNlNWZmMWFhZDA3ZmJkODQ4MjI3ZGU2MWIifQ.nI-GWaFvMo_2zdcISHnljLOFHG8CeH0x3NHXpb2AAaY`



  useEffect(() => {

    const fetchCameraData = async () => {
      setIsLoading(true)
      
      const Cameradata = await axios.get(`https://api.data.gov.sg/v1/transport/traffic-images?date_time=${dateFormatted}T${hourFormatted}%3A${minFormatted}%3A${secFormatted}%2B08%3A00`);
      

      for (const element of Cameradata.data.items[0].cameras){
        // fetch the reverse geocode address
        let CameradataAndRoadName = await axios.get(`https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=${element.location.latitude},${element.location.longitude}&token=token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjg0NzksInVzZXJfaWQiOjg0NzksImVtYWlsIjoiY2hld2NoeW91a2VhdGxpb25lbDE3MTJAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHA6XC9cL29tMi5kZmUub25lbWFwLnNnXC9hcGlcL3YyXC91c2VyXC9zZXNzaW9uIiwiaWF0IjoxNjc2OTU5ODkzLCJleHAiOjE2NzczOTE4OTMsIm5iZiI6MTY3Njk1OTg5MywianRpIjoiNDVjNGYwNzNlNWZmMWFhZDA3ZmJkODQ4MjI3ZGU2MWIifQ.nI-GWaFvMo_2zdcISHnljLOFHG8CeH0x3NHXpb2AAaY&buffer=10&addressType=all`)
        // if lat long in API is only 1dp
        if(!CameradataAndRoadName.data.GeocodeInfo[0]){
          
          CameradataAndRoadName = await axios.get(`https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=${Math.round(element.location.latitude*10)/10},${Math.round(element.location.longitude*10)/10}&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjg0NzksInVzZXJfaWQiOjg0NzksImVtYWlsIjoiY2hld2NoeW91a2VhdGxpb25lbDE3MTJAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHA6XC9cL29tMi5kZmUub25lbWFwLnNnXC9hcGlcL3YyXC91c2VyXC9zZXNzaW9uIiwiaWF0IjoxNjc2OTU5ODkzLCJleHAiOjE2NzczOTE4OTMsIm5iZiI6MTY3Njk1OTg5MywianRpIjoiNDVjNGYwNzNlNWZmMWFhZDA3ZmJkODQ4MjI3ZGU2MWIifQ.nI-GWaFvMo_2zdcISHnljLOFHG8CeH0x3NHXpb2AAaY&buffer=10&addressType=all`)
        }
        //assign into each camera's obj
        element.road = CameradataAndRoadName.data.GeocodeInfo[0].ROAD != 'undefined' ? CameradataAndRoadName.data.GeocodeInfo[0].ROAD :element.camera_id;
        
      }
      setLocations(Cameradata.data.items[0].cameras);
      setIsLoading(false)
      
      
    }

    if(isNaN(props.date.$D) || isNaN(props.date.$M) || isNaN(props.date.$y) ||isNaN(props.time.$H) || isNaN(props.time.$m)){
      return;
    }else{
      fetchCameraData();
    }
    }, [props.date.$D, props.date.$H,props.date.$y, props.time.$H, props.time.$m]);


    const handleClick = async (item) => {
        //query for weather data
        const WeatherData = await axios.get(`https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${dateFormatted}T${hourFormatted}%3A${minFormatted}%3A${secFormatted}%2B08%3A00`);
        //get item's lat/long
        let latLongObj

        for (const camera of locations){
          if(camera.camera_id == item){
            latLongObj = camera.location;
            props.setimgURL(camera.image)
          }
        }
        // get the area name
        const areaName = findClosestLocation(WeatherData.data ,latLongObj.latitude,latLongObj.longitude);
        // get the weather data
        const forecast = WeatherData.data.items[0].forecasts.find(({ area }) => area === areaName)?.forecast;
        props.setweather(forecast);
        

    };

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the earth in km
      const dLat = deg2rad(lat2-lat1);
      const dLon = deg2rad(lon2-lon1); 
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const d = R * c; // Distance in km
      return d;
    }
    
    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }
    
    function findClosestLocation(locations, targetLat, targetLon) {
      let closestLocation = null;
      let closestDistance = Number.MAX_VALUE;
      for (let location of locations.area_metadata) {
        const distance = getDistanceFromLatLonInKm(location.label_location.latitude, location.label_location.longitude, targetLat, targetLon);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestLocation = location.name;
        }
      }
      return closestLocation;
    }

  return (
    <div>
    {IsLoading ? (
      <CircularProgress />
    ) : <List sx={{ overflow: 'auto', maxHeight: '250px' }} className = "border-2">
    {locations.map((item => {
    return (<ListItem button key = {item.camera_id} onClick={() => handleClick(item.camera_id)}>
        <ListItemButton>
            <ListItemText primary={item.road}/>
        </ListItemButton>
      </ListItem>)
    }))

    }
    </List>}

  </div>

    


  );
}

export default Locationlist