import { FC, ReactNode, useReducer } from 'react'
import { UIContext, uiReducer } from './'

interface Props {
  children: ReactNode
}

export interface UIState {
  isSidemenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
  isSidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false
}

export const UIProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const closeSidemenu = () => dispatch({ type: '[UI] Close Sidebar' })
  const openSidemenu = () => dispatch({ type: '[UI] Open Sidebar' })
  const setIsAddingEntry = (isAdding: boolean) => dispatch({ type: '[UI] Is adding entry', payload: isAdding })
  const startDragging = () => dispatch({ type: '[UI] Start dragging' })
  const endDragging = () => dispatch({ type: '[UI] End dragging' })

  return (
    <UIContext.Provider value={{
      ...state,
      closeSidemenu,
      openSidemenu,
      setIsAddingEntry,
      startDragging,
      endDragging
    }}>
      {children}
    </UIContext.Provider>
  )
}
