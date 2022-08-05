import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route component={ Login } exact path="/" />
      <Route component={ Game } path="/game" />
    </Switch>
  );
}
