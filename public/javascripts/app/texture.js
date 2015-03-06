define( ["three"], function ( THREE ) {
  var texturePath = "assets/textures/";
  return {
    grass: THREE.ImageUtils.loadTexture( texturePath + "grass.png" ),
    board: THREE.ImageUtils.loadTexture( texturePath + "board.jpg" ),
  };
});
