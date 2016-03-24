Usage
------------
Only test with the [react-svg-loader](https://www.npmjs.com/package/react-svg-loader) package.

```javascript
gulp.task('svg2react', function () {
  var iconName = argv.icon
  if(!iconName) {
    throw new gulp.PluginError('svg2react', 'iconName not defined')
  }

  gulp.src('icons/icon-' + iconName + '.svg')
    .pipe(webpackLoader('react-svg'))
    .pipe(gulp.dest('./src/icons'))
})
```
