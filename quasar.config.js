// quasar.conf.js
import { defineConfig } from '#q-app/wrappers'

module.exports = function (ctx) {
  return defineConfig({
    cssAddon: true, // Ensure CSS is included in the build

    framework: {
      config: {
        brand: {
          primary: '#FF5733', // Your desired primary color
        },
      },
    },

    // Ensure CSS files are applied
    css: ['app.css'],

    // Other configurations...
    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },
      vueRouterMode: 'hash', // available values: 'hash', 'history'
    },

    devServer: {
      open: true, // opens browser window automatically
    },

    // PWA configurations (if applicable)
    pwa: {
      workboxMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
    },
  })
}
