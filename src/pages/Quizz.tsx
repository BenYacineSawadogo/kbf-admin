import React from 'react';
import Sidenav from '../components/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';
import QuizzList from './Quizz/QuizzList';

export default function Quizz() {
  return (
    <>
    <Navbar/>
    <Box sx={{ display: 'flex', paddingTop: "50px"}}>
    <Sidenav/>
    <QuizzList/>


    </Box>
    
    </>
    
  )
}
