import resolve from '@rollup/plugin-node-resolve'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import json from 'rollup-plugin-json'
import pkg from './package.json'

const banner =
  '/*!\n' +
  ` * otel.js v${pkg.version}\n` +
  ` * (c) 2022-${new Date().getFullYear()} \n` +
  ' * Released under the MIT License.\n' +
  ' */'

export default [
  {
    input: 'src/index.umd.ts',
    output: [
      {
        name: 'DUOTEL',
        file: 'dist/otel.umd.js',
        format: 'umd',
        exports: 'auto',
        banner,
        plugins: [
          getBabelOutputPlugin({
            presets: ['@babel/preset-env'],
            allowAllFormats: true,
          }),
        ],
      },
      { file: 'dist/otel.esm.js', format: 'es', exports: 'auto' },
    ],
    treeshake: true, // treeshake 开关
    plugins: [
      commonjs(), // so Rollup can convert `ms` to an ES module
      resolve({
        mainFields: ['browser', 'esnext', 'module', 'main'],
      }), // so Rollup can find `ms`
      ts(),
      json(),
      // 压缩代码
      terser(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'DUOTEL',
        file: 'dist/otel.min.js',
        format: 'iife',
        exports: 'auto',
        banner,
      },
    ],
    plugins: [
      commonjs(), // so Rollup can convert `ms` to an ES module
      resolve({
        mainFields: ['browser', 'module', 'main'],
      }), // so Rollup can find `ms`
      ts(),
      json(),
      getBabelOutputPlugin({
        presets: ['@babel/preset-env'],
        allowAllFormats: true,
      }),
      nodePolyfills(),
      // 压缩代码
      terser(),
    ],
    treeshake: true, // treeshake 开关
  },
]
