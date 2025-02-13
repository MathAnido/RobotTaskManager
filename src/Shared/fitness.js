import interpolacao from './interpolacao'
import { sqrt, pow, sum, min, max } from 'mathjs'
const { cos, sin, abs } = Math
const bracoOffset = 260
const PENALTY = 10000
const fitness = (p, Pi, Pf, flag, nVars, obstaculos, offsetTrajetoria) => {
  let score = 0.0

  let xp = []
  let yp = []
  for(let i = 0; i < nVars; i += 2) {
    xp.push(p[i])
    yp.push(p[i+1])
  }

  xp = [
    Pi.x,
    offsetTrajetoria * cos(Pi.theta) + Pi.x,
    ...xp,
    offsetTrajetoria * cos(Pf.theta) + Pf.x,
    Pf.x,
  ]
  yp = [
    Pi.y,
    offsetTrajetoria * sin(Pi.theta) + Pi.y,
    ...yp,
    offsetTrajetoria * sin(Pf.theta) + Pf.y,
    Pf.y,
  ]
  const centro = interpolacao(xp, yp, flag)
  const diff = []
  const diffTheta = []
  const centroX = []
  const centroY = []
  for (let i = 0; i < centro.length - 1; i++) {
    centroX.push(centro[i].x)
    centroY.push(centro[i].y)
    diff.push({
      x: centro[i + 1].x - centro[i].x,
      y: centro[i + 1].y - centro[i].y,
    })
    diffTheta.push(centro[i + 1].theta - centro[i].theta)
  }
  const ds = diff.map(({ x, y }) => {
    return sqrt(pow(x, 2) + pow(y, 2))
  })
  score += sum(ds)
  score += sum(diffTheta.map(x => abs(x))) //
  let collisionCount = 0
  
  for (let obstaculo of obstaculos) {
    const dist = centro.map(({ x, y }) => {
      return sqrt(pow(x - obstaculo.x, 2) + pow(y - obstaculo.y, 2))
    })
    for (let d of dist) {
      if (d <= obstaculo.radius + bracoOffset) {
        score += PENALTY
        collisionCount+= 1
      }
    }
  }

 
  const maxX = max(...centroX)
  const minX = min(...centroX)
  const maxY = max(...centroY)
  const minY = min(...centroY)
  if (maxX > 5000) score += (maxX - 5000) * PENALTY
  if (minX < 0) score += - minX * PENALTY
  if (maxY > 5000) score += (maxY - 5000) * PENALTY
  if (minY < 0) score += - minY * PENALTY

  if(isNaN(score)) {
    score = 1000000
  }
  
  return { score, collisionCount }
}

export default fitness