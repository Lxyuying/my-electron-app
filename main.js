const { app, BrowserWindow, ipcMain } = require('electron')
// 需在当前文件内开头引入 Node.js 的 'path' 模块
const path = require('path')
require('update-electron-app')()
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  ipcMain.handle('ping', () => 'pong')
  win.loadFile('index.html')
}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
