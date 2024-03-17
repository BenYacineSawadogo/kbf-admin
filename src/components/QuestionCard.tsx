import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

import { Question } from '../models/Question';

import { Answer } from '../models/Answer';


type QuestionCardProps = {
    question: Question;
    onQuestionChange: (updatedQuestion: Question) => void;
  };
  
  export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onQuestionChange }) => {
    const [questionText, setQuestionText] = useState(question.questionText);
    const [answers, setAnswers] = useState<Answer[]>(question.answers);
  
    const handleAnswerChange = (text: string, index: number) => {
      const newAnswers = answers.map((answer, i) => 
        i === index ? { ...answer, text: text } : answer
      );
      setAnswers(newAnswers);
      onQuestionChange({ ...question, questionText, answers: newAnswers });
    };
  
    const handleCorrectChange = (index: number) => {
      const newAnswers = answers.map((answer, i) => 
        i === index ? { ...answer, correct: !answer.correct } : answer
      );
      setAnswers(newAnswers);
      onQuestionChange({ ...question, questionText, answers: newAnswers });
    };
  
    const addAnswer = () => {
      const newAnswers = [...answers, { text: '', correct: false }];
      setAnswers(newAnswers);
      onQuestionChange({ ...question, questionText, answers: newAnswers });
    };
  
    return (
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Question</Typography>
          <TextField
            fullWidth
            label="Question"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            margin="normal"
          />
          {answers.map((answer, index) => (
            <div key={index}>
              <TextField
                fullWidth
                label={`Réponse ${index + 1}`}
                value={answer.text}
                onChange={(e) => handleAnswerChange(e.target.value, index)}
                margin="normal"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={answer.correct}
                    onChange={() => handleCorrectChange(index)}
                  />
                }
                label="Correcte"
              />
            </div>
          ))}
          <Button onClick={addAnswer} sx={{ mt: 1 }}>Ajouter Réponse</Button>
        </CardContent>
      </Card>
    );
  };