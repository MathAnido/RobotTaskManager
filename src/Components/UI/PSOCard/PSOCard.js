import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import MuiInput from '@mui/material/Input'
import useStore from '../../../Store/Store'

const Input = styled(MuiInput)`
  width: 42px;
`

const PSOCard = () => {
  const offset = useStore(state => state.offset)
  const numPontos = useStore(state => state.numPontos)
  const numTrajetoria = useStore(state => state.numInterpolacao)
  const updateOffset = useStore(state => state.updateOffset)
  const updateNumPontos = useStore(state => state.updateNumPontos)
  const updateInterpolacao = useStore(state => state.updateInterpolacao)

  const handleNumPointsBlur = () => {
    if (numPontos < 0) {
      updateNumPontos(1)
    } else if (numPontos > 10) {
      updateNumPontos(10)
    }
  }

  const handleOffsetBlur = () => {
    if (offset < 200) {
      updateNumPontos(200)
    } else if (offset > 1000) {
      updateNumPontos(1000)
    }
  }

  const handleNumTrajetoriaBlur = () => {
    if (numTrajetoria < 100) {
      updateInterpolacao(100)
    } else if (numTrajetoria > 1000) {
      updateInterpolacao(1000)
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Parâmetros PSO
        </Typography>
        <Stack spacing={2}>
          <Box>
            <Typography id="input-slider" gutterBottom>
              Número de nós (Spline)
            </Typography>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs>
                <Slider
                  value={typeof numPontos === 'number' ? numPontos : 1}
                  onChange={(_, val) => updateNumPontos(+val)}
                  aria-labelledby="input-slider"
                  label="Número de nós"
                  shiftStep={1}
                  step={1}
                  marks
                  min={1}
                  max={10}
                />
              </Grid>
              <Grid item>
                <Input
                  value={numPontos}
                  size="small"
                  onChange={(e) => updateNumPontos(+e.target.value)}
                  onBlur={handleNumPointsBlur}
                  inputProps={{
                    step: 1,
                    min: 1,
                    max: 10,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Typography id="input-slider" gutterBottom>
              Offset (Spline)
            </Typography>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs>
                <Slider
                  value={typeof offset === 'number' ? offset : 500}
                  onChange={(_, val) => updateOffset(+val)}
                  aria-labelledby="input-slider"
                  label="Número de nós"
                  shiftStep={100}
                  step={100}
                  marks
                  min={200}
                  max={1000}
                />
              </Grid>
              <Grid item>
                <Input
                  value={offset}
                  size="small"
                  onChange={(e) => updateOffset(+e.target.value)}
                  onBlur={handleOffsetBlur}
                  inputProps={{
                    step: 10,
                    min: 200,
                    max: 1000,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Typography id="input-slider" gutterBottom>
              Intervalos da trajetória
            </Typography>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs>
                <Slider
                  value={typeof numTrajetoria === 'number' ? numTrajetoria : 200}
                  onChange={(_, val) => updateInterpolacao(+val)}
                  aria-labelledby="input-slider"
                  label="Intervalos da trajetória"
                  shiftStep={100}
                  step={100}
                  marks
                  min={100}
                  max={1000}
                />
              </Grid>
              <Grid item>
                <Input
                  value={numTrajetoria}
                  size="small"
                  onChange={(e) => updateInterpolacao(+e.target.value)}
                  onBlur={handleNumTrajetoriaBlur}
                  inputProps={{
                    step: 10,
                    min: 100,
                    max: 1000,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Stack>        
      </CardContent>
    </Card>
  )
}

export default PSOCard