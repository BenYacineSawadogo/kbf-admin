import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { QuizzForm } from '../../components/QuizzForm';
import Typography from '@mui/material/Typography';

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
  overflowY: 'auto', // Ajout pour gérer le défilement si nécessaire
  maxHeight: '90vh', // Limite la hauteur pour éviter le débordement
};

export default function AddQuizz() {
 
  return (
    <div>
        <Box sx={style}>
          {/* Vous pouvez ajuster ou retirer ces Typographies selon vos besoins */}
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ajouter un nouveau Quiz
          </Typography>
        </Box>
    </div>
  );
}
