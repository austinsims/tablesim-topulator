define( ["three", "container"], function ( THREE, container ) {
  var camera = new THREE.PerspectiveCamera(35, 1, 1, 1000);
  camera.position.set(0,120,150);

  var updateSize = function () {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener( 'resize', updateSize, false );
  updateSize();

  return camera;
} );
