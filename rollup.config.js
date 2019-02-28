import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import cleanup from 'rollup-plugin-cleanup'

const fs = require('fs')

const tsConfigForLib = typescript({
  // clean: true,
  exclude: [ "*.d.ts", "**/*.d.ts", "test/*" ],
  tsconfigOverride: {
    compilerOptions: {
      declaration: true,
      outDir: './test', // <-- this is fuxking magic, all other dir won't work. (I want .d.ts placed in the same folder with js)
    }
  },
})

const commonPlugins = [
  resolve({
    jsnext: true,
    main: true,
    browser: true,
  }),
  replace({
    exclude: 'node_modules/**',
    ___ENV___: JSON.stringify(process.env.NODE_ENV || 'production'),
  }),
  cleanup({ extensions: ['ts'] }),
]

let es = fs.readdirSync('./src').filter(f => !f.endsWith('.d.ts')).map(file => {
  return {
    input: './src/' + file,
    output: [
      {
        file: './lib/' + file.replace('.ts', '.js'),
        format: 'es',
      },
    ],
    plugins: [tsConfigForLib, ...commonPlugins]
  }
})

export default es
