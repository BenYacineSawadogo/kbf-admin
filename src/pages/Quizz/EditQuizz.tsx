import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';
import { Question } from '../../models/Question'; // Assurez-vous que le chemin est correct
import { Quizz } from '../../models/Quizz'; // Assurez-vous que le chemin est correct
import { QuestionCard } from '../../components/QuestionCard';

type EditQuizzProps = {
  quizz: Quizz | null;
  open: boolean;
  onClose: () => void;
  onSave: (quizz: Quizz) => void;
};

export const EditQuizz: React.FC<EditQuizzProps> = ({ quizz, open, onClose, onSave }) => {
  const [editedQuizz, setEditedQuizz] = useState<Quizz>({ titre: '', questions: [] });

  useEffect(() => {
    if (quizz && open) {
      setEditedQuizz({ ...quizz });
    }
  }, [quizz, open]);

  const handleQuestionChange = (updatedQuestion: Question, index: number) => {
    const updatedQuestions = editedQuizz.questions.map((question, i) =>
      i === index ? updatedQuestion : question
    );
    setEditedQuizz({ ...editedQuizz, questions: updatedQuestions });
  };

  const handleSave = () => {
    onSave(editedQuizz);
    onClose();
  };
  
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6">Modifier le Quizz</Typography>
        <TextField
          fullWidth
          label="Titre du Quiz"
          value={editedQuizz.titre}
          onChange={(e) => setEditedQuizz(prev => ({ ...prev, titre: e.target.value }))}
          margin="normal"
        />
        {editedQuizz.questions.map((question, index) => (
          <QuestionCard
            key={index}
            question={question}
            onQuestionChange={(updatedQuestion) => handleQuestionChange(updatedQuestion, index)}
          />
        ))}
        <Button onClick={handleSave} sx={{ mt: 2 }}>
          Enregistrer les modifications
        </Button>
      </Box>
    </Modal>
  );
};
