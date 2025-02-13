import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import StartPositionCard from '../../Components/UI/StartPositionCard/StartPositionCard'
import EndPositionCard from '../../Components/UI/EndPositionCard/EndPositionCard'
import PSOCard from '../../Components/UI/PSOCard/PSOCard'
import Map from '../../Components/UI/Map/Map'
import { Stack } from '@mui/material'
import Obstaculos from '../../Components/UI/Obstaculos/Obstaculos'


const Home = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {
        window.innerWidth <= 1920 / 2 &&
        <Grid container spacing={2}>
          <Grid size={8}>
            <Stack gap={2}>
              <Map />
              <Obstaculos />
            </Stack>
          </Grid>
          <Grid size={4}>
            <Stack gap={2}>
              <PSOCard />
              <StartPositionCard />
              <EndPositionCard />
            </Stack>
          </Grid>
        </Grid>
      }
      {
        window.innerWidth > 1920 / 2 && 
        <Grid container spacing={2} >
        <Grid size={5}>
          <Map />
        </Grid>
        <Grid size={4}>
          <Obstaculos />
        </Grid>
        <Grid size={3}>
          <Stack gap={2}>
            <PSOCard />
            <StartPositionCard />
            <EndPositionCard />
          </Stack>
        </Grid>
      </Grid>
      }
    </Box>
  )
}

export default Home