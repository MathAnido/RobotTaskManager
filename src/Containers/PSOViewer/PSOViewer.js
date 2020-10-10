import React, { useCallback, useEffect } from 'react';
import './PSOViewer.css';
const PSOViewer = () => {
  const initPopulation = (size) => {
    let pop = [];
    pop.push({
      //Posicao do Robo
      sx: Math.random() * 800,
      sy: Math.random() * 600,
      pBest: { x: 0, y: 0, fitness: 999 },
      //Velocidade do robo
      vx: Math.random(),
      vy: Math.random(),
      id: 'robo',
    });
    for (let i = 1; i < size; i++) {
      pop.push({
        sx: Math.random() * 800,
        sy: Math.random() * 600,
        pBest: { x: 0, y: 0, fitness: 999 },
        vx: Math.random(),
        vy: Math.random(),
        id: 'bird' + i,
      });
    }
    return pop;
  };

  const initHandler = useCallback(() => {
    pontos = initPopulation(11);
    for (let part of pontos) {
      changePosition(part.id, part.sx, part.sy);
    }
    pontoFinal = { x: Math.random() * 800, y: Math.random() * 600 };
    changePosition('final', pontoFinal.x, pontoFinal.y);
  }, [initPopulation]);

  useEffect(() => initHandler, [initHandler]);
  const changePosition = (id, x, y) => {
    let rectSVG = document.getElementById(id);
    rectSVG.setAttributeNS(null, 'x', x);
    rectSVG.setAttributeNS(null, 'y', y);
  };
  let pontos = null;
  let pontoFinal = { x: Math.random() * 800, y: Math.random() * 600 };

  const psoStep = () => {
    pso(pontoFinal);
  };

  const psoStart = () => {
    pso2(pontoFinal);
  };

  const fitness = (part, pos) => {
    return Math.sqrt(
      Math.pow(pos.x - part.sx, 2) + Math.pow(pos.y - part.sy, 2)
    );
  };

  const pso = (pontoFinal) => {
    let gBest = { x: 0, y: 0, fitness: 999 };
    let c1 = 2.05;
    let c2 = 2.05;
    let w = 0.5;
    let j = 0;
    do {
      //gBest.fitness = 999;
      for (let part of pontos) {
        let partFit = fitness(part, pontoFinal);
        if (partFit <= part.pBest.fitness) {
          part.pBest.x = part.sx;
          part.pBest.y = part.sy;
          part.pBest.fitness = partFit;
        }
        if (partFit <= gBest.fitness) {
          gBest.x = part.sx;
          gBest.y = part.sy;
          gBest.fitness = partFit;
        }
      }
      for (let part of pontos) {
        part.vx =
          w * part.vx +
          c1 * Math.random() * (part.pBest.x - part.sx) +
          c2 * Math.random() * (gBest.x - part.sx);
        part.vy =
          w * part.vy +
          c1 * Math.random() * (part.pBest.y - part.sy) +
          c2 * Math.random() * (gBest.y - part.sy);
        part.sx = part.sx + part.vx;
        part.sy = part.sy + part.vy;
        changePosition(part.id, part.sx, part.sy);
      }
      j++;
    } while (j < 5);
    // } while (fitness(pontos[0], pontoFinal) > 0.1);
  };

  const pso2 = (pontoFinal) => {
    let gBest = { x: 0, y: 0, fitness: 999 };
    let c1 = 2.05;
    let c2 = 2.05;
    let w = 0.5;
    do {
      //gBest.fitness = 999;
      for (let part of pontos) {
        let partFit = fitness(part, pontoFinal);
        if (partFit <= part.pBest.fitness) {
          part.pBest.x = part.sx;
          part.pBest.y = part.sy;
          part.pBest.fitness = partFit;
        }
        if (partFit <= gBest.fitness) {
          gBest.x = part.sx;
          gBest.y = part.sy;
          gBest.fitness = partFit;
        }
      }
      for (let part of pontos) {
        part.vx =
          w * part.vx +
          c1 * Math.random() * (part.pBest.x - part.sx) +
          c2 * Math.random() * (gBest.x - part.sx);
        part.vy =
          w * part.vy +
          c1 * Math.random() * (part.pBest.y - part.sy) +
          c2 * Math.random() * (gBest.y - part.sy);
        part.sx = part.sx + part.vx;
        part.sy = part.sy + part.vy;
        changePosition(part.id, part.sx, part.sy);
      }
    } while (fitness(pontos[0], pontoFinal) > 0.1);
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  return (
    <>
      <div>
        <svg
          id="canvas-svg"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="800"
          height="600"
        >
          <line x1="0.5" y1="0" x2="0.5" y2="600" />
          <line x1="49.5" y1="0" x2="49.5" y2="600" />
          <line x1="99.5" y1="0" x2="99.5" y2="600" />
          <line x1="149.5" y1="0" x2="149.5" y2="600" />
          <line x1="199.5" y1="0" x2="199.5" y2="600" />
          <line x1="249.5" y1="0" x2="249.5" y2="600" />
          <line x1="299.5" y1="0" x2="299.5" y2="600" />
          <line x1="349.5" y1="0" x2="349.5" y2="600" />
          <line x1="399.5" y1="0" x2="399.5" y2="600" />
          <line x1="449.5" y1="0" x2="449.5" y2="600" />
          <line x1="499.5" y1="0" x2="499.5" y2="600" />
          <line x1="549.5" y1="0" x2="549.5" y2="600" />
          <line x1="599.5" y1="0" x2="599.5" y2="600" />
          <line x1="649.5" y1="0" x2="649.5" y2="600" />
          <line x1="699.5" y1="0" x2="699.5" y2="600" />
          <line x1="749.5" y1="0" x2="749.5" y2="600" />
          <line x1="799.5" y1="0" x2="799.5" y2="600" />

          <line x1="0" y1="49.5" x2="800" y2="49.5" />
          <line x1="0" y1="99.5" x2="800" y2="99.5" />
          <line x1="0" y1="149.5" x2="800" y2="149.5" />
          <line x1="0" y1="199.5" x2="800" y2="199.5" />
          <line x1="0" y1="249.5" x2="800" y2="249.5" />
          <line x1="0" y1="299.5" x2="800" y2="299.5" />
          <line x1="0" y1="349.5" x2="800" y2="349.5" />
          <line x1="0" y1="399.5" x2="800" y2="399.5" />
          <line x1="0" y1="449.5" x2="800" y2="449.5" />
          <line x1="0" y1="499.5" x2="800" y2="499.5" />
          <line x1="0" y1="549.5" x2="800" y2="549.5" />
          <line x1="0" y1="599.5" x2="800" y2="599.5" />

          <rect id="robo" x="20" y="50" width="10" height="10" />
          <rect id="bird1" x="20" y="50" width="10" height="10" />
          <rect id="bird2" x="20" y="50" width="10" height="10" />
          <rect id="bird3" x="20" y="50" width="10" height="10" />
          <rect id="bird4" x="20" y="50" width="10" height="10" />
          <rect id="bird5" x="20" y="50" width="10" height="10" />
          <rect id="bird6" x="20" y="50" width="10" height="10" />
          <rect id="bird7" x="20" y="50" width="10" height="10" />
          <rect id="bird8" x="20" y="50" width="10" height="10" />
          <rect id="bird9" x="20" y="50" width="10" height="10" />
          <rect id="bird10" x="20" y="50" width="10" height="10" />

          <rect
            id="final"
            x={pontoFinal.x}
            y={pontoFinal.y}
            width="10"
            height="10"
          />
        </svg>
      </div>
      <div>
        <button onClick={initHandler}>Reinicializar</button>
        <button onClick={psoStep}>Step</button>
        <button onClick={psoStart}>PSO</button>
      </div>
    </>
  );
};

export default PSOViewer;
