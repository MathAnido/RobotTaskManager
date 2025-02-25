import linspace from './linspace'
import fitness from './fitness'
import PSO from './pso'
import pointsToTraj from './pointsToTraj'
const { cos, sin } = Math
const trajOtimo = (Pi, Pf, pontos, flag, obstaculo, particulas, iteracao, offsetTrajetoria = 500) => {
  const nVars = pontos * 2
  if(Pi.theta === 2 * Math.PI) Pi.theta = 0
  Pf.theta += Math.PI
  if(Pf.theta === 2 * Math.PI) Pf.theta = 0

  const pontosX = linspace(
    offsetTrajetoria * cos(Pi.theta) + Pi.x,
    offsetTrajetoria * cos(Pf.theta) + Pf.x,
    pontos + 2
  )
  const pontosY = linspace(
    offsetTrajetoria * sin(Pi.theta) + Pi.y,
    offsetTrajetoria * sin(Pf.theta) + Pf.y,
    pontos + 2
  )
  
  let P0 =  []
  for(let i = 0; i < pontos + 2; i++) {
    P0.push(pontosX[i])
    P0.push(pontosY[i])
  }
  P0 = P0.splice(2, pontos*2 + 2)
  const objetivo = (P) => fitness(P, Pi, Pf, flag, nVars, obstaculo, offsetTrajetoria)
  const { p, fVal } = PSO(
    objetivo,
    particulas,
    1.49, //2.05
    1.49, //2.05
    0.9, // 0.9
    0.4,
    iteracao,
    nVars,
    P0
  )
  const { centro, garra, vertices } = pointsToTraj(p, Pi, Pf, flag, nVars, offsetTrajetoria)
  garra.shift()
  return {
    centro,
    garra,
    vertices,
    fVal,
  }
}

export default trajOtimo