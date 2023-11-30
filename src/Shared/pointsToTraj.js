import interpolacao from './interpolacao'
const { cos, sin } = Math
const offsetTrajetoria = 500
const bracoOffset = 260
const pointsToTraj = (p, Pi, Pf, flag, nVars) => {
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

  const garra = centro.map((p) => {
    return {
      x: p.x + bracoOffset * cos(p.theta),
      y: p.y + bracoOffset * sin(p.theta),
      theta: p.theta,
    }
  })
  return {
    centro,
    garra,
  }
}

export default pointsToTraj