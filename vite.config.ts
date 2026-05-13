import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

const host = process.env.VITE_API_HOST || 'http://51.250.101.25:8080';

export default defineConfig({
  /*server: {
    host: '10.129.0.51',
    port: 8080
  },*/
  plugins: [
    vue(),
    vuetify({
      styles: {
        configFile: 'src/styles/settings.scss'
      }
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
      // '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: host,
        changeOrigin: true,
        secure: false
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`,
        api: 'modern-compiler'
      },
      sass: {
        api: 'modern'
      }
    }
  }
});
