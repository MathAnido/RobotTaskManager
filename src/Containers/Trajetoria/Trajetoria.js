import React, { useMemo, useState } from 'react'
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
import ObstaculoList from '../../Components/UI/ObstaculoList/ObstaculoList'
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)
const Trajetoria = () => {
  const [trajList, setTrajList] = useState([{ x: 0, y: 0 }])
  const [garraList, setGarraList] = useState([{ x: 0, y: 0 }])
  const [Pi, setPi] = useState({ x: 0, y: 0, theta: 90 })
  const [Pf, setPf] = useState({ x: 3500, y: 2100, theta: 180 })
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
  const [obstaculoForm, updateObstaculoForm] = useState({
    x: {
      value: 0,
    },
    y: {
      value: 0,
    },
    radius: {
      value: 0,
    },
  })
  const [loading, setLoading] = useState(false, [])

  const findTrajetoria = () => {
    if (loading || !changed) return
    setLoading(true)
    const piCopy = JSON.parse(JSON.stringify(Pi))
    const pfCopy = JSON.parse(JSON.stringify(Pf))
    const result = TrajPlan(piCopy, pfCopy, obstaculo)
    if (result) {
      setTrajList(result.centro)
      setGarraList(result.garra)
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

  const datasetPontos = [{
    label: 'Ponto Inicial',
    data: [{x: Pi.x, y: Pi.y}],
    showLine: true,
    fill: true,
    borderColor: 'rgba(0, 0, 200, 1)',
    pointRadius: 10
  }, 
  {
    label: 'Ponto Final',
    data: [{x: Pf.x, y: Pf.y}],
    showLine: true,
    fill: true,
    borderColor: 'rgba(0, 200, 0, 1)',
    pointRadius: 10
  }]

  const removeObstaculo = (num) => {
    const newObstaculo = [...obstaculo]
    newObstaculo.splice(num, 1)
    setObstaculo(newObstaculo)
    setChanged(true)
  }

  const newObstaculoHandler = (event) => {
    event.preventDefault()
    if (obstaculo.length === 10) return
    const novo = {
      x: +obstaculoForm.x.value,
      y: +obstaculoForm.y.value,
      radius: +obstaculoForm.radius.value,
    }
    if (novo.x < 0 || novo.x > 4000) return
    if (novo.y < 0 || novo.x > 3000) return
    if (novo.radius < 0 || novo.radius > 400) return

    const newObstaculo = [...obstaculo]
    newObstaculo.push(novo)
    setObstaculo(newObstaculo)
  }

  const obstaculoChangeHandler = (event) => {
    updateObstaculoForm({
      ...obstaculoForm,
      [event.target.name]: { value: event.target.value },
    })
    setChanged(true)
  }

  const inicialChangeHandler = (event) => {
    setPi({
      ...Pi,
      [event.target.name]: { value: event.target.value },
    })
    setChanged(true)
  }

  const finalChangeHandler = (event) => {
    setPf({
      ...Pf,
      [event.target.name]: { value: event.target.value },
    })
    setChanged(true)
  }

  const toggle = (field) => {
    const newView = {
      ...view,
      [field]: !view[field],
    }
    setView(newView)
  }

  return (
    <>
      <div style={{ flex: 1, flexDirection: 'row', display: 'flex' }}>
        <div style={{ width: '70vw' }}>
          <Scatter
            options={{
              scales: {
                x: {
                  max: 4000,
                },
                y: {
                  max: 3000,
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
                ...datasetPontos
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
            disabled={loading || !changed}
            clicked={() => findTrajetoria()}
          />
          <ObstaculoList obstaculo={obstaculo} onRemove={removeObstaculo} />
          <div>
            <h3 onClick={() => toggle('newObstaculo')}>Novo Obstaculo</h3>
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
                  />
                </div>
                <div
                  className="form-group"
                  style={{ flex: 1, display: 'flex' }}
                >
                  <label for="radius">Raio:</label>
                  <input
                    name="radius"
                    id="radius"
                    onChange={obstaculoChangeHandler}
                    className="form-control"
                  />
                </div>

                <Button
                  value="Inserir obstaculo"
                  disabled={obstaculo.length === 10}
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
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Trajetoria
