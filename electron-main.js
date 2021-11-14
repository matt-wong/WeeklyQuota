// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')
const Store = require('electron-store');
const ipcMain = require('electron').ipcMain;

const store = new Store();

function createWindow () {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    maximizable: true,
    icon: path.join(__dirname, './src/assets/worker_113306.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.maximize()

  // and load the index.html of the app.
  mainWindow.loadFile('./dist/weeklyQuota/index.html')

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
ipcMain.on('save', (event, arg) => {

  console.log(arg);
  store.set('savedData', arg);
  // event.sender.send('log', event);
  console.log(store.get('savedData'));

  event.sender.send('log', store.get('savedData'));

});

ipcMain.on('load', (event, arg) => {
  event.sender.send('load', [{data: store.get('savedData')}]);
});