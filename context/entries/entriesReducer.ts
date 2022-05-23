import { EntriesState } from './'
import { Entry } from '../../interfaces'

type EntriesActionType =
  | { type: '[Entry] add entry', payload: Entry }
  | { type: '[Entry] update entry', payload: Entry }

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {
    case '[Entry] add entry':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      }
    case '[Entry] update entry':
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status
            entry.description = action.payload.description
          }
          return entry
        })
      }
    default:
      return state
  }
}
