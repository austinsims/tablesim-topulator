define( ["three", "container"], function ( THREE, container ) {
  var renderer = new THREE.WebGLRenderer( {
    alpha: true,
    antialias: true
  } );
  renderer.sortObjects = false;
  renderer.autoClear = false;
  container.appendChild( renderer.domElement );

  var updateSize = function () {
    renderer.setSize( container.offsetWidth, container.offsetHeight );
  };
  window.addEventListener( 'resize', updateSize, false );
  updateSize();

  return renderer;
} );
