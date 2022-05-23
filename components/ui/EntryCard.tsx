import React, { FC, DragEvent, useContext } from 'react'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui'

interface Props {
  entry: Entry
}

export const EntryCard:FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext)

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', entry._id)
    startDragging()
  }
  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    endDragging()
  }

  return (
    <Card
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sx={{
        marginBottom: 1
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{
            whiteSpace: 'pre-line'
          }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions sx={{
          display: 'flex',
          justifyContent: 'end',
          paddingRight: 2
        }}>
          <Typography variant='body2'>30 minutes ago</Typography>
        </CardActions>
      </CardActionArea>
    </Card>

  )
}
