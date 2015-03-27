define([
		"three",
		"json!assets/geometry/board.json",
		"json!assets/geometry/piece.json",
		"json!assets/geometry/card.json",
    "json!assets/geometry/deck.json"
	],
	function (
		THREE,
		boardJson,
		pieceJson,
		cardJson,
    deckJson
	) {
	    var geometryPath = "assets/geometry/";
	    var loader = new THREE.JSONLoader();

	    return {
	        cube: new THREE.CubeGeometry( 200, 200, 200 ),
	        board: loader.parse(boardJson).geometry,
	        piece: loader.parse(pieceJson).geometry,
	        card: loader.parse(cardJson).geometry,
          //deck: loader.parse(deckJson).geometry
	    };
	}
);
