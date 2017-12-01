import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'

const fs = require('fs');

const commonPlugins = [
  typescript(),
  resolve({
    jsnext: true,
    main: true,
    browser: true,
  }),
  replace({
    exclude: 'node_modules/**',
    ___ENV___: JSON.stringify(process.env.NODE_ENV || 'production'),
  }),
]

let es = fs.readdirSync('./src').map(file => {
  return {
    input: './src/' + file,
    output: [
      {
        file: './lib/' + file.replace('.ts', '.js'),
        format: 'es',
      },
    ],
    plugins: commonPlugins
  }
})

export default [
  {
    name: 'Utils',
    input: './src/index.ts',
    output: [
      {
        file: './dist/utils.umd.js',
        format: 'umd',
      },
    ],
    plugins: [...commonPlugins, uglify()]
  }
].concat(es)
