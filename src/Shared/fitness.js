import interpolacao from './interpolacao'
import { sqrt, pow, sum } from 'mathjs'
const { cos, sin, min, max } = Math
const offsetTrajetoria = 500
const bracoOffset = 260
const fitness = (p, Pi, Pf, flag, nVars, obstaculos) => {
  let score = 0
  const xp = [
    Pi.x,
    offsetTrajetoria * cos(Pi.theta) + Pi.x,
    p[0],
    offsetTrajetoria * cos(Pf.theta) + Pf.x,
    Pf.x,
  ]
  const yp = [
    Pi.y,
    offsetTrajetoria * sin(Pi.theta) + Pi.y,
    p[1],
    offsetTrajetoria * sin(Pf.theta) + Pf.y,
    Pf.y,
  ]
  const centro = interpolacao(xp, yp, flag)
  console.log(centro)
  const diff = []
  const diffTheta = []
  for (let i = 0; i < centro.length - 1; i++) {
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
  score += sum(diffTheta)

  for (const obstaculo of obstaculos) {
    const dist = centro.map(({ x, y }) => {
      return sqrt(pow(x - obstaculo.x, 2) + pow(y - obstaculo.y, 2))
    })
    if (min(dist) < obstaculo.radius + bracoOffset) {
      score += min(dist) * 10000
    }
  }

  const maxX = max(xp)
  const minX = min(xp)
  const maxY = max(yp)
  const minY = min(yp)
  if (maxX > 4000) score += (maxX - 4000) * 10000
  if (minX < 0) score -= minX * 10000
  if (maxY > 3000) score += (maxY - 3000) * 10000
  if (minY < 0) score -= minY * 10000

  const dd = []
  for (let i = 2; i < nVars / 2 + 3; i++) {
    dd.push({
      x: xp[i + 1] - xp[i],
      y: yp[i + 1] - yp[i],
    })
  }
  const coisa = dd.map(({ x, y }) => {
    return sqrt(pow(x, 2) + pow(y, 2))
  })
  return score + max(coisa)
}

export default fitness