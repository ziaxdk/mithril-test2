SystemJS.config({
  baseURL: './',
  paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
  map: {
    'rxjs': 'npm:rxjs'
  },
  packages: {
    rxjs: {
      defaultExtension: 'js'
    }    
  }
});