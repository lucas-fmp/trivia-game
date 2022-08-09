import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route component={ Login } exact path="/" />
      <Route component={ Game } path="/game" />
      <Route component={ Feedback } path="/feedback" />
      <Route component={ Settings } path="/settings" />
    </Switch>
  );
}
