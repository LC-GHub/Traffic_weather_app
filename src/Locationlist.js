import React, {useState, useEffect} from 'react'

import ListItemText from '@mui/material/ListItemText';
import {Grid, List, ListItem, ListItemButton } from '@mui/material';
import axios from 'axios';
function Locationlist(props) {
    const [locations, setLocations] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    
  useEffect(() => {
    const fetchCameraData = async () => {
      const Cameradata = await axios.get(`https://api.data.gov.sg/v1/transport/traffic-images`);
      // console.log(Cameradata.data.items[0].cameras);
      await Cameradata.data.items[0].cameras.forEach(async element => {
        const CameradataAndRoadName = await axios.get(`https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=${element.location.latitude},${element.location.longitude}&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjg0NzksInVzZXJfaWQiOjg0NzksImVtYWlsIjoiY2hld2NoeW91a2VhdGxpb25lbDE3MTJAZ21haWwuY29tIiwiZm9yZXZlciI6ZmFsc2UsImlzcyI6Imh0dHA6XC9cL29tMi5kZmUub25lbWFwLnNnXC9hcGlcL3YyXC91c2VyXC9zZXNzaW9uIiwiaWF0IjoxNjc2NDY0NjQ5LCJleHAiOjE2NzY4OTY2NDksIm5iZiI6MTY3NjQ2NDY0OSwianRpIjoiNTcxZjZiNmVlN2IyOTljMjU3OTFmZDQ4MjBhYjI4ZGMifQ.hqXUgQ3-A_WiP1J8Qvctytmvz8iD7eNUjGByVAJeTlM&buffer=10&addressType=all`)
       
        element.road = CameradataAndRoadName.data.GeocodeInfo[0] ? CameradataAndRoadName.data.GeocodeInfo[0].ROAD : "-";
      });
      setLocations(Cameradata.data.items[0].cameras);
    }
    fetchCameraData();
    }, []);



//   const handleListItemClick = (event, index) => {
//       setSelectedIndex(index);
//   };
    const handleClick = (item) => {
        console.log(`Clicked ${item}`);
        // Perform other actions as needed when an item is clicked
    };

  return (
    <Grid item xs={12} sx = {{border: 1}}>
    <List sx={{ overflow: 'auto', maxHeight: '150px' }}>
    {locations.map((item => {
    return (<ListItem>
        <ListItemButton>
            <ListItemText primary={item.location.latitude} secondary = {item.location.longitude}/>
        </ListItemButton>
      </ListItem>)
    }))

    }
    </List>
  </Grid>

    
    // {/* <p>
    //   {`LOCATIONS LENGTH: ${locations.length}`}
    //   {JSON.stringify(locations)}
    // </p> */}
    // <div>
    //     {JSON.stringify(props.date)}
    // </div>


  );
}

export default Locationlist