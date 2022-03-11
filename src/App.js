import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Feedback from './pages/Feedback';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={ (props) => <Login { ...props } /> } />
        <Route path="/settings" component={ Settings } />
        <Route path="/game" render={ (props) => <Game { ...props } /> } />
        <Route path="/feedback" component={ Feedback } />
      </Switch>
    </div>
  );
}
