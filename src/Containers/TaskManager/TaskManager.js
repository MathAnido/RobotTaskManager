import React from 'react';
import TaskList from '../../Components/UI/TaskList/TaskList';
import AddTaskForm from './AddTaskForm/AddTaskForm';

const TaskManager = () => {
  return (
    <div>
      <AddTaskForm />
      <br />
      <TaskList />
    </div>
  );
};

export default TaskManager;
