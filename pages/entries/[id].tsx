import { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { GetServerSideProps } from 'next'
import { capitalize, Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { getDateDistanceToNow } from '../../utils'
import { dbEntries } from '../../database'
import { EntriesContext } from '../../context/entries'
import { Entry, EntryStatus } from '../../interfaces'
import { Layout } from '../../components/layouts'

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'completed']

interface Props {
  entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext)

  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const isNotValidForm = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value as EntryStatus)
  }

  const onSave = () => {
    if (inputValue.trim().length === 0) return

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue
    }

    updateEntry(updatedEntry, true)
  }

  return (
    <Layout title={inputValue.substring(0, 20) + '...'}>
      <Grid
        container
        justifyContent='center'
        sx={{
          marginTop: 2
        }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title={'Entry'}
              subheader={`created ${getDateDistanceToNow(entry.createdAt)} ago`}
            />
            <CardContent>
              <TextField
                sx={{
                  marginBottom: 1
                }}
                fullWidth
                placeholder='New entry'
                autoFocus
                multiline
                label='New entry'
                value={inputValue}
                onChange={handleInputChange}
                helperText={isNotValidForm && 'Type something'}
                onBlur={() => setTouched(true)}
                error={isNotValidForm}
              />
              <FormControl>
                <FormLabel>Status</FormLabel>
                <RadioGroup
                  row
                  onChange={handleStatusChange}
                  value={status}
                >
                  {
                    validStatus.map(status => (
                      <FormControlLabel
                        key={status}
                        value={status}
                        control={<Radio />}
                        label={capitalize(status)}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveIcon />}
                variant='contained'
                fullWidth
                onClick={onSave}
                disabled={inputValue.length <= 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.main',
          ':hover': {
            backgroundColor: 'error.dark'
          }
        }}
      >
        <DeleteForeverIcon />
      </IconButton>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }

  const entry = await dbEntries.getEntryById(id)

  if (!entry) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage
