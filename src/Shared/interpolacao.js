import {
  zeros,
  atan2,
  dotPow,
  dotDivide,
  dotMultiply,
  add,
  multiply
} from 'mathjs'
import linspace from './linspace'
const { floor } = Math

const Bspline = (x, y, duration, tsEvals) => {
  const n = y.length
  const yy = [y[0], y[0], ...y, y[n - 1], y[n - 1]]
  const xx = [x[0], x[0], ...x, x[n - 1], x[n - 1]]
  const ts = floor(tsEvals / (n + 1))
  const u = linspace(0, 1, ts)
  const uu = dotPow(u, 2)
  const uuu = dotPow(u, 3)
  let pys = zeros([(n + 1) * ts - n])
  let Dpys = zeros([(n + 1) * ts - n])
  let pxs = zeros([(n + 1) * ts - n])
  let Dpxs = zeros([(n + 1) * ts - n])
  let numPonts = 0

  for (let i = 0; i < n + 1; i++) {
    const Cy = add(
      dotDivide(
        dotMultiply(
          add(dotMultiply(uuu, -1), dotMultiply(uu, 3), dotMultiply(u, -3), 1),
          yy[i]
        ),
        6
      ),
      dotDivide(
        dotMultiply(add(dotMultiply(uuu, 3), dotMultiply(uu, -6), 4), yy[i + 1]),
        6
      ),
      dotDivide(
        dotMultiply(
          add(dotMultiply(uuu, -3), dotMultiply(uu, 3), dotMultiply(u, 3), 1),
          yy[i + 2]
        ),
        6
      ),
      dotDivide(multiply(uuu, yy[i + 3]), 6)
    )
    pys.splice(numPonts, ts, ...Cy)


    const DCy = add(
      dotDivide(
        dotMultiply(add(dotMultiply(uu, -1), dotMultiply(u, 2), -1), yy[i]),
        2
      ),
      dotDivide(
        dotMultiply(add(dotMultiply(uu, 9), dotMultiply(u, -12)), yy[i + 1]),
        6
      ),
      dotDivide(
        dotMultiply(add(dotMultiply(uu, -9), dotMultiply(u, 6), 3), yy[i + 2]),
        6
      ),
      dotDivide(dotMultiply(uu, yy[i + 3]), 2)
    )
    Dpys.splice(numPonts, ts, ...DCy)


    const Cx = add(
      dotDivide(
        dotMultiply(
          add(dotMultiply(uuu, -1), dotMultiply(uu, 3), dotMultiply(u, -3), 1),
          xx[i]
        ),
        6
      ),
      dotDivide(
        dotMultiply(add(dotMultiply(uuu, 3), dotMultiply(uu, -6), 4), xx[i + 1]),
        6
      ),
      dotDivide(
        dotMultiply(
          add(dotMultiply(uuu, -3), dotMultiply(uu, 3), dotMultiply(u, 3), 1),
          xx[i + 2]
        ),
        6
      ),
      dotDivide(dotMultiply(uuu, xx[i + 3]), 6)
    )
    pxs.splice(numPonts, ts, ...Cx)


    const DCx = add(
      dotDivide(
        dotMultiply(add(dotMultiply(uu, -1), dotMultiply(u, 2), -1), xx[i]),
        2
      ),
      dotDivide(
        dotMultiply(add(dotMultiply(uu, 9), dotMultiply(u, -12)), xx[i + 1]),
        6
      ),
      dotDivide(
        dotMultiply(add(dotMultiply(uu, -9), dotMultiply(u, 6), 3), xx[i + 2]),
        6
      ),
      dotDivide(dotMultiply(uu, xx[i + 3]), 2)
    )
    Dpxs.splice(numPonts, ts, ...DCx)
    numPonts += ts - 1
  }

  const dt = duration / (n - 1)
  const dx = dotDivide(Dpxs, dt)
  const dy = dotDivide(Dpys, dt)
  const theta = atan2(dy, dx)
  const centro = []
  for (let i = 0; i < (n + 1) * ts - n; i++) {
    centro.push({
      x: pxs[i],
      y: pys[i],
      theta: theta[i],
    })
  }
  centro[(n + 1) * ts - n - 1].theta = centro[(n + 1) * ts - n - 2].theta
  return centro
}

const interpolacao = (xp, yp, flag) => {
  const numPontos = 200
  let centro = []
  if (flag === 1) {
    centro = Bspline(xp, yp, 5, numPontos)
  } else {
    //centro = Reta(xp, yp, numPontos)
  }
  return centro
}

export default interpolacao

