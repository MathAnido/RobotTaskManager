import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Card from '@mui/material/Card'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Typography from '@mui/material/Typography'

import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid2'
import useStore from '../../../Store/Store' 


const FORM_DEFAULT = {
  x: 0,
  y: 0
}

const Obstaculos = () => {
  const obstaculos = useStore(state => state.obstaculos)
  const addObstaculo = useStore(state => state.addObstaculo)
  const deleteObstaculo = useStore(state => state.deleteObstaculo)
  const [obstaculoForm, updateObstaculoForm] = useState(FORM_DEFAULT)

  const removeObstaculo = (num) => {
    deleteObstaculo(num)
    // setChanged(true)
    // socket.emit('obstacles', newObstaculo)
  }

  const obstaculoAddDisabled = () => {
    return obstaculos.length === 10 &&
      obstaculoForm.x > 0 &&
      obstaculoForm.y > 0
  }

  const newObstaculoHandler = (event) => {
    event.preventDefault()
    if (obstaculos.length === 10) return
    const novo = {
      x: +obstaculoForm.x,
      y: +obstaculoForm.y,
      radius: 100,
    }
    if (novo.x < 200 || novo.x > 4800) return
    if (novo.y < 200 || novo.y > 5800) return

    addObstaculo(novo)
    updateObstaculoForm(FORM_DEFAULT)
    // socket.emit('obstacles', newObstaculo)
  }

  const obstaculoChangeHandler = (event) => {
    updateObstaculoForm({
      ...obstaculoForm,
      [event.target.name]: +event.target.value,
    })
    // setChanged(true)
  }

  const handleBlur = (event) => {
    const name = event.target.name
    if (obstaculoForm[name] < 200) {
      updateObstaculoForm(old => ({ ...old, [name]: 200 }))
    } else if (obstaculoForm[name] > 4800) {
      updateObstaculoForm(old => ({ ...old, [name]: 4800 }))
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Card>
          <Typography gutterBottom variant="h6" component="div" sx={{ padding: '8px 0 0px 8px' }}>
            Obstáculos
          </Typography>
          <Table size="small" aria-label="lista de obstaculos">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="right">X</TableCell>
                <TableCell align="right">y</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {obstaculos.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{row.x}</TableCell>
                  <TableCell align="right">{row.y}</TableCell>
                  <TableCell>
                    <IconButton size='small' onClick={() => removeObstaculo(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Grid>
      <Grid size={6}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              Novo Obstáculo
            </Typography>
            <Stack spacing={2}>
              <TextField
                id="xPosition"
                name='x'
                label="Eixo X"
                variant="standard"
                value={obstaculoForm.x}
                size='small'
                type='number'
                onChange={obstaculoChangeHandler}
                onBlur={handleBlur}
              />
              <TextField
                id="YPosition"
                name='y'
                label="Eixo Y"
                variant="standard"
                value={obstaculoForm.y}
                size='small'
                type='number'
                onChange={obstaculoChangeHandler}
                onBlur={handleBlur}
              />
              <Stack direction={'row'} spacing={2}>
                <Button size="small" color='success' variant='contained' fullWidth onClick={newObstaculoHandler} disabled={obstaculoAddDisabled()}>Adicionar</Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Obstaculos
