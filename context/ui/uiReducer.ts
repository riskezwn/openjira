import { UIState } from './'

type UIActionType =
  | { type: '[UI] Open Sidebar' }
  | { type: '[UI] Close Sidebar' }
  | { type: '[UI] Is adding entry', payload: boolean }

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case '[UI] Open Sidebar':
      return {
        ...state,
        isSidemenuOpen: true
      }
    case '[UI] Close Sidebar':
      return {
        ...state,
        isSidemenuOpen: false
      }
    case '[UI] Is adding entry':
      return {
        ...state,
        isAddingEntry: action.payload
      }
    default:
      return state
  }
}
