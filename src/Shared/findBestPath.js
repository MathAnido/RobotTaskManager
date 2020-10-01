import { find_path } from 'dijkstrajs';
let sum = 0;
let bestPath = [];
let taskOrder = [1, 2, 3];
let bestSum = 999;
let tarefas = {};

//Criação da lista de tarefas
//Para gerar

let graph = {
  A: { B: 10, D: 5 },
  B: { A: 10, C: 10, E: 5 },
  C: { B: 10, F: 5 },
  D: { A: 5, E: 10 },
  E: { B: 5, D: 10, F: 10 },
  F: { C: 5, E: 10 },
};

const troca = (v, a, b) => {
  let aux = v[a];
  v[a] = v[b];
  v[b] = aux;
};

export const findBestPath = (newTarefas, pontoInicial) => {
  tarefas = newTarefas;
  bestSum = 999;
  let tasks = [];
  for (let i in tarefas) {
    tasks.push(+i);
  }
  findBestPathBacktrack(tasks, 0, tasks.length, pontoInicial);
  console.log('Ordem das tarefas: ' + taskOrder);
  console.log('Caminho: ' + bestPath);
  console.log('Distancia: ' + bestSum);
  return taskOrder;
};

const findBestPathBacktrack = (tasks, m, n, inicio) => {
  if (m === n) {
    let path = [];
    //Ponto inicial
    if (tarefas[tasks[0]].from !== inicio) {
      path.push(...find_path(graph, inicio, tarefas[tasks[0]].from));
    }
    //Pontos internos
    for (var i = 0; i < tasks.length - 1; i++) {
      let atual = tasks[i];
      let prox = tasks[i + 1];
      if (tarefas[atual] && tarefas[prox]) {
        //path.push(...find_path(graph, tarefas[atual].from, tarefas[atual].to));
        if (tarefas[atual].to !== tarefas[prox].from) {
          path.push(...find_path(graph, tarefas[atual].to, tarefas[prox].from));
        }
      }
    }
    //Ponto final
    // if (tarefas[n - 1]) {
    //   path.push(
    //     ...find_path(
    //       graph,
    //       tarefas[tasks[n - 1]].from,
    //       tarefas[tasks[n - 1]].to
    //     )
    //   );
    // }

    sum = 0;
    //Somátorio da distância
    for (let i = 0; i < path.length - 1; i++) {
      let node = graph[path[i]];
      if (node[path[i + 1]]) {
        sum += node[path[i + 1]];
      }
    }

    //Verificação se é um caminho melhor
    if (sum < bestSum) {
      bestPath = path;
      taskOrder = tasks.slice();
      bestSum = sum;
    }
  } else {
    //Backtracking
    for (let i = m; i < n; i++) {
      troca(tasks, m, i);
      findBestPathBacktrack(tasks, m + 1, n, inicio);
      troca(tasks, m, i);
    }
  }
};
