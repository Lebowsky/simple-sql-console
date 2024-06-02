import http from 'http'
import querystring from 'querystring'
import { net } from 'electron'


interface ISqlQuerySendResult {
  error: string
  content: string
  data: { header: string, data: string[] } | null
}
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
      console.log(`STATUS: ${response.statusCode}`)
      
      response.on('data', (chunk) => {
        responseData += chunk
      })

      response.on('end', () => {
        this.__callback(responseData)
      })

      response.on('error', (error: any) => {
        // console.log(`ERROR: ${JSON.stringify(error)}`
        console.log(error)
      })
    })

    request.on('error', (error) => {console.log(error)})
    request.end()
  }

  private __parseData(data: string) {
  const tableData = data.split('\n')
  if (tableData.length > 1) {
    return {
      header: tableData[0],
      data: tableData.slice(1)
    }
  }
}
}