import StickyHeadTable from "../Table/SQLTable";
import Button from "../root/Button";
import TextView from "../root/TextView";


export default function Main() {
  return (
    <div>
      <div style={{padding:15, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%', borderBottom: '1px solid gray', marginBottom: 5}}>
        <Button>Execute</Button>
        <TextView title={'host:'} value='0.0.0.0' name={'host'}></TextView>
        <TextView title={'Base name:'} value='SimpleKeep' name={'base'}></TextView>
      </div>
      <StickyHeadTable></StickyHeadTable>
    </div>
  )
}