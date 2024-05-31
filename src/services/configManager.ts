import { JsonItem, IProcess } from "../models/configData";
import { IContentItem, contentTypes } from "../models/content";
import { ISideMenuItem } from "../models/sideMenu";

export class ConfigManager {
  private raw_data: {[key: string]: any}
  private id: number
  private root: {[key: string]: any} = {}
  private processes: IContentItem[] = []
  private operations: IContentItem[] = []
  private handlers: IContentItem[] = []
  private elements: IContentItem[] = []
  // private mainMenu: IListItem[] = []

  constructor(raw_data: {[key: string]: any}) {
    this.raw_data = raw_data
    this.id = 0
    const {
      Processes,
      PyFiles,
      CommonHandlers,
      Mediafile,
      MainMenu,
      ConfigurationSettings,
      PyTimerTask,
      StyleTemplates,
      ...root
    } = this.raw_data

    this.parseProcesses(Processes)
    this.root = root
  }
  public saveDataToStorage(){
    localStorage.setItem('currentConfigData', JSON.stringify({
      processes: this.processes,
      operations: this.operations,
      handlers: this.handlers,
      elements: this.elements,
    }))
  }
  
  private parseProcesses(Processes: JsonItem[]): void {
    Processes && Processes.forEach(({ Operations, CVFrames, ...item }) => {
      const id = this.getId()
      
      this.processes.push({
        id: id,
        parentId: 0,
        contentType: contentTypes.processes,
        content: item
      })
      Operations && this.parseOperations(Operations, id)
      CVFrames && this.parseCVFrames(CVFrames, id)
    });
  }
  private parseOperations(Operations: JsonItem[], parentId: number): void {
    Operations.forEach(({ Elements, Handlers, ...item }) => {
      const id = this.getId()
      this.operations.push({
        id: id,
        parentId: parentId,
        contentType: contentTypes.operations,
        content: item
      })
      Elements && this.parseElements(Elements, id)
      Handlers && this.parseHandlers(Handlers, id)
    })
  }
  private parseCVFrames(frames: JsonItem[], parentId: number): void {
    frames.forEach(({ Handlers, ...item }) => {
      const id = this.getId()
      this.operations.push({
        id: id,
        parentId: parentId,
        contentType: contentTypes.operations,
        content: item
      })
      Handlers && this.parseHandlers(Handlers, id)
    })
  }
  private parseElements (elms: JsonItem[], parentId: number){
    elms.forEach(({ Elements, ...item }) => {
      const id = this.getId()
      this.elements.push({ 
        id: id, 
        parentId: parentId, 
        contentType: contentTypes.elements, 
        content: item 
      })
      Elements && this.parseElements(Elements, id)
    })
  }
  private parseHandlers (hls: JsonItem[], parentId: number): void {
    hls.forEach(({...item}) => {
      const id = this.getId()
      this.handlers.push({ 
        id: id, 
        parentId: 
        parentId, 
        contentType: contentTypes.handlers, 
        content: item 
      })
    })
  }
  private getId(): number {
    return ++this.id
  }
}