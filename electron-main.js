// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const Store = require('electron-store');

const store = new Store();

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    maximizable: true,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // }
  })

  mainWindow.maximize()

  // and load the index.html of the app.
  mainWindow.loadFile('./dist/weeklyQuota/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  store.set('unicorn', 'u1');
  console.log(store.get('unicorn'));
  //=> 'u1'

  // Use dot-notation to access nested properties
  store.set('foo.bar', true);
  console.log(store.get('foo'));
  //=> {bar: true}

  store.delete('unicorn');
  console.log(store.get('unicorn'));
//=> undefined
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.