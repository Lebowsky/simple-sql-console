import { contextBridge, ipcRenderer } from 'electron'
import { ISqlQuery, ISqlResponse } from './models/sqlConsoleModels'

contextBridge.exposeInMainWorld('electronAPI', {
  sendQuery: (props: ISqlQuery) => ipcRenderer.invoke('send-query', {...props}),
  onSqlResponse: (callback:(response: ISqlResponse) => void) => ipcRenderer.on('update-sql-table', (_event, response: ISqlResponse) => callback(response))
})