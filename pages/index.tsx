import type { NextPage } from 'next'
import { Box, Grid, Typography } from '@mui/material'
import { Layout } from '../components/layouts'
import { EntryList, NewEntry } from '../components/ui'

const Home: NextPage = () => {
  return (
    <Layout title='Home | OpenJira'>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} >
          <Box
            marginTop={1}
            sx={{
              height: 'calc(100vh - 100px)'
            }}>
            <Typography variant='h5'>Pending</Typography>
            <NewEntry />
            <EntryList status='pending'/>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} >
          <Box
            marginTop={1}
            sx={{
              height: 'calc(100vh - 100px)'
            }}>
            <Typography variant='h5'>In progress</Typography>
            <EntryList status='in-progress'/>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4} >
          <Box
            marginTop={1}
            sx={{
              height: 'calc(100vh - 100px)'
            }}>
            <Typography variant='h5'>Completed</Typography>
            <EntryList status='completed'/>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default Home
