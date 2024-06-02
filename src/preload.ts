import { contextBridge, ipcRenderer } from 'electron'
import { ISqlQuery } from './models/sqlQuery'

contextBridge.exposeInMainWorld('electronAPI', {
  sendQuery: (props: ISqlQuery) => ipcRenderer.invoke('send-query', {...props}),
  onSqlResponse: (callback:(value: any) => void) => ipcRenderer.on('update-sql-table', (_event, value) => callback(value))
})