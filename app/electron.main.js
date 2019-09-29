const { app, BrowserWindow } = require('electron');
const { PythonShell } = require('python-shell');
const isDev = require('electron-is-dev');
const path = require('path');
const execFile = require('child_process').execFile;

if (isDev) {
  require('electron-reload')(__dirname);
}

let win
let pyProcess = null

const setupDevtools = () => {
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

  const reactDevToolPromise = installExtensionAndLog(REACT_DEVELOPER_TOOLS);
  const reduxDevToolPromise = installExtensionAndLog(REDUX_DEVTOOLS);

  return Promise.all([
    reactDevToolPromise,
    reduxDevToolPromise,
  ]);
};

const setupPyProcess = () => {
  if (isDev) {
    // commented out for time of development
    // PythonShell.run('../server/engine.py', null,  function  (err, results)  {
    //   if  (err)  console.log(err);
    // });
  } else {
    const serverAppPath = path.join(process.resourcesPath, 'engine', 'engine.exe')

    console.log('Executing app, path:', serverAppPath)
    pyProcess = execFile(serverAppPath);
  }
}

const setupWindow = () => {
  win = new BrowserWindow({width: 1200, height: 800});
  win.loadURL(`file://${path.join(__dirname, 'dist/index.html')}`);

  if (isDev) {
    win.webContents.openDevTools({ mode: 'undocked' });
  }

  win.on('closed', () => {
    win = null
  });
};

// function createWindow () {
//   if (isDev) {
//     setupDevtools().then(setupWindow);
//   } else {
//     setupWindow();
//   }
// }

app.on('ready', () => {
  if (isDev) {
    setupDevtools();
  }

  setupPyProcess();
  setupWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    setupWindow();
  }
});

app.on('will-quit', () => {
  pyProcess.kill();
  pyProcess = null;
});
