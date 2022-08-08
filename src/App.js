import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route component={ Game } path="/game" />
      <Route component={ Login } path="/" />
    </Switch>
  );
}
