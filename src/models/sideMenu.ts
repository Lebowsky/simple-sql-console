import { contentTypes } from "./content"


export interface ISideMenuItem {
  id?: number
  type: string
  contentType: contentTypes
  title: string
  nestedItems?: ISideMenuItem[]
}
export interface ITabData{
  id: number
  type: string
  contentType: contentTypes
  title: string
  onClick?(): void
  onClose?(): void
}
