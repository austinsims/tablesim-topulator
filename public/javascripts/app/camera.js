define( ["three", "container"], function ( THREE, container ) {
  var camera = new THREE.PerspectiveCamera(35, 1, 1, 1000);
  camera.position.set(0,120,150);

  camera.updateSize = function () {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener( 'resize', camera.updateSize, false );
  camera.updateSize();

  return camera;
} );
