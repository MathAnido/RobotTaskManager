import { Scatter } from 'react-chartjs-2'
import CircleToPoly from '../../../Shared/circleToPoly'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import useStore from '../../../Store/Store'

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)


const Map = () => {
  const obstaculos = useStore(state => state.obstaculos)
  const Pi = useStore(state => state.Pi)
  const Pf = useStore(state => state.Pf)
  const trajList = useStore(state => state.trajList)
  const garraList = useStore(state => state.garraList)
  const vertices = useStore(state => state.vertices)
  let datasetRobo = []

  const datasetObstaculo = 
    obstaculos.map((el, index) => {
      return {
        label: `Obstáculo #${index + 1}`,
        data: CircleToPoly(el.x, el.y, el.radius, 16),
        showLine: true,
        fill: false,
        borderColor: 'rgba(200, 0, 0, 1)',
        pointRadius: 0,
      }
    }) || []

  const datasetVertices = [
    {
      label: 'Vertices Spline',
      data: [...vertices],
      showLine: false,
      hidden: true,
      fill: true,
      borderColor: 'rgb(123, 207, 67)',
      pointRadius: 10,
    },
  ]

  const datasetPontos =[
    {
      label: 'Ponto Inicial',
      data: [{ x: Pi.x, y: Pi.y }],
      showLine: true,
      fill: true,
      borderColor: 'rgba(0, 0, 200, 1)',
      pointRadius: 10,
    },
    {
      label: 'Ponto Final',
      data: [{ x: Pf.x, y: Pf.y }],
      showLine: true,
      fill: true,
      borderColor: 'rgba(0, 200, 0, 1)',
      pointRadius: 10,
    },
  ]

  return (
    <Card>
      <CardContent>
        <Scatter
          options={{
            responsive: true,
            aspectRatio: 1,
            scales: {
              x: {
                min: 0,
                max: 5000,
              },
              y: {
                min: 0,
                max: 5000,
              },
            },
            plugins: {
              legend: {
                  labels: {
                      filter: item => item.text !== 'none'
                  }
              }
            }
          }}
          data={{
            datasets: [
              {
                label: 'Robô',
                data: trajList,
                showLine: true,
                fill: false,
                borderColor: 'rgba(0, 0, 0, 1)',
                pointRadius: 0,
              },
              {
                label: 'Frente robô',
                data: garraList,
                showLine: true,
                fill: false,
                borderColor: 'rgba(0, 0, 0, 0.2)',
                pointRadius: 0,
              },
              ...datasetObstaculo,
              ...datasetPontos,
              ...datasetRobo,
              ...datasetVertices,
            ],
          }}
        />
      </CardContent>
    </Card>
  )
}

export default Map