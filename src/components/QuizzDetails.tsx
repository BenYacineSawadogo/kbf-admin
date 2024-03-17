import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Card, CardContent, Typography, CardActions, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import Swal from 'sweetalert2';
import { Quizz } from '../models/Quizz'; // Assurez-vous que le chemin d'importation est correct
import { Answer } from '../models/Answer';

const QuizDetails: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const [quizDetails, setQuizDetails] = useState<Quizz | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: string[] }>({});

  useEffect(() => {
    if (quizId) {
      axios.get<Quizz>(`http://localhost:8080/api/quizzes/${quizId}`)
        .then(response => setQuizDetails(response.data))
        .catch(error => console.error("Erreur lors de la récupération des détails du quiz:", error));
    }
  }, [quizId]);

  const handleSelectAnswer = ( isChecked: boolean,questionId?: string, answerId?: string) => {
    if (!questionId || !answerId) {
      // Peut-être loguer une erreur ou gérer ce cas d'une manière spécifique.
      console.warn("Question ID or Answer ID is undefined.");
      return;
    }
  
    setSelectedAnswers(prev => {
      const updatedAnswers = { ...prev };
      const currentAnswers = updatedAnswers[questionId] || [];
  
      if (isChecked) {
        updatedAnswers[questionId] = [...currentAnswers, answerId];
      } else {
        updatedAnswers[questionId] = currentAnswers.filter(id => id !== answerId);
      }
  
      return updatedAnswers;
    });
  };
  

  const fetchCorrectAnswersAndCalculateScore = async () => {
    if (!quizId) {
      console.error("Quiz ID is undefined");
      return 0;
    }

    try {
      const correctAnswersResponse = await axios.get<Answer[]>(`http://localhost:8080/api/quizzes/correct-answers/${quizId}`);
      const correctAnswers = correctAnswersResponse.data;
      let score = 0;

      correctAnswers.forEach(({ questionId, answerId, correct }) => {
        const qIdStr = questionId?.toString();
        const aIdStr = answerId?.toString();
        if (correct && qIdStr && aIdStr && selectedAnswers[qIdStr]?.includes(aIdStr)) {
          score++;
        }
      });

      return score;
    } catch (error) {
      console.error("Erreur lors de la récupération des réponses correctes :", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      const score = await fetchCorrectAnswersAndCalculateScore();

      Swal.fire({
        title: 'Quiz Terminé!',
        html: `Votre score est : <b>${score}</b>`,
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      Swal.fire('Erreur', 'Impossible de calculer le score.', 'error');
    }
  };

  return (
    <Box sx={{ margin: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {quizDetails?.titre}
          </Typography>
          {quizDetails?.questions.map((question) => (
            <Card key={question.questionId?.toString()} variant="outlined" sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">
                  {question.questionText}
                </Typography>
                <FormGroup>
                  {question.answers.map((answer) => (
                    <FormControlLabel
                    key={`${question.questionId}-${answer.answerId}`} // Combine questionId et answerId pour une clé unique
                    control={
                        <Checkbox 
                        checked={
                          question.questionId !== undefined && answer.answerId !== undefined &&
                          selectedAnswers[question.questionId.toString()]?.includes(answer.answerId.toString()) || false
                        }
                        onChange={(e) => {
                          if (question.questionId !== undefined && answer.answerId !== undefined) {
                            handleSelectAnswer(e.target.checked,question.questionId.toString(), answer.answerId.toString());
                          }
                        }}
                      />
                    }
                    label={answer.text}
                  />
            
                  ))}
                </FormGroup>
              </CardContent>
            </Card>
          ))}
        </CardContent>
        <CardActions>
          <Button size="large" color="primary" variant="contained" onClick={handleSubmit}>
            Valider
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default QuizDetails;
