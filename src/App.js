import React from 'react';
import './App.css';
import TaskList from './Components/UI/TaskList/TaskList';
import AddTaskForm from './Containers/AddTaskForm/AddTaskForm';

function App() {
  return (
    <div className="App">
      <AddTaskForm/>
      <br />
      <TaskList/>
    </div>
  );
}

export default App;
