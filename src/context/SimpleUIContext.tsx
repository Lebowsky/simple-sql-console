import { createContext, useContext, useEffect, useState } from "react";
import { IContextProviderData } from "../models/contextProvider";
import { ISideMenuItem } from "../models/sideMenu";
import { ContentManager } from "../services/contentManager";
import { ConfigManager } from "../services/configManager";
import { IRowData, ISqlTableData } from "../models/sqlConsoleModels";
import { IColumn } from "../models/sqlConsoleModels";

const SimpleUIContext = createContext<IContextProviderData | null>(null)

interface ContextProps {
  children: React.ReactNode
}

export function SimpleUIContextProvider({ children }: ContextProps) {
  const [sideMenu, setSideMenu] = useState<ISideMenuItem[]>([])
  const [sqlTableData, setSqlTableData] = useState<ISqlTableData>()

  const contentManager = new ContentManager()
  const configManager = new ConfigManager()

  useEffect(() => {
    window.electronAPI.onSqlResponse((responseData: string) => {
      const [header, ...body] = responseData.split('\n').map(el => el.split('\n'))
      if (header && header.length) {
        const columns: IColumn[] = header[0].split('|').map((el, idx) => (
          {
            id: idx.toString(),
            label: el.trim(),
          }
        ))
        const data = body
          .map((el) => el[0].trim().toString().split('|'))
          .filter((el) => el[0].length)
          .map(el => Object.fromEntries(el.map((el, idx) => ([idx.toString(), el]))))

        console.log(data)
        setSqlTableData(
          {columns: columns, data: data}
        )
      }
    })
  }, [])

  function updateSideMenu() {
    setSideMenu(contentManager.getSideMenu())
  }

  return (
    <SimpleUIContext.Provider
      value={{
        sideMenu,
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

// const columns: readonly IColumn[] = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toFixed(2),
//   },
// ];

// function createData(
//   name: string,
//   code: string,
//   population: number,
//   size: number,
// ): IRowData {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];