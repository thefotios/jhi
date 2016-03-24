'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readFile = _bluebird2.default.promisify(require('fs').readFile);
var mkdirp = _bluebird2.default.promisify(require('mkdirp').mkdirp);

var ROOT_DIR = process.cwd();
var DEFAULT_RC_FILE = '.jhirc';
var RC_FILE = (0, _path.join)(ROOT_DIR, DEFAULT_RC_FILE);

var fetchContents = function fetchContents(helpers, cb) {
  Object.keys(helpers).forEach(function (key) {
    console.log(key + ' : ' + helpers[key]);
  });
  cb();
};

var makeDirectory = function makeDirectory(_ref) {
  var location = _ref.location;

  var dir = (0, _path.dirname)(location);
  return mkdirp(dir);
};

readFile(RC_FILE, 'utf-8').then(JSON.parse).tap(makeDirectory).then(function (_ref2) {
  var location = _ref2.location;
  var helpers = _ref2.helpers;

  console.log('Fetching');
  console.log({ location: location, helpers: helpers });
  fetchContents(helpers, function (err3) {
    if (err3) {
      throw err3;
    }
  });
});