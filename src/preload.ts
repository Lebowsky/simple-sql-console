import { contextBridge, ipcRenderer } from 'electron'
import { ISqlQuery } from './models/sqlQuery'

contextBridge.exposeInMainWorld('electronAPI', {
  sendQuery: (props: ISqlQuery) => ipcRenderer.send('send-query', {...props})
})