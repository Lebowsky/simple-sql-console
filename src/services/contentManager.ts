import { JsonItem } from "../models/configData";
import { IContentItem, contentTypes } from "../models/content";
import { ISideMenuItem } from "../models/sideMenu";

export class ContentManager {
  constructor (){
    localStorage.setItem('currentConfigData', JSON.stringify(contentTypes))
  }
  public getContent(contentType: contentTypes, id?: number): IContentItem | void {
    const rawConfigData = localStorage.getItem('currentConfigData')
    if (rawConfigData){
      const currentConfigData: JsonItem = JSON.parse(rawConfigData)
      console.log(currentConfigData[contentType])
    }
  }
  public getSideMenu (): ISideMenuItem[]{
    const nestedItems: ISideMenuItem[] = []
    const sideMenuData: ISideMenuItem[] = [
      { type: 'Common', title: 'Common', contentType: contentTypes.common },
      { type: 'MainMenu', title: 'Main menu', contentType: contentTypes.mainMenu },
      { type: 'StyleTemplates', title: 'Styles', contentType: contentTypes.styleTemplates },
      { type: 'StartScreen', title: 'Start screen', contentType: contentTypes.startScreen },
      { type: 'Processes', title: 'Processes', nestedItems: nestedItems, contentType: contentTypes.processes},
      { type: 'Shedulers', title: 'Shedulers', contentType: contentTypes.shedulers },
      { type: 'CommonHandlers', title: 'Common handlers', contentType: contentTypes.commonHandlers },
      { type: 'PyFiles', title: 'Python files', contentType: contentTypes.pyFiles,  },
      { type: 'Mediafile', title: 'Media files', id: 0, contentType: contentTypes.mediafiles },
    ]
  
    // this.processes.forEach(({ content: { ProcessName, CVOperationName, type }, id }) => {
    //   const title = ProcessName || CVOperationName
    //   nestedItems.push({
    //     title: title,
    //     type: type,
    //     id: id,
    //     nestedItems: this.operations
    //       .filter(el => el.parentId === id)
    //       .map(({ content, id }) => ({ title: content.Name, type: content.type, id: id, contextType: contextTypes.operations, showInTabs: true })),
    //     contextType: contextTypes.processes,
    //     showInTabs: true
    //   })
    // })
    return sideMenuData
  }
}
