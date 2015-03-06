define( ["three", "camera", "container"], function( THREE, camera, container ) { 
  var controls = new THREE.OrbitControls( camera, container );
  return controls;
} );
