import React, { ChangeEvent, useState, useContext } from 'react'
import { EntriesContext } from '../../context/entries'
import { Button, Box, TextField } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import AddIcon from '@mui/icons-material/AddCircleOutline'
import { UIContext } from '../../context/ui'

export const NewEntry = () => {
  const { addNewEntry } = useContext(EntriesContext)
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)
  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const onSave = () => {
    if (inputValue.length === 0) return
    addNewEntry(inputValue)
    setInputValue('')
    setIsAddingEntry(false)
    setTouched(false)
  }

  return (
    <Box sx={{
      marginY: 1,
      paddingX: 1
    }}>
      {
        isAddingEntry
          ? (
          <>
            <TextField
              fullWidth
              autoFocus
              placeholder='Learn React'
              label='New entry'
              multiline
              value={inputValue}
              onChange={handleInputChange}
              onBlur={() => setTouched(true)}
              helperText={inputValue.length <= 0 && touched && 'Add some text'}
              error={inputValue.length <= 0 && touched}
              sx={{
                marginTop: 1,
                marginBottom: 1
              }}
            />
            <Box display='flex' justifyContent='space-between'>
              <Button
                variant='text'
                onClick={() => setIsAddingEntry(false)}
              >
                Cancel
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                endIcon={<SaveIcon />}
                onClick={onSave}
              >
                Save
              </Button>
            </Box>
          </>
            )
          : (
          <Button
            startIcon={<AddIcon />}
            fullWidth
            variant='outlined'
            onClick={() => setIsAddingEntry(true)}
          >
            Add task
          </Button>
            )
      }

    </Box>
  )
}
