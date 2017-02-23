var FS = require('fs');
var Path = require('path');

function pathify(parent, path) {
  return Path.join(__dirname, '..', parent, path);
}

var hashedFileRoutes = function() {
  var hashedPaths = [];
  var filename = pathify('public', 'webpack-assets.json');
  var fileHashes = JSON.parse(FS.readFileSync(filename));

  FS.watch(filename, { persistent: false, recursive: false }, () => {
    FS.readFile(filename, 'utf8', (read_error, data) => {
      if (!read_error) {
        try {
          fileHashes = JSON.parse(data);
        } catch (ignore_error) {
          // nothing at the moment
        }
      }
    });
  });

  var cache = {
    expiresIn: 7 * 24 * 60 * 60 * 1000, // one week
    privacy: 'public'
  };

  var files = {
    '/images/favicon.ico' : pathify('assets', 'images/favicon.8af3a74ede48e250ceb935c026242483.ico'),
    '/favicon.ico' : pathify('assets', 'images/favicon.8af3a74ede48e250ceb935c026242483.ico'),
    '/images/internet-graphic.svg' : pathify('assets', 'images/internet-graphic.e9a5980f4251c71bdd72d088f80d9864.svg'),
    '/images/mozilla.svg' : pathify('assets', 'images/mozilla.5e83dba715a0469b92071758876f0373.svg')
  };

  Object.keys(files).forEach(function(item) {
    hashedPaths.push({
      method: 'GET',
      path: item,
      handler: function(request, reply) {
        reply.file(files[item]);
      },
      config: {
        cache
      }
    });
  });

  hashedPaths.push({
    method: 'GET',
    path: '/main.{id}.js',
    handler: function(request, reply) {
      reply.file(pathify('public', fileHashes.main.js));
    },
    config: {
      cache
    }
  }, {
    method: 'GET',
    path: '/style.{id}.css',
    handler: function(request, reply) {
      reply.file(pathify('public', fileHashes.main.css));
    },
    config: {
      cache
    }
  });
  return hashedPaths;
};

module.exports = hashedFileRoutes;
