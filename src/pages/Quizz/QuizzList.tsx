import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TablePagination,
  Typography, Stack, Modal, Divider
} from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Swal from "sweetalert2";
import { Quizz } from '../../models/Quizz'; // Assurez-vous que le chemin est correct
import { EditQuizz } from './EditQuizz';// Assurez-vous que le chemin est correct
import { QuizzForm } from '../../components/QuizzForm';

// Définissez le type pour les colonnes
type Column = {
  id: 'quizzId' | 'titre' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
};

const columns: Column[] = [
  { id: 'quizzId', label: 'ID du Quizz', minWidth: 100, align: 'left' },
  { id: 'titre', label: 'Titre du Quizz', minWidth: 200, align: 'left' },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' },
];

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

export default function QuizzList() {
  const [quizzData, setQuizzData] = useState<Quizz[]>([]);
  const [selectedQuizz, setSelectedQuizz] = useState<Quizz | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [quizFormOpen, setQuizFormOpen] = useState(false);

  const fetchQuizzData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/quizzes/quizzList');
      setQuizzData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données des quizz", error);
    }
  };
  
  useEffect(() => {
    fetchQuizzData();
  }, []);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditQuizz = (quizz: Quizz) => {
    setSelectedQuizz(quizz);
    setEditModalOpen(true);
  };

  const handleDeleteQuizz = async (quizzId: number) => {
    const result = await Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le!',
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/quizzes/deleteQuizz/${quizzId}`);
        Swal.fire('Supprimé!', 'Le quizz a été supprimé avec succès.', 'success');
        setQuizzData(quizzData.filter(q => q.quizzId !== quizzId));
      } catch (error) {
        console.error("Erreur lors de la suppression du quizz", error);
        Swal.fire('Erreur!', 'Une erreur est survenue lors de la suppression du quizz.', 'error');
      }
    }
  };

  return (
    <>
      
      
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Typography variant="h5" component="div" sx={{ padding: "20px" }}>
          Listes Quizz
        </Typography>
        <Divider />
        <Stack direction="row" spacing={2} sx={{ padding: "20px" }}>
          <Button variant="contained" endIcon={<AddCircleIcon />} onClick={() => setQuizFormOpen(true)}>
            Ajouter Quizz
          </Button>
        </Stack>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {quizzData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((quizz) => (
                <TableRow hover tabIndex={-1} key={quizz.quizzId}>
                  <TableCell>{quizz.quizzId}</TableCell>
                  <TableCell>{quizz.titre}</TableCell>
                  <TableCell align="center">
                    <EditIcon color="primary" style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEditQuizz(quizz)} />
                    <DeleteIcon color="error" style={{ cursor: 'pointer' }} onClick={() => handleDeleteQuizz(quizz.quizzId!)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={quizzData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <QuizzForm open={quizFormOpen} onClose={() => setQuizFormOpen(false)} onQuizSaved={fetchQuizzData} />
    </>
  );
}
