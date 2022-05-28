import React, { FC, useContext, useMemo, DragEvent } from 'react'
import { Paper, List } from '@mui/material'
import { EntryStatus } from '../../interfaces'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'
import { EntryCard } from './'
import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
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
      onDrop={ onDropEntry }
      onDragOver={ allowDrop }
      className={ isDragging ? styles.dragging : '' }
    >
      <Paper sx={{
        height: 'calc(100vh - 180px)',
        overflowY: 'auto',
        backgroundColor: 'transparent',
        padding: '3px 5px'
      }}
        className={ status === 'pending' ? styles.new : '' }
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard key={ entry._id } entry={ entry } />
            ))
          }
        </List>
      </Paper>
    </div>
  )
}
