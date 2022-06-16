import React, { FC, DragEvent, useContext } from 'react'
import { useRouter } from 'next/router'
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui'
import { getDateDistanceToNow } from '../../utils'

interface Props {
  entry: Entry
}

export const EntryCard:FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext)
  const router = useRouter()

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', entry._id)
    startDragging()
  }
  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    endDragging()
  }

  const onCardClick = () => {
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      // Eventos de drag
      draggable
      onDragStart={ onDragStart }
      onDragEnd={ onDragEnd }
      onClick={onCardClick}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            { entry.description }
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
            <Typography variant='body2'>
              {getDateDistanceToNow(entry.createdAt)} ago
            </Typography>
        </CardActions>
      </CardActionArea>
    </Card>

  )
}
