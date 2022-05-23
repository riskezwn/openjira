import { createContext } from 'react'

export interface ContextProps {
  isSidemenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
  openSidemenu: () => void
  closeSidemenu: () => void
  setIsAddingEntry: (isAdding: boolean) => void
  startDragging: () => void
  endDragging: () => void
}

export const UIContext = createContext({} as ContextProps)
