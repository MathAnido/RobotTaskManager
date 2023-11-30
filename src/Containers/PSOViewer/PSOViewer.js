import React, { useCallback, useState, useEffect } from 'react'
import './PSOViewer.css'
import Button from '../../Components/UI/Button/Button'
import { useDrag, useDrop } from 'react-dnd'
const PSOViewer = () => {
  const [pontos, setPontos] = useState([])
  const [pontoFinal, setPontoFinal] = useState({ x: -20, y: 50 })
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 })
  const [localCoords, setLocalCoords] = useState({ x: 0, y: 0 })

  const initPopulation = useCallback((size) => {
    let pop = []
    pop.push({
      //Posicao do Robo
      sx: Math.random() * 800,
      sy: Math.random() * 600,
      pBest: { x: 0, y: 0, fitness: 999 },
      //Velocidade do robo
      vx: Math.random(),
      vy: Math.random(),
      id: 'robo',
    })
    for (let i = 1; i < size; i++) {
      pop.push({
        sx: Math.random() * 800,
        sy: Math.random() * 600,
        pBest: { x: 0, y: 0, fitness: 999 },
        vx: Math.random(),
        vy: Math.random(),
        id: 'bird' + i,
      })
    }
    return pop
  }, [])

  const initHandler = useCallback(() => {
    let newPop = initPopulation(11)
    setPontos(newPop)

    let final = { x: Math.random() * 800, y: Math.random() * 600 }
    setPontoFinal(final)
  }, [initPopulation])

  const psoStep = () => {
    pso(pontoFinal)
  }

  const psoStart = () => {
    pso2(pontoFinal)
  }

  const fitness = (part, pos) => {
    return Math.sqrt(
      Math.pow(pos.x - part.sx, 2) + Math.pow(pos.y - part.sy, 2)
    )
  }

  const pso = (pontoFinal) => {
    let gBest = { x: 0, y: 0, fitness: 999 }
    let c1 = 2.05
    let c2 = 2.05
    let w = 0.5
    let j = 0
    let population = pontos.slice()
    do {
      //gBest.fitness = 999;
      for (let part of population) {
        let partFit = fitness(part, pontoFinal)
        if (partFit <= part.pBest.fitness) {
          part.pBest.x = part.sx
          part.pBest.y = part.sy
          part.pBest.fitness = partFit
        }
        if (partFit <= gBest.fitness) {
          gBest.x = part.sx
          gBest.y = part.sy
          gBest.fitness = partFit
        }
      }
      for (let part of population) {
        part.vx =
          w * part.vx +
          c1 * Math.random() * (part.pBest.x - part.sx) +
          c2 * Math.random() * (gBest.x - part.sx)
        part.vy =
          w * part.vy +
          c1 * Math.random() * (part.pBest.y - part.sy) +
          c2 * Math.random() * (gBest.y - part.sy)
        part.sx = part.sx + part.vx
        part.sy = part.sy + part.vy
      }
      setPontos(population)
      j++
    } while (j < 5)
  }

  const pso2 = (pontoFinal) => {
    let gBest = { x: 0, y: 0, fitness: 999 }
    let c1 = 2.05
    let c2 = 2.05
    let w = 0.5
    let population = pontos.slice()
    do {
      //gBest.fitness = 999;
      for (let part of population) {
        let partFit = fitness(part, pontoFinal)
        if (partFit <= part.pBest.fitness) {
          part.pBest.x = part.sx
          part.pBest.y = part.sy
          part.pBest.fitness = partFit
        }
        if (partFit <= gBest.fitness) {
          gBest.x = part.sx
          gBest.y = part.sy
          gBest.fitness = partFit
        }
      }
      for (let part of population) {
        part.vx =
          w * part.vx +
          c1 * Math.random() * (part.pBest.x - part.sx) +
          c2 * Math.random() * (gBest.x - part.sx)
        part.vy =
          w * part.vy +
          c1 * Math.random() * (part.pBest.y - part.sy) +
          c2 * Math.random() * (gBest.y - part.sy)
        part.sx = part.sx + part.vx
        part.sy = part.sy + part.vy
        //changePosition(part.id, part.sx, part.sy);
      }
      setPontos(population)
    } while (fitness(pontos[0], pontoFinal) > 0.1)
  }

  let list = null 
  if (pontos.length) {
    list = pontos.map((pkey) => {
      return (
        <rect
          id={pkey.id}
          x={pkey.sx}
          y={pkey.sy}
          width="1"
          height="1"
          key={pkey.id}
        />
      )
    })
  }

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'BLOCK',
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  )

  const [, drop] = useDrop(
    () => ({
      accept: 'BLOCK',
      drop: () => setPontoFinal({ x: globalCoords.x - 20, y: globalCoords.y }),
    }),
    [globalCoords]
  )

  useEffect(() => {
    const handleGlobalMouseMove = (event) => {
      setGlobalCoords({
        x: event.clientX,
        y: event.clientY,
      })
    }
    window.addEventListener('mouseup', handleGlobalMouseMove)

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseMove)
    }
  }, [])

  return (
    <>
      <div>
        <svg
          id="canvas-svg"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="900"
          height="600"
          ref={drop}
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
          {list}
          <rect
            id="final"
            x={pontoFinal.x}
            y={pontoFinal.y}
            width="10"
            height="10"
          />
        </svg>
        <div ref={dragRef} style={{ opacity }}>
          Bloco
        </div>
      </div>
      <div>
        <Button value="Inserir" disabled={false} />
      </div>
      <div>
        <button onClick={initHandler}>Inicializar</button>
        <button onClick={psoStep}>Step</button>
        <button onClick={psoStart}>PSO</button>
      </div>
      Relative: ({localCoords.x}, {localCoords.y}) Global: ({globalCoords.x},{' '}
      {globalCoords.y})
      <div>
        <p>{pontos && pontos.length ? 'Vx: ' + pontos[0].vx : null}</p>
        <p>{pontos && pontos.length ? 'Vy: ' + pontos[0].vy : null}</p>
        <p>{pontos && pontos.length ? 'Sx: ' + pontos[0].sx : null}</p>
        <p>{pontos && pontos.length ? 'Sy: ' + pontos[0].sy : null}</p>
      </div>
    </>
  )
}

export default PSOViewer
