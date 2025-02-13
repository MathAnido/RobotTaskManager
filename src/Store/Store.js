import {create} from 'zustand'
import socket from '../Shared/socket'

const useStore = create((set, get) => ({
  changed: true,
  numPontos: 1,
  updateNumPontos: (val) => set({numPontos: val}),
  numInterpolacao: 200,
  updateInterpolacao: (val) => set({numInterpolacao: val}),
  offset: 500,
  updateOffset: (val) => set({offset: val}),
  Pi: { x: 2000, y: 2500, theta: 90 },
  Pf: { x: 3000, y: 2500, theta: 90 },
  updatePi: (val) => set((state) => {
    const newPi = {...state.Pi, ...val }
    socket.emit('startPosition', newPi)
    return { Pi: newPi}
  }),
  updatePf: (val) => set((state) => {
    const newPf =  {...state.PF, ...val }
    socket.emit('finishPosition', newPf)
    return { Pf: newPf }
  }),
  trajList: [{ x: 0, y: 0 }],
  garraList: [{ x: 0, y: 0 }],
  vertices: [{ x: 0, y: 0 }],
  updateTrajetoria: (val => set({ trajList: val.trajList, garraList: val.garraList, vertices: val.vertices, changed: false })),
  obstaculos: [],
  addObstaculo: (ob) => set((state) => {
    const newObstaculo = [...state.obstaculos]
    newObstaculo.push(ob)
    socket.emit('obstacles', newObstaculo)
    return { obstaculos: newObstaculo, changed: true}
  }),
  deleteObstaculo: (index => set((state) => {
    const newObstaculo = [...state.obstaculos]
    newObstaculo.splice(index, 1)
    socket.emit('obstacles', newObstaculo)
    return { obstaculos: newObstaculo, changed: true }
  })),
  presets: [
    {
      Pi: { x: 2000, y: 2500, theta: 90 },
      Pf: { x: 3000, y: 3000, theta: 90 },
      obstaculos: [],
      numPontos: 1,
      offset: 500,
      numInterpolacao: 200,
    },
    {
      Pi: { x: 1000, y: 2500, theta: 0 },
      Pf: { x: 3000, y: 3000, theta: 0 },
      obstaculos: [
        { x: 2000, y: 3000, radius: 100 },
        { x: 2500, y: 2500, radius: 100 }
      ],
      numPontos: 1,
      offset: 300,
      numInterpolacao: 200,
    },
    {
      Pi: { x: 1000, y: 2500, theta: 270 },
      Pf: { x: 4000, y: 2500, theta: 90 },
      obstaculos: [
        { x: 2500, y: 2500, radius: 100 }
      ],
      numPontos: 1,
      offset: 300,
      numInterpolacao: 200,
    },
    {
      Pi: { x: 3000, y: 2500, theta: 90 },
      Pf: { x: 2000, y: 2500, theta: 0 },
      obstaculos: [
        { x: 2500, y: 2500, radius: 100 },
        { x: 2700, y: 2500, radius: 100 },
        { x: 2300, y: 2500, radius: 100 },
        { x: 2700, y: 2700, radius: 100 },
        { x: 2300, y: 2700, radius: 100 },
        { x: 2500, y: 2900, radius: 100 },
        { x: 2700, y: 2900, radius: 100 },
        { x: 2300, y: 2900, radius: 100 },
      ],
      numPontos: 1,
      offset: 900,
      numInterpolacao: 200,
    },
    {
      Pi: { x: 500, y: 4500, theta: 90 },
      Pf: { x: 4500, y: 500, theta: 90 },
      obstaculos: [
        { x: 2300, y: 2500, radius: 100 },
        { x: 2500, y: 2700, radius: 100 },
        { x: 2700, y: 2900, radius: 100 },
      ],
      numPontos: 1,
      offset: 500,
      numInterpolacao: 400,
    }
  ],
  loadPreset: (index) => set((state) => {
    const presetData = state.presets[index]
    socket.emit('startPosition', presetData.Pi)
    socket.emit('finishPosition', presetData.Pf)
    socket.emit('obstacles', presetData.obstaculos)
    return { ...presetData, garraList: [], trajList: [], vertices: [] }
  }),
  sendTrajetoria: () => {
    const trajList = get().trajList
    const changed = get().changed
    if(trajList.length <= 1 || changed) return  
    console.log(trajList)  
    socket.emit('message', trajList)
  }
}))

export default useStore
