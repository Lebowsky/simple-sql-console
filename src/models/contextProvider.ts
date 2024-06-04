import { ISqlTableData } from "./sqlConsoleModels";

export interface IContextProviderData {
  sqlTableData: ISqlTableData
  sqlTablesList: {[key: string]: string}[]
  isConnected: boolean
}