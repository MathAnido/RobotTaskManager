import { initStore } from './Store';
const configureStore = () => {
  const actions = {
    insertTask: (state, payload) => {
      const Tarefas = state.tarefas;
      Tarefas.push(payload);
      return {
        tarefas: Tarefas,
      };
    },
    removeTask: (state, payload) => {
      const Tarefas = state.tarefas;
      Tarefas.splice(payload, 1);
      return {
        tarefas: Tarefas,
      };
    },
    reorderTask: (state, payload) => {
      const Tarefas = state.tarefas;
      const newTarefas = [];
      //reodernar
      for (let i in payload) {
        newTarefas.push(Tarefas[payload[i]]);
      }
      return {
        tarefas: newTarefas,
      };
    },
  };

  initStore(actions, { tarefas: [] });
};

export default configureStore;
