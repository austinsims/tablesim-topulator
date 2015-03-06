// Configure Require.js
var require = {
  // Default load path for js files
  baseUrl: 'javascripts/app',
  shim: {
    // --- Use shim to mix together all THREE.js subcomponents
    'threeCore': { exports: 'THREE' },
    'TrackballControls': { deps: ['threeCore'], exports: 'THREE' },
    // --- end THREE sub-components
    'detector': { exports: 'Detector' },
    'stats': { exports: 'Stats' }
  },
  // Third party code lives in js/lib
  paths: {
    // --- start THREE sub-components

    three: '../lib/three',
    // three: '../../bower_components/threejs/build/three',

    // threeCore: '../lib/three.min',
    threeCore: '../../bower_components/threejs/build/three.min',

    TrackballControls: '../../bower_components/three.js-controls/src/TrackballControls',
    // --- end THREE sub-components

    detector: '../lib/Detector',
    stats: '../lib/stats.min',
    // Require.js plugins
    text: '../../bower_components/text/text',
    shader: '../lib/shader',
    // Where to look for shader files
    shaders: '../shaders'
  }
};
