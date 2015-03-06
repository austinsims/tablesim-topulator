define( ["three"], function ( THREE ) {
  var texturePath = "assets/textures/";
  return {
    grass: THREE.ImageUtils.loadTexture( texturePath + "grass.png" )
  };
} );
