import { createContext } from 'react'

export interface ContextProps {
  isSidemenuOpen: boolean
  openSidemenu: () => void
  closeSidemenu: () => void
}

export const UIContext = createContext({} as ContextProps)
