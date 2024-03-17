import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Quizz } from "../models/Quizz";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate depuis react-router-dom

const ListQuiz: React.FC = () => {
  const [quizzes, setQuizzes] = useState<Quizz[]>([]);
  const navigate = useNavigate(); // Utilisez useNavigate pour la redirection

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/quizzes/quizzList');
        setQuizzes(response.data);
      } catch (error) {
        console.error("There was an error fetching the quiz list:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizClick = (quizId: number | undefined) => {
    if (quizId !== undefined) {
      navigate(`/quiz-details/${quizId}`);
    } else {
      console.error('Quiz ID is undefined');
    }
  };

  return (
    <Grid container spacing={4}>
      {quizzes.map((quiz) => (
        <Grid item key={quiz.quizzId} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', m: 2 }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {quiz.titre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nombre de questions: {quiz.questions.length}
              </Typography>
            </CardContent>
            <Divider variant="middle" />
            <CardActions sx={{ justifyContent: 'center', padding: 2 }}>
              <Button 
                size="small" 
                color="primary" 
                variant="contained" 
                onClick={() => quiz.quizzId !== undefined && handleQuizClick(quiz.quizzId)} // Assurez-vous que quizId n'est pas undefined
              >
                Essayer
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListQuiz;
