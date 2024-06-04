import { useState } from "react";
import SqlTable from "../Table/SqlTable";
import ButtonSend from "../root/Button";
import SqlQueryText from "../root/SqlQueryText";
import SqlQueryParams from "../root/TextField";
import { SQL_QUERY_GET_TABLES } from "../../constants";
import { queryType } from "../../models/sqlConsoleModels";
import { useSimpleUI } from "../../context/SimpleUIContext";
import { IContextProviderData } from "../../models/contextProvider";
import { Button } from "@mui/material";


export default function Main() {
  const { sqlTableData, isConnected } = useSimpleUI() as IContextProviderData
  const sqlScreenData = JSON.parse(localStorage.getItem('sqlScreenData'))
  let sqlQueryText='', deviceHost='', sqlBaseName=''
  if (sqlScreenData){
    ({sqlQueryText, deviceHost, sqlBaseName} = sqlScreenData)
  }
  
  const [sqlText, setSqlText] = useState(sqlQueryText)
  const [host, setHost] = useState(deviceHost)
  const [baseName, setBaseName] = useState(sqlBaseName)
  

  function handleSqlText(text: string){
    setSqlText(text)
  }
  async function handleConnect() {
    sendQuery(SQL_QUERY_GET_TABLES, 'system')
  }
  async function handleSend(){
    localStorage.setItem('sqlScreenData', JSON.stringify({
      sqlQueryText: sqlText,
      deviceHost: host,
      sqlBaseName: baseName,
    }))
    sendQuery(sqlText)
  }

  async function sendQuery(sqlText: string, type: queryType = 'user'){
    await window.electronAPI.sendQuery(
      {
        host: host, 
        baseName: baseName, 
        sqlText: sqlText,
        queryType: type
      }
    )
  }
  return (
    <div style={{padding: 15}}>
      <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', borderBottom: '1px solid gray', marginBottom: 5}}>
        {isConnected && <ButtonSend onClick={() => handleSend()}></ButtonSend>}
        {!isConnected && <Button variant="contained" onClick={handleConnect}>Connect</Button>}
        <SqlQueryParams
          host={host}
          setHost={setHost}
          baseName={baseName}
          setBaseName={setBaseName}
        />
      </div>
      {isConnected && <SqlQueryText defaultValue={sqlText} onChange={(e) => handleSqlText(e)}></SqlQueryText>}
      <SqlTable></SqlTable>
    </div>
  )
}