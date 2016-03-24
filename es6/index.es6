import Promise from 'bluebird';

const readFile = Promise.promisify(require('fs').readFile);
const mkdirp = Promise.promisify(require('mkdirp').mkdirp);

import {
  dirname,
  join,
} from 'path';

const ROOT_DIR = process.cwd();
const DEFAULT_RC_FILE = '.jhirc';
const RC_FILE = join(ROOT_DIR, DEFAULT_RC_FILE);

const fetchContents = (helpers, cb) => {
  Object.keys(helpers).forEach((key) => {
    console.log(`${key} : ${helpers[key]}`);
  });
  cb();
};

const makeDirectory = ({ location }) => {
  const dir = dirname(location);
  return mkdirp(dir);
};

readFile(RC_FILE, 'utf-8')
  .then(JSON.parse)
  .tap(makeDirectory)
  .then(({ location, helpers }) => {
    console.log('Fetching');
    console.log({location, helpers});
    fetchContents(helpers, (err3) => {
      if (err3) { throw err3; }
    });
  });
