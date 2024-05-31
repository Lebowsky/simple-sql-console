import { useState } from 'react'
import { ISideMenuItem } from '../../models/sideMenu'
import './SideMenu.css'

interface SideMenuProps {
  sideMenu: ISideMenuItem[]
}

const icons: { [key: string]: string } = {
  'Common': 'icon common',
  'MainMenu': 'icon main-menu',
  'StyleTemplates': 'icon styles',
  'StartScreen': 'icon start-screen',
  'Processes': 'icon processes',
  'Process': 'icon process',
  'CVOperation': 'icon cvo',
  'CVFrame': 'icon frame',
  'Operation': 'icon operation',
  'Mediafile': 'icon mediafiles',
  'PyFiles': 'icon pythonfiles',
  'CommonHandlers': 'icon common-handlers',
  'Shedulers': 'icon shedulers',
}

export default function SideMenu({ sideMenu }: SideMenuProps) {
  return (
    <div className="side-menu">
      <ul>
        {sideMenu.map((item, idx) => <MenuItem {...item} key={idx} />)}
      </ul>
    </div>
  )
}

function MenuItem(item: ISideMenuItem ) {
  // const { addTab, setCurrentContextType } = useSimpleUI() as IContextProviderData
  const [isOpened, setIsOpened] = useState(false)

  function handleItem(item: ISideMenuItem) {
    setIsOpened((prev) => !prev)
    // addTab({...item})
    // setCurrentContextType(item.contextType)
  }

  const className = isOpened ? `${icons[item.type]} open` : `${icons[item.type]}`
  return (
    <>
      <li>
        <a href="#" className={className} onClick={(() => handleItem(item))}>
          {item.title}
        </a>
        {isOpened && item.nestedItems &&
          <ul className="side-menu-nested">
            {item.nestedItems.map((el) =>
              <MenuItem {...el} key={el.id}/>)
            }
          </ul>}
      </li>
    </>
  )
}