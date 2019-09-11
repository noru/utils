import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import cleanup from 'rollup-plugin-cleanup'
import { uglify } from 'rollup-plugin-uglify'

const fs = require('fs')
const path = require('path')

const tsConfigForLib = typescript({
  clean: true,
  exclude: ['*.d.ts', '**/*.d.ts', 'test/*'],
  tsconfigOverride: {
    compilerOptions: {
      declaration: true,
      // outDir: './test', // <-- this is fuxking magic, all other dir won't work. (I want .d.ts placed in the same folder with js)
    },
  },
})

const commonPlugins = [
  resolve({
    module: true,
    jsnext: true,
    main: true,
    browser: true,
  }),
  replace({
    exclude: 'node_modules/**',
    ___ENV___: JSON.stringify(process.env.NODE_ENV || 'production'),
  }),
  cleanup({ extensions: ['ts', 'tsx'] }),
]

const walkSync = function(dir, filelist) {
  let files = fs.readdirSync(dir)
  filelist = filelist || []
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist)
    } else {
      filelist.push(path.join(dir, file))
    }
  })
  return filelist
}
let files = walkSync('./src')
let es = files
  .filter(f => !f.endsWith('.d.ts'))
  .map(file => {
    return {
      input: file,
      output: [
        {
          file:
            './lib/' +
            file
              .replace('src/', '')
              .replace('.ts', '.js')
              .replace('.tsx', '.js'),
          format: 'es',
        },
      ],
      plugins: [tsConfigForLib, ...commonPlugins],
    }
  })

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: './cjs/index.js',
        format: 'cjs',
      },
    ],
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            target: 'es5',
          },
        },
      }),
      ...commonPlugins,
      uglify(),
    ],
  },
].concat(es)
