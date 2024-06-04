import querystring from 'querystring'
import { net } from 'electron'
import { IColumn, ISqlTableData } from '../models/sqlConsoleModels'


export class SQLQueryManager {
  private __deviceHost: string
  private __devicePort: number
  private __dbName: string
  private __mode: string
  private __query: string
  private __queryParams: string
  private __callback: (response: string) => void

  constructor(deviceHost: string, dbName: string) {
    this.__deviceHost = deviceHost
    this.__dbName = dbName
    this.__mode = 'SQLQueryText'
    this.__devicePort = 8095
    this.__query = ''
    this.__queryParams = ''
  }
  public sendQuery(query: string, callback: (response: string) => void) {
    this.__query = query
    this.__queryParams = ''
    this.__callback = callback

    try {
      this.__sendQuery()
    } catch (error) {
      console.log(error)
    }
  }

  private __sendQuery() {
    let responseData = '';

    const queryArgs = {
      mode: this.__mode,
      query: this.__query,
      params: this.__queryParams,
      db_name: this.__dbName
    }
    const request = net.request({
      method: 'POST',
      protocol: 'http:',
      hostname: this.__deviceHost,
      port: this.__devicePort,
      path: '?' + querystring.stringify(queryArgs)
    })
    request.on('response', (response) => {
      response.on('data', (chunk) => {
        responseData += chunk
      })
      response.on('end', () => {
        this.__callback(responseData)
      })
      response.on('error', (error: any) => {
        console.log(error)
      })
    })
    request.on('error', (error) => { console.log(error) })
    request.end()
  }

  public parseData(responseData: string): ISqlTableData {
    const [header, ...body] = responseData.split('\r\n')
    
    if (header && header.length) {
      const columns: IColumn[] = header.split('|').map((el, idx) => (
        {
          id: idx.toString(),
          label: el.trim(),
        }
      ))
      const data = body
        .map((el) => el.trim().split('|'))
        .map(el => Object.fromEntries(el.map((el, idx) => ([idx.toString(), el]))))
      return {
        columns: columns,
        data: data
      }
    }

  }
}