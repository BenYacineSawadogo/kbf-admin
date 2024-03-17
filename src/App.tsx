import { useState } from 'react';
import './App.css';
import Sidenav from './components/Sidenav';
import{Routes, Route, BrowserRouter} from "react-router-dom";
import Home from './pages/Home';
import User from './pages/User';
import Settings from './pages/Settings';
import Quizz from './pages/Quizz';
import QuizDetails from './components/QuizzDetails';
import ListQuiz from './components/List';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Sidenav/>
        <Routes>
          <Route path="/"  element={<Home></Home>} />
          <Route path="/quizz"  element={<Quizz></Quizz>} />
          <Route path="/users"  element={<User></User>} />
          <Route path="/settings"  element={<Settings></Settings>} />
          <Route path="/quiz-details/:quizId" element={<QuizDetails></QuizDetails>} />
          <Route path="/quizList" element={<ListQuiz></ListQuiz>} />
        </Routes>
      </BrowserRouter>
    
    
    </>
  )
}

export default App
