import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { Question } from '../models/Question'; // Assurez-vous que le chemin est correct
import { Quizz } from '../models/Quizz'; // Assurez-vous que le chemin est correct
import { QuestionCard } from './QuestionCard'; // Assurez-vous que le chemin est correct
import { useNavigate } from 'react-router-dom';
import { Modal, Box } from '@mui/material';
import Swal from "sweetalert2";



interface QuizFormProps {
  open: boolean;
  onClose: () => void;
  onQuizSaved: () => void; 
}

export const QuizzForm: React.FC<QuizFormProps> = ({ open, onClose ,onQuizSaved}) => {
    const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([{
    questionText: "",
    answers: [{ text: "", correct: false }]
  }]);

  const handleQuestionChange = (updatedQuestion: Question, index: number) => {
    const updatedQuestions = questions.map((question, i) => i === index ? updatedQuestion : question);
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", answers: [{ text: "", correct: false }] }]);
  };

  const resetForm = () => {
    setQuizTitle('');
    setQuestions([{ questionText: "", answers: [{ text: "", correct: false }] }]);
  };

  const saveQuiz = async () => {
    const quizData: Quizz = {   
      titre: quizTitle,
      questions: questions,
    };
    try {
        await axios.post('http://localhost:8080/api/quizzes/createQuizz', quizData);
        // Réinitialiser tout l'état du formulaire ici
        resetForm();
        onClose();
        onQuizSaved();
        navigate('/quizz');
        Swal.fire({
          title: 'Succès!',
          text: 'Le quiz a été enregistré avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error("Erreur lors de l'enregistrement du quiz :", error.response.data);
        } else {
          console.error("Erreur lors de l'enregistrement du quiz :", error);
          Swal.fire({
            title: 'Erreur!',
            text: "Une erreur s'est produite lors de l'enregistrement du quiz.",
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    };
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 600,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    //  overflowY: 'auto', 
    };

    const scrollableContentStyle = {
      maxHeight: '70vh', // Ajustez en fonction de la hauteur désirée
      overflowY: 'auto',
    };

  return (
      <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
      <Box sx={scrollableContentStyle}>
      <Container maxWidth="sm">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Créer un nouveau quiz
        </Typography>
        <TextField
          fullWidth
          label="Titre du Quiz"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          margin="normal"
        />
        {questions.map((question, index) => (
          <QuestionCard
            key={index}
            question={question}
            onQuestionChange={(updatedQuestion) => handleQuestionChange(updatedQuestion, index)}
          />
        ))}
        <Button onClick={addQuestion} sx={{ mt: 2 }}>Ajouter Question</Button>
        <Button onClick={saveQuiz} sx={{ mt: 2, mr: 1 }}>Enregistrer Quiz</Button>
        <Button onClick={onClose} sx={{ mt: 2 }}>Fermer</Button>
      </Container>

      </Box>
    </Box>
  </Modal>
);
};
