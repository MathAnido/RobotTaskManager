import React, { useEffect, useState } from 'react'
import './PSOViewer.css'
import Button from '../../Components/UI/Button/Button'
import TrajPlan from '../../Shared/trajPlan.js'
const Trajetoria = () => {
  const [traj, setTraj] = useState()

  const findTrajetoria = () => {
    const obstaculo = [
      { x: 1000, y: 1500, radius: 360 },
      { x: 1760, y: 1740, radius: 120 },
      { x: 1440, y: 1740, radius: 120 },
      { x: 1760, y: 1260, radius: 120 },
      { x: 2240, y: 1260, radius: 120 }
    ]
    const Pi = { x: 0, y: 0, theta: 90 }
    const Pf = { x: 3500, y: 2100, theta: 0 }
    const { centro, garra } = TrajPlan(Pi, Pf, obstaculo)
    setTraj(centro.map((p, index) => {
      return (
        <rect
          id={index}
          x={p.x}
          y={p.y}
          width="1"
          height="1"
          key={index}
        />
      )
    }))  
  }



  return (
    <>
      <div>
        <svg
          id="canvas-svg"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="900"
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
          {traj}
        </svg>
      </div>
      <div>
        <Button value="Achar trajetória" disabled={false} onClick={() => findTrajetoria()} />
      </div>
    </>
  )
}

export default Trajetoria
