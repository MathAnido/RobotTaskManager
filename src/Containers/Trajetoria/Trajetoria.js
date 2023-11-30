import React, { useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import './Trajetoria.css'
import CircleToPoly from '../../Shared/circleToPoly'
import Button from '../../Components/UI/Button/Button'
import TrajPlan from '../../Shared/trajPlan'
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)
const obstaculo = [
  { x: 1000, y: 1500, radius: 360 },
  { x: 1760, y: 1740, radius: 120 },
  { x: 1440, y: 1740, radius: 120 },
  { x: 1760, y: 1260, radius: 120 },
  { x: 2240, y: 1260, radius: 120 }
]
const Trajetoria = () => {
  const [trajList, setTrajList] = useState([{x: 0, y: 0}])
  const [garraList, setGarraList] = useState([{x: 0, y: 0}])

  const findTrajetoria = () => {
    console.log('FINDING')
    
    const Pi = { x: 0, y: 0, theta: 90 }
    const Pf = { x: 3500, y: 2100, theta: 180 }
    const result = TrajPlan(Pi, Pf, obstaculo)
    console.log(result)
    if(result) {
      setTrajList(result.centro)  
      setGarraList(result.garra)
    }
  }
  const datasetObstaculo = obstaculo.map((el, index) => {
    return {
      label: `Obstaculo ${index + 1}`,
      data: CircleToPoly(el.x, el.y, el.radius, 16),
      showLine: true,
      fill: false,
      borderColor: 'rgba(200, 0, 0, 1)'
    }
  }) || []

  return (
    <>
      <div>
        <Scatter
          options={{
            scales: {
              x: {
                max: 4000,
              },
              y: {
                max: 3000
              }
            },
            elements: {
              point:{
                radius: 0
              }
            }
          }}
          data={{
            datasets: [{
              label: 'Robô 1',
              data: trajList,
              showLine: true,
              fill: false,
              borderColor: 'rgba(0, 0, 200, 1)'
            },
            {
              label: 'Garra robo 1',
              data: garraList,
              showLine: true,
              fill: false,
              borderColor: 'rgba(0, 200, 0, 1)'
            },
            ...datasetObstaculo
          ],
          }}
        />
      </div>
      <div>
        <Button value="Achar trajetória" clicked={() => findTrajetoria()} />
      </div>
    </>
  )
}

export default Trajetoria
