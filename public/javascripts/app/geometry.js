define([
		"three",
		"json!assets/geometry/board.json",
		"json!assets/geometry/piece.json",
		"json!assets/geometry/card.json"
	],
	function (
		THREE,
		boardJson,
		pieceJson,
		cardJson
	) {
	    var geometryPath = "assets/geometry/";
	    var loader = new THREE.JSONLoader();

	    return {
	        cube: new THREE.CubeGeometry( 200, 200, 200 ),
	        board: loader.parse(boardJson).geometry,
	        piece: loader.parse(pieceJson).geometry,
	        card: loader.parse(cardJson).geometry
	    };
	}
);
