import { createContext, useContext, useEffect, useState } from "react";
import { IContextProviderData } from "../models/contextProvider";
import { ISideMenuItem } from "../models/sideMenu";
import { ContentManager } from "../services/contentManager";

const SimpleUIContext = createContext<IContextProviderData | null>(null)

interface ContextProps {
  children: React.ReactNode
}

export function SimpleUIContextProvider({ children }: ContextProps) {
  const [sideMenu, setSideMenu] = useState<ISideMenuItem[]>([])

  const contentManager = new ContentManager()

  useEffect(() => {
    // contentManager.getContent(contentTypes.common)
    updateSideMenu()
  },)

  function updateSideMenu() {
    setSideMenu(contentManager.getSideMenu())
  }

  return (
    <SimpleUIContext.Provider
      value={{
        sideMenu
      }}
    >
    {children}
    </SimpleUIContext.Provider>
  )
}

export function useSimpleUI() {
  return useContext(SimpleUIContext)
}