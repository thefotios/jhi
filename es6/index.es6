import Promise from 'bluebird';

// Promisified imports
import {
  readFile as _readFile,
  writeFile as _writeFile,
} from 'fs';
const readFile = Promise.promisify(_readFile);
const writeFile = Promise.promisify(_writeFile);

import { mkdirp as _mkdirp } from 'mkdirp';
const mkdirp = Promise.promisify(_mkdirp);

// Standard imports
import request from 'superagent';
import { join } from 'path';

const ROOT_DIR = process.cwd();
const DEFAULT_RC_FILE = '.jhirc';
const RC_FILE = join(ROOT_DIR, DEFAULT_RC_FILE);

const fetchPromise = (url) => new Promise((resolve, reject) => {
  request
    .get(url)
    .end((err, res) => (err ? reject(err) : resolve(`// ${url}\n\n${res.text}`)));
});

const fetchContents = (helpers) => {
  const fetches = Object.keys(helpers).reduce((acc, key) => {
    const url = helpers[key];
    acc[key] = fetchPromise(url); // eslint-disable-line no-param-reassign
    return acc;
  }, {});
  return Promise.props(fetches);
};

const writeFiles = ({ location, contents }) => Promise.map(Object.keys(contents), (pkgName) => {
  const fileName = join(location, `${pkgName}.js`);
  const body = contents[pkgName];
  return writeFile(fileName, body);
});

const writeIndex = ({ location, contents }) => {
  const lines = Object.keys(contents).map((file) =>
    `module.exports.${file} = require('./${file}');`
  );
  const fileName = join(location, 'index.js');
  return writeFile(fileName, lines.join('\n\n'));
};

readFile(RC_FILE, 'utf-8')
  .then(JSON.parse)
  .tap(({ location }) => mkdirp(location))
  .then(({ location, helpers }) =>
    fetchContents(helpers).then((contents) =>
      ({ location, contents })
    )
  )
  .tap(writeFiles)
  .tap(writeIndex);
