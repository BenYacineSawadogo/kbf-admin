import React from 'react';
import Sidenav from '../components/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';

export default function Quizz() {
  return (
    <>
    <Navbar/>
    <Box sx={{ display: 'flex', paddingTop: "50px"}}>
    <Sidenav/>


    </Box>
    
    </>
    
  )
}
