// import { ToastContainer, Slide } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { useSimpleUI } from "../../context/SimpleUIContext";
import SideMenu from "../SideMenu/SideMenu";
import { IContextProviderData } from "../../models/contextProvider";
import { Table } from "@mui/material";
import StickyHeadTable from "../Table/SQLTable";
import Button from "../root/Button";
import TextView from "../root/TextView";


export default function Main() {
  // const { modal, sideMenu, currentContent } = useSimpleUI() as IContextProviderData
  const { sideMenu } = useSimpleUI() as IContextProviderData

  return (
    <div style={{
      // height: '100vh',
      // display: 'flex'
    }}>

      <div style={{padding:15, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', borderBottom: '1px solid gray', marginBottom: 5}}>
        <Button>Execute</Button>
        <TextView title={'host:'} value='0.0.0.0' name={'host'}></TextView>
        <TextView title={'Base name:'} value='SimpleKeep' name={'base'}></TextView>
      </div>
      {/* {sideMenu && <SideMenu sideMenu={sideMenu} />} */}
      <StickyHeadTable></StickyHeadTable>
    </div>
  )
}