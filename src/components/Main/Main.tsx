// import { ToastContainer, Slide } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { useSimpleUI } from "../../context/SimpleUIContext";
import SideMenu from "../SideMenu/SideMenu";
import { IContextProviderData } from "../../models/contextProvider";


export default function Main() {
  // const { modal, sideMenu, currentContent } = useSimpleUI() as IContextProviderData
  const { sideMenu } = useSimpleUI() as IContextProviderData

  return (
    <div style={{
      height: '100vh',
      display: 'flex'
    }}>
      {sideMenu && <SideMenu sideMenu={sideMenu} />}
    </div>
  )
}