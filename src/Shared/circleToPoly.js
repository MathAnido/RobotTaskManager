import { cos, sin } from 'mathjs'
const circleToPoly = (xc, yc, r, N) => {
  const result = []
  for (let i = 0; i <= N; i++) {
    const theta = (i * 2 * Math.PI) / N
    const x = r * cos(theta) + xc
    const y = r * sin(theta) + yc
    result.push({ x, y })
  }
  return result
}

export default circleToPoly
