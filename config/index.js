'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'pages/static',
    assetsPublicPath: '/',
    proxyTable: {
       '/':'http://127.0.0.1:8888/',
      
    },

    
    host: 'localhost', 
    port: 8080, 
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, 

    devtool: 'cheap-module-eval-source-map',

    
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
   
    index: path.resolve(__dirname, '../dist/index.html'),

    
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'pages/static',
    assetsPublicPath: '/',


    productionSourceMap: true,
    
    devtool: '#source-map',

    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
