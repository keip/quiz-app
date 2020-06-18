import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/login.component';
import Quiz from './components/quiz.component';
import { Container } from '@material-ui/core';
import './App.css';

import Cookies from 'universal-cookie';

const App = () => {
  const cookies = new Cookies();
  const access_token = cookies.get('access_token');

  if (!access_token && window.location.pathname !== '/login') {
    window.location = '/login';
  } else if (access_token && window.location.pathname === '/login') {
    window.location = '/';
  }

  return (
    <Container fixed>
      <h1 align="center">QuizApp</h1>
      <Router>
        <Route path="/" exact component={Quiz} />
        <Route path="/login" exact component={Login} />
      </Router>
    </Container>
  );
}

export default App;
