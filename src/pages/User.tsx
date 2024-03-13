import React from 'react';
import Sidenav from '../components/Sidenav';
import Box from '@mui/material/Box';
import Navbar from '../components/Navbar';

export default function User() {
  return (
    <>
    <Navbar/>
    <Box sx={{ display: 'flex' }}>
    <Sidenav/>
      <h1>User</h1>
    </Box>
    
    </>
    
  )
}
