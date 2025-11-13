import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLibMode = mode === 'lib'

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: isLibMode
      ? {
          lib: {
            entry: {
              index: resolve(__dirname, 'src/index.ts'),
              icons: resolve(__dirname, 'src/icons.ts'),
              styles: resolve(__dirname, 'src/styles.ts'),
            },
            // Output file names from list entries in dist folder
            fileName: (format, entryName) => {
              return `${entryName}.${format === 'es' ? 'js' : 'cjs'}`
            },
            formats: ['es', 'cjs'],
          },
          rollupOptions: {
            // Mark peer deps as external so they're not bundled
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react/jsx-runtime': 'jsx',
              },
            },
          },
          cssCodeSplit: false,
          sourcemap: true,
          /* Don't clear dist folder to preserve .d.ts files from TypeScript compilation
          Must cleanup dist manually before running build:lib script 
          Or using plugin: vite-plugin-dts*/
          emptyOutDir: false,
        }
      : {
          // Regular app build config for development
          // TO BE REMOVED
          outDir: 'dist-app',
        },
  }
})
