const { app, BrowserWindow } = require('electron');
const { PythonShell } = require('python-shell');
const path = require('path');
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} = require('electron-devtools-installer');

const installExtensionAndLog = (id) => {
  installExtension(id)
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
}

require('electron-reload')(__dirname);

let win

function createWindow () {
  const reactDevToolPromise = installExtensionAndLog(REACT_DEVELOPER_TOOLS);
  const reduxDevToolPromise = installExtensionAndLog(REDUX_DEVTOOLS);

  Promise.all([
    reactDevToolPromise,
    reduxDevToolPromise,
  ]).then(() => {
    // commented out for time of development
    // PythonShell.run('../server/engine.py', null,  function  (err, results)  {
    //   if  (err)  console.log(err);
    // });

    win = new BrowserWindow({width: 1200, height: 800});
    win.loadURL(`file://${path.join(__dirname, 'dist/index.html')}`);
    win.webContents.openDevTools({ mode: 'undocked' });

    win.on('closed', () => {
      win = null
    });
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
