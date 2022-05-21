import { EntriesState } from './'
import { Entry } from '../../interfaces'

type EntriesActionType =
  | { type: '[Entry] add entry', payload: Entry }

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
  switch (action.type) {
    case '[Entry] add entry':
      return {
        ...state,
        entries: [...state.entries, action.payload]
      }
    default:
      return state
  }
}
