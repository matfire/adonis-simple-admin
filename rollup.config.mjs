import resolve from '@rollup/plugin-node-resolve'

/**
 * @type {import('rollup').RollupOptions}
 **/
export default {
  input: {
    unpoly: 'resources/js/unpoly.js',
    app: 'resources/js/app.js',
  },
  output: {
    dir: 'build/resources/js',
    format: 'es',
  },
  plugins: [resolve()],
}
