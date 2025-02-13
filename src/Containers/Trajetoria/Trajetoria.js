import React, { useState } from 'react'
import { Scatter } from 'react-chartjs-2'
import Slider from '@mui/material/Slider'
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
import socket from '../../Shared/socket'
import ObstaculoList from '../../Components/UI/ObstaculoList/ObstaculoList'
import { sqrt, pow, zeros, cos, sin, pi} from 'mathjs'
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)
const FORM_DEFAULT = {
  x: {
    value: 0,
  },
  y: {
    value: 0,
  }
}
const Trajetoria = () => {
  const [trajList, setTrajList] = useState([{ x: 0, y: 0 }])
  const [garraList, setGarraList] = useState([{ x: 0, y: 0 }])
  const [vertices, setVertices] = useState([{ x: 0, y: 0 }])
  const [Pi, setPi] = useState({ x: 2500, y: 2500, theta: 90 })
  const [Pf, setPf] = useState({ x: 2500, y: 2500, theta: 180 })
  const [numPontos, setNumPontos] = useState(1)
  const [offset, setOffset] = useState(500)
  const [changed, setChanged] = useState(true)
  const [view, setView] = useState({
    obstaculo: true,
    newObstaculo: true,
    posicaoInicial: true,
    posicaoFinal: true,
  })
  const [obstaculo, setObstaculo] = useState(
    [
      { x: 1000, y: 1500, radius: 360 },
      { x: 1760, y: 1740, radius: 120 },
      { x: 1440, y: 1740, radius: 120 },
      { x: 1760, y: 1260, radius: 120 },
      { x: 2240, y: 1260, radius: 120 },
    ],
    []
  )
  const [obstaculoForm, updateObstaculoForm] = useState(FORM_DEFAULT)
  const [loading, setLoading] = useState(false, [])
  let datasetRobo = []
  const findTrajetoria = () => {
    if (loading) return
    setLoading(true)
    const piCopy = JSON.parse(JSON.stringify(Pi))
    const pfCopy = JSON.parse(JSON.stringify(Pf))
    const result = TrajPlan(piCopy, pfCopy, obstaculo, numPontos, offset)
    if (result) {
      setTrajList(result.centro)
      setGarraList(result.garra)
      setVertices(result.vertices)
      plotRobot(result.centro, result.garra)
    }
    setChanged(false)
    setLoading(false)
  }
  const datasetObstaculo =
    obstaculo.map((el, index) => {
      return {
        label: `Obstaculo ${index + 1}`,
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

  const datasetPontos = [
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

  const robotPlot = (centro, robotWidth) => {
    const Dia = sqrt(pow(robotWidth / 2, 2) + pow(robotWidth / 2, 2))
    const Robot = zeros([8])
    const { x, y, theta } = centro
    Robot[0] = x + Dia * cos(theta + pi / 4)
    Robot[1] = y + Dia * sin(theta + pi / 4)
    Robot[2] = x + Dia * cos(theta + (3 * pi) / 4)
    Robot[3] = y + Dia * sin(theta + (3 * pi) / 4)
    Robot[4] = x + Dia * cos(theta - (3 * pi) / 4)
    Robot[5] = y + Dia * sin(theta - (3 * pi) / 4)
    Robot[6] = x + Dia * cos(theta - pi / 4)
    Robot[7] = y + Dia * sin(theta - pi / 4)

    return [
      {
        label: `Robô`,
        data: [
          {
            x: Robot[0],
            y: Robot[1],
          },
          {
            x: Robot[2],
            y: Robot[3],
          },
          {
            x: Robot[4],
            y: Robot[5],
          },
          {
            x: Robot[6],
            y: Robot[7],
          },
          {
            x: Robot[0],
            y: Robot[1],
          },
        ],
        showLine: true,
        fill: true,
        borderColor: 'rgba(200, 200, 0, 1)',
        pointRadius: 0,
      },
    ]
  }

  const plotRobot = (centro, garra) => {
    const N = centro.length
     //robotPlot(centro[0], 300)
    for (let i = 0; i < N; i++) {
      datasetRobo = robotPlot(centro[0], 300)
    }
  }

  //datasetRobo =
   // plotRobot([{ x: Pi.x, y: Pi.y, theta: (Pi.theta * Math.PI) / 180.0 }]) || []
  const removeObstaculo = (num) => {
    const newObstaculo = [...obstaculo]
    newObstaculo.splice(num, 1)
    setObstaculo(newObstaculo)
    setChanged(true)
    socket.emit('obstacles', newObstaculo)
  }

  const obstaculoAddDisabled = () => {
    return (
      obstaculo.length === 10 &&
      obstaculoForm.x.value >= 0 &&
      obstaculoForm.y.value >= 0 &&
      obstaculoForm.radius.value > 0
    )
  }

  const newObstaculoHandler = (event) => {
    event.preventDefault()
    if (obstaculo.length === 10) return
    const novo = {
      x: +obstaculoForm.x.value,
      y: +obstaculoForm.y.value,
      radius: 100,
    }
    if (novo.x < 0 || novo.x > 5000) return
    if (novo.y < 0 || novo.y > 5000) return

    const newObstaculo = [...obstaculo]
    newObstaculo.push(novo)
    setObstaculo(newObstaculo)
    updateObstaculoForm(FORM_DEFAULT)
    socket.emit('obstacles', newObstaculo)
  }

  const obstaculoChangeHandler = (event) => {
    let value = +event.target.value
    if (value > 5000) value = 5000
    if (value < 0) value = 100
    updateObstaculoForm({
      ...obstaculoForm,
      [event.target.name]: { value },
    })
    setChanged(true)
  }

  const inicialChangeHandler = (event) => {
    let value = parseInt(event.target.value)
    if (value < 0) value = 200
    if (value > 4800) value = 4800
    const newPi = {
      ...Pi,
      [event.target.name]: value,
    }

    setPi(newPi)
    setChanged(true)
  }

  const finalChangeHandler = (event) => {
    let value = parseInt(event.target.value)
    if (value < 0) value = 200
    if (value > 4800) value = 4800
    setPf({
      ...Pf,
      [event.target.name]: value,
    })
    setChanged(true)
  }

  const updatePiHandler = () => {
    socket.emit('startPosition', Pi)
  }

  const updatePfHandler = () => {
    socket.emit('finishPosition', Pf)
  }

  const toggle = (field) => {
    const newView = {
      ...view,
      [field]: !view[field],
    }
    setView(newView)
  }

  const sendTrajetoriaHandler = () => {
    if(trajList.length <= 1 || changed) return    
    socket.emit('message', trajList)
  }

  return (
    <>
      <div style={{ flex: 1, flexDirection: 'row', display: 'flex' }}>
        <div style={{ width: '70vw', height: '70vw' }}>
          <Scatter
            options={{
              responsive: true,
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
              // elements: {
              //   point: {
              //     radius: 0,
              //   },
              // },
            }}
            data={{
              datasets: [
                {
                  label: 'Robô 1',
                  data: trajList,
                  showLine: true,
                  fill: false,
                  borderColor: 'rgba(0, 0, 0, 1)',
                  pointRadius: 0,
                },
                {
                  label: 'Garra robo 1',
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
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '20vw',
            margin: '30px',
          }}
        >
          <Button
            value="Achar trajetória"
            // disabled={loading || !changed}
            clicked={() => findTrajetoria()}
          />
          <Button
            value="Executar trajetória"
            disabled={loading || changed}
            clicked={() => sendTrajetoriaHandler()}
          />
          <div
            className="form-group"
            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            <label>Número de nós:</label>
            <Slider
              aria-label="Nós"
              defaultValue={1}
              valueLabelDisplay="auto"
              shiftStep={1}
              label="Número de nós"
              onChange={(_, val) => setNumPontos(+val)}
              step={1}
              marks
              min={1}
              max={10}
            />
          </div>

          <div
            className="form-group"
            style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
          >
            <label>Offset:</label>
            <Slider
              aria-label="Offset"
              defaultValue={500}
              valueLabelDisplay="auto"
              shiftStep={100}
              label="Offset"
              onChange={(_, val) => setOffset(+val)}
              step={10}
              marks
              min={200}
              max={1000}
            />
          </div>
          
          <ObstaculoList obstaculo={obstaculo} onRemove={removeObstaculo} />
          <div>
            <h3 onClick={() => toggle('newObstaculo')}>Novo Obstáculo</h3>
            {view.newObstaculo && (
              <form onSubmit={newObstaculoHandler}>
                <div
                  className="form-group"
                  style={{ flex: 1, display: 'flex' }}
                >
                  <label for="x">X:</label>
                  <input
                    name="x"
                    id="x"
                    onChange={obstaculoChangeHandler}
                    className="form-control"
                    value={obstaculoForm.x.value}
                  />
                </div>
                <div
                  className="form-group"
                  style={{ flex: 1, display: 'flex' }}
                >
                  <label for="y">Y:</label>
                  <input
                    name="y"
                    id="y"
                    onChange={obstaculoChangeHandler}
                    className="form-control"
                    value={obstaculoForm.y.value}
                  />
                </div>

                <Button
                  value="Inserir obstaculo"
                  disabled={obstaculoAddDisabled()}
                />
              </form>
            )}
          </div>
          <h3 onClick={() => toggle('posicaoInicial')}>Posição inicial</h3>
          {view.posicaoInicial && (
            <div>
              <div className="form-group" style={{ flex: 1, display: 'flex' }}>
                <label for="x">X:</label>
                <input
                  name="x"
                  id="x"
                  onChange={inicialChangeHandler}
                  className="form-control"
                  value={Pi.x}
                />
              </div>
              <div className="form-group" style={{ flex: 1, display: 'flex' }}>
                <label for="y">Y:</label>
                <input
                  name="y"
                  id="y"
                  onChange={inicialChangeHandler}
                  className="form-control"
                  value={Pi.y}
                />
              </div>
              <div className="form-group" style={{ flex: 1, display: 'flex' }}>
                <label for="radius">Ângulo:</label>
                <input
                  name="theta"
                  id="theta"
                  onChange={inicialChangeHandler}
                  className="form-control"
                  value={Pi.theta}
                />
              </div>
              <Button
                value="Atualizar posição inicial"
                clicked={updatePiHandler}
              />
            </div>
          )}
          <h3 onClick={() => toggle('posicaoFinal')}>Posição final</h3>
          {view.posicaoFinal && (
            <div>
              <div className="form-group" style={{ flex: 1, display: 'flex' }}>
                <label for="x">X:</label>
                <input
                  name="x"
                  id="x"
                  onChange={finalChangeHandler}
                  className="form-control"
                  value={Pf.x}
                />
              </div>
              <div className="form-group" style={{ flex: 1, display: 'flex' }}>
                <label for="y">Y:</label>
                <input
                  name="y"
                  id="y"
                  onChange={finalChangeHandler}
                  className="form-control"
                  value={Pf.y}
                />
              </div>
              <div className="form-group" style={{ flex: 1, display: 'flex' }}>
                <label for="theta">Ângulo:</label>
                <input
                  name="theta"
                  id="theta"
                  onChange={finalChangeHandler}
                  className="form-control"
                  value={Pf.theta}
                />
              </div>
              <Button
                value="Atualizar posição final"
                clicked={updatePfHandler}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Trajetoria
