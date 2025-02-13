import { zeros, add } from 'mathjs'
const { random } = Math
const PSO = (fitness, N, c1, c2, wmax, wmin, M, D, P0) => {
  let x = zeros([N, D])
  let v = zeros([N, D])
  let pBest = zeros([N, D])
  let pBestScore = zeros([1, N])

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < D; j++) {
      x[i][j] = P0[j] -100 + 200  * random()
      v[i][j] = -200 + 400 * random() //0.3
    }
  }
  for (let i = 0; i < N; i++) {
    pBestScore[i] = fitness(x[i]).score
    for (let j = 0; j < D; j++) {
      pBest[i] = x[i]
    }
  }
  
  let gBest = x[N-1]
  let gBestScore = pBestScore[N-1]
  for(let i = 0; i < N - 1; i++) {
    if(pBestScore[i] < gBestScore[0]) {
      gBest = x[i]
      gBestScore = pBestScore[i]
    }
  }
  
  for(let t = 0; t < M; t++) { //iteracao
    for(let i = 0; i < N; i ++) {//particula
      for(let j = 0; j < D; j++) {
        v[i][j] = ((wmax - wmin) * (M - t )/M + wmin) * v[i][j] + c1*random()*(pBest[i][j]-x[i][j]) + c2*random()*(gBest[j]-x[i][j]) 
      }
      x[i] = add(x[i], v[i])
      const { score: newPBestScore, collisionCount } = fitness(x[i])
      if(newPBestScore < pBestScore[i]) {
        pBestScore[i] = newPBestScore
        pBest[i] = x[i]
      }
      if(collisionCount > 0) continue
      
      if(pBestScore[i] < gBestScore) {
        gBest = pBest[i]
        gBestScore = pBestScore[i]
      }
    }
  }
  
  return {
    p: gBest,
    fVal: gBestScore
  }
}

export default PSO