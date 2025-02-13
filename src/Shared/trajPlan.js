
import trajOtimo from './trajOtimo'
const degtorad = deg => (deg * Math.PI) / 180.0
const TrajPlan = (Pi, Pf, obstaculo = [], numPontos = 1, offsetTrajetoria) => {
  let splineLinear = 1
  let particulas = 20
  let iteracao = 50
  let i = 0
  let result = {}
  Pi.theta = degtorad(Pi.theta)
  Pf.theta = degtorad(Pf.theta)
  do {
    result = trajOtimo(
      Pi,
      Pf,
      numPontos,
      splineLinear,
      obstaculo,
      particulas,
      iteracao,
      offsetTrajetoria,
    )
    if (result.collisionCount > 0) {
      if (i === 2) {
        particulas += 30
        iteracao += 20
      } else if (i === 3) {
        particulas += 50
        iteracao += 30
      }
    } else {
      break
    }
    i++
  } while (i < 20)
  return result
}

export default TrajPlan