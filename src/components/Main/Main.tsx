import { useState } from "react";
import StickyHeadTable from "../Table/SQLTable";
import ButtonSend from "../root/Button";
import SqlQueryText from "../root/SqlQueryText";
import SqlQueryParams from "../root/TextField";


export default function Main() {
  const [sqlText, setSqlText] = useState('')
  const [host, setHost] = useState('0.0.0.0')
  const [baseName, setBaseName] = useState('SimpleKeep')

  function handleSqlText(text: string){
    setSqlText(text)
  }

  function handleSend(){
    window.electronAPI.sendQuery(
      {
        host: host, 
        baseName: baseName, 
        sqlText: sqlText
      }
    )
  }
  return (
    <div>
      <div style={{padding:15, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', borderBottom: '1px solid gray', marginBottom: 5}}>
        <ButtonSend onClick={() => handleSend()}></ButtonSend>
        <SqlQueryParams
          host={host}
          setHost={setHost}
          baseName={baseName}
          setBaseName={setBaseName}
        ></SqlQueryParams>
      </div>
      <SqlQueryText defaultValue={sqlText} onChange={(e) => handleSqlText(e)}></SqlQueryText>
      <StickyHeadTable></StickyHeadTable>
    </div>
  )
}