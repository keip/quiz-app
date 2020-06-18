import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/login.component';
import Quiz from './components/quiz.component';
import './App.css';

import Cookies from 'universal-cookie';

const App = () => {
  const cookies = new Cookies();
  const access_token = cookies.get('access_token');

  if (access_token) {
    return (
      <Router>
        
      </Router>
    );
  }

  return (
    <Router>
      <Route path="/" exact component={Quiz} />
      <Route path="/login" exact component={Login} />
    </Router>
  );
}

export default App;
