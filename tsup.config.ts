import { defineConfig } from 'tsup'

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    outDir: 'dist',
  },

  {
    entry: {
      'artifus-web-app': 'src/iife.ts'
    },
    format: ['iife'],
    globalName: 'Artifus',
    outDir: 'dist',
    outExtension() {
      return {
        js: '.js',
      }
    },
    sourcemap: true,
    minify: true,
  },
])
