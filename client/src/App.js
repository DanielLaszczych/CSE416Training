import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Quiz from './pages/Quiz';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Home} />
      <Route exact path='/quiz/:quizId' component={Quiz} />
    </Router>
  );
}

export default App;
