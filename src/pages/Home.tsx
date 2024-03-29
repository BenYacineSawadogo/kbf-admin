import  React from "react";
import Box from "@mui/material/Box";
import Sidenav from "../components/Sidenav";
import Navbar from "../components/Navbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';


export default function Home() {
  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", paddingTop: "50px"}}>
        <Sidenav />
        <Grid container spacing={2}>
        <Stack spacing={2} direction= 'row'>
          <Grid item xs={8}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Nombre de Quizz
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  65
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={8}>
          <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Nombre User
                </Typography>
                <Typography variant="body2" color="text.secondary">
                 65
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          </Stack>
        </Grid>
      </Box>
    </>
  );
}
