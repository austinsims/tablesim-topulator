define(["three", "camera", "container", "renderer", "objects"], function(THREE, camera, container, renderer, objects) {
    'use strict';

    var controls = new THREE.OrbitControls(camera, container);
    var projector = new THREE.Projector();

    // Utility functions

    // Convert a mouse coordiate on the canvas to a 3d position in the XZ plane.
    var getMouse3d = function(mouseEvent) {

        // Try both props for browser compatibility
        var x = mouseEvent.offsetX || mouseEvent.layerX;
        var y = mouseEvent.offsetY || mouseEvent.layerY;

        var pos = new THREE.Vector3(0, 0, 0);
        var pMouse = new THREE.Vector3(
            (x / renderer.domElement.width) * 2 - 1, -(y / renderer.domElement.height) * 2 + 1,
            1
        );

        projector.unprojectVector(pMouse, camera);

        var cam = camera.position;
        var m = pMouse.y / (pMouse.y - cam.y);

        pos.x = pMouse.x + (cam.x - pMouse.x) * m;
        pos.z = pMouse.z + (cam.z - pMouse.z) * m;

        return pos;
    };


    // Does the given position lie within the bounding box of the given object
    // in the XZ plane?
    var isPosOnObject = function(options) {
    	var pos = options.pos;
    	var object = options.object;

    	var boundingBox = new THREE.Box3().setFromObject(options.object);
        var min = boundingBox.min;
        var max = boundingBox.max;

        return pos.x >= min.x && pos.x <= max.x && pos.z >= min.z && pos.z <= max.z;

    };


    // Set up event listeners

    window.addEventListener('mousedown', function(event) {
        var mouse3d = getMouse3d(event);
        controls.noRotate = isPosOnObject({pos: mouse3d, object: objects.board});
    });


    window.addEventListener('mouseup', function(event) {
        controls.noRotate = false;
    });

    return controls;
});