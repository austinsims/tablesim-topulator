define(
    [
        // THREE
        "three",

        // Other libs
        "lodash",

        // App modules
        "camera",
        "controls",
        "geometry",
        "light",
        "material",
        "renderer",
        "scene",
        "objects",
        "container"
    ],
    function(
        THREE,
        _,
        camera,
        controls,
        geometry,
        light,
        material,
        renderer,
        scene,
        objects,
        container
    ) {
        "use strict";

        var getMouse3d = (function() {
          var projector = new THREE.Projector();

          return function(mouseEvent) {

            // Try both props for browser compatibility
            var x = mouseEvent.offsetX || mouseEvent.layerX;
            var y = mouseEvent.offsetY || mouseEvent.layerY;

            var pos = new THREE.Vector3(0,0,0);
            var pMouse = new THREE.Vector3(
               (x / renderer.domElement.width) * 2 - 1,
              -(y / renderer.domElement.height) * 2 + 1,
               1
            );

            projector.unprojectVector(pMouse, camera);

            var cam = camera.position;
            var m = pMouse.y / ( pMouse.y - cam.y );

            pos.x = pMouse.x + ( cam.x - pMouse.x ) * m;
            pos.z = pMouse.z + ( cam.z - pMouse.z ) * m;

            return pos;
          };

        })();


        var isMouseOnBoard = (function() {
            var boardBoundingBox = new THREE.Box3().setFromObject(objects.board);
            var min = boardBoundingBox.min;
            var max = boardBoundingBox.max;

            return function(pos) {
                return true && pos.x >= min.x && pos.x <= max.x && pos.z >= min.z && pos.z <= max.z;
            };

        })();

        // Set up event listeners
        var onMouseDown = function(event) {
            var mouse3d = getMouse3d(event);
            if (isMouseOnBoard(mouse3d)) {
                controls.noRotate = true;
            }
        };
        window.addEventListener('mousedown', onMouseDown);


        var onMouseUp = function(event) {
            controls.noRotate = false;
        };
        window.addEventListener('mouseup', onMouseUp);


        var app = {
            meshes: [],
            init: function() {

                var card = new THREE.Mesh(geometry.card, material.card);
                card.position.x = 40;
                card.position.z = 40;
                scene.add(objects.board);
                scene.add(card);

                scene.add(new THREE.AxisHelper(200));

            },
            animate: function() {
                window.requestAnimationFrame(app.animate);
                controls.update();

                // Any constant animations go here

                renderer.render(scene, camera);
            }
        };
        return app;
    });
