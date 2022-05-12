import { FC, ReactNode, useReducer } from 'react'
import { UIContext, uiReducer } from './'

interface Props {
  children: ReactNode
}

export interface UIState {
  isSidemenuOpen: boolean
}

const UI_INITIAL_STATE: UIState = {
  isSidemenuOpen: false
}

export const UIProvider:FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const closeSidemenu = () => dispatch({ type: '[UI] Close Sidebar' })
  const openSidemenu = () => dispatch({ type: '[UI] Open Sidebar' })

  return (
    <UIContext.Provider value={{
      ...state,
      closeSidemenu,
      openSidemenu
    }}>
      {children}
    </UIContext.Provider>
  )
}
