import { useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Outlet } from 'react-router'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Button from '@mui/material/Button'
import useStore from '../../../Store/Store'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import TrajPlan from '../../../Shared/trajPlan'

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })
}))

export default function PersistentDrawerLeft() {
  const [loading, setLoading] = useState(false)
  const presets = useStore(state => state.presets)
  const changed = useStore(state => state.changed)
  const loadPreset = useStore(state => state.loadPreset)
  const sendTrajetoria = useStore(state => state.sendTrajetoria)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const obstaculos = useStore(state => state.obstaculos)
  const Pi = useStore(state => state.Pi)
  const Pf = useStore(state => state.Pf)
  const numPontos = useStore(state => state.numPontos)
  const offset = useStore(state => state.offset)
  const updateTrajetoria = useStore(state => state.updateTrajetoria)
  const findTrajetoria = async () => {
    if (loading) return
    setLoading(true)
    const piCopy = JSON.parse(JSON.stringify(Pi))
    const pfCopy = JSON.parse(JSON.stringify(Pf))
    new Promise((res, rej) => {
      try {
        const result = TrajPlan(piCopy, pfCopy, obstaculos, numPontos, offset)
        res(result)
      } catch(e) {
        rej(e)
      }
    }).then((result) => {
      updateTrajetoria({
        trajList: result.centro,
        garraList: result.garra,
        vertices: result.vertices
      })
      setLoading(false)
    })    
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const calculateTime = () => {
    const times = []
    const piCopy = JSON.parse(JSON.stringify(Pi))
    const pfCopy = JSON.parse(JSON.stringify(Pf))
    const N = 10
    setLoading(true)
    for (let i = 0; i < N;i ++) {
      if (loading) return
      const initial = performance.now()
      TrajPlan(piCopy, pfCopy, obstaculos, numPontos, offset)
      const final = performance.now()
      times.push((final - initial)/1000)
    }
    const media = times.reduce((acc, val) => acc + val / N , 0)
    console.log(`Tempo Médio 1: ${media.toFixed(2)}`)
    setLoading(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Robot Manager
          </Typography>
          <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={calculateTime}
            color="inherit"
          >
            10x
          </Button>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            color="inherit"
          >
            Experimentos
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {
              presets.map((entry, index) => {
                return <MenuItem onClick={() => {loadPreset(index); handleClose()}} key={index}>{`Experimento #${index + 1}`}</MenuItem>
              })
            }
          </Menu>            
            <Button variant="text" color="inherit" onClick={findTrajetoria} loading={loading}>Calcular Trajetória</Button>
            <IconButton aria-label="play" disabled={changed} variant="contained" color="inherit" onClick={sendTrajetoria}>
              <PlayArrowIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Box sx={(theme)=> ({ flexGrow: 1, padding: theme.spacing(1), marginTop: '70px'})}>
        <Outlet />
      </Box>
    </Box>
  )
}