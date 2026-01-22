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
      index: 'src/iife.ts'
    },
    format: ['iife'],
    globalName: 'Artifus',
    outDir: 'dist',
    outExtension() {
      return {
        js: '.iife.js',
      }
    },
    sourcemap: true,
    minify: true,
  },
])