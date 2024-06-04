import { app, BrowserWindow, ipcMain, WebContents } from 'electron';
import { ISqlQuery } from './models/sqlConsoleModels';
import { SQLQueryManager } from './services/sqlQueryService';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  ipcMain.handle('send-query', (event: {sender: WebContents}, props: ISqlQuery) => {
    const sql = new SQLQueryManager(props.host, props.baseName)
    sql.sendQuery(props.sqlText, (raw_data: string) => {
      const data = sql.parseData(raw_data)
      mainWindow.webContents.send('update-sql-table', data)
    })
  })

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
