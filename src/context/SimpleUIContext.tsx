import { createContext, useContext, useEffect, useState } from "react";
import { IContextProviderData } from "../models/contextProvider";
import { ISqlTableData } from "../models/sqlConsoleModels";
import { SQLQueryManager } from "../services/sqlQueryService";

const SimpleUIContext = createContext<IContextProviderData | null>(null)

interface ContextProps {
  children: React.ReactNode
}

export function SimpleUIContextProvider({ children }: ContextProps) {
  const [sqlTableData, setSqlTableData] = useState<ISqlTableData>()

  useEffect(() => {
    window.electronAPI.onSqlResponse((responseData: ISqlTableData) => {
      setSqlTableData({...responseData})
    })
  }, [])

  return (
    <SimpleUIContext.Provider
      value={{
        sqlTableData,
      }}
    >
      {children}
    </SimpleUIContext.Provider>
  )
}

export function useSimpleUI() {
  return useContext(SimpleUIContext)
}