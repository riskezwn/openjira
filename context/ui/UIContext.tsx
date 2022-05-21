import { createContext } from 'react'

export interface ContextProps {
  isSidemenuOpen: boolean
  isAddingEntry: boolean
  openSidemenu: () => void
  closeSidemenu: () => void
  setIsAddingEntry: (isAdding: boolean) => void
}

export const UIContext = createContext({} as ContextProps)
