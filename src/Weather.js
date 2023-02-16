import React from 'react'

function Weather(props) {
    const dateFormatted = `${props.date.$y}-${(props.date.$M < 10 ? '0' : '') + props.date.$M}-${(props.date.$D < 10 ? '0' : '') + props.date.$D}`;
    const hourFormatted = `${(props.time.$H < 10 ? '0' : '') + props.time.$H}`
    const minFormatted = `${(props.time.$m < 10 ? '0' : '') + props.time.$m}`
    console.log(dateFormatted)
  return (
    <div>
        <div>Weather is: {props.weather}</div>
        <div>on date: {dateFormatted == 'NaN-NaN-NaN'? '' : dateFormatted}</div>
        <div>at time: {isNaN(hourFormatted) ? '' : hourFormatted}:{isNaN(minFormatted) ? '' : minFormatted}</div>
    </div>
    
  )
}

export default Weather