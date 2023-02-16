import React from 'react'

function Weather(props) {
    const dateFormatted = `${props.date.$y}-${(props.date.$M < 10 ? '0' : '') + props.date.$M}-${(props.date.$D < 10 ? '0' : '') + props.date.$D}`;
    const hourFormatted = `${(props.time.$H < 10 ? '0' : '') + props.time.$H}`
    const minFormatted = `${(props.time.$m < 10 ? '0' : '') + props.time.$m}`
    const secFormatted = `${(props.time.$s < 10 ? '0' : '') + props.time.$s}`
  return (
    <div>
        <div>Weather data: {props.weather}</div>
        <div>on date: {dateFormatted}</div>
        <div>at time: {hourFormatted}:{minFormatted}</div>
    </div>
    
  )
}

export default Weather