'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var _mkdirp2 = require('mkdirp');

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readFile = _bluebird2.default.promisify(_fs.readFile);

// Promisified imports

var writeFile = _bluebird2.default.promisify(_fs.writeFile);

var mkdirp = _bluebird2.default.promisify(_mkdirp2.mkdirp);

// Standard imports


var ROOT_DIR = process.cwd();
var DEFAULT_RC_FILE = '.jhirc';
var RC_FILE = (0, _path.join)(ROOT_DIR, DEFAULT_RC_FILE);

var fetchPromise = function fetchPromise(url) {
  return new _bluebird2.default(function (resolve, reject) {
    _superagent2.default.get(url).end(function (err, res) {
      return err ? reject(err) : resolve('// ' + url + '\n\n' + res.text);
    });
  });
};

var fetchContents = function fetchContents(helpers) {
  var fetches = Object.keys(helpers).reduce(function (acc, key) {
    var url = helpers[key];
    acc[key] = fetchPromise(url); // eslint-disable-line no-param-reassign
    return acc;
  }, {});
  return _bluebird2.default.props(fetches);
};

var writeFiles = function writeFiles(_ref) {
  var location = _ref.location;
  var contents = _ref.contents;
  return _bluebird2.default.map(Object.keys(contents), function (pkgName) {
    var fileName = (0, _path.join)(location, pkgName + '.js');
    var body = contents[pkgName];
    return writeFile(fileName, body);
  });
};

var writeIndex = function writeIndex(_ref2) {
  var location = _ref2.location;
  var contents = _ref2.contents;

  var lines = Object.keys(contents).map(function (file) {
    return 'module.exports.' + file + ' = require(\'./' + file + '\');';
  });
  var fileName = (0, _path.join)(location, 'index.js');
  return writeFile(fileName, lines.join('\n\n'));
};

readFile(RC_FILE, 'utf-8').then(JSON.parse).tap(function (_ref3) {
  var location = _ref3.location;
  return mkdirp(location);
}).then(function (_ref4) {
  var location = _ref4.location;
  var helpers = _ref4.helpers;
  return fetchContents(helpers).then(function (contents) {
    return { location: location, contents: contents };
  });
}).tap(writeFiles).tap(writeIndex);