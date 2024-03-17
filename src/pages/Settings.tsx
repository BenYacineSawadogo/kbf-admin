import React, { useEffect, useState } from "react";
import axios from 'axios';
import Box from "@mui/material/Box";
import Sidenav from "../components/Sidenav";
import Navbar from "../components/Navbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';

// Assurez-vous que le modèle Quizz correspond à la structure de vos données
import { Quizz } from '../models/Quizz'; 
import ListQuiz from "../components/List";

export default function Settings() {
  const [quizzes, setQuizzes] = useState<Quizz[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/quizzes/quizzList');
        setQuizzes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des quiz:", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <>
      <Navbar />
      <Box sx={{ display: "flex", paddingTop: "50px" }}>
        <Sidenav />
        <ListQuiz></ListQuiz>
      </Box>
    </>
  );
}
