import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import cleanup from 'rollup-plugin-cleanup'

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
  files = fs.readdirSync(dir)
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
  .filter(f => !f.endsWith('.d.ts') && !f.includes('react'))
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

let reactFiles = files.filter(f => f.includes('react/'))
console.log('Build react related files: ', reactFiles)
reactFiles.forEach(f => {
  var exec = require('child_process').exec
  var compiler = `tsc ./${f} --outDir ./lib -d` // make your cmd command here
  console.log(compiler)
  exec(compiler)
})

export default es
