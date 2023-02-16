import React from 'react'
import Box from '@mui/material/Box';

function Screenshot(props) {
    const imgURL = props.imgURL
  return (
    <Box
    component="img"
    sx={{
      height: 300,
      width: 350,
      maxHeight: { xs: 233, md: 167 },
      maxWidth: { xs: 350, md: 250 },
    }}
    src = {props.imgURL}

  />
  )
}

export default Screenshot