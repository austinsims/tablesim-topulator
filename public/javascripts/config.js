// Configure Require.js
var require = {
  // Default load path for js files
  baseUrl: 'javascripts/app',
  shim: {
    // --- Use shim to mix together all THREE.js subcomponents
    'threeCore': { exports: 'THREE' },
    'TrackballControls': { deps: ['threeCore'], exports: 'THREE' },
    'OrbitControls': { deps: ['threeCore'], exports: 'THREE' },
    'Projector': { deps: ['threeCore'], exports: 'THREE'},
    // --- end THREE sub-components
    'detector': { exports: 'Detector' },
    'stats': { exports: 'Stats' }
  },
  // Third party code lives in js/lib
  paths: {
    // --- requirejs plugins ---
    text: '../../bower_components/text/text',
    json: '../../bower_components/requirejs-plugins/src/json',
    // -------------------------

    // --- start THREE sub-components ---
    three: '../lib/three',
    threeCore: '../../bower_components/threejs/build/three',
    TrackballControls: '../../bower_components/three.js-controls/src/TrackballControls',
    OrbitControls: '../../bower_components/three.js-controls/src/OrbitControls',
    Projector: '../../bower_components/threejs-examples/examples/js/renderers/Projector',

    // ----------------------------------

    // --- other libs ---
    lodash: '../../bower_components/lodash/lodash',
    // ------

    detector: '../lib/Detector',
    stats: '../lib/stats.min',
    // Require.js plugins
    shader: '../lib/shader',
    // Where to look for shader files
    shaders: '../shaders',

    assets: '../../assets',
  }
};
