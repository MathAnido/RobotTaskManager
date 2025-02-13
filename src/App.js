import React from 'react'
import { Route, Routes } from 'react-router'
import PSOViewer from './Containers/PSOViewer/PSOViewer'
import Trajetoria from './Containers/Trajetoria/Trajetoria'
import Layout from './Components/UI/Layout/Layout'
import Home from './Containers/Home'

import CssBaseline from '@mui/material/CssBaseline'

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/pso" element={<PSOViewer />} />
          <Route path="/trajetoria" element={<Trajetoria/>} />
          <Route index element={<Home/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
