import { BrowserWindow, contextBridge, ipcRenderer, shell } from 'electron'

const callbacks = new Map<number, any>()

ipcRenderer.on('appExit', (event, data) => {
  BrowserWindow.getFocusedWindow()?.webContents.send('appEdit')
})

ipcRenderer.on('progress', (event, data) => {
  const callback = callbacks.get(data.uuid)
  if (!callback) return
  data.progress.uuid = data.uuid
  callback(data.progress)
  data.progress.done && callbacks.delete(data.uuid)
})
/**
 * 上下文桥，隔离Main和Renderer，暴露声明API
 */
console.log(ipcRenderer);

const electronIpc = {
  app: {
    minimize() {
      ipcRenderer.send('minimize')
    },
    maximize() {
      ipcRenderer.send('maximize')
    },
    close() {
      ipcRenderer.send('close')
    },
    openExternal(url: string) {
      shell.openExternal(url)
    },
    writeClipboardText(text: string): Promise<boolean> {
      return ipcRenderer.invoke('writeClipboardText', text)
    },
  },
  io: {
    writeText(text: string, filename: string, dirname?: string): Promise<boolean> {
      return ipcRenderer.invoke('writeText', text, filename, dirname)
    },
    writeFile(base64: string, filename: string, dirname?: string): Promise<boolean> {
      return ipcRenderer.invoke('writeFile', base64, filename, dirname)
    },
  },
  ipcRenderer: ipcRenderer,
  invoke: ipcRenderer.invoke,
  send: ipcRenderer.send,
}
contextBridge.exposeInMainWorld('electron', electronIpc)

export { electronIpc }
