import React, { useState } from 'react';
import { useStore } from '../../../Store/Store';
import Button from '../../../Components/UI/Button/Button';
import './AddTaskForm.css';

const AddTaskForm = () => {
  const [taskForm, updateTaskForm] = useState({
    carga: {
      value: 'A',
    },
    descarga: {
      value: 'B',
    },
  });
  const dispatch = useStore(false)[1];

  const pontos = ['A', 'B', 'C', 'D'];
  const carga = pontos.map((x) => {
    return (
      <option key={x} value={x} selected={x === taskForm.carga.value}>
        {x}
      </option>
    );
  });

  const descarga = pontos
    .filter((x) => x !== taskForm.carga.value)
    .map((x) => {
      return (
        <option key={x} value={x} selected={x === taskForm.descarga.value}>
          {x}
        </option>
      );
    });

  const onChangeHandler = (event) => {
    updateTaskForm({
      ...taskForm,
      [event.target.name]: { value: event.target.value },
    });
  };

  const novaTarefahandler = (event) => {
    event.preventDefault();
    dispatch('insertTask', {
      from: taskForm.carga.value,
      to: taskForm.descarga.value,
    });
  };

  return (
    <div>
      <h2>Inserir tarefa:</h2>
      <form onSubmit={novaTarefahandler}>
        <div className="form-group">
          <label for="carga">Ponto de Carga:</label>
          <select
            name="carga"
            id="carga"
            onChange={onChangeHandler}
            className="form-control"
          >
            {carga}
          </select>
        </div>
        <div className='form-group'>
          <label for="descarga">Ponto de Descarga:</label>
          <select
            name="descarga"
            id="descarga"
            onChange={onChangeHandler}
            className="form-control"
          >
            {descarga}
          </select>
        </div>

        <Button
          value="Inserir"
          disabled={taskForm.carga.value === taskForm.descarga.value}
        />
      </form>
    </div>
  );
};

export default AddTaskForm;
