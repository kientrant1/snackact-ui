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
    server: {
      port: 3001,
    },
    build: isLibMode
      ? {
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'SnackactUI',
            fileName: format => {
              console.log(format)
              return `index.${format === 'es' ? 'js' : format === 'cjs' ? 'cjs' : `${format}.js`}`
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
          outDir: 'dist-app',
        },
  }
})
