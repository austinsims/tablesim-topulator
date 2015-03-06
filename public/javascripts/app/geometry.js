define( ["three", "json!assets/geometry/board.json"], function ( THREE, boardJson ) {
  var geometryPath = "assets/geometry/";
  var loader = new THREE.JSONLoader();

  return {
    cube: new THREE.CubeGeometry( 200, 200, 200 ),
    board: loader.parse(boardJson).geometry,
  };
});
