const exec = require('child_process').execSync;
const path = require('path');
const pathToServer = path.join(__dirname, '..', '..', 'server');
const pathToEngine = path.join(__dirname, '..', '..', 'server', 'engine.py');

process.chdir(pathToServer);
console.log('Current working directory:', process.cwd());

const shellProcess = exec('pipenv shell');
const buildProcess = exec('pyinstaller engine.py -y');
