
import trajOtimo from './trajOtimo'
const degtorad = deg => (deg * Math.PI) / 180.0
export const TrajPlan = (Pi, Pf, obstaculo = []) => {
  let numPontos = 1
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
      iteracao
    )
    const { fval } = result
    if (fval === -1) {
      if (i === 2) {
        particulas += 30
        iteracao += 20
      } else if (i === 3) {
        particulas += 50
        iteracao += 30
      } else if (i === 4) {
        console.log(
          'Posicao inicial ou final ou trajetoria em pontos proibidos'
        )
      }
    } else {
      break;
    }
    i++;
  } while (i < 5 || result.fVal !== -1)
  //plotar o robo
}