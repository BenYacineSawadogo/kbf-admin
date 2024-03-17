import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const TestCard = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Titre du Quiz
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Nombre de questions: 10
        </Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardActions>
        <Button size="small" color="primary">
          Essayer
        </Button>
      </CardActions>
    </Card>
  );
};

export default TestCard;
