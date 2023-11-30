import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import PSOViewer from './Containers/PSOViewer/PSOViewer'
import Trajetoria from './Containers/Trajetoria/Trajetoria'
import TaskManager from './Containers/TaskManager/TaskManager'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Switch>
          <Route path="/" exact component={TaskManager} />
          <Route path="/pso" component={PSOViewer} />
          <Route path="/trajetoria" component={Trajetoria} />
        </Switch>
      </DndProvider>
    </div>
  )
}

export default App
