import { createContext, useContext, useEffect, useState } from "react";
import { IContextProviderData } from "../models/contextProvider";
import { ISqlResponse, ISqlTableData, queryType } from "../models/sqlConsoleModels";

const SimpleUIContext = createContext<IContextProviderData | null>(null)

interface ContextProps {
  children: React.ReactNode
}

export function SimpleUIContextProvider({ children }: ContextProps) {
  const [sqlTableData, setSqlTableData] = useState<ISqlTableData>()
  const [sqlTablesList, setSqlTablesList] = useState<{[key: string]: string}[]>()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    window.electronAPI.onSqlResponse((responseData: ISqlResponse) => {
      const {queryType, tableData} = responseData
      if (queryType === 'user') setSqlTableData({...tableData})
      if (queryType === 'system') {
        setSqlTablesList(tableData.data)
        setIsConnected(true)
      }
    })
  }, [])

  return (
    <SimpleUIContext.Provider
      value={{
        sqlTableData,
        sqlTablesList,
        isConnected
      }}
    >
      {children}
    </SimpleUIContext.Provider>
  )
}

export function useSimpleUI() {
  return useContext(SimpleUIContext)
}