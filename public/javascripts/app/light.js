define( ["three", "scene"], function ( THREE, scene ) {
  var light = new THREE.PointLight();
  light.position.set( 0, 150, 0 );
  light.intensity = 1.0;
  scene.add( light );
  return light;
} );
