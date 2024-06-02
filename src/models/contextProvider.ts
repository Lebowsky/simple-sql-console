import { ISideMenuItem } from "../models/sideMenu";
import { ISqlTableData } from "./sqlConsoleModels";

export interface IContextProviderData {
  sideMenu: ISideMenuItem[] | undefined
  sqlTableData: ISqlTableData
}