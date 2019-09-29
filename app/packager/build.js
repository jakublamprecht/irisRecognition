const cli = require('commander');
const packager = require('electron-packager');

cli.
  option('-p, --platform <type>', 'Select platform. Possibilities: win, linux, mac', 'win');

cli.parse(process.argv);

async function packageApp(configuration) {
  if (config === false) {
    console.log('Option not supported yet');
    return;
  }

  console.log(`Starting build for platform: ${ cli.platform }.`);
  await packager(configuration);
  console.log('Package built.');
};

let config = false;

console.log(cli.platform);

switch (cli.platform) {
  case 'win':
    config = require('./configs/winConfig');
    break;
  case 'linux':
    break;
  case 'mac':
    break;
  default:
    break;
};

packageApp(config);
