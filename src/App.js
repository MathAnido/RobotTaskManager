import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import PSOViewer from './Containers/PSOViewer/PSOViewer';
import TaskManager from './Containers/TaskManager/TaskManager';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={TaskManager} />
        <Route path="/pso" component={PSOViewer} />
      </Switch>
    </div>
  );
}

export default App;
