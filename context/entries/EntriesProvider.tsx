import { FC, ReactNode, useEffect, useReducer } from 'react'
import { useSnackbar } from 'notistack'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces'
import { entriesApi } from '../../api'

interface Props {
  children: ReactNode
}

export interface EntriesState {
  entries: Entry[]
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: []
}

export const EntriesProvider:FC<Props> = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar()

  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

  const addNewEntry = async (description: string) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description })
    dispatch({
      type: '[Entry] add entry',
      payload: data
    })
  }

  const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
      dispatch({ type: '[Entry] update entry', payload: data })

      if (showSnackbar) {
        enqueueSnackbar('Entry updated', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
      }
    } catch (error) {
      console.error({ error })
    }
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: '[Entry] refresh data', payload: data })
  }

  useEffect(() => {
    refreshEntries()
  }, [])

  return (
    <EntriesContext.Provider value={{
      ...state,
      // Methods
      addNewEntry,
      updateEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )
}
