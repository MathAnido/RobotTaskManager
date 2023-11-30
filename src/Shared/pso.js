import { zeros, add } from 'mathjs'
const { random } = Math
export const PSO = (fitness, N, c1, c2, w, M, D, P0) => {
  let x = zeros([N, D])
  let v = zeros([N, D])
  let pBest = zeros([N, D])
  let pBestScore = zeros([1, N])
  let gBestScore = zeros([1, M])

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < D; j++) {
      x[i][j] = P0[j] + (-100 + 200 * random())
      v[i][j] = 0.3 * random()
    }
  }
  for (let i = 0; i < N; i++) {
    pBestScore[i] = fitness(x[i])
    for (let j = 0; j < D; j++) {
      pBest[i] = x[i]
    }
  }

  let gBest = x[N-1]
  gBestScore[0] = fitness(gBest)
  for(let i = 0; i < N - 1; i++) {
    if(pBestScore[i] < gBestScore[1]) {
      gBest = x[i]
    }
  }

  for(let t = 0; t < M; t++) { //iteracao
    for(let i = 0; i < N; i ++) {//particula
      for(let j = 0; j < D; j++) {
        v[i][j] = w * v[i][j] + c1*random()*(pBest[i]-x[i][j]) + c2*random()*(gBest[i]-x[i][j])
      }
      x[i] = add(x[i], v[i])
      const newPBestScore = fitness(x[i])
      if(newPBestScore < pBestScore[0]) {
        pBestScore[i] = newPBestScore
        pBest[i] = x[i]
      }
      gBestScore[t] = fitness(gBest)
      if(pBestScore[i] < gBestScore[t]) {
        gBest = pBest[i]
      }
    }
  }
  
  return {
    p: gBest,
    fVal: fitness(gBest),
    gBestScore 
  }
}