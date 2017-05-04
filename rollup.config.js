
let pack = require('./package');
let external = Object.keys(pack.dependencies || {});
export default {
  entry: 'src/index.js',
  external: external,
  //plugins: [ babel() ],
  plugins: [
    //resolve({ jsnext: true, main: true }),
    //commonjs()
  ],
  targets: [
      {
          dest: 'dist/bundle.js',
          format: 'cjs',
          moduleName: 'main',
          banner: '#!/usr/bin/env node'
      }
  ]
};
