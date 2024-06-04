import { contextBridge, ipcRenderer } from 'electron'
import { ISqlQuery, ISqlTableData } from './models/sqlConsoleModels'

contextBridge.exposeInMainWorld('electronAPI', {
  sendQuery: (props: ISqlQuery) => ipcRenderer.invoke('send-query', {...props}),
  onSqlResponse: (callback:(data: ISqlTableData) => void) => ipcRenderer.on('update-sql-table', (_event, data: ISqlTableData) => callback(data))
})