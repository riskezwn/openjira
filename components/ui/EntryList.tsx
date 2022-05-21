import React, { FC, useContext, useMemo } from 'react'
import { Box, List } from '@mui/material'
import { EntryStatus } from '../../interfaces'
import { EntryCard } from './'
import { EntriesContext } from '../../context/entries'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext)
  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries, status])

  return (
    <div>
      <Box sx={{
        height: 'calc(100vh - 200px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: 'transparent',
        padding: 1,
        paddingBottom: 5
      }}>
        <List sx={{
          opacity: 1
        }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard key={entry._id} entry={entry}/>
            ))
          }
        </List>
      </Box>
    </div>
  )
}
