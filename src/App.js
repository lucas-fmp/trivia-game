import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <Switch>
      <Route component={ Game } path="/game" />
      <Route component={ Login } exact path="/" />
      <Route component={ Feedback } path="/feedback" />
    </Switch>
  );
}
