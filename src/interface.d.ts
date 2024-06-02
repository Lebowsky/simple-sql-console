export interface IElectronAPI {
  sendQuery: (query: ISqlQuery) => Promise<void>,
  onSqlResponse: (data: any) => Promise<void>
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}