import { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Slider from '@mui/material/Slider'
import MuiInput from '@mui/material/Input'
import useStore from '../../../Store/Store'


const Input = styled(MuiInput)`
  width: 42px;
`

const StartPositionCard = () => {
  const [PfForm, setPfForm] = useState({ x: 3000, y: 2500, theta: 90 })
  const Pf = useStore(state => state.Pf)
  const updatePf = useStore(state => state.updatePf)
  const handleBlur = (event) => {
    const name = event.target.name
    if (PfForm[name] < 200) {
      setPfForm(old => ({ ...old, [name]: 200 }))
    } else if (PfForm[name] > 4800) {
      setPfForm(old => ({ ...old, [name]: 4800 }))
    }
  }

  const changeHandler = (event) => {
    let value = parseInt(event.target.value)

    setPfForm(oldPf => {
      return {
        ...oldPf,
        [event.target.name]: value,
      }
    })
  }

  const changeTheta = (val) => {
    if (val >= 360) val = 0
    setPfForm(oldPf => {
      return {
        ...oldPf,
        theta: val,
      }
    })
  }

  const saveHandler = () => {
    updatePf(PfForm)
  }

  const resetHandler = () => {
    setPfForm(Pf)
  }

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Posição final
        </Typography>
        <Stack spacing={2}>
          <Stack direction={'row'} spacing={2}>
            <TextField
              id="xPosition"
              name='x'
              label="Eixo X"
              variant="standard"
              value={PfForm.x}
              size='small'
              type='number'
              onChange={changeHandler}
              onBlur={handleBlur}
            />
            <TextField
              id="YPosition"
              name='y'
              label="Eixo Y"
              variant="standard"
              value={PfForm.y}
              size='small'
              type='number'
              onChange={changeHandler}
              onBlur={handleBlur}
            />
          </Stack>
          <Box>
            <Typography id="input-slider" gutterBottom>
              Ângulo
            </Typography>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid item xs>
                <Slider
                  value={typeof PfForm.theta === 'number' ? PfForm.theta : 500}
                  onChange={(_, val) => changeTheta(+val)}
                  aria-labelledby="input-slider"
                  label="Número de nós"
                  shiftStep={10}
                  step={90}
                  marks
                  min={0}
                  max={360}
                />
              </Grid>
              <Grid item>
                <Input
                  value={PfForm.theta}
                  size="small"
                  onChange={(e) => changeTheta(+e.target.value)}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 10,
                    min: 0,
                    max: 360,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Stack direction={'row'} spacing={2}>
            <Button size="small" color='error' variant='contained' fullWidth onClick={resetHandler}>Resetar</Button>
            <Button size="small" color='success' variant='contained' fullWidth onClick={saveHandler}>Salvar</Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default StartPositionCard