import React, { FC, useContext, useMemo, DragEvent } from 'react'
import { Box, List, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { EntryStatus } from '../../interfaces'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'
import { EntryCard } from './'

interface Props {
  status: EntryStatus
}

const useStyles = makeStyles((theme: Theme) => ({
  dragging: {
    backgroundColor: theme.palette.background.paper,
    outline: 2,
    outlineStyle: 'dashed',
    outlineColor: theme.palette.primary.main,
    borderRadius: 10
  }
}))

export const EntryList: FC<Props> = ({ status }) => {
  const classes = useStyles()

  const { isDragging, endDragging } = useContext(UIContext)
  const { entries, updateEntry } = useContext(EntriesContext)

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries, status])

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData('text')
    const entry = entries.find(entry => entry._id === id)!
    entry.status = status
    updateEntry(entry)
    endDragging()
  }

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? classes.dragging : ''}
    >
      <Box sx={{
        height: 'calc(100vh - 200px)',
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: 'transparent',
        padding: 1,
        paddingBottom: 5,
        marginTop: 1
      }}>
        <List sx={{
          opacity: isDragging ? 0.3 : 1,
          transition: 'opacity 0.2s'
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
