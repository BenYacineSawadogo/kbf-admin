import React from 'react';
import Sidenav from '../components/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';
import TestCard from '../components/TestCard';

export default function User() {
  return (
    <>
    <Navbar/>
    <Box sx={{ display: 'flex' }}>
    <Sidenav/>
    <h1>Users</h1>
    <TestCard></TestCard>
    </Box>
    
    </>
    
  )
}
