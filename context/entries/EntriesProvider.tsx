import { FC, ReactNode, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces'

interface Props {
  children: ReactNode
}

export interface EntriesState {
  entries: Entry[]
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Aprender React',
      status: 'completed',
      createdAt: Date.now()
    },
    {
      _id: uuidv4(),
      description: 'Aprender MongoDB',
      status: 'pending',
      createdAt: Date.now() - 1000000
    },
    {
      _id: uuidv4(),
      description: 'Aprender NextJS',
      status: 'in-progress',
      createdAt: Date.now() - 10000
    }
  ]
}

export const EntriesProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

  return (
    <EntriesContext.Provider value={{
      ...state
    }}>
      {children}
    </EntriesContext.Provider>
  )
}
