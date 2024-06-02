export interface ISqlQuery {
  host: string, 
  baseName: string, 
  sqlText: string
}

export interface IColumn {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export interface IRowData {
  [key: string]: string
}

export interface ISqlTableData{
  columns: IColumn[]
  data?: IRowData[]
} 