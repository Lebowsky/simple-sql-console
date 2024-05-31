import { JsonItem } from "../models/configData";
import { IContentItem, contentTypes } from "../models/content";
import { ISideMenuItem } from "../models/sideMenu";

export class ContentManager {
  constructor (){
    localStorage.setItem('currentConfigData', JSON.stringify(contentTypes))
  }
  public getContentItems(contentType: contentTypes): IContentItem[] | void {
    const rawConfigData = localStorage.getItem('currentConfigData')
    if (rawConfigData){
      const currentConfigData: JsonItem = JSON.parse(rawConfigData)
      return currentConfigData[contentType]
    }
  }
  
  public getSideMenu (): ISideMenuItem[]{
    const nestedItems: ISideMenuItem[] = []
    const sideMenuData: ISideMenuItem[] = [
      // { type: 'Common', title: 'Common', contentType: contentTypes.common },
      // { type: 'MainMenu', title: 'Main menu', contentType: contentTypes.mainMenu },
      // { type: 'StyleTemplates', title: 'Styles', contentType: contentTypes.styleTemplates },
      // { type: 'StartScreen', title: 'Start screen', contentType: contentTypes.startScreen },
      { type: 'Processes', title: 'Processes', nestedItems: nestedItems, contentType: contentTypes.processes},
      // { type: 'Shedulers', title: 'Shedulers', contentType: contentTypes.shedulers },
      // { type: 'CommonHandlers', title: 'Common handlers', contentType: contentTypes.commonHandlers },
      // { type: 'PyFiles', title: 'Python files', contentType: contentTypes.pyFiles,  },
      // { type: 'Mediafile', title: 'Media files', id: 0, contentType: contentTypes.mediafiles },
    ]
    const processes = this.getContentItems(contentTypes.processes)
    const operations = this.getContentItems(contentTypes.operations)
    if (!processes || !operations) return

    processes.forEach(({ content: { ProcessName, CVOperationName, type }, id }) => {
      const title = ProcessName || CVOperationName
      nestedItems.push({
        title: title,
        type: type,
        id: id,
        nestedItems: operations
          .filter(el => el.parentId === id)
          .map(({ content, id }) => ({ title: content.Name, type: content.type, id: id, contentType: contentTypes.operations })),
        contentType: contentTypes.processes,
      })
    })
    return sideMenuData
  }
}
