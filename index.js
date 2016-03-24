// webpack loader 2 gulp
var through = require('through2')
  , gutil = require('gulp-util')

function webpackLoader(loaderName, options) {
  var loader, packageName = loaderName + '-loader'

  return through.obj(function (file, encoding, callback) {
    try {
      loader = require(packageName)
    } catch (e) {
      callback(new gutil.PluginError('WebpackLoaderPlugin', 'loader not found:' + packageName))
    }

    if (file.isNull()) {
      callback(null, file)
      return
    }

    if (file.isStream()) {
      callback(new gutil.PluginError('WebpackLoaderPlugin', 'Streaming not supported'))
    }

    var loaderContext = {
      cacheable() {}
    , addDependency() {}
    , async() {
        return function(err, result) {
          if (err){
            this.emit('error', new gutil.PluginError('WebpackLoaderPlugin', result))
            console.log(file, err)
          } else {
            file.contents = new Buffer(result)
            file.path = gutil.replaceExtension(file.path, '.jsx')
            callback(err, file)
          }
        }
      }
    }
    return loader.apply(loaderContext, [file.contents.toString()])
  })
}

module.exports = webpackLoader
