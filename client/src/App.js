import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import NoMatch from './pages/NoMatch';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/quiz/:quizId' component={Quiz} />
          <Route path='*' component={NoMatch} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
