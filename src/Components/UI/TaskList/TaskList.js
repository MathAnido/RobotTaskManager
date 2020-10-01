import React, { useCallback } from 'react';
import { useStore } from '../../../Store/Store';
import ListEntry from './ListEntry/ListEntry';
import Button from '../Button/Button';

import { findBestPath } from '../../../Shared/findBestPath';
import './TaskList.css';

const TaskList = (props) => {
  const [store, dispatch] = useCallback(useStore());

  const onRemove = (id) => {
    dispatch('removeTask', id - 1);
  };

  const onOptimize = () => {
    if (store.tarefas.length) {
      let taskOrder = findBestPath(store.tarefas, 'C');
      dispatch('reorderTask', taskOrder);
    }
  };

  let list = 'Loading...';
  if (store.tarefas) {
    list = store.tarefas.map((x, index) => {
      return (
        <ListEntry
          key={index}
          number={index + 1}
          carga={x.from}
          descarga={x.to}
          onRemove={onRemove}
        />
      );
    });
  }
  if (list.length === 0) {
    list = (
      <tr>
        <td colSpan="4">
          <h4>Não há tarefas</h4>
        </td>
      </tr>
    );
  }
  return (
    <div>
      <h2>Tarefas:</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Carga</th>
            <th>Descarga</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
      <Button value="Otimizar" clicked={onOptimize} />
      <Button value="Executar" />
    </div>
  );
};

export default TaskList;
