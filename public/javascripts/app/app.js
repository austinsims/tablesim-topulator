define( ["three", "camera", "controls", "geometry", "light", "material", "renderer", "scene"],
function ( THREE, camera, controls, geometry, light, material, renderer, scene ) {
  "use strict";


  // Move the specified Object3D so that it is centered on the origin
  // with respect to  x  and  z.  y is not modified.
  function centerOnOrigin(object3d) {
    var boundingBox = new THREE.Box3().setFromObject(object3d);
    var center = boundingBox.center();
    object3d.position.x = -center.x;
    object3d.position.z = -center.z;
  }

  var app = {
    meshes: [],
    init: function () {

      var board = new THREE.Mesh(geometry.board, material.board);
      var card = new THREE.Mesh(geometry.card, material.solid);
      card.position.y = 10;
      centerOnOrigin(board);
      scene.add(board);
      scene.add(card);
      
      scene.add(new THREE.AxisHelper(200));

    },
    animate: function () {
      window.requestAnimationFrame( app.animate );
      controls.update();

      // Any constant animations go here

      renderer.render( scene, camera );
    }
  };
  return app;
} );
