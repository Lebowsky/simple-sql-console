import { dataType } from "./configData"

export enum contentTypes {
    common = 'common',
    processes = 'processes',
    operations = 'operations',
    handlers = 'handlers',
    elements = 'elements',
    mainMenu = 'mainMenu',
    styleTemplates = 'styleTemplates',
    startScreen = 'startScreen',
    shedulers = 'shedulers',
    commonHandlers = 'commonHandlers',
    pyFiles = 'pyFiles',
    mediafiles = 'mediafiles'
}

export interface IContentItem{
  id: number
  parentId: number
  contentType: contentTypes
  content: dataType
}