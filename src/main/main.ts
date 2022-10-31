import { app, BrowserWindow, screen, ipcMain, ipcRenderer, shell } from 'electron'
import { join } from 'path'
import './ipc/index'

async function createWindow() {
  const width = 1080
  const height = 720
  const primaryScreen = screen.getPrimaryDisplay()
  const x = (primaryScreen.workAreaSize.width - width) / 2
  const y = (primaryScreen.workAreaSize.height - height) / 2

  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    x: x,
    y: y,
    // frame: false,
    // transparent: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })
  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2]
    mainWindow.loadURL(`http://localhost:${rendererPort}`)
  } else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'))
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', function () {
  // cache.saveCacheStatus()
  ipcRenderer.send('appExit')
  if (process.platform !== 'darwin') app.quit()
})
// Listen for web contents being created
app.on('web-contents-created', (e, contents) => {
  // Check for a webview
  if (['window', 'webview'].includes(contents.getType())) {
    // Listen for any new window events
    // @ts-ignore
    contents.setWindowOpenHandler((details) => {
      e.preventDefault()
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
  }
})
