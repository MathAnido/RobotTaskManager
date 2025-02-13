import interpolacao from './interpolacao'
const { cos, sin } = Math
const bracoOffset = 260
const pointsToTraj = (p, Pi, Pf, flag, nVars, offsetTrajetoria) => {

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

  const garra = centro.map((p) => {
    return {
      x: p.x + bracoOffset * cos(p.theta),
      y: p.y + bracoOffset * sin(p.theta),
      theta: p.theta,
    }
  })
  const vertices = []
  for(let i = 1; i < xp.length - 1; i++) {
    vertices.push({x: xp[i], y: yp[i]})
  }
  return {
    centro,
    garra,
    vertices,
  }
}

export default pointsToTraj